const query = require('../db/db-connection');

class FollowModel {
    tableName = 'follow';

    find = async (follower_id, follow_id) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE follower_id = ? AND follow_id = ?`;
        const result = await query(sql, [follower_id, follow_id]);
        
        return result[0];
    }

    follow = async (follower_id, follow_id) => {
        const sql = `INSERT INTO ${this.tableName} (follower_id, follow_id) VALUES (?,?)`;
        const result = await query(sql, [follower_id, follow_id]);
        
        return result;
    }

    unfollow = async (follower_id, follow_id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE follower_id = ? AND follow_id = ?`;
        const result = await query(sql, [follower_id, follow_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new FollowModel;