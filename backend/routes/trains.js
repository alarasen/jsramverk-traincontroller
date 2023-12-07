import trainsModel from "../models/trains.js";
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => trainsModel.getTrains(req, res));
router.get('/', (req, res) => trainsModel.fetchAllDelayedTrains(req, res));
router.get('/', (req, res) => trainsModel.fetchTrainPositions(req, res));

export default router;
