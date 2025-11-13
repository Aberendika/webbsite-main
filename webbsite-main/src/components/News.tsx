import React, { useEffect, useRef } from "react";
import SectionHeading from "./SectionHeading.tsx";
import Button from "./Button.tsx";

interface NewsProps {
  variant: "frontpage" | "news";
}

const News = ({ variant }: NewsProps) => {
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skapa scriptet om det inte finns
    if (!document.getElementById("elfsight-script")) {
      const script = document.createElement("script");
      script.id = "elfsight-script";
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);

      // När scriptet har laddats, initiera feeden
      script.onload = () => {
        if ((window as any).Elf && feedRef.current) {
          (window as any).Elf.init();
        }
      };
    } else {
      // Om scriptet redan finns, initiera feeden direkt
      if ((window as any).Elf && feedRef.current) {
        (window as any).Elf.init();
      }
    }
  }, []);

  return (
    <div className="w-full bg-wheat dark:bg-codgray">
      <div className="pt-5 pb-5 mx-auto md:w-4/5 w-full lg:max-w-screen-lg">
        <SectionHeading text="Senaste hos klubben" />

        <div
          ref={feedRef}
          className="elfsight-app-d45e5dfe-5559-476d-bed7-4eeab39353cf"
          style={{ width: "100%", minHeight: "600px" }}
        >
          {/* Här kommer Elfsight-feed automatiskt */}
        </div>

        <div className="flex justify-center pb-5 pt-5 mx-auto">
          {variant === "frontpage" && (
            <Button isLink={true} linkTo={"news"} text={"FLER NYHETER"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
