import Link from "next/link";

type ButtonPrimaryProps = {
  name: string;
  link?: string;
  classes?: string;
  onClick: () => void;
};

export const ButtonPrimary = (props: ButtonPrimaryProps) => {
  const { name, link, classes } = props;
  return (
    <>
      {link ? (
        <Link href={link}>
          <button
            className={`btn btn--outline-primary ${classes}`}
            onClick={props.onClick}
          >
            {name}
          </button>
        </Link>
      ) : (
        <button
          className={`btn btn--outline-primary ${classes}`}
          onClick={props.onClick}
        >
          {name}
        </button>
      )}
    </>
  );
};
