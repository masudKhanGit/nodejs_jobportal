import moment from 'moment';
import { Types } from 'mongoose';
import jobModel from '../models/jobModel.js';

// create job
export const handleCreateJob = async (req, res) => {
    try {
         const { company, position } = req.body
         if(!company || !position) return res.status(400).json({ success: false, message: 'Please provide all fields' })

         req.body.createdBy = req.user._id
         const job = await jobModel.create(req.body)
         res.status(201).json({
            success: true,
            message: 'Job Created Successfully',
            job
         })

    } catch(err) {
        console.log(err);
    }
}

// get jobs
export const handleGetAllJob = async (req, res) => {
    const { status, workType, search, sort } = req.query;
    // conditions for searching filters
    const queryObject = {
        createdBy: req.user._id
    }
    // logic filters
    if(status && status !== 'all') queryObject.status = status
    if(workType && workType !== 'all') queryObject.workType = workType
    if(search) queryObject.position = {$regex: search, $options: 'i'}

    let queryResult = jobModel.find(queryObject)
    // sorting
    if(sort === 'latest') queryResult.sort('-createdAt')
    if(sort === 'oldest') queryResult.sort('createdAt')
    if(sort === 'a-z') queryResult.sort('position')
    if(sort === 'z-a') queryResult.sort('-position')

    // pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    queryResult.skip(skip).limit(limit)
    // jobs count
    const totalJobs = await jobModel.countDocuments(queryResult)
    const numberOfPage = Math.ceil(totalJobs / limit)

    const jobs = await queryResult;

    // const jobs = await jobModel.find({ createdBy: req.user._id })
    res.status(200).json({
        success: true,
        totalJobs,
        jobs,
        numberOfPage
    })
}

// update job
export const handleUpdate = async (req, res) => {
    const { id } = req.params
    const { company, position } = req.body
    if(!company, !position) return res.status(400).json({ success: false, message: 'Please Provide All fields' })
    
    // find job
    const job = await jobModel.findOne({ _id: id })
    if(!job) return res.status(400).json({ success: false, message: `no jobs found with this id ${id}` })
    if(!req.user._id === job.createdBy.toString()) return res.status(400).json({ success: false, message: 'your not authrized to update this job'})

    const updateJob = await jobModel.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true })

    res.status(200).json({
        success: true,
        message: 'Job updated Successfully',
        updateJob
    })
}

// delete job

export const handleDelete = async (req, res) => {
    const { id } = req.params

    // find job
    const job = await jobModel.findOne({ _id: id })
    if(!job) res.status(400).json({ success: false, message: `no jobs found with this id ${id}` })
    if(!req.user._id === job.createdBy.toString()) return res.status(400).json({ success: false, message: 'your not authrized to delete this job'})

    await job.deleteOne()
    res.status(200).json({
        success: true,
        message: 'Success Job Deleted'
    })
}

// stats filter
export const handleJobStats = async (req, res) => {
    const stats = await jobModel.aggregate([
        // search by user jobs
        {
            $match: {
                createdBy: new Types.ObjectId(req.user._id)
            }
        },
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ])

    // default stats
    const defaultStas = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview ||0
    }

    // monthly yearly stats
    let monthlyApplication = await jobModel.aggregate([
        {
            $match: {
                createdBy: new Types.ObjectId(req.user._id)
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt'}
                },
                count: { $sum: 1 }
            }
        }
    ])

    monthlyApplication = monthlyApplication.map(item => {
        const {_id: {year, month}, count} = item
        const date = moment().month(month - 1).year(year).format('MMM Y')
        return { date, count }
    }).reverse();

    res.status(200).json({
        success: true,
        totalJob: stats.length,
        defaultStas,
        monthlyApplication
    })
}