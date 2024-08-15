"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Protected from "@/components/Protected";
import useProfile from "@/hooks/useProfile";
import useJobs from "@/hooks/useJobs";
import { useParams } from "next/navigation";
import useApplications from "@/hooks/useApplications";
import { useToast } from "@/components/ui/use-toast";

const Details = () => {
  const { details } = useParams();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [pageData, setPageData] = useState<any>({});
  const [jobsAppliedTo, setJobsAppliedTo] = useState<any>([]);
  const { getProfileDetails } = useProfile();
  const { getJobsForSeekers } = useJobs();
  const { applyForJob, getSeekerApplications } = useApplications();
  const { toast } = useToast();

  const getNeededJobForView = (jobsa: any, id: any) => {
    for (let i = 0; i < jobsa?.length; i++) {
      if (jobsa[i].id === Number(id)) {
        return jobsa[i];
      }
    }
  };

  const checkApplied = (id: any) => {
    for (let i = 0; i < jobsAppliedTo?.length; i++) {
      if (jobsAppliedTo[i].job === Number(id)) {
        return true;
      }
    }

    return false;
  };

  const easyApply = async () => {
    if (data?.cv === "") {
      alert("Please complete your profile");
      return;
    }
    setLoading(true);

    const params = {
      user: data?.user?.id,
      job: pageData?.id,
      cv: data?.cv,
    };

    await applyForJob(params)
      .then((res) => {
        toast({
          variant: "default",
          title: "Applied Succesfully",
        });
        window.location.reload();
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Something went wrong",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfileDetails();
      const jobdata = await getJobsForSeekers();
      const appliedTo = await getSeekerApplications();
      setData(profileData);
      setPageData(() => getNeededJobForView(jobdata, details));
      setJobsAppliedTo(appliedTo);
    };

    fetchProfile();
  }, []);
  return (
    <Protected>
      <>
        <Header userRole={data?.user?.role} />
        <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
          <div className="grid gap-8">
            <div>
              <h1 className="text-3xl font-bold">{pageData?.title}</h1>
              <div className="mt-2 flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BuildingIcon className="h-5 w-5" />
                  <span>{pageData?.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPinIcon className="h-5 w-5" />
                  <span>{pageData?.location}</span>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div>
                <h2 className="text-xl font-bold">Job Description</h2>
                <p className="mt-2 text-muted-foreground">
                  {pageData?.description}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold">Qualifications</h2>
                <p className="mt-2 text-muted-foreground">
                  {pageData?.requirements}
                </p>
                {/* <ul className="mt-2 space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="h-5 w-5 text-primary" />
                    <span>
                      Bachelor&apos;s degree in Computer Science, Software
                      Engineering, or a related field
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="h-5 w-5 text-primary" />
                    <span>
                      5+ years of experience in software development, with a
                      strong background in object-oriented programming and
                      modern web technologies
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="h-5 w-5 text-primary" />
                    <span>
                      Proficient in JavaScript, React, and other front-end
                      frameworks/libraries
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="h-5 w-5 text-primary" />
                    <span>
                      Experience with RESTful APIs, database design, and
                      cloud-based infrastructure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="h-5 w-5 text-primary" />
                    <span>
                      Strong problem-solving and analytical skills, with a focus
                      on delivering high-quality, scalable, and maintainable
                      code
                    </span>
                  </li>
                </ul> */}
              </div>
            </div>
            <div className="flex justify-end">
              {loading && <Button>Loading...</Button>}

              {!loading && checkApplied(details) && (
                <Button disabled={true}>Applied</Button>
              )}

              {!loading &&
                !checkApplied(details) &&
                data?.user?.role === "job seeker" && (
                  <Button onClick={easyApply}>Easy Apply Now</Button>
                )}
            </div>
          </div>
        </div>
      </>
    </Protected>
  );
};

function BuildingIcon(
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function CircleCheckIcon(
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function MapPinIcon(
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
export default Details;
