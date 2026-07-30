import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  getMyApplications,
} from "../services/candidateService";

import { useAuth } from "./AuthContext";

const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {

  const [applications,setApplications] = useState([]);
  const [loading,setLoading] = useState(false);
  const { token, user } = useAuth();

  const fetchApplications = useCallback(async()=>{
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

  });

  useEffect(() => {

    if (!token) return;

    if (user?.role !== "candidate") return;

    fetchApplications();

  }, [token, user]);

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