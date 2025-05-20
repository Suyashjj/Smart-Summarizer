import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

//for uploading the file and give necessary info
export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      try {
        // get user info
        const user = await currentUser();

        if (!user) {
          throw new UploadThingError("Please sign in to upload files");
        }

        return { userId: user.id };
      } catch (error) {
        console.error("Authentication error:", error);
        throw new UploadThingError("Authentication failed. Please try again.");
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('upload completed for user id', metadata.userId);
      console.log('file url', file.ufsUrl);
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
