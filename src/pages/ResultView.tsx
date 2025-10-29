import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [algorithmUsed, setAlgorithmUsed] = useState<string>("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [url, setUrl] = useState<string>("");

    const downloadFile = (fileUrl: string) => {
      fetch(fileUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", algorithmUsed + ".jpg");
          document.body.appendChild(link);
          link.click();
          link.parentNode?.removeChild(link);
        });
    };


    useEffect(() => {
        const state = location.state as { algorithm?: string; file?: File };
        if (state?.algorithm && state?.file) {
            setAlgorithmUsed(state.algorithm);
            setUploadedFile(state.file);
            // Add ?update=[unix timestamp] to force browser to refresh image.
            setUrl(import.meta.env.VITE_PREDICTOR_STATIC + "/static/" + state.algorithm + ".jpg?update=" + Date.now());
        } else {
            // Redirect back to home if no data is present
            navigate("/");
        }
    }, [location, navigate]);

    const handleBack = () => {
        navigate("/algo-picker", {
            state: { file: uploadedFile }
        });
    };

    return (
        <div className="flex flex-col min-h-screen p-8 items-center justify-center">
            <div className="w-full max-w-7xl">
                <h1 className="text-3xl font-bold text-black mb-4 text-center">
                    ML Algorithm Result of Elementary Student Enrollment
                </h1>
                <p className="text-gray-600 text-lg font-semibold mb-8 text-center">
                    Algorithm Used: {algorithmUsed}
                </p>
                
                <div className="border-2 border-gray-300 rounded-lg p-12 bg-white mb-8 min-h-150 w-full">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono overflow-auto">
                            <img
                                src={url}
                                alt="Result"
                                className="w-full"
                              />
                        </pre>
                    </div>
                </div>
                
                <div className="flex flex-row gap-4 justify-center">
                    <button 
                        onClick={handleBack}
                        className="bg-gray-500 text-white text-xl font-semibold px-12 py-5 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                        BACK
                    </button>
                    <button onClick={() => downloadFile(url)} className="bg-indigo-500 text-white text-xl font-semibold px-12 py-5 rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer">
                        DOWNLOAD RESULT
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultView;