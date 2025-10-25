"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const workflows = [
  {
    name: "Visual Effects",
    preview: {
      title: "Campaign Previz",
      description:
        "Mock up products, signage, and deliverables for entire campaigns.",
      link: "/view/visual-effects",
      images: [
        {
          title: "Man walking on the street",
          src: "/assets/images/demo1.jpg",
          position: { top: "37%", left: "5%" },
        },
        {
          title: "Smonderal city",
          subtitle: "Nano banana",
          src: "/assets/images/demo2.jpg",
          position: { top: "8%", right: "10%" },
        },
        {
          title: "Humanioid robot",
          subtitle: "Nano banana",
          src: "/assets/images/demo3.jpg",
          position: { top: "38%", right: "10%" },
        },
        {
          title: "Supreme car shot",
          subtitle: "Nano banana",
          src: "/assets/images/demo1.jpg",
          position: { top: "68%", right: "10%" },
        },
      ],
    },
  },
  {
    name: "Fashion",
    preview: {
      title: "Runway Previz",
      description:
        "Explore lighting, wardrobe, and set design concepts for fashion campaigns.",
      link: "/view/fashion",
      images: [
        {
          title: "Street couture look",
          src: "/assets/images/demo1.jpg",
          position: { top: "40%", left: "6%" },
        },
        {
          title: "Editorial shoot",
          subtitle: "Studio 84",
          src: "/assets/images/demo2.jpg",
          position: { top: "10%", right: "12%" },
        },
        {
          title: "Backstage moments",
          subtitle: "Runway day",
          src: "/assets/images/demo3.jpg",
          position: { top: "65%", right: "8%" },
        },
      ],
    },
  },
  {
    name: "Advertising",
    preview: {
      title: "Product Campaign",
      description:
        "Visualize motion-driven ads before production and test layouts.",
      link: "/view/advertising",
      images: [
        {
          title: "Outdoor billboard",
          src: "/assets/images/demo1.jpg",
          position: { top: "35%", left: "5%" },
        },
        {
          title: "Studio shot",
          subtitle: "Brand X",
          src: "/assets/images/demo2.jpg",
          position: { top: "10%", right: "10%" },
        },
      ],
    },
  },
  {
    name: "Photography",
    preview: {
      title: "Editorial Previz",
      description:
        "Plan compositions, lighting moods, and editorial layouts ahead of shoots.",
      link: "/view/photography",
      images: [
        {
          title: "Portrait test light",
          src: "/assets/images/demo1.jpg",
          position: { top: "38%", left: "5%" },
        },
        {
          title: "City landscape",
          subtitle: "Blue dusk",
          src: "/assets/images/demo2.jpg",
          position: { top: "8%", right: "10%" },
        },
      ],
    },
  },
  {
    name: "Concepting",
    preview: {
      title: "Concept Boards",
      description:
        "Gather visual ideas, styles, and early explorations in one place.",
      link: "/view/concepting",
      images: [
        {
          title: "Environment mock",
          src: "/assets/images/demo1.jpg",
          position: { top: "36%", left: "5%" },
        },
        {
          title: "Character idea",
          subtitle: "Robot alpha",
          src: "/assets/images/demo2.jpg",
          position: { top: "10%", right: "10%" },
        },
        {
          title: "Scene color test",
          subtitle: "Nano banana",
          src: "/assets/images/demo3.jpg",
          position: { top: "65%", right: "10%" },
        },
      ],
    },
  },
  {
    name: "Branding",
    preview: {
      title: "Logo Exploration",
      description:
        "Iterate fast on logo marks, palettes, and brand identity mockups.",
      link: "/view/branding",
      images: [
        {
          title: "Logo mockup",
          src: "/assets/images/demo1.jpg",
          position: { top: "35%", left: "5%" },
        },
        {
          title: "Packaging idea",
          subtitle: "Brand studio",
          src: "/assets/images/demo2.jpg",
          position: { top: "10%", right: "10%" },
        },
      ],
    },
  },
  {
    name: "Motion",
    preview: {
      title: "Motion Design",
      description:
        "Prototype transitions, camera moves, and animated typography.",
      link: "/view/motion",
      images: [
        {
          title: "Scene timing test",
          src: "/assets/images/demo1.jpg",
          position: { top: "38%", left: "5%" },
        },
        {
          title: "Frame key shot",
          subtitle: "Render 02",
          src: "/assets/images/demo2.jpg",
          position: { top: "8%", right: "10%" },
        },
      ],
    },
  },
  {
    name: "Architecture",
    preview: {
      title: "Building Visualization",
      description:
        "Preview structures and lighting concepts before full renders.",
      link: "/view/architecture",
      images: [
        {
          title: "Exterior model",
          src: "/assets/images/demo1.jpg",
          position: { top: "38%", left: "5%" },
        },
        {
          title: "Interior layout",
          subtitle: "Concept B",
          src: "/assets/images/demo2.jpg",
          position: { top: "8%", right: "10%" },
        },
        {
          title: "Material test",
          subtitle: "Nano banana",
          src: "/assets/images/demo3.jpg",
          position: { top: "68%", right: "10%" },
        },
      ],
    },
  },
];

const Workflows = () => {
  const [selected, setSelected] = useState(workflows[0]);
  const listRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());

    listRefs.current.forEach((el, index) => {
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top center+=100",
        end: "bottom center-=100",
        onEnter: () => setSelected(workflows[index]),
        onEnterBack: () => setSelected(workflows[index]),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
  return (
    <section className="relative w-full">
      <div className="pb-[199px] pt-[128px] flex flex-row items-start gap-[68px]">
        {/* === LEFT SIDEBAR === */}
        <div className="flex flex-col items-start gap-10">
          <div className="flex flex-col items-start gap-6 mb-10">
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-3xl font-medium">
                Generative workflows that scale.
              </h3>
              <p className="text-[#999] text-[20px] leading-[27.4px] text-left max-w-[609px] w-full">
                Teams from <span className="text-white">Pentagram</span> to{" "}
                <span className="text-white">Liongates</span> use FLORA to
                explore possibilities and amplify their creative output.
              </p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Button>
                <span className="text-sm font-medium">
                  Get started for free
                </span>
              </Button>
              <Link
                href="/community"
                className="hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              >
                See all workflows
              </Link>
            </div>
          </div>

          {/* === WORKFLOW LIST === */}
          <ul className="flex flex-col items-start gap-16">
            {workflows.map((workflow, i) => (
              <li
                key={workflow.name}
                ref={(el) => {
                  listRefs.current[i] = el;
                }}
                className={`cursor-pointer text-7xl font-semibold transition-colors duration-300 ${
                  selected.name === workflow.name ? "text-white" : "text-[#999]"
                }`}
              >
                {workflow.name}
              </li>
            ))}
          </ul>
        </div>

        {/* === RIGHT PREVIEW === */}
        <div className="max-w-[676px] w-full flex flex-col gap-4 sticky top-[15%]">
          <div className="relative max-w-[676px] w-full h-[512px] rounded-3xl border border-white/10 overflow-hidden">
            {/* background grid */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[#000] bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* dynamic images */}
            {selected.preview.images.map((img, i) => (
              <div
                key={i}
                className="flex flex-col items-start gap-1 absolute"
                style={img.position}
              >
                {img.subtitle ? (
                  <p className="inline-flex w-full flex-row justify-between text-[8px] leading-[10.96px] font-medium text-[#b4b4b4]">
                    {img.title}
                    <span>{img.subtitle}</span>
                  </p>
                ) : (
                  <span className="text-[8px] leading-[10.96px] font-medium text-[#b4b4b4]">
                    {img.title}
                  </span>
                )}
                <Image
                  src={img.src}
                  width={280}
                  height={180}
                  loading="lazy"
                  className="w-[192px] h-[108px] object-cover rounded-2xl border-white/10 border"
                  alt={img.title}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-1">
            <h2 className="text-[18px] font-medium text-[#eee]">
              {selected.preview.title}
            </h2>
            <p className="text-base font-medium text-[#b4b4b4]">
              {selected.preview.description}
            </p>
          </div>

          <Link
            href={selected.preview.link}
            className="bg-[#1a1a1a] rounded-lg border border-white/10 px-4 py-1 w-fit hover:bg-white hover:text-black transition-colors"
          >
            <span className="text-sm font-normal">Explore this flow</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Workflows;
