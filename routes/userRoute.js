const express = require("express");
const router = express.Router();
const control = require("../controllers/userController");
const attend = require("../controllers/attendController");
const language = require("../controllers/languageController");
const enroll = require("../controllers/enrollController");
const course = require("../controllers/courseController");
const schedule = require("../controllers/scheduleController");

router.get("/getAll", control.getAllUsers);
router.delete("/deleteuser/:id", control.deleteAllUsers);
router.get("/getAdmin", control.getAllAdmins);
router.get("/getTeacher", control.getAllTeachers);
router.get("/getActiveTeacher", control.getAllActiveTeachers);
router.get("/getStudent", control.getAllStudents);
router.get("/getStudentEnrolled/:course_id", control.getAllStudentsEnrolled);
router.get("/getAllId/:id", control.getUserByID);
router.put("/updateUser/:user_id", control.updatedUser);
router.post("/addStudent", control.postUser);
router.post("/addTeacher", control.postTeacher);
router.put("/updateActivationforuser/:user_id", control.updateUserActivation);
router.put(
  "/updateActivationforuserneg/:user_id",
  control.updateUserActivationneg
);

router.get("/getAllAtendance", attend.getAttendance);
router.get("/getAllAtendanceAll", attend.getAttendanceAll);
router.get("/getTeacherAtendance", attend.getTeacherAttendance);
router.get("/getStudentAtendance", attend.getStudentAttendance);
router.post("/post/:enroll_id/:schedule_id", attend.postAttendance);
router.put("/updateUserAttendance/:user_id", attend.updatedUserAttendance);
router.put(
  "/updateUserAttendanceneg/:user_id",
  attend.updatedUserAttendanceneg
);
router.put("/updateTeacherAttendance/:id", attend.updatedTeacherAttendance);
router.put(
  "/updateTeacherAttendanceneg/:id",
  attend.updatedTeacherAttendanceneg
);

router.get("/getAllLanguage", language.getLanguages);
router.post("/addNewLanguage", language.addLangauge);
router.put("/updateLanguage/:id", language.updatedLanguage);
router.delete("/deleteLanguage/:id", language.deleteLanguage);

router.get("/getAllEnrolled", enroll.getAllEnrolled);
router.get("/getEnrolled/:user_id", enroll.getEnrolled);
router.get("/getEnrolledWhere/:user_id/:course_id", enroll.getEnrolledAndWhere);
router.post("/postEnrolled/:user_id/:course_id", enroll.postEnroll);

router.get("/getCourse", course.getAllCourses);
router.get("/getCourseLan", course.getAllCoursesLan);
router.get("/getCourseLanWhere/:course_id", course.getAllCoursesLanWhere);
router.post("/postCourse", course.postCourses);
router.put("/updateCourse/:course_id", course.updateCourses);

router.get("/getschedule", schedule.getSchedule);
router.get("/getscheduleWhere/:course_id", schedule.getScheduleWhere);
router.post("/postschedule", schedule.postSchedule);
router.delete("/deletescheduleline/:id", schedule.deleteScheduleLine);
module.exports = router;
