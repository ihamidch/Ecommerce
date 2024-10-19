import userModel from '../models/userModel.js'
import { encriptPassword, matchPassword } from '../utils/userHelper.js';
const registerController = async (req,res)=>
{
   try {
    const {name,email,password}= req.body;
    if(!name || !email || !password)
    {
        return res.status(400).send({success:false, message:"All fields area required"});
    }
    //checking user already exisit or not
    const  isExisit =await userModel.findOne({email});
    if(isExisit)
    {
      return res.status(400).send({success:false, message:"Email already Exist"});

    }
    //ecripted password
    const encriptpass = await encriptPassword(password)
    const newUser =await userModel.create({name,email,password:encriptpass})
    res.status(200).send({success:true, message:"User Register successfully",newUser});
    
   } catch (error) {
    console.log(`Registercontrooler Error ${error}`);
  return  res.status(400).send({success:false, message:"Error in Registercontroller",error})
    
   }
}
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if the user exists in the database
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(401).json({ success: false, message: "Email is not registered" });
    }

    // Match the provided password with the stored password
    const passwordMatch = await matchPassword(password, userExist.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect email or password" });
    }

    // Remove password from the response object
    const { password: removedPassword, ...userWithoutPassword } = userExist.toObject();

    // If login is successful, return success
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user: userWithoutPassword, // Send user without password field
    });

  } catch (error) {
    console.log(`LoginController Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Error in LoginController",
      error: error.message, // Include the error message for more clarity
    });
  }
};




export {registerController, loginController}