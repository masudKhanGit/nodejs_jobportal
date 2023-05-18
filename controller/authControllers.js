import User from "../models/User.js";

export const handleLogin = async (req, res) => {
    try {
      const { email, password } = req.body
  
      let user = await User.findOne({ email })
      if(!user) return res.status(400).json({ success: false, message: 'User Not Found!' })
  
      // password match
      const isMatch = user.comparePassword(password)
      if(!isMatch) return res.status(400).json({ success: false, message: 'Password not match please try again' })
  
      // create token
      const token = user.createJWT();
  
      res.status(200).json({
        success: true,
        message: 'Login Successfully',
        token
      })
    } catch (err) {
      console.log(err)
    }
}

export const handleRegister = async (req, res) => {
    try {
      const { name, username, email, password } = req.body;
  
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ success: false, message: "User already register please login." });
  
      user = new User({ name, username, email, password })
      await user.save()
      
      res.status(201).json({
        success: true,
        message: 'User Created Successfully',
        user: {
          name: user.name,
          username: user.username,
          email: user.email,
          location: user.location,
          role: user.role,
          status: user.status,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      })
    } catch(err) {
      res.status(400).json({ success: false, err })
    }
  }