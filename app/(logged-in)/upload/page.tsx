import UploadHeader from "@/components/upload/upload-header";
import UploadForm from "@/components/upload/upload-form";
export default function Page() {
    return (
        <section >
            <div className="flex flex-col items-center justify-center gap-6 text-center">
                <UploadHeader />    
                <UploadForm />  
            </div>
        </section>
    )
}