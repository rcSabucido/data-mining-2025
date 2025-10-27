import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Home = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            // Handle the file upload logic here
            console.log("Uploading:", selectedFile);
        }
    };

    return (
        <div className="flex-col flex min-h-screen items-center justify-center">
            <div className="justify-center">
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-20 w-300  text-center transition-colors ${
                        isDragging
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-300 bg-white"
                    }`}
                >
                    <CloudArrowUpIcon className="h-40 w-40 text-indigo-500 mx-auto mb-4" />
                    <p className="text-black font-bold text-2xl mb-6">Drag & drop file</p>
                    <p className="text-gray-400 text-base mb-6">Supported formates: CSV only</p>
                    {selectedFile && (
                        <p className="text-green-600 text-sm mt-2">Selected: {selectedFile.name}</p>
                    )}
                </div>
            </div>
            <div className="w-300 mt-10">
                <button
                    onClick={handleUpload}
                    disabled={!selectedFile}
                    className={`block w-full py-7 rounded-lg transition-colors text-center font-semibold ${
                        selectedFile
                            ? "bg-indigo-500 text-white text-2xl hover:bg-indigo-600 cursor-pointer"
                            : "bg-gray-300 text-gray-500 text-2xl cursor-not-allowed"
                    }`}
                >
                    UPLOAD FILE
                </button>
            </div>
        </div>
    );
};

export default Home;