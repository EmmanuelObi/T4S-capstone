"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BriefcaseIcon, LogInIcon } from "@/app/page";
import { ACCESS_TOKEN } from "@/constant";

const BaseHeader = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return (
    <header className="z-10 text-black py-6 px-4 md:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <BriefcaseIcon className="h-6 w-6" />
          <span className="text-lg font-bold">Job City Inc.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/" className="text-sm hover:underline" prefetch={false}>
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm hover:underline"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="/jobs"
            className="text-sm hover:underline"
            prefetch={false}
          >
            Jobs
          </Link>
        </nav>
        <div className="flex gap-2">
          {token ? (
            <Button variant="default">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-white"
                prefetch={false}
              >
                <LogInIcon className="h-5 w-5" />
                <span>Go To Dashboard</span>
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="outline">
                <Link
                  href="/signup"
                  className="flex items-center gap-2 text-black"
                  prefetch={false}
                >
                  <span>Register</span>
                </Link>
              </Button>
              <Button variant="default">
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-white"
                  prefetch={false}
                >
                  <LogInIcon className="h-5 w-5" />
                  <span>Login</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default BaseHeader;
