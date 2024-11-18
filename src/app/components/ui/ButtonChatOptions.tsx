import { OverflowMenuHorizontal } from "@carbon/icons-react";

type ButtonChatOptionsProps = {
  classes?: string;
  onClick: () => void;
};

export const ButtonChatOptions = (props: ButtonChatOptionsProps) => {
  const { classes } = props;
  return (
    <>
      <button
        className={`btn btn--outline-primary ${classes}`}
        onClick={props.onClick}
      >
        <OverflowMenuHorizontal size="24" />
      </button>
    </>
  );
};
