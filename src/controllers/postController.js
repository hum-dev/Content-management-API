import sql from 'mssql';
import config from '../db/config.js';

export const getPosts = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .query(`SELECT * FROM Posts`);
        res.status(200).json(result.recordset);
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
        console.log(error);
    }
    finally {
        sql.close();
    }
};

//get post by id
export const getPost = async (req, res) => {
    const { post_id } = req.params;
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('id', sql.Int, post_id)
            .query(`SELECT * FROM Posts WHERE post_id = @id`);
        const user = result.recordset[0];
        if (user) {
            res.status(200).json(result.recordsets[0]);
        } else {
            res.status(404).json({ message: 'post not found!' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
        console.log(error);
    }
    finally {
        sql.close();
    }
};


//Update a user
export const updatePost = async (req, res) => {
    try {
      const { post_id } = req.params;
      const { title, content } = req.body; // Assuming the updated details are sent in the request body
  
      let pool = await sql.connect(config.sql);
      await pool
        .request()
        .input('id', sql.Int, post_id)
        .input('title', sql.VarChar, title)
        .input('content', sql.VarChar, content)
        .query('UPDATE Posts SET title = @title, content = @content WHERE post_id = @id');
  
      res.status(200).json({ message: `Post with ID ${post_id} updated successfully` });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong!' });
    } finally {
      sql.close();
    }
  };

// Delete a user
export const deletePost = async (req, res) => {
    try {
      const { post_id } = req.params;
      let pool = await sql.connect(config.sql);
      const result = await pool
        .request()
        .input('id', sql.Int, post_id)
        .query('DELETE FROM Posts WHERE post_id = @id');
  
      if (result.rowsAffected[0] === 0) {
        res.status(404).json({ message: 'Post not found!' });
      } else {
        res.status(200).json({ message: `Post with ID ${post_id} deleted successfully` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong!' });
    } finally {
      sql.close();
    }
  };

//create a post
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input('title', sql.VarChar, title)
            .input('content', sql.VarChar, content)
            .query(`INSERT INTO Posts (title, content) VALUES (@title, @content)`);
        res.status(200).json({ message: 'Post created successfully!' });
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
    finally {
        sql.close();
    }
}
