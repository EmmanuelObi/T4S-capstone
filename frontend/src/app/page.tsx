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

export function BriefcaseIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

export function LogInIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}

export function XIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
