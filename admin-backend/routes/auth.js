const express = require('express'); // Ensure this is correct
const router = express.Router(); // Ensure this is correct
const pool = require('../config/db'); // Import the pool from your config
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login
router.post('/lgn', async (req, res) => {
  const { username, password } = req.body;

  //console.log(req.body);

  try {
    
    const userQuery = 'SELECT * FROM gpr_usr WHERE username = $1';
    const result = await pool.query(userQuery, [username]);

    //const hashedPassword = await bcrypt.hash(password, 10);
    //console.log(hashedPassword);

    //console.log(result.rows.length);
    
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    //console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch){
      console.log('Invalid password');
      return res.status(400).json({ message: 'Invalid credentials' });}

    const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// update - updtdata
router.post('/updtdata', async (req, res) => {
  const { meruid, mername, fbpixle } = req.body;
  const gprUsername = "admin";

  const sqlQuery = `UPDATE gpr_set_api SET gpr_meruid = $1, gpr_mername = $2, gpr_fbpxl= $3 WHERE gpr_unm = $4 RETURNING *;`;
    
  try{
    const result = await pool.query(sqlQuery, [meruid, mername, fbpixle,gprUsername]);
    //console.log('User updated successfully:', result);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user: result.rows[0] });
  }
  catch(error){
    console.error('Error Updating API Data::', error);
    res.status(500).json({ message: error.message || 'Update Error' });
  }
});

// Function to fetch all users
router.get('/getdata', async (req, res) => {

  const sql = 'SELECT * FROM gpr_set_api'; // Adjust the fields as necessary

  try {
    const result = await pool.query(sql);
    //console.log(result);
    res.json(result.rows[0]); // Return the fetched user data
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Database query failed' });
    throw error; // Rethrow the error for handling later
  }
});

module.exports = router;
