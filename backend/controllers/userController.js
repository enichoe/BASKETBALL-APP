const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { username, password, isAdmin } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      password,
      isAdmin: isAdmin || false,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    console.log(`[LOGIN DEBUG] Intento de login para usuario: '${username}'`);
    console.log(`[LOGIN DEBUG] Password recibido: '${password}'`);

    if (user) {
        console.log(`[LOGIN DEBUG] Usuario encontrado. Hash en DB: ${user.password.substring(0,15)}...`);
        const isMatch = await user.matchPassword(password);
        console.log(`[LOGIN DEBUG] Resultado de matchPassword: ${isMatch}`);
        
        if (isMatch) {
            res.json({
                _id: user._id,
                username: user.username,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
            return;
        }
    } else {
        console.log(`[LOGIN DEBUG] Usuario NO encontrado.`);
    }

    res.status(401).json({ message: "Invalid username or password" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
