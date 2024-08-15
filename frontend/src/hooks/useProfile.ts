import api from "@/api";
import { useState } from "react";

const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getProfileDetails = async (): Promise<any> => {
    setLoading(true);
    try {
      const res = await api.get("/api/profile/");
      setLoading(false);

      return res.data;
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getProfileDetailsByEmployer = async (id: any) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/profile/${id}/`);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const updateProfileDetails = async (body: any): Promise<any> => {
    setLoading(true);
    try {
      const res = await api.patch("/api/profile/", body);
      setLoading(false);

      return res.data;
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getProfileDetails,
    updateProfileDetails,
    getProfileDetailsByEmployer,
  };
};

export default useProfile;
