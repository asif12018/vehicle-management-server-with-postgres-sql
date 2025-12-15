import { Request, Response } from "express";
import { userService } from "./user.service";

//get all user

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "users retrieve successfully",
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
      message: "user retrieve successfully",
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
    const result = await userService.updateUser(
      req.body,
      req.params.userId as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "user updated successfully",
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

//delete a user

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUser(req.params.userId as string);
    if(result.rowCount === 0){
      res.status(404).json({
        success: false,
        message: 'user not found',
      })
    }
    res.status(200).json({
      success: true,
      message:'user deleted successfully',
      data: null
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
