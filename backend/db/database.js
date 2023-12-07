// dotenv is needed for accesing .env variables for tests.
import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';

const dbUser = process.env.ATLAS_USERNAME;
const dbPass = process.env.ATLAS_PASSWORD;


/**
 * Object to use for opening the mongoDb connection
 */
const database = {
    /**
     * Opens a connection to the MongoDB database.
     *
     * @returns {Promise<object>} A Promise that resolves to a MongoDB database object.
     * @throws {Error} If there is an error connecting to the MongoDB database.
     */
    openDb: async function openDb() {
        try {
            let dbName = 'trains';

            // Use test database when doing test
            if (process.env.NODE_ENV === 'test') {
                dbName = 'test';
            } 
            const dsn = `mongodb+srv://${dbUser}:${dbPass}@cluster0.v8m4hqa.mongodb.net/?retryWrites=true&w=majority`;

            const client = new MongoClient(dsn);

            const db = client.db(dbName);

            return db;
            
        } catch (err) {
            console.error("Error connecting to MongoDB:", err);
            throw err;
        }
    },

    /**
     * Get collection from database as an array
     *
     * @param {string} colName Name of the collection
     * @returns {array}
     */
    getCollection: async function getCollection(colName) {
        // let dbName = 'trains';
        const db = await database.openDb();
        // await client.connect();
        // const db = client.db(dbName);
        let data;

        try {
            const collection = await db.collection(colName);

            data = await collection.find().toArray();
        } catch (err) {
            console.error(`Error getting ${colName}:`, err);
        }

        await db.client.close();

        return data || [];
    }
};

export default database;
