"use client";
import { useQuery } from "convex/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import {
  Box,
  CircleQuestionMark,
  Hash,
  LayoutTemplate,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import CreateProject from "@/components/project";

type TabProps = {
  label: string;
  href: string;
  icon?: React.ReactNode;
}[];

const Navbar = () => {
  const params = useSearchParams();
  const projectId = params.get("project");
  const pathname = usePathname();
  const hasCanvas = pathname.includes("canvas");
  const hasGuide = pathname.includes("style-guide");
  const projects = useQuery(
    api.projects.getProjects,
    projectId ? { projectId: projectId as Id<"projects"> } : "skip"
  );
  console.log("project-id-navbar", projectId);

  // href: `/dashboard/${me.name}/canvas?project=${projectId}`,
  const tabs: TabProps = [
    {
      label: "Canvas",
      href: `/dashboard/luongminhhuy/canvas?project=${projectId}`,
      icon: <Hash className="size-4" />,
    },
    {
      label: "Style Guide",
      href: `/dashboard/luongminhhuy/style-guide?project=${projectId}`,
      icon: <LayoutTemplate className="size-4" />,
    },
    {
      label: "3D Model",
      href: `/dashboard/luongminhhuy/3d-model?project=${projectId}`,
      icon: <Box className="size-4" />,
    },
  ];

  const me = useAppSelector((state) => state.profile);
  // const user = useAppSelector((state) => state.profile.user);
  // const dispatch = useAppDispatch();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 p-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4">
        {/* /dashboard/${me.name} */}
        <Link
          href={`/dashboard/${me?.name}`}
          className="size-8 rounded-full border-2 border-white bg-black flex items-center justify-center"
        >
          <div className="size-4 rounded-full bg-white"></div>
        </Link>
        {!hasCanvas ||
          (!hasGuide && (
            <div className="lg:inline-block hidden rounded-full text-primary/60 border border-white/[0.12] backdrop-blur-xl bg-white/[0.08] px-4 py-2 text-sm saturate-150">
              Project / {projects?.name}
            </div>
          ))}
      </div>
      {/* Ở ngoài /dashboard/luongminhhuy thì disable cung dc  */}
      <div className="lg:flex hidden items-center justify-center gap-2">
        <div className="flex items-center gap-2 backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] rounded-full p-2 saturate-150">
          {tabs.map((t) => (
            <Link
              href={t.href}
              className={[
                "group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                `${pathname}?project=${projectId}` === t.href
                  ? "bg-white/[0.2] text-white border border-white/[0.16] backdrop-blur-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] border border-transparent",
              ].join(" ")}
              key={t.href}
            >
              <span
                className={
                  `${pathname}?project=${projectId}` === t.href
                    ? "opacity-100"
                    : "opacity-70 group-hover:opacity-90"
                }
              >
                {t.icon}
              </span>
              <span>{t.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 justify-end">
        <span className="text-sm text-white/50">
          {/* TODO:  {creditBalance) credits*/}
          TODO: credits
        </span>
        <Button
          variant="secondary"
          className="rounded-full size-12 flex items-center justify-center backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] saturate-150 hover:bg-white/[0.12]"
        >
          <CircleQuestionMark className="size-5 text-white" />
        </Button>
        <Avatar className="size-12 ml-2">
          <AvatarImage src={me?.image || ""} />
          <AvatarImage />
          <AvatarFallback>
            <User className="size-5 text-black" />
          </AvatarFallback>
        </Avatar>
        {/* {hasCanvas && <AutoSave />} */}
        {!hasCanvas && !hasGuide && <CreateProject />}
      </div>
    </div>
  );
};

export default Navbar;
