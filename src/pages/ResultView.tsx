const ResultView = () => {
    const algorithmUsed = "Random Forest"; // connect dropdown selection from AlgoPicker
    const resultContent = "Sample result content here..."; // place actual result value

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
                            {resultContent}
                        </pre>
                    </div>
                </div>
                
                <div className="flex flex-row gap-4 justify-center">
                    <button className="bg-gray-500 text-white text-xl font-semibold px-12 py-5 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                        BACK
                    </button>
                    <button className="bg-indigo-500 text-white text-xl font-semibold px-12 py-5 rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer">
                        DOWNLOAD RESULT
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultView;