import express from 'express';
import { handleCreateJob, handleDelete, handleGetAllJob, handleJobStats, handleUpdate } from '../controller/jobController.js';
import autheticate from './../middleware/authenticate.js';

const router = express.Router();

// routes
// create job || post
router.post('/create-job', autheticate, handleCreateJob)

// get jobs || get
router.get('/get-jobs', autheticate, handleGetAllJob)

// update jobs || put || patch
router.patch('/update-job/:id', autheticate, handleUpdate)

// update jobs || delete
router.delete('/delete-job/:id', autheticate, handleDelete)

// jobs stats filter || get
router.get('/job-stats', autheticate, handleJobStats)

export default router;