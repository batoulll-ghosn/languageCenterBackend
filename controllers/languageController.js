const dbb = require('../config/db');
const getLanguages = async (req, res) => {
    try {
        const [result] = await dbb.query(`SELECT * FROM takenlanguages`);
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
const addLangauge = async (req, res) => {
    const {duration,languageimage, title, description, language } = req.body;
    const taken_language_id = req.params.id;
    try {
        const [result] = await dbb.query(`INSERT INTO takenlanguages (duration, languageimage, title, description) VALUES ('8','${languageimage}','${title}','${description}')`);
        res.status(200).json({
            success: true,
            message: 'New Language Added successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Unable to add new language',
            error,
        });
    }
};
const updatedLanguage = async (req, res) => {
    const { duration, password, role, active } = req.body;
    const taken_language_id = req.params.id;
    try {
        const sql = `UPDATE takenlanguages SET duration='${duration}',takenlanguageimage='${takenlanguageimage}',title='${title}',description='${description}',language='${language}' WHERE taken_language_id='${taken_language_id}'`;
        
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
const deleteLanguage = async (req, res) => {
    const taken_language_id = req.params.id;
    try {
        const [result] = await dbb.query(`DELETE FROM takenlanguages WHERE taken_language_id='${taken_language_id}'`);
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
module.exports = { getLanguages, addLangauge, updatedLanguage,deleteLanguage};