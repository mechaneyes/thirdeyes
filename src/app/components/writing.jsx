import Editor from "./editor";

const Writing = () => {
  return (
    <div className="w-full relative rounded-3xs bg-lightblue border-writingborder border-[1px] border-solid box-border flex flex-col items-center justify-start text-left text-3.5 text-darkslateblue font-mr-eaves-xl-san-ot">
      <div className="self-stretch flex flex-row items-start justify-start p-4 gap-4 z-[0]">
        <Editor />
        <div className="w-[1.5rem] overflow-hidden shrink-0 flex flex-col items-center justify-center py-[0.562rem] px-[0rem] box-border gap-[0.5rem]">
          <div
            className="w-4 relative h-4 overflow-hidden shrink-0"
            width={16}
            height={16}
            alt=""
            src="Fit-to-height.svg"
          />
          <div
            className="w-4 relative h-4 overflow-hidden shrink-0"
            width={16}
            height={16}
            alt=""
            src="Open-panel--filled--bottom.svg"
          />
          <div
            className="self-stretch relative max-w-full overflow-hidden h-[0.375rem] shrink-0"
            width={24}
            height={6}
            alt=""
            src="spacer.svg"
          />
          <div
            className="w-4 relative h-4 overflow-hidden shrink-0"
            width={16}
            height={16}
            alt=""
            src="Folder.svg"
          />
          <div
            className="w-[1.063rem] relative h-[1.063rem] overflow-hidden shrink-0"
            width={17}
            height={17}
            alt=""
            src="Save.svg"
          />
          <div
            className="w-4 relative h-4 overflow-hidden shrink-0"
            width={16}
            height={16}
            alt=""
            src="cloud--upload.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default Writing;
