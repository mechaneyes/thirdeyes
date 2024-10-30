"use client";

import React, { useState, useEffect, useRef } from 'react';

const Research = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const scrollableDivRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollableDivRef.current;
      setIsScrolledToBottom(scrollTop + clientHeight >= scrollHeight);
    };

    const checkScrollable = () => {
      const { scrollHeight, clientHeight } = scrollableDivRef.current;
      setIsScrollable(scrollHeight > clientHeight);
    };

    const div = scrollableDivRef.current;
    div.addEventListener('scroll', handleScroll);
    checkScrollable();

    return () => {
      div.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="self-stretch flex-1 rounded-lg bg-darkorchid-200 border-darkslateblue-400 border-[1px] border-solid flex flex-col items-center justify-start gap-[1.5rem] text-white">
      <div className="self-stretch rounded-t-lg rounded-b-none bg-lightgray border-darkslateblue-100 border-b-[1px] border-solid overflow-hidden flex flex-row items-center justify-start z-[1]">
        <div className="flex-1 bg-blue-100 border-darkslateblue-100 border-r-[1px] border-solid box-border h-[2.5rem] overflow-hidden flex flex-row items-center justify-center py-[0.625rem] px-[0rem]">
          <p className="relative leading-[1.75rem] font-extrabold">Research</p>
        </div>
        <div className="flex-1 bg-darkorchid-100 h-[2.5rem] overflow-hidden flex flex-row items-center justify-center py-[0.625rem] px-[0rem] box-border">
          <b className="relative leading-[1.75rem] font-extrabold">Notes</b>
        </div>
      </div>
      <div className="self-stretch flex-1 flex flex-col items-center justify-start pt-[0rem] px-[1rem] pb-[1.5rem] gap-[1.5rem] z-[0] text-[0.875rem] text-darkslateblue-300">
        <div className="self-stretch flex-1 shadow-[2px_4px_16px_-6px_rgba(0,_0,_0,_0.25)] rounded-3xs bg-gray border-darkslateblue-400 border-[1px] border-solid overflow-hidden flex flex-col items-start justify-start p-[1rem] gap-[0.75rem]">
          <b className="relative text-[1.063rem] font-extrabold">
            Wikipedia: Arca
          </b>
          <div
            ref={scrollableDivRef}
            className="self-stretch relative mb-8 leading-[1.188rem] text-darkslateblue-200"
            style={{ overflowY: "auto", maxHeight: "430px" }}
          >
            <p className="m-0">
              Few artists have bent musical form to their will quite like Arca,
              a.k.a. Alejandra Ghersi Rodríguez. Having invented her very own
              style from the collision of pop and experimental electronic sound
              design, the Caracas-born, Barcelona-based visionary ranks
              alongside icons like Björk, Kanye West, ROSALÍA, and Frank Ocean;
              small wonder that she has worked with all of them. Born in 1989,
              Arca got her start in the early 2010s crafting mind-melting
              club-music mutations and then, with 2017’s <i>Arca</i>, stepped up
              to the mic and laid her soul bare in heart-stopping operatic
              fashion. With 2020’s reggaetón-influenced <i>KiCk i</i>, the
              artist demonstrated her mastery of pop, and the following year’s
              four-volume follow-up saw her talents growing in every
              direction—more melodious, more bewildering, more vulnerable, more{" "}
              <i>her</i>. As a nonbinary trans woman, Arca puts questions of
              identity at the center of her work, and that only makes her
              ongoing artistic evolution more thrilling to behold: The search
              for self and the quest for authentic expression are encoded in
              every dazzling waveform.
            </p>
            <p className="m-0">
              Few artists have bent musical form to their will quite like Arca,
              a.k.a. Alejandra Ghersi Rodríguez. Having invented her very own
              style from the collision of pop and experimental electronic sound
              design, the Caracas-born, Barcelona-based visionary ranks
              alongside icons like Björk, Kanye West, ROSALÍA, and Frank Ocean;
              small wonder that she has worked with all of them. Born in 1989,
              Arca got her start in the early 2010s crafting mind-melting
              club-music mutations and then, with 2017’s <i>Arca</i>, stepped up
              to the mic and laid her soul bare in heart-stopping operatic
              fashion. With 2020’s reggaetón-influenced <i>KiCk i</i>, the
              artist demonstrated her mastery of pop, and the following year’s
              four-volume follow-up saw her talents growing in every
              direction—more melodious, more bewildering, more vulnerable, more{" "}
              <i>her</i>. As a nonbinary trans woman, Arca puts questions of
              identity at the center of her work, and that only makes her
              ongoing artistic evolution more thrilling to behold: The search
              for self and the quest for authentic expression are encoded in
              every dazzling waveform.
            </p>
            <p className="relative mt-4 font-bold">Read More</p>
          </div>
          {isScrollable && !isScrolledToBottom && (
            <div className="flex justify-center relative w-full mt-2">
              <div className="absolute bottom-0 bg-darkorchid-100 text-white text-xs px-3 py-2 rounded">
                Scroll for more
              </div>
            </div>
          )}
        </div>
        <div className="w-[30.25rem] flex flex-row items-start justify-between flex-wrap content-start gap-[1rem] text-white font-futura">
          <div className="shadow-[2px_2px_8px_rgba(0,_0,_0,_0.2)] rounded-lg bg-blue-200 border-darkslateblue-400 border-[1px] border-solid overflow-hidden flex flex-col items-center justify-center py-[0.625rem] px-[1.25rem]">
            <div className="relative font-medium">Wikipedia</div>
          </div>
          <div className="shadow-[2px_2px_8px_rgba(0,_0,_0,_0.2)] rounded-lg bg-blue-200 border-darkslateblue-400 border-[1px] border-solid overflow-hidden flex flex-col items-center justify-center py-[0.625rem] px-[1.25rem]">
            <div className="relative font-medium">Wikipedia</div>
          </div>
          <div className="shadow-[2px_2px_8px_rgba(0,_0,_0,_0.2)] rounded-lg bg-blue-200 border-darkslateblue-400 border-[1px] border-solid overflow-hidden flex flex-col items-center justify-center py-[0.625rem] px-[1.25rem]">
            <div className="relative font-medium">Wikipedia</div>
          </div>
          <div className="shadow-[2px_2px_8px_rgba(0,_0,_0,_0.2)] rounded-lg bg-blue-200 border-darkslateblue-400 border-[1px] border-solid overflow-hidden flex flex-col items-center justify-center py-[0.625rem] px-[1.25rem]">
            <div className="relative font-medium">Wikipedia</div>
          </div>
          <div className="shadow-[2px_2px_8px_rgba(0,_0,_0,_0.2)] rounded-lg bg-blue-200 border-darkslateblue-400 border-[1px] border-solid overflow-hidden flex flex-col items-center justify-center py-[0.625rem] px-[1.25rem]">
            <div className="relative font-medium">Wikipedia</div>
          </div>
          <div className="shadow-[2px_2px_8px_rgba(0,_0,_0,_0.2)] rounded-lg bg-blue-200 border-darkslateblue-400 border-[1px] border-solid overflow-hidden flex flex-col items-center justify-center py-[0.625rem] px-[1.25rem]">
            <div className="relative font-medium">Wikipedia</div>
          </div>
          <div className="shadow-[2px_2px_8px_rgba(0,_0,_0,_0.2)] rounded-lg bg-blue-200 border-darkslateblue-400 border-[1px] border-solid overflow-hidden flex flex-col items-center justify-center py-[0.625rem] px-[1.25rem]">
            <div className="relative font-medium">Wikipedia</div>
          </div>
          <div className="shadow-[2px_2px_8px_rgba(0,_0,_0,_0.2)] rounded-lg bg-blue-200 border-darkslateblue-400 border-[1px] border-solid overflow-hidden flex flex-col items-center justify-center py-[0.625rem] px-[1.25rem]">
            <div className="relative font-medium">Wikipedia</div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-center justify-end">
          <div className="self-stretch relative shadow-[2px_2px_8px_rgba(0,_0,_0,_0.2)] rounded-md bg-white border-seagreen border-[1px] border-solid box-border h-[2.5rem]">
            <div className="absolute right-[0.75rem] bottom-[0.75rem] flex flex-col items-center justify-center">
              <div
                className="w-[1rem] relative h-[1rem] overflow-hidden shrink-0"
                width={16}
                height={16}
                alt=""
                src="SVG.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
