import Textbox from "./textbox";
import ButtonResearch from "@/components/ui/button-research";

const ResearchBody = () => {
  return (
    <div className="research-body h-full flex-1 flex flex-col items-center justify-start p-3 gap-4 text-darkslateblue-300" style={{ height: 'calc(100% - 33px)' }}>
      <div className="research-content shadow-hieroshadow-25 rounded-3xs bg-gray border-researchpurple/65 border border-solid overflow-hidden flex flex-col items-start justify-start p-3 pb-6 pr-2">
        <h3 className="pb-1 text-xl text-darkslateblue-300 font-bold">
          Wikipedia: Arca
        </h3>
        <div className="research-inner relative h-full overflow-y-scroll pr-4 text-darkslateblue-200">
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
            are encoded in every dazzling waveform.ing club-music mutations and
            then, with 2017’s <i>Arca</i>, stepped up to the mic and laid her
            soul bare in heart-stopping operatic fashion. With 2020’s
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
      </div>
      <div className="w-full flex flex-row items-start justify-center flex-wrap content-start gap-2 text-white">
        <ButtonResearch name="Discography" />
        <ButtonResearch name="Media Link Tree" />
        <ButtonResearch name="Artist Genres" />
        <ButtonResearch name="Biographical Info" />
        <ButtonResearch name="Adjective Cloud" />
        <ButtonResearch name="Recent News" />
        <ButtonResearch name="Artist Socials" />
        <ButtonResearch name="Similar Artists" />
      </div>
      <Textbox borderColor="border-researchpurple/70" />
    </div>
  );
};

export default ResearchBody;
