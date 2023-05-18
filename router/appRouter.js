import express from "express";
import autheticate from './../middleware/authenticate.js';
import authorize from './../middleware/authorize.js';

const router = express.Router();

router.get('/public', autheticate, authorize(['admin', 'user']), (req, res) => {
    res.status(200).json({
        success: true,
        message: 'I am public route'
    })
})
router.get('/protected', autheticate, authorize(['admin']), (req, res) => {
    res.status(200).json({
        success: true,
        message: 'I am protected route'
    })
})

export default router;
