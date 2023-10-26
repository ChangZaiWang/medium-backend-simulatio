const BookmarkModel = require('../models/bookmark.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');

class BookmarkController {
    createBookmark = async (req, res, next) => {
        this.checkValidation(req);

        req.body.owner_id = req.currentUser.id

        const result = await BookmarkModel.create(req.body);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Bookmark was created!');
    }

    updateBookmark = async (req, res, next) => {
        this.checkValidation(req);

        const owner = await BookmarkModel.findOneById({ id: req.params.bookmark_id })
        if (owner.owner_id != req.currentUser.id) {
            throw new HttpException(409, 'You are not the owner')
        }

        const result = await BookmarkModel.update(req.body, req.params.bookmark_id);
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;
        const message = !affectedRows ? 'Bookmark not found' :
            affectedRows && changedRows ? 'Bookmark updated successfully' : 'Updated faild';

        res.send({ message, info });
    }

    deleteBookmark = async (req, res, next) => {
        const owner = await BookmarkModel.findOneById({ id: req.params.bookmark_id })
        if (owner.owner_id != req.currentUser.id) {
            throw new HttpException(409, 'You are not the owner')
        }

        const result = await BookmarkModel.delete(req.params.bookmark_id);
        if (!result) {
            throw new HttpException(404, 'Bookmark not found');
        }

        res.send('Bookmark has been deleted');
    }

    save = async (req, res, next) => {
        const user_id = req.currentUser.id;

        const findDefualt = await BookmarkModel.findDefualt(user_id)
        if (!findDefualt) {
            const Default = { name: 'default', owner_id: user_id, is_private: 1}
            await BookmarkModel.create(Default);
            const defaultId = await BookmarkModel.findDefualt(user_id);
            const bookmark1 = { user_id: user_id, story_id: req.params.story_id, bookmark_id: defaultId.id }
            const result = await BookmarkModel.save(bookmark1);
            if (!result) {
                throw new HttpException(404, 'Something went wrong');
            }
        }

        const checkBookmarked = await BookmarkModel.findRec(req.params.story_id, findDefualt.id)
        if (checkBookmarked) {
            throw new HttpException(409, `You've already save this story to Reading List`)
        }
        const bookmark2 = { user_id: user_id, story_id: req.params.story_id, bookmark_id: findDefualt.id }
        const result = await BookmarkModel.save(bookmark2);
        if (!result) {
            throw new HttpException(404, 'Something went wrong'); 
        }

        res.send('Bookmarked Succeed');
    }

    saveAss = async (req, res, next) => {
        const user_id = req.currentUser.id;

        const findBookmark = await BookmarkModel.findOneById({ id: req.params.bookmark_id })
        if (!findBookmark) {
            throw new HttpException(404, 'There is not such bookmark')
        }
        else if (findBookmark.owner_id != user_id) {
            throw new HttpException(409, 'You are not the owner')
        }
        
        const checkBookmarked = await BookmarkModel.findRec(req.params.story_id, findBookmark.id)
        if (checkBookmarked) {
            throw new HttpException(409, `You've already save this story to Reading List`)
        }
        
        const bookmark = { user_id: user_id, story_id: req.params.story_id, bookmark_id: findBookmark.id}
        await BookmarkModel.save(bookmark)

        res.send('Bookmarked Succeed')
    }

    unsave = async (req, res, next) => {
        const user_id = req.currentUser.id
        const findRec = await BookmarkModel.findRec(req.params.story_id, req.params.bookmark_id)
        if (!findRec) {
            throw new HttpException(404, `You haven't save this story in the bookmark`)
        }
        
        const result = await BookmarkModel.unsave(req.params.story_id, req.params.bookmark_id);
        if (!result) {
            throw new HttpException(404, 'Bookmark not found');
        }

        res.send('Bookmark has been deleted');
    }

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}

module.exports = new BookmarkController;