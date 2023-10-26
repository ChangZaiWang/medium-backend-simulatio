const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class CommentModel {
    tableName = 'comment';

    find = async (req, params = {}) => {
        const { columnSet, values } = multipleColumnSet(params);

        let sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`;
        if (columnSet == 'story_id = ?') {
            sql += ` AND inherit IS NULL`
        }

        const limit = req.query.limit
        const offset = String((req.query.page - 1) * limit)
        
        sql += ` ORDER BY id LIMIT ? OFFSET ?`

        return await query(sql, [...values, limit, offset]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    replyCount = async (params = {}) => {
        const { columnSet, values } = multipleColumnSet(params);

        let sql = `SELECT COUNT(id) AS reply_count FROM ${this.tableName} WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    comment = async ({ content, author_id, story_id }) => {
        const sql = `INSERT INTO ${this.tableName} (content, author_id, story_id) VALUES (?,?,?)`;

        const result = await query(sql, [content, author_id, story_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    reply = async ({ content, author_id, story_id, inherit }) => {
        const sql = `INSERT INTO ${this.tableName} (content, author_id, story_id, inherit) VALUES (?,?,?,?)`;

        const result = await query(sql, [content, author_id, story_id, inherit]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;
        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new CommentModel;