import codesModel from "../models/codes.js";
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => codesModel.getCodes(req, res));

export default router;
