import ticketsModel from "../models/tickets.js";
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => ticketsModel.getTickets(req, res));
router.post('/', (req, res) => ticketsModel.createTicket(req, res));
router.post('/', (req, res) => ticketsModel.updateTicket(req, res));
router.post('/', (req, res) => ticketsModel.deleteTicket(req, res));

export default router;
