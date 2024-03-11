import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { asyncHandler } from "../utils/asnycHandler.util.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { uploadOnCloudinary,deleteFromCloudinary } from "../utils/cloudinary.util.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const company = await Company.findById(userId);
    const accessToken = company.generateAccessToken();
    const refreshToken = company.generateRefreshToken();
    company.refreshToken = refreshToken;
    company.accessToken = accessToken;
    company.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

const registerCompany = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const isCompanyAvailable = await Company.findOne({ email });
  if (isCompanyAvailable) {
    throw new ApiError(400, "Company already exists");
  }
  const company = await Company.create({
    name,
    email,
    password,
  });

  const createdCompany = await Company.findById(company._id).select(
    "-password"
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, createdCompany, "Company registered successfully!")
    );
});

const loginCompany = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  const company = await Company.findOne({
    email: email,
  });
  if (!company) {
    throw new ApiError(401, "Invalid email");
  }
  const isPasswordValid = await company.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    company._id
  );
  company.accessToken = accessToken;
  company.refreshToken = refreshToken;
  const loggedInCompany = await Company.findById(company._id).select(
    "-password -refreshToken "
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInCompany, "Logged in Successfully"));
});

const logOutCompany = asyncHandler(async(req,res)=>{
  await Company.findByIdAndUpdate(
    req.user?._id,
    {
      $unset:{refreshToken:1}
    },
    {
      new:true
    }
  )

  return res
  .status(200)
  .clearCookie("refreshToken")
  .clearCookie("accessToken")
  .json(
    new ApiResponse(200,{},"User Logged Out")
  )
})

const updateCompanyDetails = asyncHandler(async(req,res)=>{
  const {name,email,description,address,website} = req.body

  const isCompanyAvailable = await Company.findOne({
    $or:[{name},{email}]
  })
  if(!isCompanyAvailable){
    throw new ApiError(400,"Name and email already exist fill another one")
  }

  const company = await Company.findByIdAndUpdate(
    req.company?._id,  
    {
      $set:{
        name,
        email,
        description,
        address,
        website
      }
    },
    {
      new:true
    }
  ).select("-password -refreshToken")

  return res 
  .status(200)
  .json(
    new ApiResponse(200,company, "Company Details Updated Successfully!")
  )
})

const getCompanyDetails = asyncHandler(async(req,res)=>{
  return res
  .status(200)
  .json(
    new ApiResponse(200,req.company,"Company details fetched successfully")
  )
})

const updateCompanyAvatar = asyncHandler(async(req,res)=>{
  const avatarLocalPath = req.file?.path 
  const folder = "companyAvatar"
  if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is missing")
  }
  const oldAvatar = req.company?.avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath,req.company._id,folder)
  if(!avatar.url){
    throw new ApiError(401,"Error while uploading on cloudinary")
  }
  const company = await Company.findByIdAndUpdate(
    req.company._id,
    {
      $set:{
        avatar:avatar.url
      }
    },
    {
      new:true
    }
  )
  if(oldAvatar){
    await deleteFromCloudinary(oldAvatar,folder)
  }

  return res
  .status(200)
  .json(
    new ApiResponse(200,company,"Company avatar updated successfully")
  )

})

const getApplyStudentList = asyncHandler(async(req,res)=>{
  const jobProfile = req.params.jobProfile;
  const studentList =await Job.aggregate(
    [
      {
        $match: {
          designation:jobProfile
        }
      },
      {
        $lookup: {
          from:"users",
          localField:"students",
          foreignField:"_id",
          as:"studentsList" 
        }
      },
      {
        $unwind: "$studentsList"
      },
      {
        $project: {
          fullName: "$studentsList.fullName",
          mobile:"$studentsList.mobile",
          email:"$studentsList.email",
          resume:"$studentsList.resume"
        }
      }
    ]
  )

  return res
  .status(200)
  .json(
    new ApiResponse(200,studentList,"Applied students details fetched successfully")
  )

})


export { 
  registerCompany,
  loginCompany,
  logOutCompany,
  updateCompanyDetails,
  getCompanyDetails,
  updateCompanyAvatar,
  getApplyStudentList,

 };