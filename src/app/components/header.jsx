import Link from "next/link";

const Header = () => {
  return (
    <div className="third-header w-full flex flex-row items-center justify-between max-w-7xl py-4 text-base font-normal text-[#0062fe]">
      <div className="flex items-center justify-end gap-5">
        <Link className="font-logo text-4xl" href="/">
          Thirdeyes
        </Link>
        <div className="font-body text-base font-normal"></div>
      </div>
      <div className="flex items-center justify-end gap-2 font-body">
        Third Bridge Creative
        {/* <b className="text-xl">·</b>
        <Link href="#">Login</Link> */}
      </div>
    </div>
  );
};

export default Header;
