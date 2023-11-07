const dbb = require('../config/db');
const getAttendance = async (req, res) => {
    try {
        const [result] = await dbb.query(`SELECT user_id,email,hour,day,attend
        FROM userss NATURAL JOIN enrolled NATURAL JOIN attendance where attend="1"`);
        res.status(200).json({
            success: true,
            message: 'Users data gotten successfully',
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
const postAttendance = async (req, res) => {
    const enroll_id = req.params.enroll_id;
    const schedule_id = req.params.schedule_id;
    try {
        const [result] = await dbb.query(`INSERT INTO attendance(enroll_id,attend, schedule_id, attend_id) VALUES ('${enroll_id}','0','${schedule_id}','NULL')`);
        res.status(200).json({
            success: true,
            message: 'Users data gotten successfully',
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
const getAttendanceAll = async (req, res) => {
    try {
        const [result] = await dbb.query(`SELECT user_id,email,level,hour,day,attend
        FROM userss NATURAL JOIN attendance NATURAL JOIN enrolled NATURAL JOIN schedule NATURAL JOIN course`);
        res.status(200).json({
            success: true,
            message: 'Users data gotten successfully',
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
const getTeacherAttendance = async (req, res) => {
    try {
        const [result] = await dbb.query(`SELECT attendance.attend, enrolled.user_id, userss.email, course.level,
    takenlanguages.title, schedule_user.course_id, userss.role
    FROM attendance
    LEFT JOIN enrolled ON attendance.enroll_id = enrolled.enroll_id
    LEFT JOIN userss ON enrolled.user_id = userss.user_id
    LEFT JOIN course ON enrolled.course_id = course.course_id
    LEFT JOIN takenlanguages ON course.taken_language_id = takenlanguages.taken_language_id
    LEFT JOIN schedule_user ON attendance.schedule_id = schedule_user.schedule_id
    WHERE userss.role = 'teacher'
`);
        res.status(200).json({
            success: true,
            message: 'Users data gotten successfully',
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
const getStudentAttendance = async (req, res) => {
    try {
        const [result] = await dbb.query(`SELECT user_id,email,level,hour,day,attend
        FROM userss NATURAL JOIN attendance NATURAL JOIN enrolled NATURAL JOIN schedule NATURAL JOIN course where attend="1" AND role="student"`);
        res.status(200).json({
            success: true,
            message: 'Users data gotten successfully',
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
const updatedUserAttendance = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const sql = `UPDATE attendance
        JOIN enrolled ON enrolled.enroll_id = attendance.enroll_id
        JOIN schedule ON enrolled.course_id = schedule.course_id
        JOIN course ON course.course_id = schedule.course_id
        JOIN userss ON enrolled.user_id=userss.user_id
        SET attendance.attend = '1'
        WHERE attendance.attend = '0' AND userss.role = 'student' AND userss.user_id=${user_id}`;
        
        const [result] = await dbb.query(sql);

        res.status(200).json({
            success: true,
            message: 'Data updated successfully.',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to update data',
            error: error,
        });
    }
};
const updatedUserAttendanceneg = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const sql = `UPDATE attendance
        JOIN enrolled ON enrolled.enroll_id = attendance.enroll_id
        JOIN schedule ON enrolled.course_id = schedule.course_id
        JOIN course ON course.course_id = schedule.course_id
        JOIN userss ON enrolled.user_id=userss.user_id
        SET attendance.attend = '0'
        WHERE attendance.attend = '1' AND userss.role = 'student' AND userss.user_id=${user_id}`;
        
        const [result] = await dbb.query(sql);
{user_id}
        res.status(200).json({
            success: true,
            message: 'Data updated successfully.',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to update data',
            error: error,
        });
    }
};
const updatedTeacherAttendance = async (req, res) => {
    const user_id = req.params.id;
    try {
        const sql = `UPDATE attendance
        SET attend = 1
        WHERE attend = 0
        AND enroll_id IN (
            SELECT enrolled.enroll_id
            FROM enrolled
            JOIN userss ON enrolled.user_id = userss.user_id
            JOIN course ON enrolled.course_id = course.course_id
            JOIN takenlanguages ON course.taken_language_id = takenlanguages.taken_language_id
            WHERE userss.role = 'teacher' AND enrolled.user_id =${user_id})`;
        
        const [result] = await dbb.query(sql);
       
        res.status(200).json({
            success: true,
            message: 'Data updated successfully.',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to update data',
            error: error,
        });
    }
};
const updatedTeacherAttendanceneg = async (req, res) => {
    const user_id = req.params.id;
    try {
        const sql = `UPDATE attendance
        SET attend = 0
        WHERE attend = 1
        AND enroll_id IN (
            SELECT enrolled.enroll_id
            FROM enrolled
            JOIN userss ON enrolled.user_id = userss.user_id
            JOIN course ON enrolled.course_id = course.course_id
            JOIN takenlanguages ON course.taken_language_id = takenlanguages.taken_language_id
            WHERE userss.role = 'teacher' AND enrolled.user_id = ${user_id}
        )
        `;
        
        const [result] = await dbb.query(sql);

        res.status(200).json({
            success: true,
            message: 'Data updated successfully.',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to update data',
            error: error,
        });
    }
};
module.exports = { getAttendance, postAttendance,getTeacherAttendance, getStudentAttendance,updatedUserAttendance,updatedUserAttendanceneg,updatedTeacherAttendance,updatedTeacherAttendanceneg,getAttendanceAll}