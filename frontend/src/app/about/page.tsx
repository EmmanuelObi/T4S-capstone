import React from "react";
import Link from "next/link";
import BaseHeader from "@/components/BaseHeader";

const page = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <BaseHeader />
      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container space-y-16 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline Your Job Search
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Job City Inc. offers a seamless experience, from easy
                  application submission to personalized job recommendations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-12 sm:grid-cols-2 md:gap-16 lg:grid-cols-3">
              <div className="grid gap-2">
                <h3 className="text-lg font-bold">Easy Application Process</h3>
                <p className="text-sm text-muted-foreground">
                  Our user-friendly interface makes it simple to apply for jobs
                  with just a few clicks.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-bold">
                  Personalized Job Recommendations
                </h3>
                <p className="text-sm text-muted-foreground">
                  Our advanced algorithms match your skills and experience to
                  the best job opportunities.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-bold">Application Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Stay informed on the status of your job applications with our
                  comprehensive tracking system.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-4 sm:flex-row py-8 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Job City Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default page;
