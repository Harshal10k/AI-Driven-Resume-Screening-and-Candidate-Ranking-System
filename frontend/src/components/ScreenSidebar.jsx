import { useJobs } from "../context/JobsContext";

const ScreenSidebar = () => {

  const {
    jobs,
    selectedJob,
    setSelectedJob,
  } = useJobs();


  return (

    <aside className="w-80 h-full bg-white border-r border-slate-200 p-5">

      <h3 className="text-xs uppercase text-slate-500 mb-4">
        Active Job Posts
      </h3>


      <button

        onClick={() =>
          setSelectedJob(null)
        }

        className={`w-full mb-4 py-3 rounded-lg transition ${
          selectedJob === null
            ? "bg-indigo-600 text-white"
            : "border"
        }`}
      >

        All Jobs

      </button>


      <div className="space-y-4">


        {
          jobs.length === 0 && (

            <div className="text-center py-10 text-slate-500">

              No jobs available.

            </div>

          )
        }


        {
          jobs.map((job)=>(


            <div

              key={job._id}

              onClick={() =>
                setSelectedJob(job)
              }


              className={`rounded-2xl border p-4 cursor-pointer transition ${
                selectedJob?._id === job._id

                ? "border-indigo-600 bg-indigo-50"

                : "hover:border-indigo-500"

              }`}

            >


              <h2 className="font-bold text-lg">

                {job.title}

              </h2>


              <p className="text-sm text-slate-500 mt-1">

                {job.company}

              </p>


              <div className="mt-4">


                <p className="text-xs text-slate-500">
                  Required Skills
                </p>


                <div className="flex flex-wrap gap-2 mt-2">


                {
                  job.required_skills?.map(
                    (skill,index)=>(

                    <span

                      key={index}

                      className="px-3 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full"

                    >

                      {skill}

                    </span>

                    )
                  )
                }


                </div>


              </div>



              <div className="mt-4 text-sm">


                Experience:

                <span className="font-semibold">

                  {" "}
                  {job.experience_years}
                  {" "}
                  Years

                </span>


              </div>



              <span

                className={`inline-block mt-3 px-3 py-1 rounded-full text-xs ${
                  job.status==="open"

                  ?"bg-green-100 text-green-700"

                  :"bg-red-100 text-red-700"

                }`}

              >

                {job.status.toUpperCase()}

              </span>



            </div>



          ))

        }


      </div>


    </aside>

  );

};


export default ScreenSidebar;