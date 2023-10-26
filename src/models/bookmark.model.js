const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class BookmarkModel {
    tableName = 'bookmark';
    pivotName = 'bookmark_pivot';

    findOneById = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        return result[0];
    }

    findDefualt = async (owner_id)=> {
        const sql = `SELECT * FROM ${this.tableName} WHERE name = 'default' AND owner_id = ?`;
        const result = await query(sql, [owner_id]);
        
        return result[0];
    }

    create = async ({name, owner_id, is_private}) => {
        const sql = `INSERT INTO ${this.tableName} (name, owner_id, is_private) VALUES (?,?,?)`;

        const result = await query(sql, [name, owner_id, is_private]);
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

    save = async ({user_id, story_id, bookmark_id}) => {
        const sql = `INSERT INTO ${this.pivotName} (user_id, story_id, bookmark_id) VALUES (?,?,?)`;
        const result = await query(sql, [user_id, story_id, bookmark_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    findRec = async (story, bookmark) => {
        const sql = `SELECT * FROM ${this.pivotName} WHERE story_id = ? AND bookmark_id = ?`;
        const result = await query(sql, [story, bookmark])

        return result[0]
    }

    unsave = async (story, bookmark) => {
        const sql = `DELETE FROM ${this.pivotName} WHERE story_id = ? AND bookmark_id = ?`;
        const result = await query(sql, [story, bookmark]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new BookmarkModel;