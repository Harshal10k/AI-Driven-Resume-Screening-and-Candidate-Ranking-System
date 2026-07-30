import Job from "../models/Job.js";
import Resume from "../models/Resume.js";


// ============================
// GET OPEN JOBS
// ============================

export const getAvailableJobs =
async(req,res)=>{

try{

const jobs =
await Job.find({
status:"open"
})
.sort({
createdAt:-1
});


res.json({

success:true,
data:jobs

});


}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};




// ============================
// APPLY JOB
// ============================

export const applyJob =
async(req,res)=>{

try{


const job =
await Job.findById(
req.params.jobId
);


if(!job){

return res.status(404).json({

success:false,
message:"Job not found"

});

}


const alreadyApplied =
await Resume.findOne({

job_id:req.params.jobId,

candidate_id:req.user._id

});


if(alreadyApplied){

return res.status(400).json({

success:false,

message:"Already applied"

});

}



res.json({

success:true,

message:"Application submitted"

});


}catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};



// ============================
// MY APPLICATIONS
// ============================

export const getMyApplications =
async(req,res)=>{


try{


const applications =
await Resume.find({

candidate_id:req.user._id

})
.populate("job_id");


res.json({

success:true,

data:applications

});


}catch(error){


res.status(500).json({

success:false,

message:error.message

});

}


};