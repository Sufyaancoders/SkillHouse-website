import React from "react";
import Button from "./button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor
}) => {
  return (
    <div className={`flex ${position} my-30 mx-[10%] justify-between flex-col lg:flex-row lg:gap-10 gap-10`}>
      {/* Section 1 - Text and buttons */}
      <div className="w-full lg:w-1/2 flex flex-col gap-8">
        {/* Render heading directly */}
        {heading}

        {/* Render subheading directly */}
        {subheading}

        {/* Button Group */}
        <div className="flex gap-7 mt-7">
          <Button active={ctabtn1.active} linkto={ctabtn1.link}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </Button>
          <Button active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </Button>
        </div>
      </div>

      {/* Section 2 - Code Display */}
      <div className="w-full lg:w-1/2 relative">
        {/* Background gradient if provided */}
        {backgroundGradient && backgroundGradient}
        
        {/* Code editor box */}
        <div className="bg-[#1E1E1E] rounded-lg overflow-hidden border border-gray-800 shadow-xl">
          {/* Editor Header */}
          <div className="bg-[#252526] px-4 py-2 flex items-center justify-between">
            <div className="flex">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-gray-400 text-xs">code.js</div>
          </div>
          
          {/* Editor Content with Line Numbers */}
          <div className="flex">
            {/* Line Numbers */}
            <div className="py-4 px-2 text-right bg-[#1E1E1E] text-gray-500 text-sm select-none">
              {codeblock.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            
            {/* Code Content with TypeAnimation */}
            <div className="p-4 text-sm font-mono overflow-x-auto w-full">
              <TypeAnimation 
                sequence={[codeblock, 2000, ""]}
                repeat={Infinity}
                cursor={true}
                style={{
                  whiteSpace: "pre-line",
                  display: "block",
                }}
                className={codeColor || "text-white"}
                omitDeletionAnimation={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;