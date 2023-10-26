const StoryModel = require('../models/story.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const Role = require('../utils/userRoles.utils')

class StoryController {
    getAllStories = async (req, res, next) => {
        const storyList = await StoryModel.find();
        if (!storyList.length) {
            throw new HttpException(404, 'Stories not found');
        }

        res.send(storyList);
    };

    getStoryById = async (req, res, next) => {
        const story = await StoryModel.findOne({ id: req.params.id });
        
        if (!story) {
            throw new HttpException(404, 'Story not found');
        }
        
        if (story.is_premium == 1){
            if (req.currentUser.role !== Role.Premium){
                throw new HttpException(404, 'You are not premium');
            } 
        }

        res.send(story)
    };

    createStory = async (req, res, next) => {
        this.checkValidation(req);

        req.body.author_id = req.currentUser.id

        const result = await StoryModel.create(req.body);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Story was created!');
    };

    updateStory = async (req, res, next) => {
        this.checkValidation(req);

        const author = await StoryModel.findOne({ id: req.params.id })
        if (author.author_id != req.currentUser.id) {
            throw new HttpException(409, 'You are not the author')
        }

        const result = await StoryModel.update(req.body, req.params.id);
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;
        const message = !affectedRows ? 'Story not found' :
            affectedRows && changedRows ? 'Story updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteStory = async (req, res, next) => {
        const author = await StoryModel.findOne({ id: req.params.id })
        if (author.author_id != req.currentUser.id) {
            throw new HttpException(409, 'You are not the author')
        }

        const result = await StoryModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Story not found');
        }

        res.send('Story has been deleted');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}

module.exports = new StoryController;