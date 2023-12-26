type PrimaryButtonProps = {
  name: string;
  href?: string;
  classes?: string;
  onClick: () => void;
};

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const { name, href, classes } = props;
  return (
    <a href={href}>
      <button className={`btn btn--outline-primary ${classes}`}>{name}</button>
    </a>
  );
};
