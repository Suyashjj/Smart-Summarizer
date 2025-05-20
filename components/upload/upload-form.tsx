"use client";

import { z } from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useRef } from "react";
import { generatePdfSummary, storePdfSummaryAction } from "@/actions/upload-actions";

// Validation schema for PDF files
const schema = z.object({
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size <= 20 * 1024 * 1024, { message: "File must be less than 20MB" })
    .refine((file) => file.type.startsWith("application/pdf"), { message: "File must be a PDF" }),
});

export default function UploadForm() {
  const loadingToastId = useRef<string | number | null>(null);
  const { isSignedIn, userId } = useAuth();
  const router = useRouter();

  // Configure UploadThing hooks
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      if (loadingToastId.current) toast.dismiss(loadingToastId.current);
      toast.success("File uploaded successfully!");
    },
    onUploadError: (err) => {
      if (loadingToastId.current) toast.dismiss(loadingToastId.current);
      toast.error(`Error uploading file: ${err.message}`);
    },
    onUploadBegin: () => {
      loadingToastId.current = toast.loading("🚀 Uploading your PDF... Hang tight!", { duration: 10000 });
    },
  });

  // Validate the uploaded file
  const validateFile = (file: File) => {
    const validatedFields = schema.safeParse({ file });
    if (!validatedFields.success) {
      const errorMessage = validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file";
      toast.error(errorMessage);
      return false;
    }
    return true;
  };

  // Upload file to UploadThing
  const uploadFile = async (file: File) => {
    const resp = await startUpload([file]);
    if (!resp) {
      toast.error("Upload failed");
      return null;
    }
    return resp;
  };

  // Generate AI summary for the uploaded PDF
  const generateSummary = async (resp: any) => {
    const processingToastId = toast.loading(
      "🤖 AI is working its magic on your document... Please wait! 🪄",
      { duration: 10000 }
    );
    const summaryResult = await generatePdfSummary(resp);
    toast.dismiss(processingToastId);

    if (!summaryResult.success) {
      toast.error(summaryResult.message || "Failed to generate summary");
      return null;
    }

    console.log("AI-Generated Summary:", summaryResult.data);
    const summaryToastId = toast.success(
      "🎉 Summary generated! Check for AI-powered insights. 📄✨",
      { duration: 10000 }
    );
    setTimeout(() => toast.dismiss(summaryToastId), 10000);

    return summaryResult.data;
  };

  // Save summary to database
  const saveSummary = async (file: File, resp: any, summary: string) => {
    if (!isSignedIn || !userId) {
      toast.error("You must be signed in to save summaries");
      return;
    }

    const saveResult = await storePdfSummaryAction({
      userId,
      fileUrl: resp[0].url,
      summary,
      title: file.name.replace(".pdf", ""),
      fileName: file.name,
    });

    if (!saveResult.success) {
      toast.error(saveResult.message || "Failed to save summary");
      return;
    }

    toast.success("Summary saved successfully!");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    console.log("Form submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    if (!validateFile(file)) return;

    const resp = await uploadFile(file);
    if (!resp) return;

    const summary = await generateSummary(resp);
    if (!summary) return;

    await saveSummary(file, resp, summary);
    // TODO: Redirect to summary page (e.g., router.push(`/summary/${id}`))
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}