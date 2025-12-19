import { Request, Response } from "express";
import { userService } from "./user.service";
import { getUserEmailAndRole, isActiveBookingExist } from "../../config/helperFunction";

//get all user

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err) {}
};

// get a single user

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getSingleUser(req.params.userId as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

//update user

const updateUser = async (req: Request, res: Response) => {
  try {

    //get user data from headers
    const userData = await getUserEmailAndRole(
          req.headers.authorization as string
        );

        if(userData === null){
          return res.status(403).json({
            success:false,
            message:'forbidden access'
          })
        }

        // check if the updator and user is same or not

        if(userData.user.rows[0].role === 'customer' && userData.user.rows[0].id != req.params.userId){
            return res.status(403).json({
              success:false,
              message:"You don't have permission to perform this action"
            })
        }

      //filtering user update data role
      if(userData.user.rows[0].role === 'customer' && req.body?.role){
          return res.status(400).json({
            success: false,
            message:'User cant update it own role'
          })
      }
    const result = await userService.updateUser(
      req.body,
      req.params.userId as string
    );
    
    

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const {id, name, email, phone, role} = result.rows[0];

    const user = {
      id, name, email, phone, role
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

//delete a user

const deleteUser = async (req: Request, res: Response) => {
  try {
    //is active booking exist?
    const activeBooking = await isActiveBookingExist(req.params.userId as string);
    if(activeBooking === true){
      return res.status(400).json({
        success:false,
        message:'Cant delete the user. User have an active booking!!!'
      })
    }
    const result = await userService.deleteUser(req.params.userId as string);
    if(result.rowCount === 0){
      res.status(404).json({
        success: false,
        message: 'user not found',
      })
    }
    res.status(200).json({
      success: true,
      message:'User deleted successfully'
    })
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: err.message,
      details: err,
    });
  }
};

export const userController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
