import AnimatedLogo from "@/app/components/logo-animated";

const LoadingIndicator = ({ loadingCopy }) => {
  return (
    <div className="loading-indicator w-full h-full flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-3">
        <AnimatedLogo />
        <span className="ml-4 text-royalblue text-xl font-normal">
          {loadingCopy ? loadingCopy : "Loading..."}
        </span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
