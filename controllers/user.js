const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

 const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (!existingUser)
      return res.status(404).json({ message: 'user not found' })

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'invalid credentials' })

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      'test',
      { expiresIn: '1h' }
    )

    res.status(200).json({
      result: existingUser,
      token,
    })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

 const signup = async (req, res) => {
  const { email, password, fullName} = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' })

    // if (password !== confirmPassword)
    //   return res.status(400).json({ message: "Passwords don't match" })

    const hashedPwd = await bcrypt.hash(password, 12)
     User.create({
     name: fullName,
      password: hashedPwd,
      email,
    }, function (err, result) {
        if (err) return res.status(500).json({ message: 'Something went wrong' })
        const token = jwt.sign(
          {
            email: result.email,
            id: result._id,
          },
          'test',
          { expiresIn: '1h' }
        )
        res.status(200).json({ result:{
          name: result.name,
          email: result.email
        }, token })
      }
  )
    
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}


module.exports = {signin, signup}