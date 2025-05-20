"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UploadFormInputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput({onSubmit}:UploadFormInputProps) {
    return (
        <form className="flex justify-center" onSubmit={onSubmit}>
            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto -mt-22">
                <Input
                    id="file" 
                    type="file"
                    name="file"
                    accept="application/pdf"
                    required
                    className="w-full sm:w-auto"
                />     
                <Button className="w-full sm:w-auto bg-rose-400 whitespace-nowrap hover:bg-rose-500">Upload Your PDF</Button>
            </div>
        </form>
    )
}
