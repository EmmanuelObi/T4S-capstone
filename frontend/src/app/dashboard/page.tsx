"use client";
import EmployerDashboard from "@/components/EmployerDashboard";
import JobSeekerDashboard from "@/components/JobSeekerDashboard";
import Protected from "@/components/Protected";
import useProfile from "@/hooks/useProfile";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState<any>({});
  const { getProfileDetails } = useProfile();

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfileDetails();
      setData(profileData);
    };

    fetchProfile();
  }, []);
  return (
    <Protected>
      {data?.user?.role === "employer" ? (
        <EmployerDashboard userRole={data?.user?.role} />
      ) : (
        <JobSeekerDashboard userRole={data?.user?.role} />
      )}
    </Protected>
  );
};

export default Page;
