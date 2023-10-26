const ClapModel = require('../models/clap.model');
const StoryModel = require('../models/story.model');
const CommentModel = require('../models/comment.model');
const HttpException = require('../utils/HttpException.utils');
const Type = require('../utils/clapType.utils')
const { validationResult } = require('express-validator');
const { ResultWithContext } = require('express-validator/src/chain');

class ClapController {
    clap = async (req, res, next) => {
        this.checkValidation(req);

        const user_id = req.currentUser.id
        const type = req.body.type

        if (req.body.type == Type.story) {
            
            const checkStoryExist = await StoryModel.findOne({ id: req.params.target_id })
            if (!checkStoryExist) {
                throw new HttpException(409, 'There is no such story')
            }
    
            const checkClaped = await ClapModel.find(user_id, req.params.target_id, type)
            if (checkClaped && checkClaped.target_id == req.params.target_id) {
                const count = checkClaped.count += 1
                const clapped = await ClapModel.clapped(count, user_id, req.params.target_id, type)
                if (!clapped) {
                    throw new HttpException(401, 'Something went wrong')
                }
            }
            else {
                const clap = await ClapModel.clap(user_id, req.params.target_id, type)
                if (!clap) {
                    throw new HttpException(401, 'Something went wrong')
                }
            }
        }
        else if (req.body.type == Type.comment) {
            const checkCommentExist = await CommentModel.findOne({ id: req.params.target_id })
            if (!checkCommentExist) {
                throw new HttpException(409, 'There is no such comment')
            }
    
            const checkClaped = await ClapModel.find(user_id, req.params.target_id, type)
            if (checkClaped && checkClaped.target_id == req.params.target_id) {
                const count = checkClaped.count += 1
                const clapped = await ClapModel.clapped(count, user_id, req.params.target_id, type)
                if (!clapped) {
                    throw new HttpException(401, 'Something went wrong')
                }
            }
            else {
                const clap = await ClapModel.clap(user_id, req.params.target_id, type)
                if (!clap) {
                    throw new HttpException(401, 'Something went wrong')
                }
            }
        }
        else {
            throw new HttpException(401, 'Something went wrong')
        }
        
        res.send('Clap succeeded')
    }

    ClapCount = async (req, res, next) => {
        const result = await ClapModel.clapCount(req.body.type, req.params.target_id)
        if (!result) {
            throw new HttpException(401, 'Something went wrong')
        }

        res.send(result)
    }

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}

module.exports = new ClapController;