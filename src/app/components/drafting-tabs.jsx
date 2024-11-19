const TabsDrafting = ({ activeTab, onTabChange }) => {
  return (
    <div className="self-stretch rounded-t-lg rounded-b-none bg-lightgray border-seagreen border-b border-solid flex flex-row items-center justify-start text-darkslategray-200 text-white">
      <div 
        onClick={() => onTabChange("lede")}
        className={`h-8 flex-1 flex flex-row items-center justify-center font-extrabold cursor-pointer border-seagreen/80 border-r border-solid ${
          activeTab === "lede" ? "bg-mediumseagreen-400" : "bg-mediumseagreen-300"
        }`}
      >
        Lede
      </div>
      <div 
        onClick={() => onTabChange("origin")}
        className={`h-8 flex-1 flex flex-row items-center justify-center font-extrabold cursor-pointer border-seagreen/80 border-r border-solid ${
          activeTab === "origin" ? "bg-mediumseagreen-400" : "bg-mediumseagreen-300"
        }`}
      >
        Origin
      </div>
      <div 
        onClick={() => onTabChange("works")}
        className={`h-8 flex-1 flex flex-row items-center justify-center font-extrabold cursor-pointer ${
          activeTab === "works" ? "bg-mediumseagreen-400" : "bg-mediumseagreen-300"
        }`}
      >
        Works
      </div>
    </div>
  );
};

export default TabsDrafting;