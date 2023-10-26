const FollowModel = require('../models/follow.model');
const UserModel = require('../models/user.model')
const HttpException = require('../utils/HttpException.utils');

class  FollowController {
    follow = async (req, res, next) => {
        const follower_id = req.currentUser.id

        const checkUserExist = await UserModel.findOne({ id: req.params.follow_id })
        if (!checkUserExist) {
            throw new HttpException(409, 'There is no such user')
        }
        
        const checkFollowed = await FollowModel.find(follower_id, req.params.follow_id)
        if (checkFollowed && checkFollowed.follow_id == req.params.follow_id) {
            throw new HttpException(409, 'You have already followed this user')
        }

        const result = await FollowModel.follow(follower_id, req.params.follow_id)
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        res.send('Follow Success');
    };

    unfollow = async (req, res, next) => {
        const follower_id = req.currentUser.id
        const result = await FollowModel.unfollow(follower_id, req.params.follow_id);
        if (!result) {
            throw new HttpException(404, `You haven't follow this user`);
        }

        res.send('Follow canceled')
    }
}

module.exports = new FollowController;