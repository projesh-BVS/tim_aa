"use client";

import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  let currHours = time.getHours();
  let currMinutes = time.getMinutes();
  let currSeconds = time.getSeconds();

  let rotHr = currHours * 30 + currMinutes / 2;
  let rotMin = currMinutes * 6 + currSeconds / 10;
  let rotSec = currSeconds * 6;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex items-center justify-center w-full h-12 md:h-16 lg:h-18 gap-4">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex items-center justify-end w-full h-full font-medium text-base md:text-lg lg:text-xl">
          {time.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="flex items-center justify-end w-full h-full font-semibold text-xs md:text-sm lg:text-base">
          {time.toLocaleDateString(undefined, { dateStyle: "medium" })}
        </div>
      </div>
      <div className="relative hidden md:flex items-center justify-center h-full aspect-square rounded-full bg-white shadow-inner">
        <div
          className={`absolute bg-gradient-to-b from-gray-500 from-50% to-50% m-auto h-[70%] w-1 origin-center rounded-full z-0 ${
            rotHr == 359 || rotHr == 360 || rotHr == 0
              ? "transition-none"
              : "transition-all"
          }`}
          style={{ rotate: `${rotHr}deg` }}
        />
        <div
          className={`absolute bg-gradient-to-b from-black from-50% to-50% m-auto h-[80%] w-[0.2rem] origin-center rounded-full z-10 ${
            rotMin == 359 || rotMin == 360 || rotMin == 0
              ? "transition-none"
              : "transition-all"
          }`}
          style={{ rotate: `${rotMin}deg` }}
        />
        <div
          className={`absolute bg-gradient-to-b from-red-500 from-50% to-50% m-auto h-[90%] w-[0.1rem] origin-center rounded-full z-20 ${
            rotSec == 359 || rotSec == 360 || rotSec == 0
              ? "transition-none"
              : "transition-all"
          }`}
          style={{ rotate: `${rotSec}deg` }}
        />
        <div className="w-2 h-2 rounded-full bg-red-500 z-20" />
      </div>
    </section>
  );
};

export default Clock;
