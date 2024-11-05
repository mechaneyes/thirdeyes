import { useEffect, useRef, useState } from "react";
import Textbox from "./textbox";

const ResearchBody = ({ text, borderColor }) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const scrollableDivRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollableDivRef.current;
      setIsScrolledToBottom(scrollTop + clientHeight >= scrollHeight);
    };

    const checkScrollable = () => {
      const { scrollHeight, clientHeight } = scrollableDivRef.current;
      setIsScrollable(scrollHeight > clientHeight);
    };

    const div = scrollableDivRef.current;
    div.addEventListener("scroll", handleScroll);
    checkScrollable();

    return () => {
      div.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="self-stretch flex-1 flex flex-col items-center justify-start pt-[0rem] px-4 pb-6 gap-6 z-[0] text-3.5 text-darkslateblue-300">
      <div className="self-stretch flex-1 shadow-hieroshadow-25 rounded-3xs bg-gray border-researchpurple/65 border border-solid overflow-hidden flex flex-col items-start justify-start p-4 pr-2 gap-[0.75rem]">
        <b className="relative text-[1.063rem] font-extrabold">
          Wikipedia: Arca
        </b>
        <div
          ref={scrollableDivRef}
          className="research-inner self-stretch relative mb-8 pr-4 leading-[1.188rem] text-darkslateblue-200"
          style={{ overflowY: "auto", maxHeight: "430px" }}
        >
          <p>
            Few artists have bent musical form to their will quite like Arca,
            a.k.a. Alejandra Ghersi Rodríguez. Having invented her very own
            style from the collision of pop and experimental electronic sound
            design, the Caracas-born, Barcelona-based visionary ranks alongside
            icons like Björk, Kanye West, ROSALÍA, and Frank Ocean; small wonder
            that she has worked with all of them. Born in 1989, Arca got her
            start in the early 2010s crafting mind-melting club-music mutations
            and then, with 2017’s <i>Arca</i>, stepped up to the mic and laid
            her soul bare in heart-stopping operatic fashion. With 2020’s
            reggaetón-influenced <i>KiCk i</i>, the artist demonstrated her
            mastery of pop, and the following year’s four-volume follow-up saw
            her talents growing in every direction—more melodious, more
            bewildering, more vulnerable, more <i>her</i>. As a nonbinary trans
            woman, Arca puts questions of identity at the center of her work,
            and that only makes her ongoing artistic evolution more thrilling to
            behold: The search for self and the quest for authentic expression
            are encoded in every dazzling waveform.
          </p>
          <p>
            Few artists have bent musical form to their will quite like Arca,
            a.k.a. Alejandra Ghersi Rodríguez. Having invented her very own
            style from the collision of pop and experimental electronic sound
            design, the Caracas-born, Barcelona-based visionary ranks alongside
            icons like Björk, Kanye West, ROSALÍA, and Frank Ocean; small wonder
            that she has worked with all of them. Born in 1989, Arca got her
            start in the early 2010s crafting mind-melting club-music mutations
            and then, with 2017’s <i>Arca</i>, stepped up to the mic and laid
            her soul bare in heart-stopping operatic fashion. With 2020’s
            reggaetón-influenced <i>KiCk i</i>, the artist demonstrated her
            mastery of pop, and the following year’s four-volume follow-up saw
            her talents growing in every direction—more melodious, more
            bewildering, more vulnerable, more <i>her</i>. As a nonbinary trans
            woman, Arca puts questions of identity at the center of her work,
            and that only makes her ongoing artistic evolution more thrilling to
            behold: The search for self and the quest for authentic expression
            are encoded in every dazzling waveform.
          </p>
          <p className="relative mt-4 font-bold">Read More</p>
        </div>
        {isScrollable && !isScrolledToBottom && (
          <div className="flex justify-center relative w-full mt-2">
            <div className="absolute bottom-0 text-researchpurple text-2xl font-bold px-3 py-2 rounded">
              👇
            </div>
          </div>
        )}
      </div>
      <div className="w-5/6 flex flex-row items-start justify-center flex-wrap content-start gap-4 pb-2 text-white">
        <div className="shadow-hieroshadow-25 rounded-lg bg-researchpurple/60 border-researchpurple border border-solid overflow-hidden flex flex-col items-center justify-center py-2.5 px-4">
          <div className="relative text-base font-bold tracking-wide">Wikipedia</div>
        </div>
        <div className="shadow-hieroshadow-25 rounded-lg bg-researchpurple/60 border-researchpurple border border-solid overflow-hidden flex flex-col items-center justify-center py-2.5 px-4">
          <div className="relative text-base font-bold tracking-wide">Wikipedia</div>
        </div>
        <div className="shadow-hieroshadow-25 rounded-lg bg-researchpurple/60 border-researchpurple border border-solid overflow-hidden flex flex-col items-center justify-center py-2.5 px-4">
          <div className="relative text-base font-bold tracking-wide">Wikipedia</div>
        </div>
        <div className="shadow-hieroshadow-25 rounded-lg bg-researchpurple/60 border-researchpurple border border-solid overflow-hidden flex flex-col items-center justify-center py-2.5 px-4">
          <div className="relative text-base font-bold tracking-wide">Wikipedia</div>
        </div>
        <div className="shadow-hieroshadow-25 rounded-lg bg-researchpurple/60 border-researchpurple border border-solid overflow-hidden flex flex-col items-center justify-center py-2.5 px-4">
          <div className="relative text-base font-bold tracking-wide">Wikipedia</div>
        </div>
        <div className="shadow-hieroshadow-25 rounded-lg bg-researchpurple/60 border-researchpurple border border-solid overflow-hidden flex flex-col items-center justify-center py-2.5 px-4">
          <div className="relative text-base font-bold tracking-wide">Wikipedia</div>
        </div>
        <div className="shadow-hieroshadow-25 rounded-lg bg-researchpurple/60 border-researchpurple border border-solid overflow-hidden flex flex-col items-center justify-center py-2.5 px-4">
          <div className="relative text-base font-bold tracking-wide">Wikipedia</div>
        </div>
        <div className="shadow-hieroshadow-25 rounded-lg bg-researchpurple/60 border-researchpurple border border-solid overflow-hidden flex flex-col items-center justify-center py-2.5 px-4">
          <div className="relative text-base font-bold tracking-wide">Wikipedia</div>
        </div>
      </div>
      <Textbox borderColor="border-researchpurple/70" />
    </div>
  );
};

export default ResearchBody;
