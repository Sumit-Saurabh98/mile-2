const User = require('../models/User');
const bcryptjs = require('bcryptjs');

const registerUser = async (req, res) => {
  const { username, fullname, email, password } = req.body;

  try {
    const existingUserByEmail = await User.findOne({ where: { email } });

    if (existingUserByEmail) {
      return res
        .status(422)
        .json({ error: 'User already exists with that email' });
    }

    const existingUserByUsername = await User.findOne({ where: { username } });

    if (existingUserByUsername) {
      return res
        .status(422)
        .json({ error: 'User already exists with that username' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      username,
      fullname,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ user: newUser, message: 'Registered Successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser };
