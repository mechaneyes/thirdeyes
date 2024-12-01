import Link from "next/link";

type ButtonPrimaryProps = {
  name: string;
  classes?: string;
  isActive?: boolean;
  isResearch?: boolean;
  link?: string;
  onClick: () => void;
  disabled?: boolean;
};

const ButtonResearch = (props: ButtonPrimaryProps) => {
  const { name, classes, isActive, isResearch, link, onClick, disabled } = props;

  const buttonContent = (
    <div
      className={`shadow-hieroshadow-25 rounded-md border-researchpurple border-2 border-solid overflow-hidden flex flex-col items-center justify-center py-1.5 px-2.5 leading-none p-2 
        transition-all duration-200 ease-in-out ${classes} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-opacity-80'}
        ${
          isActive && isResearch
            ? "bg-researchlavender-300"
            : !isActive && isResearch
            ? "bg-researchlavender-400/75"
            : isActive && !isResearch
            ? "bg-mediumseagreen-400 border-seagreen"
            : !isActive && !isResearch
            ? "bg-mediumseagreen-300 border-seagreen"
            : ""
        }`}
      onClick={disabled ? undefined : onClick}
    >
      <div className="relative text-sm font-normal tracking-wide">{name}</div>
    </div>
  );

  return link && !disabled ? (
    <Link href={link}>
      <a>{buttonContent}</a>
    </Link>
  ) : (
    buttonContent
  );
};

export default ButtonResearch;
