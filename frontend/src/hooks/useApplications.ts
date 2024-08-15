import api from "@/api";

const useApplications = () => {
  const applyForJob = async (body: any) => {
    try {
      const res = await api
        .post("/api/jobs/seeker/apply/", body)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err;
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getSeekerApplications = async () => {
    try {
      const res = await api
        .get("/api/seeker/applications/")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err;
        });

      return res;
    } catch (err) {
      console.log(err);
    }
  };
  const getEmployerApplications = async () => {
    try {
      const res = await api
        .get("/api/employer/applications/")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err;
        });

      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    applyForJob,
    getSeekerApplications,
    getEmployerApplications,
  };
};

export default useApplications;
