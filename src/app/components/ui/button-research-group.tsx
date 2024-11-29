import ButtonResearch from "./button-research";

interface ButtonResearchGroupProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isResearch: boolean;
}

const ButtonResearchGroup = ({
  activeView,
  setActiveView,
  isResearch,
}: ButtonResearchGroupProps) => {
  return (
    <div className="w-full flex flex-row items-start justify-center flex-wrap content-start gap-2 py-1 pt-3 text-white">
      <ButtonResearch
        isResearch={isResearch}
        name="Discography"
        classes="pointer-events-none"
        onClick={() => console.log("Discography feature coming soon")}
      />
      <ButtonResearch
        isResearch={isResearch}
        name="Influences"
        isActive={activeView === "influences"}
        onClick={() => setActiveView("influences")}
      />
      <ButtonResearch
        isResearch={isResearch}
        name="Biographical Info"
        isActive={activeView === "bio"}
        onClick={() => setActiveView("bio")}
      />
      <ButtonResearch
        isResearch={isResearch}
        name="Discourse"
        isActive={activeView === "discourse"}
        onClick={() => setActiveView("discourse")}
      />
      <ButtonResearch
        isResearch={isResearch}
        name="Recent News"
        isActive={activeView === "news"}
        onClick={() => setActiveView("news")}
      />
      <ButtonResearch
        isResearch={isResearch}
        name="Artist Socials"
        isActive={activeView === "socials"}
        onClick={() => setActiveView("socials")}
      />
      <ButtonResearch
        isResearch={isResearch}
        name="Sonic Analysis"
        isActive={activeView === "sonic"}
        onClick={() => setActiveView("sonic")}
      />
      <ButtonResearch
        isResearch={isResearch}
        name="Lyrical Analysis"
        isActive={activeView === "lyrical"}
        onClick={() => setActiveView("lyrical")}
      />
    </div>
  );
};

export default ButtonResearchGroup;
