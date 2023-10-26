const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class ClapModel {
    tableName = 'clap';

    find = async (user, target, type) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE user_id = ? AND target_id = ? AND type = ?`;
        const result = await query(sql, [user, target, type]);

        return result[0];
    }

    clapCount = async (type, target) => {
        let sql = `SELECT SUM(count) AS clap_count FROM ${this.tableName} WHERE type = ? AND target_id = ?`;

        return await query(sql, [type, target]);
    }

    clap = async (user, target, type) => {
        const sql = `INSERT INTO ${this.tableName} (user_id, target_id, type) VALUES (?,?,?)`;
        const result = await query(sql, [user, target, type]);

        return result;
    }

    clapped = async (count, user, target, type) => {
        const sql = `UPDATE ${this.tableName} SET count = ? WHERE user_id = ? AND target_id = ? AND type = ?`
        const result = await query(sql, [count, user, target, type]);

        return result;
    }
}

module.exports = new ClapModel;