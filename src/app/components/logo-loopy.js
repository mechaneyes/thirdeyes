import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function LogoLoopy({ inputText }) {
  const text = inputText || "Thirdeyes";
  const characters = text.split("");
  
  // Create state for each character
  const [characterStates, setCharacterStates] = useState(
    characters.map(() => ({
      loopiness: 12,
      direction: "up",
      speed: Math.random() * 30 + 10 // Random speed between 10-40
    }))
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCharacterStates(prevStates => 
        prevStates.map(char => {
          const step = char.speed;
          
          if (char.direction === "up") {
            if (char.loopiness >= 1000) {
              return { ...char, direction: "down", loopiness: 1000 };
            }
            return { ...char, loopiness: char.loopiness + step };
          } else {
            if (char.loopiness <= 12) {
              return { ...char, direction: "up", loopiness: 12 };
            }
            return { ...char, loopiness: char.loopiness - step };
          }
        })
      );
    }, 80);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex">
      {characters.map((char, index) => (
        <div
          key={index}
          className="font-loopy text-6xl leading-none pb-4"
          style={{
            fontVariationSettings: `"LOOP" ${characterStates[index].loopiness}`,
          }}
        >
          {char}
        </div>
      ))}
    </div>
  );
}