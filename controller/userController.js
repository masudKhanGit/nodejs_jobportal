import User from '../models/User.js';

export const handleUserUpdate = async (req, res) => {
    const { name, username, email, location } = req.body;
    if(!name || !username || !email || !location) return res.status(400).json({ success: false, message: 'Please provide all fields' })

    const user = await User.findOne({ _id: req.user._id })

    user.name = name
    user.username = username
    user.email = email
    user.location = location
    await user.save()

    // create token
    const token = user.createJWT()
    
    res.status(200).json({
        success: true,
        message: "User Update Successfull...",
        user,
        token
    })
}