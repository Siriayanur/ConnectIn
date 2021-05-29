const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors')
const userRoute = require('./routes/user.js')
const authRoute = require('./routes/auth.js')
const postRoute = require('./routes/post.js');
const multer = require('multer');
const path = require('path');
dotenv.config();

//congfig db
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true}, () => {
    console.log('connected to mongodb')
})
app.use('/images', express.static(path.join(__dirname,'public/images')))

//debugging
console.log('success')



//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())

//File upload stuff :(
const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null,'public/images')
    },
    filename: (req, file, cb) =>
    {
        cb(null, req.body.name);
    }
})

const upload = multer({storage});
app.post('/api/upload', upload.single("file"), (req, res) =>
{
    try
    {
        return res.status(200).send('File uploaded successfully')
    } catch (e)
    {
        console.log(e)
    }
})


//defining routes :)

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

//Check result :)
app.listen(5000, () => {
    console.log('Server running at port 5000');
})
//2:11:10