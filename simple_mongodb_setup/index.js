'use strict';

/*
Before running this, you need to:
1) install mongodb binary files (see the mongodb_notes.js)
2) start a mongodb background service (local server/database running on localhost:27107 by default) | (see the mongodb_notes.js)
3) you can then run this script to interact with the local mongodb server/database

https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database

Remember, you need to first create a database to interact with and a collection. This script had an 'assistant' database and a collection named 'users' created to play with.

https://developer.mongodb.com/quickstart/node-crud-tutorial/
*/
const { MongoClient, ObjectId } = require('mongodb');

const listDatabases = async (client) => {
    // to query for all databases, specify db()
    const databasesList = await client.db().admin().listDatabases();

    /*
    databasesList = {
        databases: [
            { name: 'admin', sizeOnDisk: 40960, empty: false },
            { name: 'config', sizeOnDisk: 61440, empty: false },
            { name: 'local', sizeOnDisk: 73728, empty: false }
        ],
        totalSize: 176128,
        ok: 1
    }
    */

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));

    return databasesList;
};

const createUser = async (client, user) => {
    const result = await client.db("assistant").collection("users").insertOne(user);
    console.log('New user created: ', result);
};

const createManyUsers = async (client, listOfUsers) => {
    const result = await client.db("assistant").collection("users").insertMany(listOfUsers);

    /*
    result = {
        result: { ok: 1, n: 2 },
        ops: [
            { username: 'max', _id: 60c29d1bd2755920fc5f45e3 },
            { username: 'james', _id: 60c29d1bd2755920fc5f45e4 }
        ],
        insertedCount: 2,
        insertedIds: { '0': 60c29d1bd2755920fc5f45e3, '1': 60c29d1bd2755920fc5f45e4 }
    }

    the insert() commands is an add operation. If you try to add a document and pass in the _id: ObjectId('existingDocumentId') you will receive a duplicate key error.

        E11000 duplicate key error collection: assistant.users index: _id_ dup key: { _id: ObjectId('60c29d1bd2755920fc5f45e3') }

        BulkWriteError: E11000 duplicate key error collection: assistant.users index: _id_ dup key: { _id: ObjectId('60c29d1bd2755920fc5f45e3') }
            at OrderedBulkOperation.handleWriteError (/Users/MaxTam/Desktop/development/assistant_web/simple_mongodb_setup/node_modules/mongodb/lib/bulk/common.js:1352:9)
            at resultHandler (/Users/MaxTam/Desktop/development/assistant_web/simple_mongodb_setup/node_modules/mongodb/lib/bulk/common.js:579:23)
            at /Users/MaxTam/Desktop/development/assistant_web/simple_mongodb_setup/node_modules/mongodb/lib/core/connection/pool.js:405:18
            at processTicksAndRejections (internal/process/task_queues.js:75:11) {
        name: 'BulkWriteError',
        driver: true,
        code: 11000,
        writeErrors: [
            WriteError {
            err: {
                index: 0,
                code: 11000,
                errmsg: "E11000 duplicate key error collection: assistant.users index: _id_ dup key: { _id: ObjectId('60c29d1bd2755920fc5f45e3') }",
                op: { _id: 60c29d1bd2755920fc5f45e3, username: 'max' }
            }
            }
        ],
        result: BulkWriteResult {
            result: {
            ok: 1,
            writeErrors: [
                WriteError {
                err: {
                    index: 0,
                    code: 11000,
                    errmsg: "E11000 duplicate key error collection: assistant.users index: _id_ dup key: { _id: ObjectId('60c29d1bd2755920fc5f45e3') }",
                    op: { _id: 60c29d1bd2755920fc5f45e3, username: 'max' }
                }
                }
            ],
            writeConcernErrors: [],
            insertedIds: [ { index: 0, _id: 60c29d1bd2755920fc5f45e3 } ],
            nInserted: 0,
            nUpserted: 0,
            nMatched: 0,
            nModified: 0,
            nRemoved: 0,
            upserted: []
            },
            [Symbol(upsertedIds)]: undefined,
            [Symbol(insertedIds)]: undefined
        }
        }




    */
    console.log('New users created: ', result);
};

const updateUser = async(client, userId, userKeyValuesToUpdate, removeKeys = false) => {
    console.log('\n\n');
    console.log('userId => ', userId);
    console.log('\n\n');

    let updateConfig = {};
    if (removeKeys) {
        updateConfig = {
            '$unset': userKeyValuesToUpdate
        };
    } else {
        updateConfig = {
            '$set': userKeyValuesToUpdate
        };
    }

    const result = await client.db("assistant").collection("users").updateOne({ _id: ObjectId(userId) }, updateConfig);
    console.log('User updates: ', result);
};

const main = async () => {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('\n' + 'connected to db => ' + '\n');

        // DB CALLS:

        // await listDatabases(client);
        // console.log('\n' + 'listed dbs => ' + '\n');

        // await createUser(client, {
        //     username: 'max'
        // });

        // await createManyUsers(client, [
        //     {
        //         username: 'max'
        //     },
        //     {
        //         username: 'james'
        //     }
        // ]);

        // await updateUser(client, '60c29d1bd2755920fc5f45e3', {
        //     username: 'joey',
        //     appleJacks: true
        // }, false);

    } catch (error) {
        const util = require('util');
        console.log('\n');
        console.log('---------------->');
        console.log('error =>');
        console.log(util.inspect(error, {showHidden: false, depth: null}));
        console.log('<----------------');
        console.log('\n');
    }

    await client.close();
};

main()