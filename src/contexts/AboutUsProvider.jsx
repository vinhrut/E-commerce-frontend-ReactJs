import { createContext, useState } from "react";

export const AboutUsContext = createContext();

export const AboutUsProvider = ({ children }) => {
  const questions = [
    { question: "Feugiat purus mi nisl dolor pellentesque tellus?" },
    {
      question:
        "Suspendisse nunc sagittis adipiscing imperdiet turpis sodales massa convallis sit?",
    },
    { question: "Facilisis adipiscing lacus, nisl at in consectetur in?" },
    { question: "Pellentesque egestas eget amet erat leo arcu?" },
    {
      question:
        "Pellentesque pulvinar nibh suspendisse faucibus libero condimentum phasellus.",
    },
    { question: "Hendrerit commodo id mattis consequat." },
  ];

  return (
    <AboutUsContext.Provider value={{ questions }}>
      {children}
    </AboutUsContext.Provider>
  );
};

export default AboutUsProvider;
