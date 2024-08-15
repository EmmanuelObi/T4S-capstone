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
import EmployerBreads from "./EmployerBreads";
import useJobs from "@/hooks/useJobs";
import { EmptyState } from "@/app/dashboard/postings/page";
import useApplications from "@/hooks/useApplications";
import { v4 as uuidv4 } from "uuid";
import useProfile from "@/hooks/useProfile";
import { Skeleton } from "@/components/ui/skeleton";

const EmployerDashboard = ({ userRole }: { userRole: string }) => {
  const [jobs, setJobs] = useState<any>([]);
  const [data, setData] = useState<any>({});
  const { getProfileDetails, getProfileDetailsByEmployer } = useProfile();
  const [applicationsReceived, setApplicationsReceived] = useState<any>([]);
  const { getJobsForEmployers } = useJobs();
  const { getEmployerApplications } = useApplications();

  const getDate = (date: any) => {
    return new Date(date).toDateString();
  };

  // const getUser = (id: any) => {
  //   const result: any = getProfileDetailsByEmployer(id);

  //   return result;
  // };
  useEffect(() => {
    const fetchProfile = async () => {
      const jobdata = await getJobsForEmployers();
      const appsReceived = await getEmployerApplications();
      const profileData = await getProfileDetails();
      setData(profileData);
      setJobs(() => jobdata);
      setApplicationsReceived(appsReceived);
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header userRole={userRole} />

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <EmployerBreads
          applicationsReceived={applicationsReceived?.length}
          jobsPosted={jobs?.length}
        />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Postings</CardTitle>
                <CardDescription>
                  Recent jobs you&apos;ve posted
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/dashboard/postings">
                  Job Center
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {jobs?.length ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead className="text-right">Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job: any, id: number) => (
                      <TableRow key={id}>
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
                  major="No recent postings"
                  minor="Go to job center to post new jobs"
                />
              )}
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {applicationsReceived?.length ? (
                <>
                  {applicationsReceived?.map((item: any) => (
                    <div key={uuidv4()} className="flex items-center gap-4">
                      <AppliedUser
                        userId={item?.user}
                        jobId={item?.job}
                        jobs={jobs}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <EmptyState
                  major="No recent applications"
                  minor="Maybe make your postings more enticing"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;

const AppliedUser = ({ userId, jobId, jobs }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { getProfileDetailsByEmployer } = useProfile();

  const getAppliedRole = () => {
    const job = jobs?.find((job: any) => job.id === jobId);

    return job;
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const result = await getProfileDetailsByEmployer(userId);
        setUser(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [userId, jobId]);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center space-y-4">
        <div className="w-full flex items-start space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[130px]" />
          </div>
        </div>
        <div className="w-full flex items-start space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[130px]" />
          </div>
        </div>
        <div className="w-full flex items-start space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[130px]" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading user data</div>;
  }
  return (
    <>
      {user && (
        <>
          <Avatar className=" h-9 w-9 sm:flex">
            <AvatarFallback>
              {user?.user?.first_name[0]}
              {user?.user?.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              {user?.user?.first_name} {user?.user?.last_name}
            </p>
            <p className="text-sm text-muted-foreground">
              {" "}
              {getAppliedRole().title}
            </p>
          </div>
          <div className="ml-auto font-medium">
            <Link href={user?.cv} target="_blank">
              <Badge className="text-xs" variant="outline">
                View CV
              </Badge>
            </Link>
          </div>
        </>
      )}
    </>
  );
};
