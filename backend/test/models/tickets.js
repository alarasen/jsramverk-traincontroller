/**
 * Test opening and resetting the database
 */

/*global it describe before */

process.env.NODE_ENV = 'test';

import { should } from 'chai';
import { openDb } from '../../db/database.js';
import { getTickets, createTicket } from '../../models/tickets.js';

should();

describe('Test model', () => {
    const colName = 'tickets';
    /**
     * Before test, reset the user database
     */

    before(async () => {
        const db = await openDb();

        try {
            const col = await db.collection(colName);

            await col.deleteMany(); // This deletes the data in the collection
        } catch (err) {
            console.log("During setup following error occured:", err);
        } finally {
            await db.client.close();
        }
    });

    /**
     * Test the model ticketssetup
     */
    describe('tickets', () => {
        // Get tickets, should be empty
        it('should return empty array', async () => {
            const res = await getTickets();

            res.should.be.a('array');
            res.should.have.lengthOf(0);
        });

        it('should data and array with 1 ticket', async () => {
            const inData = {
                code: "ANAtest03",
                trainnumber: "13579",
                traindate: "1984-01-01"
            };
            const res = await createTicket(inData);

            res.should.be.a('object');
            res.should.have.property('_id');
            res.code.should.equal('ANAtest03');
        });

        it('should return array with one item', async () => {
            const res = await getTickets();

            res.should.be.a('array');
            res.should.have.lengthOf(1);
            res[0].should.have.property('_id');
            res[0].trainnumber.should.equal('13579');
        });

        it('should throw TypeError', async () => {
            let error;

            try {
                await createTicket();
            } catch (e) {
                error = e;
            }

            error.should.be.an.instanceOf(TypeError);
        });
    });
});
