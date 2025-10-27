import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string>("");

    const validateFile = (file: File): boolean => {
        const validTypes = ["text/csv", "application/vnd.ms-excel"];
        const isCSV = validTypes.includes(file.type) || file.name.endsWith(".csv");
        
        if (!isCSV) {
            setError("Only CSV files are allowed");
            return false;
        }
        
        setError("");
        return true;
    };

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
            const file = files[0];
            if (validateFile(file)) {
                setSelectedFile(file);
            } else {
                setSelectedFile(null);
            }
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (validateFile(file)) {
                setSelectedFile(file);
            } else {
                setSelectedFile(null);
            }
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            console.log("Uploading:", selectedFile);
            navigate("/algo-picker", {state: { file: selectedFile }});
        }
    };

    return (
        <div className="flex-col flex min-h-screen items-center justify-center">
            <div className="justify-center">
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-20 w-300 text-center transition-colors ${
                        isDragging
                            ? "border-indigo-500 bg-indigo-50"
                            : error
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 bg-white"
                    }`}
                >
                    <CloudArrowUpIcon className="h-40 w-40 text-indigo-500 mx-auto mb-4" />
                    <p className="text-black font-bold text-2xl mb-6">Drag & drop file</p>
                    <p className="text-gray-400 text-base mb-6">Supported formates: CSV only</p>
                    {error && (
                        <p className="text-red-600 font-semibold text-sm mt-2">{error}</p>
                    )}
                    {selectedFile && !error && (
                        <p className="text-green-600 text-sm mt-2">Selected: {selectedFile.name}</p>
                    )}
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-input"
                    />
                    <label
                        htmlFor="file-input"
                        className="text-indigo-500 hover:text-indigo-600 cursor-pointer text-sm mt-4 inline-block underline"
                    >
                        Or click to browse
                    </label>
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