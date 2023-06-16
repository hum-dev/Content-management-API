import sql from 'mssql';
import config from '../db/config.js';

export const getComments = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .query(`SELECT * FROM Comments`);
        res.status(200).json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
        console.log(error);
    }
    finally {
        sql.close();
    }
}

//get comment by id
export const getComment = async (req, res) => {
    const { comment_id } = req.params;
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('id', sql.Int, comment_id)
            .query(`SELECT * FROM Comments WHERE comment_id = @id`);
        const user = result.recordset[0];
        if (user) {
            res.status(200).json(result.recordsets[0]);
        } else {
            res.status(404).json({ message: 'comment not found!' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
        console.log(error);
    }
    finally {
        sql.close();
    }
}

//Create a comment
export const createComment = async (req, res) => {
    try {
        const { post_id, user_id, comment } = req.body;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('post_id', sql.Int, post_id)
            .input('user_id', sql.Int, user_id)
            .input('comment', sql.NVarChar, comment)
            .query(`INSERT INTO Comments (post_id, user_id, comment) VALUES (@post_id, @user_id, @comment)`);
        res.status(201).json({ message: "Comment created!" });
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
        console.log(error);
    }
    finally {
        sql.close();
    }
}


//Update a comment
export const updateComment = async (req, res) => {
    try {
        const { comment_id } = req.params;
        const { comment } = req.body; // Assuming the updated details are sent in the request body

        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input('id', sql.Int, comment_id)
            .input('comment', sql.NVarChar, comment)
            .query(`UPDATE Comments SET comment = @comment WHERE comment_id = @id`);

        res.status(200).json({ message: 'Comment updated!' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
        console.log(error);
    } finally {
        sql.close();
    }
}

//Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { comment_id } = req.params;
        let pool = await sql.connect(config.sql);
        await pool
            .request()
            .input('id', sql.Int, comment_id)
            .query(`DELETE FROM Comments WHERE comment_id = @id`);
        res.status(200).json({ message: 'Comment deleted!' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
        console.log(error);
    } finally {
        sql.close();
    }
}


