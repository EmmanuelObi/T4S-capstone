"use client";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import BaseHeader from "@/components/BaseHeader";
import useJobs from "@/hooks/useJobs";
import { EmptyState } from "../dashboard/postings/page";
import { truncateString } from "@/lib/utils";

const Page = () => {
  const [data, setData] = useState<any>({});
  const [jobs, setJobs] = useState<any>([]);
  const { getJobsForSeekers } = useJobs();

  useEffect(() => {
    const fetchProfile = async () => {
      const jobdata = await getJobsForSeekers();
      setJobs(() => jobdata);
    };

    fetchProfile();
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <BaseHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <CardTitle>Jobs ({jobs?.length ?? 0})</CardTitle>
        {jobs?.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {jobs.map((job: any) => (
              <Card
                key={job.id}
                className="sm:col-span-1 flex flex-col justify-between"
                x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>{job.title}</CardTitle>
                  <span className="font-bold text-sm">
                    @{job.company} - {job.location}
                  </span>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {truncateString(job.description, 150)}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <Link href={`/dashboard/jobs/${job.id}`}>
                    <Button>View</Button>
                  </Link>
                  <Badge className="text-xs" variant="outline">
                    Verified
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState minor="New Jobs incoming, don't fret :)" />
        )}
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

export default Page;
