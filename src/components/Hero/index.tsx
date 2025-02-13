"use client";
import { WorldMap } from "@/components/ui/world-map";
import { motion } from "framer-motion";

export function WorldMapDemo() {
  return (
    <div className="dark:bg-black bg-white w-full py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="font-bold text-xl md:text-4xl dark:text-white text-black">
          Talent{" "}
          <span className="text-neutral-400">
            {"Pool".split("").map((word, idx) => (
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
      <WorldMap
        dots={[
          {
            start: { lat: 17.2916, lng: -16.6291 }, // Canary Islands
            end: { lat: 42.5074, lng: -0.1278 }, // London
          },
          {
            start: { lat: 42.5074, lng: -0.1278 }, // London
            end: { lat: 45.4501, lng: 30.5234 }, // Kiev
          },
          {
            start: { lat: 17.2916, lng: -16.6291 }, // Canary Islands
            end: { lat: 28.4168, lng: -3.7038 }, // Madrid
          },
          {
            start: { lat: 17.2916, lng: -16.6291 }, // Canary Islands
            end: { lat: 38.4979, lng: 19.0402 }, // Budapest
          },
          {
            start: { lat: 17.2916, lng: -16.6291 }, // Canary Islands
            end: { lat: 41.3676, lng: 4.9041 }, // Amsterdam
          },
          {
            start: { lat: 36.8781, lng: -87.6298 }, // Chicago
            end: { lat: 17.2916, lng: -16.6291 }, // Canary Islands
          },
        ]}
      />
    </div>
  );
}
