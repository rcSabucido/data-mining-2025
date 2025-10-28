import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

const AlgoPicker = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
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
        "Random Forest Regressor",
        "Linear Regression",
        "Gradient Boosting Regressor",
    ];
    const category = [
        ["Public", 1],
        ["Private", 2],
        ["State Colleges/Universities", 3],
    ];
    const regions = [
        ["Region I - Ilocos Region", 1],
        ["Region II - Cagayan Valley", 2],
        ["Region III - Central Luzon", 3],
        ["Region IV-A - CALABARZON", 4],
        ["Region IV-B - MIMAROPA", 5],
        ["Region V - Bicol Region", 6],
        ["Region VI - Western Visayas", 7],
        ["Region VII - Central Visayas", 8],
        ["Region VIII - Eastern Visayas", 9],
        ["Region IX - Zamboanga Peninsula", 10],
        ["Region X - Northern Mindanao", 11],
        ["Region XI - Davao Region", 12],
        ["Region XII - Soccsksargen", 13],
        ["CARAGA - CARAGA", 14],
        ["BARMM - Bangsamoro Autonomous Region in Muslim Mindanao", 15],
        ["CAR - Cordillera Administrative Region", 16],
        ["NCR - National Capital Region", 17]
    ]

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const handleProceed = () => {
        if (selectedAlgorithm && selectedCategory && selectedRegion && uploadedFile) {
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
                        className="w-full p-4 mb-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-indigo-500"
                    >
                        <option value="">Choose an algorithm...</option>
                        {algorithms.map((algo) => (
                            <option key={algo} value={algo}>
                                {algo}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full p-4 mb-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-indigo-500"
                    >
                        <option value="">Choose a region...</option>
                        {regions.map((cat) => (
                            <option key={cat[1]} value={cat[1]}>
                                {cat[0]}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-4 mb-30 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-indigo-500"
                    >
                        <option value="">Choose a category...</option>
                        {category.map((cat) => (
                            <option key={cat[1]} value={cat[1]}>
                                {cat[0]}
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