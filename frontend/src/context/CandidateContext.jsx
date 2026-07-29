import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getMyApplications,
} from "../services/candidateService";

const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {

  const [applications,setApplications] = useState([]);
  const [loading,setLoading] = useState(false);

  const fetchApplications = async()=>{
    try{

      setLoading(true);
      
      const response = await getMyApplications();

      if(response.success){
        setApplications(response.data);
      }
  } catch(error){

      console.log(
      "Candidate applications error:",
      error
    );

  }
 
    finally{
      setLoading(false);
  }

  };

  useEffect(()=>{

    const token =
    localStorage.getItem(
    "token"
    );

    const user =
    JSON.parse(
    localStorage.getItem("user")
    );

    if(token && user?.role === "candidate"){

      fetchApplications();
    }

  },[]);

  return(


  <CandidateContext.Provider

    value={{
    applications,
    loading,
    fetchApplications,
    }}

  >

    {children}

  </CandidateContext.Provider>

  );
};

export const useCandidate =
()=> useContext(
CandidateContext
);