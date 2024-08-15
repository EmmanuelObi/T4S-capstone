import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteAssets } from "@/assets";
import { JSX, SVGProps } from "react";
import BaseHeader from "@/components/BaseHeader";

export default function Home() {
  return (
    <div className="flex flex-col justify-between min-h-dvh relative">
      <Image
        src={siteAssets.landingBg}
        alt="Hero"
        className="absolute w-full h-dvh top-0 left-0 object-cover"
      />
      <BaseHeader />
      <div className="w-full max-w-7xl min-h-[70dvh] z-10 text-black mx-auto flex flex-col justify-start items-start">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Say No To Stress, <br /> Find That Dream Job <br /> Today.
        </h1>
        <p className="text-2xl text-primary-foreground mt-4">
          Explore a wide range of job opportunities and take <br /> the next
          step in your career.
        </p>
        <Button variant="default" className="mt-6">
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center rounded-md bg-primary-foreground px-4 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Apply Now
          </Link>
        </Button>
      </div>
    </div>
  );
}
