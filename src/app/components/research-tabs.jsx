const TabsResearch = ({ activeTab, onTabChange }) => {
  return (
    <div className="self-stretch rounded-t-lg rounded-b-none bg-lightgray border-researchpurple border-b border-solid flex flex-row items-center justify-start">
      <div 
        onClick={() => onTabChange("research")}
        className={`flex-1 py-3 flex flex-row items-center justify-center font-extrabold cursor-pointer border-researchpurple/100 border-r border-solid ${
          activeTab === "research" ? "bg-blue-100" : "bg-darkorchid-100"
        }`}
      >
        Research
      </div>
      <div 
        onClick={() => onTabChange("notes")}
        className={`flex-1 py-3 flex flex-row items-center justify-center font-extrabold cursor-pointer ${
          activeTab === "notes" ? "bg-blue-100" : "bg-darkorchid-100"
        }`}
      >
        Notes
      </div>
    </div>
  );
};

export default TabsResearch;