import delayedModel from "../models/delayed.js";
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => delayedModel.getDelayedTrains(req, res));

export default router;
