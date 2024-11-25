const LoadingIndicator = ({ loadingCopy }) => {
  return (
    <div className="loading-indicator w-full h-full flex items-center justify-center p-4">
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-solid border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="ml-2">{loadingCopy ? loadingCopy : "Loading..."}</span>{" "}
      </div>
    </div>
  );
};

export default LoadingIndicator;
