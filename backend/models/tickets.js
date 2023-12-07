import database from '../db/database.js';
import { ObjectId } from 'mongodb';
const collectionName = "tickets";
let dbName = "trains";

if (process.env.NODE_ENV === 'test') {
    dbName = "test";
}

const tickets = {
    getTickets: async function getTickets(req, res) {
        // Access a MongoClient object
        const db = await database.openDb();

        // Get the collection object
        const collection = db.collection(collectionName);

        // Get all documents (tickets) in the collection (trains)
        let allTickets = await collection.find().toArray();

        // Close the database connection
        await db.client.close();

        // Print all documents to the console
        console.log(allTickets);
        return res.json({
            data: allTickets
        });
    },

    createTicket: async function createTicket(req, res) {
        // Access a MongoClient object
        const db = await database.openDb();

        // Get the collection object
        const collection = db.collection(collectionName);

        // Create new document (ticket) in the collection (trains)
        let newTicket = req.body;

        await collection.insertOne(newTicket);

        // Close the database connection
        await db.client.close();

        // Print all documents to the console
        console.log(newTicket);
        return res.json({
            data: newTicket
        });
    },

    updateTicket: async function updateTicket(args) {
        const db = await database.openDb();
        const collection = await db.collection(collectionName);
        // Create ObjectId based on given _id string
        const ticketId = new ObjectId(args._id);

        const result = await collection.updateOne(
            { _id: ticketId },
            { $set: { code: args.code } }
        );

        await db.client.close();

        if ( result.modifiedCount > 0 ) {
            return {
                _id: args._id,
                code: args.code
            };
        }
    },

    deleteTicket: async function deleteTicket(args) {
        const db = await database.openDb();
        const collection = await db.collection(collectionName);
        // Create ObjectId based on given _id string
        const ticketId = new ObjectId(args._id);

        const result = await collection.deleteOne(
            { _id: ticketId }
        );

        await db.client.close();

        if ( result.deletedCount > 0 ) {
            return {
                _id: args._id
            }
        }
    }
};

export default tickets;
