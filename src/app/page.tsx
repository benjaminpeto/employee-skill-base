import { WorldMapDemo } from "@/components/Hero";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { people } from "@/misc/people";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <WorldMapDemo />
      <div className="absolute top-2/3 transform -translate-y-1/2 z-10 text-center">
        <Link href="/signin">
          <RainbowButton>Log in</RainbowButton>
        </Link>
        <div className="flex flex-row items-center justify-center mt-12 w-full">
          <AnimatedTooltip items={people} />
        </div>
      </div>
    </div>
  );
}
