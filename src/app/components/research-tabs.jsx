const TabsResearch = ({ activeTab, onTabChange }) => {
  return (
    <div className="research-tabs self-stretch rounded-t-lg rounded-b-none bg-researchlavender-300 border-b border-solid border-researchlavender-500 flex flex-row items-center justify-start">
      <div 
        onClick={() => onTabChange("research")}
        className={`h-8 flex-1 py-1 flex flex-row items-center justify-center font-extrabold cursor-pointer border-researchpurple border-r rounded-tl-lg border-solid ${
          activeTab === "research" ? "bg-researchlavender-300" : "bg-researchlavender-400"
        }`}
      >
        Research
      </div>
      <div 
        onClick={() => onTabChange("notes")}
        className={`h-8 flex-1 py-1 flex flex-row items-center justify-center font-extrabold cursor-pointer rounded-tr-lg border-solid ${
          activeTab === "notes" ? "bg-researchlavender-300 border-transparent" : "bg-researchlavender-400 border-transparent"
        }`}
      >
        Notes
      </div>
    </div>
  );
};

export default TabsResearch;