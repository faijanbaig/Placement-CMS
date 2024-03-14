import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/asnycHandler.util.js";
import { Company } from "../models/company.model.js";
import { sendMail } from "../utils/emailSender.util.js";

const newJobProfile = asyncHandler(async (req, res) => {
  const {
    designation,
    description,
    salaryPackage,
    criteria_10,
    criteria_12,
    criteria_cllg_cgpa,
    lastDate,
  } = req.body;

  const job = await Job.create({
    designation,
    description,
    salaryPackage,
    criteria_10,
    criteria_12,
    criteria_cllg_cgpa,
    lastDate,
    company: req.company._id,
  });
  const company = await Company.findByIdAndUpdate(
    req.company._id,
    {
      $push: {
        jobs: job._id,
      },
    },
    {
      new: true,
    }
  );
  if (!job) {
    throw new ApiError(400, "Something went wrong while creating job profile");
  }
  const email = req.emails
  const subject = `Job alert`
  const content = `New Job prfile is addded for ${job.designation} in ${req.company?.name} .`
  const mailResponse = await sendMail(subject,content,email)

  return res
    .status(200)
    .json(new ApiResponse(200, job, "New Job Profile Created Successfully"));
});

const deleteJobProfile = asyncHandler(async (req, res) => {
  const jobId = req.params._id;
  if (!jobId) {
    throw new ApiError(400, "Job id is required");
  }
  const job = await Job.findByIdAndDelete(jobId);

  return res
    .status(200)
    .json(new ApiResponse(200, job, "Job Profile is deleted successfully"));
});

const getCurrentJobProfile = asyncHandler(async(req,res)=>{
  const {jobId} = req.params
  const job = await Job.findById(jobId)
  if(!job){
    throw new ApiError(404,"Job not found")
  }

  return res
  .status(200)
  .json(
    new ApiResponse(200,job,"Current job profile fetched successfully")
  )
})

const getAllJobProfile = asyncHandler(async (req, res) => {
  const jobs = await Job.find({});
  if (!jobs) {
    throw new ApiError(400, "No Jobs found at this moment");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, jobs, "Job Profiles fetched successfully"));
});

const updateJobProfile = asyncHandler(async (req, res) => {
  const {jobId}= req.params
  const {
    designation,
    description,
    experiance,
    salaryPackage,
    criteria_10,
    criteria_12,
    criteria_cllg_cgpa,
    lastDate,
  } = req.body;

  const job = await Job.findOne({
    $and: [
      { company: req.company._id },
      { _id: jobId }
    ]
  });

  const newJobProfile = await Job.findOneAndUpdate(
    job._id,
    {
      designation,
      description,
      experiance,
      salaryPackage,
      criteria_10,
      criteria_12,
      criteria_cllg_cgpa,
      lastDate,
    },
    {
      new: true,
    }
  );

  if (!newJobProfile) {
    throw new ApiError(400, "Something went wrong while updating profile");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newJobProfile, "Profile updated successfully"));
});

const applyForJob = asyncHandler(async (req, res) => {
  const student = req.user;
  const {jobId} = req.params
  const currentDate = new Date()
  const isJobAvailable = await Job.findById(jobId);
  if (!isJobAvailable) {
    throw new ApiError(400, "Job profile is not available");
  }
  const existingApplication = await Job.findOne({
    companyId: isJobAvailable.companyId,
    students: { $in: [student._id] }
  });

  if(!existingApplication){
    throw new ApiError(400,"You have already aplied in this company")
  }

  if (
    !(
      student.result_10 >= isJobAvailable.criteria_10 &&
      student.result_12 >= isJobAvailable.criteria_12 &&
      student.college_cgpa >= isJobAvailable.criteria_cllg_cgpa &&
      student.resume !==""  &&
      currentDate <= isJobAvailable.lastDate &&
      student.isPlaced === false
    )
  ) {
    throw new ApiError(400, "You are not eligible for this job profile");
  }
  const job = await Job.findByIdAndUpdate(
    isJobAvailable._id,
    {
      $push: {
        students: student._id,
      },
    },
    {
      new: true,
    }
  );
  if (!job) {
    throw new ApiError(400, "Something went wrong while appling for job");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, job, "Successfully applied for the job "));
});

export {
  newJobProfile,
  deleteJobProfile,
  getAllJobProfile,
  updateJobProfile,
  applyForJob,
  getCurrentJobProfile,

};
