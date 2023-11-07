const dbb = require('../config/db');
const getSchedule = async (req, res) => {
    try {
        const [result] = await dbb.query(`SELECT schedule_user.*, course.*, takenlanguages.*
        FROM schedule_user 
            LEFT JOIN course ON schedule_user.course_id = course.course_id 
            LEFT JOIN takenlanguages ON course.taken_language_id = takenlanguages.taken_language_id`);
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
const getScheduleWhere = async (req, res) => {
    const course_id = req.params.course_id;
    try {
        const [result] = await dbb.query(`SELECT * FROM schedule_user where course_id=${course_id}`);
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
const postSchedule=async (req, res) => {
    const {course_id, hours, day} = req.body;
    try {
        const [result] = await dbb.query(`INSERT INTO schedule_user(course_id, hours, day) VALUES ('${course_id}','${hours}','${day}')`);
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
const deleteScheduleLine = async (req, res) => {
    try {
        const [result] = await dbb.query(`DELETE FROM schedule_user WHERE schedule_id = ?`, [
            req.params.id,
        ]);
        res.status(200).json({
            success: true,
            message: 'Users data deleted successfully',
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
module.exports={getSchedule, postSchedule, deleteScheduleLine,getScheduleWhere};