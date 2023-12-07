/**
 * Test opening and resetting the database
 */

/*global it describe before */

process.env.NODE_ENV = 'test';

import { should } from 'chai';
import { openDb, getCollection } from '../../db/database.js';
import resetCollection from '../../db/setup.js';

should();

describe('Test database', () => {
    /**
     * Before test, reset the database and remove all collections
     */
    before(async () => {
        const db = await openDb();

        try {
            const collections = await db.listCollections().toArray();

            for (const col of collections) {
                await db.collection(col.name).drop();
            }
        } catch (err) {
            console.log("During setup following error occured:", err);
        } finally {
            await db.client.close();
        }
    });

    /**
     * Test the database setup function. Maybe this could be removed or moved but
     * it's good to have a way to easy reset a collection while still in develop-mode that
     * is separated from the database.js file.
     */
    describe('Test reset function', () => {
        const colName = "testCol";

        // Resets the collection
        it('should return empty array', async () => {
            await resetCollection(colName);

            const res = await getCollection(colName);

            res.should.be.a('array');
            res.should.have.lengthOf(0);
        });

        // Simulates using an JSON-file as inputdata
        it('should return 2 documents', async () => {
            // Using an array to simulate documents from a JSON-file.
            const doc = [
                {
                    "name": "first document"
                },
                {
                    "name": "second document"
                }
            ];

            await resetCollection(colName, doc);

            const res = await getCollection(colName, doc);

            res.should.be.a('array');
            res.should.have.lengthOf(2);
            res[0].should.have.property("name");
            res[1].should.have.property("name");
        });

        // Resets the collection again
        it('should return empty array', async () => {
            await resetCollection(colName);

            const res = await getCollection(colName);

            res.should.be.a('array');
            res.should.have.lengthOf(0);
        });
    });
});
