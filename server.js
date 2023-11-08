require('dotenv').config();
const multer = require('multer');
const axios =require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
require('./config/db');
const userRoutes = require('./routes/userRoute');
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://language-learning-center1212.onrender.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(bodyParser.json());
app.use('/user', userRoutes);
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const apiKey = 'dc4a2cfa772bbca6b72c3fdc60d08ca0';
        const formData = new FormData()
        formData.append('key', apiKey)
        const image = req.file.buffer.toString('base64');
        formData.append('image', image)

        const response = await axios.post('https://api.imgbb.com/1/upload', formData);

        if (response.data.status === 200) {
            const imageUrl = response.data.data.url;
            console.log('Image uploaded successfully:', imageUrl);
            res.json({ imageUrl });
        } else {
            console.error('ImgBB API Error:', response.data.status_txt);
            res.status(500).json({ error: 'batoul--Error uploading the file' });
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ error: 'Error uploading the file' });
    }
});
app.post('/api/verify-recaptcha', async (req, res) => {
    const { token } = req.body;
    const googleRecaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=6LfVPAYpAAAAAO-w-zQtNyQDIJN7Ixj9XQfvei0w&response=${token}`;
    const response = await axios.post(googleRecaptchaVerifyUrl);
    const { success } = response.data;
    res.json({ success });
  });
  
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
app.use(cors(corsOptions));
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
/*https://www.db4free.net/phpMyAdmin/index.php?route=/database/structure&db=ourllcc*/