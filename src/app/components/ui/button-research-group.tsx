import { useAtom } from "jotai";

import ButtonResearch from "./button-research";

import { globalArtistNameAtom } from "@/store/atoms";

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
  const [artistName] = useAtom(globalArtistNameAtom);

  return (
    <div className="w-full flex flex-row items-start justify-center flex-wrap content-start gap-2 py-1 pt-3 text-white">
      <ButtonResearch
        isResearch={isResearch}
        name="Discography"
        isActive={activeView === "discography"}
        onClick={() => setActiveView("discography")}
        disabled={!artistName}
      />
      <ButtonResearch
        isResearch={isResearch}
        name="Influences"
        isActive={activeView === "influences"}
        onClick={() => setActiveView("influences")}
        disabled={!artistName}
      />
      <ButtonResearch
        isResearch={isResearch}
        name="Biographical Info"
        isActive={activeView === "bio"}
        onClick={() => setActiveView("bio")}
        disabled={!artistName}
      />
      <ButtonResearch
        isResearch={isResearch}
        name="Discourse"
        isActive={activeView === "discourse"}
        onClick={() => setActiveView("discourse")}
        disabled={!artistName}
      />
      <ButtonResearch
        isResearch={isResearch}
        name="Recent News"
        isActive={activeView === "news"}
        onClick={() => setActiveView("news")}
        disabled={!artistName}
      />
      <ButtonResearch
        isResearch={isResearch}
        name="Artist Socials"
        isActive={activeView === "socials"}
        onClick={() => setActiveView("socials")}
        disabled={!artistName}
      />
      <ButtonResearch
        isResearch={isResearch}
        name="Sonic Analysis"
        isActive={activeView === "sonic"}
        onClick={() => setActiveView("sonic")}
        disabled={!artistName}
      />
      <ButtonResearch
        isResearch={isResearch}
        name="Lyrical Analysis"
        isActive={activeView === "lyrical"}
        onClick={() => setActiveView("lyrical")}
        disabled={!artistName}
      />
    </div>
  );
};

export default ButtonResearchGroup;
