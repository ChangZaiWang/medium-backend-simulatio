const CommentModel = require('../models/comment.model');
const StoryModel = require('../models/story.model');
const UserModel = require('../models/user.model')
const ClapModel = require('../models/clap.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');

class CommentController {
    getComments = async (req, res, next) => {
        const commentsList = await CommentModel.find(req, { story_id: req.params.story_id })
        if (!commentsList.length) {
            throw new HttpException(404, 'No comments on this story')
        }
        
        for(const [index, comment] of Object.entries(commentsList)) {

            const findUser = await UserModel.findOne({ id: comment.author_id })
            const author_name = findUser.username

            let clap_count = 0;
            const clapCount = await ClapModel.clapCount('comment', comment.id);
            if (clapCount[0].clap_count !== null) {
                clap_count = Number(clapCount[0].clap_count)
            }

            let reply_count
            const replyCount = await CommentModel.replyCount({ inherit: comment.id });
            if (replyCount) {
                reply_count = replyCount[0].reply_count
            }

            let self_clap_count = 0;
            const findClapCount = await ClapModel.find(req.currentUser.id, comment.id, 'comment');
            if (findClapCount) {
                self_clap_count = findClapCount.count
            }

            const replies = await CommentModel.find(req, { inherit: comment.id})
            // Second layer
            for (const [index, reply] of Object.entries(replies)) {
                const findUser = await UserModel.findOne({ id: reply.author_id })
                const author_name = findUser.username

                let clap_count = 0;
                const clapCount = await ClapModel.clapCount('comment', reply.id);
                if (clapCount[0].clap_count !== null) {
                    clap_count = Number(clapCount[0].clap_count)
                }
    
                let reply_count
                const replyCount = await CommentModel.replyCount({ inherit: reply.id });
                if (replyCount) {
                    reply_count = replyCount[0].reply_count
                }
    
                let self_clap_count = 0;
                const findClapCount = await ClapModel.find(req.currentUser.id, reply.id, 'comment');
                if (findClapCount) {
                    self_clap_count = findClapCount.count
                }

                reply.author_name = author_name
                reply.clap_count = clap_count
                reply.reply_count = reply_count
                reply.self_clap_count = self_clap_count
            }

            comment.author_name = author_name
            comment.clap_count = clap_count
            comment.reply_count = reply_count
            comment.self_clap_count = self_clap_count
            comment.replies = replies
        
          };
        
        res.send({
            pagination: {
                limit: req.query.limit,
                page: req.query.page,
            },
            data: commentsList
        })
    }

    getReplies = async (req, res, next) => {
        const repliesList = await CommentModel.find(req, { inherit: req.params.comment_id})
        if (!repliesList.length) {
            throw new HttpException(404, 'No replies on this comment')
        }

        for (const [index, reply] of Object.entries(repliesList)) {
            const findUser = await UserModel.findOne({ id: reply.author_id })
            const author_name = findUser.username

            let clap_count = 0;
            const clapCount = await ClapModel.clapCount('comment', reply.id);
            if (clapCount[0].clap_count !== null) {
                clap_count = Number(clapCount[0].clap_count)
            }

            let reply_count
            const replyCount = await CommentModel.replyCount({ inherit: reply.id });
            if (replyCount) {
                reply_count = replyCount[0].reply_count
            }

            let self_clap_count = 0;
            const findClapCount = await ClapModel.find(req.currentUser.id, reply.id, 'comment');
            if (findClapCount) {
                self_clap_count = findClapCount.count
            }

            const replies = await CommentModel.find(req, { inherit: reply.id})
            // Second layer
            for (const [index, reply] of Object.entries(replies)) {
                const findUser = await UserModel.findOne({ id: reply.author_id })
                const author_name = findUser.username

                let clap_count = 0;
                const clapCount = await ClapModel.clapCount('comment', reply.id);
                if (clapCount[0].clap_count !== null) {
                    clap_count = Number(clapCount[0].clap_count)
                }
    
                let reply_count
                const replyCount = await CommentModel.replyCount({ inherit: reply.id });
                if (replyCount) {
                    reply_count = replyCount[0].reply_count
                }
    
                let self_clap_count = 0;
                const findClapCount = await ClapModel.find(req.currentUser.id, reply.id, 'comment');
                if (findClapCount) {
                    self_clap_count = findClapCount.count
                }

                reply.author_name = author_name
                reply.clap_count = clap_count
                reply.reply_count = reply_count
                reply.self_clap_count = self_clap_count
            }

            reply.author_name = author_name
            reply.clap_count = clap_count
            reply.reply_count = reply_count
            reply.self_clap_count = self_clap_count
            reply.replies = replies
        }

        res.send({
            pagination: {
                limit: req.query.limit,
                page: req.query.page,
            },
            data: repliesList
        })
    }

    createComment = async (req, res, next) => {
        this.checkValidation(req);

        req.body.author_id = req.currentUser.id
        req.body.story_id = req.params.story_id

        const checkStory = await StoryModel.findOne({ id: req.params.story_id })
        if (!checkStory) {
            throw new HttpException(404, 'There is no such story')
        }

        const result = await CommentModel.comment(req.body);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Comment created!');
    }

    createReply = async (req, res, next) => {
        this.checkValidation(req);

        req.body.author_id = req.currentUser.id
        req.body.story_id = req.params.story_id
        req.body.inherit = req.params.comment_id

        const checkStory = await StoryModel.findOne({ id: req.params.story_id })
        if (!checkStory) {
            throw new HttpException(404, 'There is no such story')
        }

        const checkComment = await CommentModel.findOne({ id: req.params.comment_id })
        if (!checkComment) {
            throw new HttpException(404, 'There is no such comment')
        }

        const result = await CommentModel.reply(req.body);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Reply created!');
    }

    updateComment = async (req, res, next) => {
        this.checkValidation(req);

        const author = await CommentModel.findOne({ id: req.params.comment_id })
        if (author.author_id != req.currentUser.id) {
            throw new HttpException(409, 'You are not the author')
        }

        const result = await CommentModel.update(req.body, req.params.comment_id);
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;
        const message = !affectedRows ? 'Comment not found' :
            affectedRows && changedRows ? 'Comment updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteComment = async (req, res, next) => {
        const author = await CommentModel.findOne({ id: req.params.comment_id })
        if (author.author_id != req.currentUser.id) {
            throw new HttpException(409, 'You are not the author')
        }

        const result = await CommentModel.delete(req.params.comment_id);
        if (!result) {
            throw new HttpException(404, 'Comment not found');
        }

        res.send('Comment has been deleted');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}

module.exports = new CommentController;