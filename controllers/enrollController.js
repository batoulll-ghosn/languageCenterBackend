const dbb = require("../config/db");

const getAllEnrolled = async (req, res) => {
  try {
    const [result] = await dbb.query(
      `SELECT * from course NATURAL JOIN enrolled`
    );
    res.status(200).json({
      success: true,
      message: "Enrolled gotten Succesfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Enrolled not gotten Succesfully!",
      error,
    });
  }
};
const getEnrolled = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const [result] =
      await dbb.query(`SELECT course.*, enrolled.*, enrolled.user_id
        FROM course
            LEFT JOIN enrolled ON enrolled.course_id = course.course_id
        WHERE enrolled.user_id = ${user_id};`);
    res.status(200).json({
      success: true,
      message: "Enrolled gotten Succesfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Enrolled not gotten Succesfully!",
      error,
    });
  }
};
const getEnrolledAndWhere = async (req, res) => {
  const user_id = req.params.user_id;
  const course_id = req.params.course_id;
  try {
    const [result] = await dbb.query(
      `SELECT * from enrolled WHERE user_id = ${user_id} AND course_id=${course_id}`
    );
    res.status(200).json({
      success: true,
      message: "Enrolled gotten Succesfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Enrolled not gotten Succesfully!",
      error,
    });
  }
};
const postEnroll = async (req, res) => {
  const course_id = req.params.course_id;
  const user_id = req.params.user_id;
  try {
    const [result] = await dbb.query(
      `INSERT INTO enrolled (user_id,course_id) VALUES (${user_id},${course_id})`
    );
    res.status(200).json({
      success: true,
      message: "New Language Added successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to add new language",
      error,
    });
  }
};
module.exports = {
  getAllEnrolled,
  getEnrolled,
  postEnroll,
  getEnrolledAndWhere,
};
