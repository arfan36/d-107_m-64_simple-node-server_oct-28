const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Simple node Server Running');
});

app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: 'Sabana', email: 'sabana@gmail.com' },
    { id: 2, name: 'Sabnoor', email: 'sabnoor@gmail.com' },
    { id: 3, name: 'Sabila', email: 'sabila@gmail.com' },
];



const uri = "mongodb+srv://dbArfan36:dT728cCDpNufhZdl@clusterarfan36.opuzllc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        const user = { name: 'Nahiya Mahi', email: 'nehi@gmail.com' };
        // const result = await userCollection.insertOne(user);
        // console.log(result);
        app.post('/users', async (req, res) => {
            const user = req.body;

            // users.push(user);
            const result = await userCollection.insertOne(user);
            console.log(result);
            user.id = result.insertedId;
            res.send(user);
        });
    }
    finally {

    }
}

run().catch(err => console.log(err));


app.get('/users', (req, res) => {
    if (req.query.name) {
        // filter by query
        const search = req.query.name;
        const filter = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
        res.send(filter);
    } else {
        res.send(users);
    }
});

// app.post('/users', (req, res) => {
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user);
//     res.send(user);
// });

app.listen(port, () => {
    console.log(`Simple node server running on port ${port}`);
});