const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const router = Router();




//@desc     Get all Logs
//@route    GET /api/logs
//@access   public
router.get('/', async (req, res, next) => {
  try {
    const logs = await LogEntry.find();
    res.json(logs);
  } catch (error) {
    next(error);
  }
});


// @desc    Create new Log entry
// @route   POST /api/logs
// @access  public
router.post('/', async (req, res, next) => {
  // Log Request
  console.log(req.body);

  try {
    // Create new Entry into DB
    const logEntry = new LogEntry(req.body);

    const createdEntry = await logEntry.save();

    res.json(createdEntry);

  } catch (error) {
    console.log(error.name);

    if (error.name === 'ValidationError') {
      res.status(422);
    }

    //passed to error handler
    next(error);
  }
})

module.exports = router
