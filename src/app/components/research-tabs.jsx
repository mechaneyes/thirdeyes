const TabsResearch = ({ activeTab, onTabChange }) => {
  return (
    <div className="research-tabs self-stretch rounded-t-lg rounded-b-none border-researchpurple border-b border-solid flex flex-row items-center justify-start">
      <div 
        onClick={() => onTabChange("research")}
        className={`h-8 flex-1 py-1 flex flex-row items-center justify-center font-extrabold cursor-pointer border-researchpurple/100 border-r border-solid ${
          activeTab === "research" ? "bg-blue-100" : "bg-darkorchid-100"
        }`}
      >
        Research
      </div>
      <div 
        onClick={() => onTabChange("notes")}
        className={`h-8 flex-1 py-1 flex flex-row items-center justify-center font-extrabold cursor-pointer ${
          activeTab === "notes" ? "bg-blue-100" : "bg-darkorchid-100"
        }`}
      >
        Notes
      </div>
    </div>
  );
};

export default TabsResearch;