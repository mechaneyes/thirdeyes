import Link from "next/link";

const Header = () => {
  return (
    <div className="third-header w-full flex flex-row items-center justify-between max-w-7xl py-4 text-4xl text-royalblue font-bd-colonius">
      <div className="flex items-center justify-end gap-5">
        <Link href="/">Thirdeyes</Link>
        <div className="font-mr-eaves-xl-san-ot text-base font-normal">
          Third Bridge Creative
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 font-mr-eaves-xl-san-ot text-base font-normal">
        <Link href="https://trello.com/b/eLCNLMP5/ai-development">Trello</Link>
        <b className="text-xl">·</b>
        <Link href="#">Login</Link>
      </div>
    </div>
  );
};

export default Header;
