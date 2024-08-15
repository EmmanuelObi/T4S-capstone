"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "./Header";
import JobSeekerBreads from "./JobSeekerBreads";
import useJobs from "@/hooks/useJobs";
import useApplications from "@/hooks/useApplications";
import { v4 as uuidv4 } from "uuid";
import EmptyState from "./EmptyState";

const JobSeekerDashboard = ({ userRole }: { userRole: string }) => {
  const [jobs, setJobs] = useState<any>([]);
  const [jobsAppliedTo, setJobsAppliedTo] = useState<any>([]);
  const { getJobsForSeekers } = useJobs();
  const { getSeekerApplications } = useApplications();

  const getDate = (date: any) => {
    return new Date(date).toDateString();
  };

  const getJob = (id: any) => {
    const job = jobs.find((job: any) => job.id === id);

    return job;
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const jobdata = await getJobsForSeekers();
      const appliedTo = await getSeekerApplications();
      setJobs(() => jobdata);
      setJobsAppliedTo(appliedTo);
    };

    fetchProfile();
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header userRole={userRole} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <JobSeekerBreads
          jobsApplied={jobsAppliedTo?.length}
          activeJobsListed={jobs?.length}
        />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Listings</CardTitle>
                <CardDescription>
                  Recent listings on the platform.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/dashboard/jobs">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {jobs?.length ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead className="text-right">Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job: any, id: number) => (
                      <TableRow key={id}>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{getDate(job.created_at)}</TableCell>
                        <TableCell>{job.salary}</TableCell>
                        <TableCell className="text-right">
                          {job.location}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <EmptyState
                  major="No recent jobs listed"
                  minor="New Jobs incoming, don't fret :)"
                />
              )}
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {jobsAppliedTo?.length ? (
                <>
                  {jobsAppliedTo?.map((item: any) => (
                    <div key={uuidv4()} className="flex items-center gap-4">
                      <Avatar className=" h-9 w-9 sm:flex">
                        <AvatarFallback>
                          {getJob(item.id - 1)?.company[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          {getJob(item.id - 1)?.company}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {getJob(item.id - 1)?.title}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Badge className="text-xs" variant="outline">
                          Sent
                        </Badge>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <EmptyState
                  major="No recent applications"
                  minor="Apply for jobs that fit your profile!"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default JobSeekerDashboard;
