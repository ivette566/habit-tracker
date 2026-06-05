var express = require('express');
var router = express.Router();
var GoalSchema = require('../models/goal');
const DATABASE = process.env.DATABASE;

router.get('/getGoals', async function (req, res, next) {
    try {
        if (DATABASE === 'MONGODB') {
            let response = await GoalSchema.find({});
            return res.status(200).json(response);
        }
        res.status(500).json({
            error: 'Invalid DATABASE env variable'
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || "Error fetching goals"
        });
    }
});

router.post('/addGoal', async function(req, res, next) {
    if (req.body && req.body.name && req.body.description && req.body.duedate) {
        try {
            req.body.duedate = new Date(req.body.duedate);

            if (DATABASE === 'MONGODB') {

                let goal = new GoalSchema(req.body);
                let response = await goal.save();
                return res.status(200).json(response);
        }
        return res.status(500).json({
            error: 'Invalid DATABASE env variable'
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message || "Error saving goal"
        });
    }
    } else {
        return res.status(400).json({
            error: 'Missing required fields: name, description, duedate'
        });
    }
});


router.delete('/removeGoal/:id', async function (req, res, next)  {
    if (req.params && req.params.id && !isNaN(req.params.id)) {
        let id = req.params.id;
        try {
            if (DATABASE === 'MONGODB') {

                await GoalSchema.findByIdAndDelete(id);
                return res.status(200).json({ 
                    message: "Goal removed successfully"
                });
            }
            return res.status(500).json({
                error: 'Invalid DATABASE env variable'
            });
        } catch (err) {
            return res.status(500).json({
                error: err.message || "Error removing goal"
            });
        }  
    } else {
        res.status(400).json({
            error: "Missing required fields: id" 
        });
    }
});

module.exports = router;