"use client";

import { useEffect, useState } from "react";

const fragments = [
  "Parsing semantic intent...",
  "Exploring competing frameworks...",
  "Verifier rejected weak hypothesis...",
  "Cross-referencing governance models...",
  "Confidence increasing...",
  "Detecting contradiction patterns...",
  "Synthesizing consensus...",
];

export default function SignalFragments() {

  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) =>
        (prev + 1) % fragments.length
      );

    }, 2500);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="absolute bottom-10 left-10 z-50">

      <div className="text-xs tracking-[0.3em] text-cyan-400 opacity-50 mb-3">
        COGNITIVE SIGNALS
      </div>

      <div className="text-cyan-100 text-lg font-light max-w-md leading-relaxed">

        {fragments[current]}

      </div>

    </div>
  );
}