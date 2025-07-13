import express from 'express';
import cors from 'cors';
import CookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN || '*'
}));
app.use(express.json({limit:'20kb'}));
app.use(express.urlencoded());
app.use(express.static('public'));
app.use(CookieParser())

// import Routes
import courseRouter from '../routers/course.route.js';
import quizRouter from '../routers/quiz.route.js';
import userRouter from '../routers/user.route.js';
// routes
app.use('/api/v1/user',userRouter);
app.use('/api/v1/course',courseRouter);
app.use('/api/v1/track',quizRouter);

export { app }