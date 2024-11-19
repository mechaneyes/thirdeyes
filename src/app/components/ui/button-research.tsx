import Link from "next/link";

type ButtonPrimaryProps = {
  name: string;
  link?: string;
  classes?: string;
  onClick: () => void;
};

const ButtonResearch = (props: ButtonPrimaryProps) => {
  const { name, link, classes, onClick } = props;

  const buttonContent = (
    <div
      className={`shadow-hieroshadow-25 rounded-md bg-researchpurple/60 border-researchpurple border border-solid overflow-hidden flex flex-col items-center justify-center py-1.5 px-2.5 ${classes}`}
      onClick={onClick}
    >
      <div className="relative text-base font-normal tracking-wide">
        {name}
      </div>
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