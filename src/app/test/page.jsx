"use client";
import React, { useEffect, useState } from "react";
import Ripple from "material-ripple-effects";

const Page = () => {
  const ripple = new Ripple();

  var [isDone, setIsDone] = useState(false);

  return (
    <div className="border flex justify-center  py-20 gap-20">
      {/* <button className='bg-blue-900 text-white px-8 py-2 rounded-sm' onMouseUp={(e) => ripple.create(e, 'light')}>Material Ripple</button> */}
      <div
        onClick={() => setIsDone(!isDone)}
        className={`${
          isDone
            ? "bg-[#e3f0ee] text-green-800"
            : "hover:bg-gray-100 text-gray-700"
        } transition-all flex items-center justify-start w-60 gap-2 bg-transparent font-semibold text-sm px-3 py-3 cursor-pointer  rounded-[.25rem]`}
        onMouseUp={(e) => ripple.create(e, "light")}
      >
        <i className="bx text-xl bx-group"></i>
        Users
      </div>
    </div>
  );
};

export default Page;
