"use client";

import { WorldMap } from "@/components/ui/world-map";
import { countryGeoLocation } from "@/misc/countries-geo-location";
import { motion } from "framer-motion";

export function WorldMapDemo() {
  return (
    <div className="dark:bg-black bg-white w-full py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Secret Source&apos;s{" "}
          <span className="text-neutral-400">
            {"Talent Pool".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          We are connecting top talents with the best companies around Europe.
        </p>
      </div>
      <WorldMap dots={countryGeoLocation} />
    </div>
  );
}
