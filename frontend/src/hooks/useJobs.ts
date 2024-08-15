import api from "@/api";
import { useState } from "react";

const useJobs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getJobsForSeekers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/jobs/seeker/");
      setLoading(false);
      return res.data;
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getJobsForEmployers = async () => {
    setLoading(true);

    try {
      const res = await api.get("/api/jobs/employer/");
      setLoading(false);
      return res.data;
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (body: any) => {
    setLoading(true);
    api
      .post("/api/jobs/create/", body)
      .then((res) => {
        setLoading(false);
        return res;
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong");
      });
  };
  const updateJob = async (body: any, id: any) => {
    setLoading(true);
    api
      .put(`/api/jobs/employer/${id}/update/`, body)
      .then((res) => {
        setLoading(false);
        return res;
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong");
      });
  };

  const deleteJob = async (id: any) => {
    setLoading(true);

    try {
      const res = await api.delete(`/api/jobs/delete/${id}/`);
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      setError("Something went wrong");
    }
  };
  return {
    loading,
    error,
    getJobsForSeekers,
    getJobsForEmployers,
    createJob,
    deleteJob,
    updateJob,
  };
};

export default useJobs;
