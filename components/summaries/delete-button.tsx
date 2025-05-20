"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"
import { deleteSummary } from "@/actions/summary-actions"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog"

  interface DeleteButtonProps {
    summaryId: string;
  }

  export default function DeleteButton({ summaryId }: DeleteButtonProps) {
    const [open, setOpen] = useState(false);
    const handleDelete = async () => {
        // TODO: delete summary
        //await deleteSummary(summaryId);
        const result = await deleteSummary({ summaryId });

        if (!result.success) {
            toast.error('Failed to delete summary');
        }
        setOpen(false);
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Summary</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this summary? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
                variant="ghost"
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                onClick={() => setOpen(false)}
            >
                Cancel
            </Button>
            <Button
                variant="destructive"
                className="px-4 py-2 bg-rose-600 text-white hover:bg-rose-700 focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                onClick={() => {handleDelete()}}
            >
                Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  
