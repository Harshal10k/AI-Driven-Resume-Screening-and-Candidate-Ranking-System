import axios from "axios";

const RESUME_API =
  "http://localhost:5000/api/resumes";

// const CANDIDATE_API =
//   "http://localhost:5000/api/candidate";

const getAuthConfig = () => {

  const token =
    localStorage.getItem("token");

  return {

    headers: {
      Authorization:
        `Bearer ${token}`,
    },

  };

};

// ==============================
// My Applications
// ==============================

export const getMyApplications =
async () => {

  const response =
    await axios.get(
      `${RESUME_API}/candidate/applications`,
      getAuthConfig()
    );

  return response.data;
};




// ==============================
// Future API
// Candidate Browse Jobs
// ==============================


// export const getAvailableJobs =
// async () => {


//   const response =
//     await axios.get(

//       `${CANDIDATE_API}/jobs`,

//       getAuthConfig()

//     );


//   return response.data;


// };

// ==============================
// Future API
// Candidate Apply Job
// ==============================


// export const applyJob =
// async (jobId) => {


//   const response =
//     await axios.post(

//       `${CANDIDATE_API}/apply/${jobId}`,

//       {},

//       getAuthConfig()

//     );


//   return response.data;


// };