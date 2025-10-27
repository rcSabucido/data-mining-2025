import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

const AlgoPicker = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    useEffect(() => {
        const state = location.state as { file?: File };
        if (state?.file) {
            setUploadedFile(state.file);
        } else {
            // Redirect back to home if no file is present
            navigate("/");
        }
    }, [location, navigate]);

    const algorithms = [
        "Random Forest",
        "Linear Regression",
        "Decision Tree",
    ];

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const handleProceed = () => {
        if (selectedAlgorithm && uploadedFile) {
            navigate("/result-view", {
                state: {
                    algorithm: selectedAlgorithm,
                    file: uploadedFile,
                },
            });
        }
    }

    return (
        <div className="flex flex-row min-h-screen p-8 gap-8">
            <div className="flex flex-col w-1/2 justify-center items-center">
                <div className="w-96">
                    <select
                        value={selectedAlgorithm}
                        onChange={(e) => setSelectedAlgorithm(e.target.value)}
                        className="w-full p-4 mb-30 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-indigo-500"
                    >
                        <option value="">Choose an algorithm...</option>
                        {algorithms.map((algo) => (
                            <option key={algo} value={algo}>
                                {algo}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleProceed}
                        disabled={!selectedAlgorithm}
                        className={`block w-full py-7 rounded-lg transition-colors text-center font-semibold ${
                            selectedAlgorithm
                                ? "bg-indigo-500 text-white text-2xl hover:bg-indigo-600 cursor-pointer"
                                : "bg-gray-300 text-gray-500 text-2xl cursor-not-allowed"
                        }`}
                    >
                        PROCEED
                    </button>
                </div>
            </div>
            <div className="flex flex-col w-1/2 justify-center items-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 w-200 h-100 flex flex-col items-center justify-center text-center bg-white">
                    {uploadedFile ? (
                        <>
                            <DocumentTextIcon className="h-16 w-16 text-indigo-500 mb-4" />
                            <p className="text-gray-600 text-lg font-semibold mb-2">Uploaded File</p>
                            <p className="text-indigo-600 font-medium text-base mb-1">{uploadedFile.name}</p>
                            <p className="text-gray-400 text-sm">{formatFileSize(uploadedFile.size)}</p>
                        </>
                    ) : (
                        <>
                            <p className="text-gray-600 text-lg font-semibold mb-2">Uploaded File</p>
                            <p className="text-gray-400 text-sm">No file uploaded yet</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AlgoPicker;