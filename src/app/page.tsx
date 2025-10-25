"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Header from "@/components/shared/header";
import Hero from "@/components/shared/hero";
import Workflows from "@/components/shared/workflows";
import Subscriptions from "@/components/shared/subscriptions";
import PrismaticBurst from "@/components/animation/GradientBars";
import Image from "next/image";

export default function Home() {
  const user = useQuery(api.users.getCurrentUser);
  console.log("user - HOME", user);

  // if (user === undefined) {
  //   return <div>Loading...</div>; // đang query
  // }

  // if (!user) {
  //   return <div>Not logged in</div>;
  // }

  return (
    <div className="max-w-full w-full h-screen container relative mt-0">
      {/* Dashed Top Fade Grid */}
      {/* <PrismaticBurst
        animationType="rotate3d"
        intensity={2}
        speed={0.5}
        distort={1.0}
        paused={false}
        offset={{ x: 0, y: 0 }}
        hoverDampness={0.25}
        rayCount={24}
        mixBlendMode="lighten"
        colors={["#A19B9B ", "#F5F4F4", "#4E71DA"]}
      />
      <div
        className="absolute inset-0 h-full w-full z-0"
        style={{
          backgroundImage: `
      linear-gradient(to right, #1e1e1e 1px, transparent 1px),
      linear-gradient(to bottom, #1e1e1e 1px, transparent 1px)
    `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
      repeating-linear-gradient(
        to right,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      repeating-linear-gradient(
        to bottom,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      )
    `,
          WebkitMaskImage: `
      repeating-linear-gradient(
        to right,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      repeating-linear-gradient(
        to bottom,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      )
    `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      /> */}

      <div className="absolute inset-0 h-full w-full z-0">
        <Image
          loading="lazy"
          fill
          alt="bg-pattern"
          src="/assets/images/bg-pattern.png"
        />
      </div>

      {/* Your Content/Components */}
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-[#000] bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:16px_16px]"></div> */}
      <Header />
      <Hero />
      <div className="px-[80px]">
        <Workflows />
        <Subscriptions />
      </div>
    </div>
  );
}
