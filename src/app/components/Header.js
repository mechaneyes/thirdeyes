const Header = () => {
  return (
    <div className="w-full relative flex flex-row items-center justify-between max-w-7xl mt-6 text-left text-[3rem] text-royalblue font-bd-colonius">
      <div className="flex flex-col items-start justify-start">
        <div className="relative leading-[3rem]">Thirdeyes</div>
      </div>
      <div className="flex flex-row items-center justify-end py-[0rem] pl-[1rem] pr-[0rem] gap-[0.5rem] text-center text-[1rem] text-black font-mr-eaves-xl-san-ot">
        <div className="relative leading-[1.5rem] font-light inline-block max-w-[7.375rem]">
          e-flux
        </div>
        <b className="relative leading-[1.5rem] inline-block max-w-[7.375rem]">
          ·
        </b>
        <div className="relative leading-[1.5rem] font-light inline-block max-w-[7.375rem]">
          Login
        </div>
      </div>
    </div>
  );
};

export default Header;
