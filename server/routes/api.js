const express = require('express');
const tripRouter = require('./tripRouter');
const router = express.Router();


router.use('/trips', tripRouter);
