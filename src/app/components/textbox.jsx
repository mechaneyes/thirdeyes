const Textbox = ({ text, borderColor }) => {
  return (
    <div className="self-stretch flex flex-col items-center justify-end">
      <div className={`self-stretch relative shadow-[2px_2px_8px_rgba(0,_0,_0,_0.2)] rounded-md bg-white border border-solid ${borderColor} box-border h-[2.5rem]`}>
        <div className="absolute right-[0.75rem] bottom-[0.75rem] flex flex-col items-center justify-center">
          <div
            className="w-4 relative h-4 overflow-hidden shrink-0"
            width={16}
            height={16}
            alt=""
            src="SVG.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default Textbox;