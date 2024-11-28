import Link from "next/link";

type ButtonPrimaryProps = {
  name: string;
  classes?: string;
  isActive?: boolean;
  link?: string;
  onClick: () => void;
};

const ButtonResearch = (props: ButtonPrimaryProps) => {
  const { name, classes, isActive, link, onClick } = props;

  const buttonContent = (
    <div
      className={`shadow-hieroshadow-25 rounded-md border-researchpurple border border-solid overflow-hidden flex flex-col items-center justify-center py-1.5 px-2.5 ${classes} hover:bg-researchlavender-300 cursor-pointer        
        ${
          isActive
            ? "bg-researchlavender-300"
            : "bg-researchlavender-400/75 hover:bg-researchlavender-300"
        }`}
      onClick={onClick}
    >
      <div className="relative text-sm font-normal tracking-wide">{name}</div>
    </div>
  );

  return link ? (
    <Link href={link}>
      <a>{buttonContent}</a>
    </Link>
  ) : (
    buttonContent
  );
};

export default ButtonResearch;
