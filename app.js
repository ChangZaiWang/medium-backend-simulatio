const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./src/utils/HttpException.utils');
const errorMiddleware = require('./src/middleware/error.middleware');
const userRouter = require('./src/routes/user.route');
const storyRouter = require('./src/routes/story.route');
const followRouter = require('./src/routes/follow.route');
const clapRouter = require('./src/routes/clap.route');
const bookmarkRouter = require('./src/routes/bookmark.route');
const commentRouter = require('./src/routes/comment.route');

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT || 3331);

app.use('/users', userRouter);
app.use('/stories', storyRouter);
app.use('/follow', followRouter);
app.use('/clap', clapRouter);
app.use('/bookmark', bookmarkRouter);
app.use('/comments', commentRouter);

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;