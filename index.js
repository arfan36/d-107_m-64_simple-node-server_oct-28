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
client.connect(err => {
    const collection = client.db("simpleNode").collection("users");
    // perform actions on the collection object
    console.log('database connected');
    client.close();
});



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

app.post('/users', (req, res) => {
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    console.log(user);
    res.send(user);
});

app.listen(port, () => {
    console.log(`Simple node server running on port ${port}`);
});