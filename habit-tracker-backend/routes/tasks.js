var express = require('express');
var router = express.Router();
var TaskSchema = require('../models/task');
const DATABASE = process.env.DATABASE;

router.get('/getTasks', async function (req, res, next) {
    try {
        if (DATABASE === 'MONGODB') {
            let response = await TaskSchema.find({});
            return res.status(200).json(response);
        }
        res.status(500).json({
            error: 'Invalid DATABASE env variable'
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || "Error fetching tasks"
        });
    }
});


router.post('/addTask', async function(req, res, next) {
    if (req.body && req.body.name && req.body.description && req.body.duedate) {
        try {
            req.body.duedate = new Date(req.body.duedate);

            if (DATABASE === 'MONGODB') {

                let task = new TaskSchema(req.body);
                let response = await task.save();
                return res.status(200).json(response);
        }
        return res.status(500).json({
            error: 'Invalid DATABASE env variable'
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message || "Error saving task"
        });
    }
    }  else {
        return res.status(400).json({
            error: 'Missing required fields: name, description, duedate'
        });
    }
    });


router.delete('/removeTask/:id', async function (req, res, next) {
    if (req.params && req.params.id && !isNaN(req.params.id)) {
        let id = req.params.id;
        try {
            if (DATABASE === 'MONGODB') {

                await TaskSchema.findByIdAndDelete(id);
                return res.status(200).json({ 
                    message: "Task removed successfully"
                });
            }
            return res.status(500).json({
                error: 'Invalid DATABASE env variable'
            });
        } catch (err) {
            return res.status(500).json({
                error: err.message || "Error removing task"
            });
        }
    } else {
        res.status(400).json({ error: 'Invalid task ID' });
    }
});

module.exports = router;