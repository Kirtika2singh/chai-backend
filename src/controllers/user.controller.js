import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiErrors } from "../utils/ApiError.js";

import { User } from "../models/user.model.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    //get user details from  frontend / here from postman
    // validation-not empty
    // check if user already exists : check using username and email
    // check for images
    // check for avatar
    // upload them to cloudinary , check if avatar is succesfully uploaded
    // create user object - create entry in data base
    // remove password and refresh token field from response
    // check for user creation
    // return response or error

    const {fullName, username, email, password} = req.body;

    if([fullName, username, email, password].some((field)=>field?.trim() === "")){
        return new ApiErrors(400, "All fields are mandatory");
    }

    const existedUser = User.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(existedUser){
        return new ApiErrors(409, "User already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiErrors(400, "Avatar is mandatory");
    }

    const avatar = await uploadOnCloudinary(coverImageLocalPath);

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiErrors(500, "Error in uploading avatar");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiErrors(500, "Something Went Wrong while creating user");
    }

    return res.status(201).json(
        new ApiResponse(200, "User Created Successfully" , createdUser)
    );
})

export {registerUser}