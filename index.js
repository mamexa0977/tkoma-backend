const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your_secret_key'; // Change this to a secure secret key

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://user@cluster0.z65xuf6.mongodb.net/TkomaApp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new mongoose.Schema({
    yetkoma_aynet: String,
    yetkoma_zir_zir_guday: String,
    leloch_megelets_yalebachew_negeroch: String,
    yefetsamiw_akal_zir_zir_guday: String,
    yesra_halafinet: String,
    mulu_sm: String,
    ye_sra_muya: String,
    slk_kutr: Number,
    photolink: String,
});

const User = mongoose.model('User', userSchema);

// Register user
app.post('/register', async (req, res) => {
    try {
        console.log("registeringggggggGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGg")
        // Create a new user object
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully' });
        console.log("registereeeedd successsssssssssss")
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login user
// Login user
app.post('/login', async (req, res) => {
    try {
        // Check username and password
        console.log("logging in ")
        const { username, password } = req.body;

        if (username !== 'mamex' || password !== 'strongpassword') {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        console.log("passed good")
        // Generate JWT token
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        console.log("logging sucesssssssssssssssssssssssssssss ")
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user data with token
// app.get('/userdata', async (req, res) => {
//     try {
//         // Extract token from request headers
//         const token = req.headers.authorization.split(' ')[1];
//         const decoded = jwt.verify(token, JWT_SECRET);
//         const username = decoded.username;

//         // Find user by username
//         const user = await User.findOne({ username });

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Send user data
//         res.status(200).json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(401).json({ error: 'Invalid or expired token' });
//     }
// });

app.get('/allusers', async (req, res) => {
    try {
      // Authenticate the request (verify token)
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
  
      // Fetch all users
      const users = await User.find();
  
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Unauthorized' }); // Generic error message for authentication failures
    }
  });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
