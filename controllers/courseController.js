const dbb = require('../config/db');
const getAllCourses = async (req, res) => {
    try {
        const [result] = await dbb.query(`SELECT * FROM course`);
        res.status(200).json({
            success: true,
            message: 'Users data retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to get new user',
            error,
        });
    }
};
const getAllCoursesLan = async (req, res) => {
    try {
        const [result] = await dbb.query(`SELECT * FROM course LEFT Join takenlanguages ON course.taken_language_id = takenlanguages.taken_language_id`);
        res.status(200).json({
            success: true,
            message: 'Users data retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to get new user',
            error,
        });
    }
};
const getAllCoursesLanWhere = async (req, res) => {
    const course_id = req.params.course_id;
    try {
        const [result] = await dbb.query(`SELECT * FROM course Natural Join takenlanguages Where course_id=${course_id}`);
        res.status(200).json({
            success: true,
            message: 'Users data retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to get new user',
            error,
        });
    }
};
const postCourses = async (req, res) => {
     const {taken_language_id,level, nbofsession, duration,zoom_link}=req.body;
    try {
        const [result] = await dbb.query(`INSERT INTO course(taken_language_id,level, nbofsession, duration,zoom_link) VALUES ('${taken_language_id}','${level}','${nbofsession}','${duration}','${zoom_link}')`);
        res.status(200).json({
            success: true,
            message: 'Users data retrieved successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to get new user',
            error,
        });
    }
};
const updateCourses = async (req, res) => {
    const {zoom_link}=req.body;
    const course_id = req.params.course_id;
   try {
       const [result] = await dbb.query(`UPDATE course set zoom_link='${zoom_link}' WHERE course_id=${course_id}`);
       res.status(200).json({
           success: true,
           message: 'Course Updated successfully',
           data: result,
       });
   } catch (error) {
       res.status(400).json({
           success: false,
           message: 'Unable to update',
           error,
       });
   }
};
module.exports={getAllCourses,postCourses,getAllCoursesLan,getAllCoursesLanWhere,updateCourses};