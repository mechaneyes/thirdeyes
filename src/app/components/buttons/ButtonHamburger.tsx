import { Menu } from "@carbon/icons-react";

type ButtonHamburgerProps = {
  classes?: string;
  onClick: () => void;
};

export const ButtonHamburger = (props: ButtonHamburgerProps) => {
  const { classes } = props;
  return (
    <>
      <button
        className={`btn btn--outline-primary ${classes}`}
        onClick={props.onClick}
      >
        <Menu />
      </button>
    </>
  );
};
