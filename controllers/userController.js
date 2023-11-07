const dbb = require("../config/db");

const getAllUsers = async (req, res) => {
  try {
    const [result] = await dbb.query(`SELECT * FROM userss`);
    res.status(200).json({
      success: true,
      message: "Users data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get new user",
      error,
    });
  }
};
const postUser = async (req, res) => {
  const { email, password, active } = req.body;
  const role = "student";
  try {
    const [result] = await dbb.query(
      `INSERT INTO userss(email, password, role, active) VALUES ("${email}","${password}","${role}","${active}")`
    );
    res.status(200).json({
      success: true,
      message: "Users data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get new user",
      error,
    });
  }
};
const postTeacher = async (req, res) => {
  const { email, password, active } = req.body;
  const role = "teacher";
  try {
    const [result] = await dbb.query(
      `INSERT INTO userss(email, password, role, active) VALUES ("${email}","${password}","${role}","${active}")`
    );
    res.status(200).json({
      success: true,
      message: "Users data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get new user",
      error,
    });
  }
};
const updateUserActivation = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const [result] = await dbb.query(
      `UPDATE userss SET active='1' WHERE user_id=${user_id}`
    );
    res.status(200).json({
      success: true,
      message: "Users data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get new user",
      error,
    });
  }
};
const updateUserActivationneg = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const [result] = await dbb.query(
      `UPDATE userss SET active='0' WHERE user_id=${user_id}`
    );
    res.status(200).json({
      success: true,
      message: "Users data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get new user",
      error,
    });
  }
};
const getAllAdmins = async (req, res) => {
  try {
    const [result] = await dbb.query(
      `SELECT email FROM userss WHERE role = "admin"`
    );
    res.status(200).json({
      success: true,
      message: "Users data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get new user",
      error,
    });
  }
};
const updatedUser = async (req, res) => {
  const { email, password, role, active } = req.body;
  const user_id = req.params.user_id;
  try {
    const sql = `UPDATE userss
                     SET email = '${email}', password = '${password}', role = '${role}', active = '${active}'
                     WHERE user_id = ${user_id}`;

    const [result] = await dbb.query(sql);

    res.status(200).json({
      success: true,
      message: "Data updated successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to update data",
      error: error,
    });
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const [result] = await dbb.query(
      `SELECT * FROM userss WHERE role = "teacher"`
    );
    res.status(200).json({
      success: true,
      message: "Users data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get new user",
      error,
    });
  }
};
const getAllActiveTeachers = async (req, res) => {
  try {
    const [result] = await dbb.query(
      `SELECT * FROM userss WHERE role = "teacher" AND active="1"`
    );
    res.status(200).json({
      success: true,
      message: "Users data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get new user",
      error,
    });
  }
};
const getAllStudents = async (req, res) => {
  try {
    const [result] = await dbb.query(
      `SELECT * FROM userss WHERE role = "student"`
    );
    res.status(200).json({
      success: true,
      message: "Users data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get new user",
      error,
    });
  }
};
const getUserByID = async (req, res) => {
  try {
    const [result] = await dbb.query(`SELECT * FROM userss WHERE user_id = ?`, [
      req.params.id,
    ]);
    res.status(200).json({
      success: true,
      message: "User data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get user",
      error,
    });
  }
};
const getAllStudentsEnrolled = async (req, res) => {
  const course_id = req.params.course_id;
  try {
    const [result] =
      await dbb.query(`SELECT userss.email, userss.role, enrolled.user_id, enrolled.course_id, attendance.enroll_id,attendance.attend
        FROM userss 
            LEFT JOIN enrolled ON enrolled.user_id = userss.user_id 
            LEFT JOIN attendance ON attendance.enroll_id = enrolled.enroll_id
        WHERE userss.role = 'student' AND enrolled.course_id = ${course_id}`);
    res.status(200).json({
      success: true,
      message: "Users data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get new user",
      error,
    });
  }
};
const deleteAllUsers = async (req, res) => {
  try {
    const [result] = await dbb.query(`DELETE FROM userss WHERE user_id = ?`, [
      req.params.id,
    ]);
    res.status(200).json({
      success: true,
      message: "Users data deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get new user",
      error,
    });
  }
};
module.exports = {
  getAllUsers,
  getAllActiveTeachers,
  updateUserActivation,
  updateUserActivationneg,
  postUser,
  postTeacher,
  getAllAdmins,
  getUserByID,
  deleteAllUsers,
  getAllTeachers,
  getAllStudents,
  updatedUser,
  getAllStudentsEnrolled,
};
