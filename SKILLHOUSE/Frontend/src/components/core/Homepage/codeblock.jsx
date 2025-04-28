import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CodeBlock = (  { position, heading , subheading , ctabtn1 , ctabtn2, codeblock ,backgroundGradinat, codecoler}) => {
  
    return (
        <div className={`flex ${position} my-20 justify-between gap-10 ` }>
            {/* section 1 */}
            <div className="w-[50%] flex flex-col gap-8">
                {/* heading */}
                {heading}
                <div className="text-shadow-black font-bold">
                    {subheading}

                </div>
<div className="flex gap-7">
        </div>
    )
}
export default CodeBlock;