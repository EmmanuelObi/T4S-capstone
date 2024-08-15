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
import CreateJobModal from "@/components/CreateJobModal";
import DeleteModal from "@/components/DeleteModal";
import useJobs from "@/hooks/useJobs";
import useProfile from "@/hooks/useProfile";
import Protected from "@/components/Protected";
import EditJobModal from "@/components/EditJobModal";
import { truncateString } from "@/lib/utils";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeId, setActiveId] = useState<any>(0);
  const [jobToEdit, setJobToEdit] = useState<any>({});
  const [jobs, setJobs] = useState<any>([]);
  const { getJobsForEmployers, loading, error } = useJobs();
  const [data, setData] = useState<any>({});
  const { getProfileDetails } = useProfile();
  const handleOpen = () => {
    if (data?.company === null) {
      alert("Please complete your profile");
      return;
    }
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleDeleteOpen = (id: any) => {
    setActiveId(() => id);
    setIsDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
  };

  const handleEditOpen = (info: any) => {
    setJobToEdit(() => info);
    setIsEditOpen(true);
  };
  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfileDetails();
      const jobdata = await getJobsForEmployers();
      setData(profileData);
      setJobs(() => jobdata);
    };

    fetchProfile();
  }, []);
  return (
    <Protected>
      <div className="flex min-h-screen w-full flex-col">
        <Header userRole={data?.user?.role} />

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex justify-between items-center">
            <CardTitle>Postings ({jobs?.length ?? 0})</CardTitle>
            <Button onClick={handleOpen}>+ Add Job</Button>
          </div>
          {jobs?.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {jobs.map((job: any) => (
                <Card
                  key={job.id}
                  className="sm:col-span-1 flex flex-col justify-between items-start"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex justify-between items-center">
                      {job.title}
                      <span className="w-3 h-3 bg-green-600 text-sm text-center rounded-full text-green-600 flex justify-center items-center">
                        a
                      </span>
                    </CardTitle>
                    <span className="font-bold text-sm">
                      @{job.company} - {job.location}
                    </span>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {truncateString(job.description, 150)}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="w-full flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button onClick={() => handleEditOpen(job)}>Edit</Button>
                      <Button onClick={() => handleDeleteOpen(job.id)}>
                        Delete
                      </Button>
                    </div>
                    <span className="text-sm font-bold">{job.salary}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </main>
        <CreateJobModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleClose={handleClose}
        />
        <DeleteModal
          id={activeId}
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          handleClose={handleDeleteClose}
        />
        <EditJobModal
          data={jobToEdit}
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          handleClose={handleEditClose}
        />
      </div>
    </Protected>
  );
};

export default Page;

export function EmptyState({
  major,
  minor,
}: {
  major?: string;
  minor?: string;
}) {
  return (
    <div className=" w-full flex flex-col items-center justify-center gap-4 p-8 md:p-12">
      <div className="bg-muted rounded-full p-4 flex items-center justify-center">
        <FileWarningIcon className="w-12 h-12 text-muted-foreground" />
      </div>
      <div className="space-y-2 text-center">
        <h3 className="text-2xl font-semibold">
          {major ? major : "No items found"}
        </h3>
        <p className="text-muted-foreground">
          {minor
            ? minor
            : "It looks like there are no items to display. Try adding some new items."}
        </p>
      </div>
    </div>
  );
}

export function FileWarningIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
