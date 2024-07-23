const User = require('../models/User');

const bcryptjs = require('bcryptjs');

const registerUser = async (req, res) => {
  const { username, email, password, fullname } = req.body;
  // console.log(username, email, password, fullname)

  const exestingUserByUsername = await User.findOne({ where: { username } });

  console.log('exestingUserByUsername', exestingUserByUsername);

  if (exestingUserByUsername) {
    return res
      .status(422)
      .json({ error: 'User already exists with that username' });
  }

  const exestingUserByEmail = await User.findOne({ where: { email } });

  if (exestingUserByEmail) {
    return res
      .status(422)
      .json({ error: 'User already exists with that email' });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create({
    username,
    fullname,
    email,
    password: hashedPassword,
  });

  console.log(newUser);

  res.status(200).json({ user: newUser, message: 'Registered Successfully' });
};

module.exports = { registerUser };
