import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiErrors} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    //get user details from  frontend / here from postman
    // validation-not empty
    // check if user already exists : check using username and email
    // check for images
    // check for avatar
    // upload them to cloudinary , check if avatar is succesfully uploaded
    // create user object - create entry in database
    // remove password and refresh token field from response
    // check for user creation
    // return response or error

    const {fullName, username, email, password} = req.body;

    // if(fullName === "" || username === "" || email === "" || password === ""){
    //     throw new ApiErrors(400, "All fields are required")
    // }

    if([ fullName, username, email, password].some((field) =>
         field?.trim() === ""))
    {
        throw new ApiErrors(400, "All fields are required")
    }
    
    const existedUser = User.findOne({$or:
        [{username},
            {email}
        ]})

    if(existedUser){
        throw new ApiErrors(409, "User with email or username already exists")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath ){
        throw new ApiErrors(400, "Avatar image is required")
    }
    
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiErrors(500, "Image upload failed")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createUser = await User.
    findById(user._id).
    select("-password -refreshToken"
    )
    
    if(!createUser){
        throw new ApiErrors(500, "something went wrong , User creation failed")
    }

    return res.status(201).json(
        new ApiResponse(200, "User created successfully", createUser)
    )
    
})

export { registerUser}