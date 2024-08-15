"use client";

import Header from "@/components/Header";
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
import Protected from "@/components/Protected";
import useProfile from "@/hooks/useProfile";
import useJobs from "@/hooks/useJobs";
import { EmptyState } from "../postings/page";
import useApplications from "@/hooks/useApplications";
import { truncateString } from "@/lib/utils";

const Page = () => {
  const [data, setData] = useState<any>({});
  const [jobs, setJobs] = useState<any>([]);
  const { getProfileDetails } = useProfile();
  const { getJobsForSeekers } = useJobs();
  const [jobsAppliedTo, setJobsAppliedTo] = useState<any>([]);
  const { getSeekerApplications } = useApplications();

  const checkApplied = (id: any) => {
    for (let i = 0; i < jobsAppliedTo?.length; i++) {
      if (jobsAppliedTo[i].job === Number(id)) {
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfileDetails();
      const jobdata = await getJobsForSeekers();
      const appliedTo = await getSeekerApplications();
      setData(profileData);
      setJobs(() => jobdata);
      setJobsAppliedTo(appliedTo);
    };

    fetchProfile();
  }, []);
  return (
    <Protected>
      <div className="flex min-h-screen w-full flex-col">
        <Header userRole={data?.user?.role} />

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
                    {/* <span className="text-xs">10 Applicants</span> */}
                    {checkApplied(job.id) && (
                      <Badge className="text-xs" variant="outline">
                        Applied
                      </Badge>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState minor="New Jobs incoming, don't fret :)" />
          )}
        </main>
      </div>
    </Protected>
  );
};

export default Page;
