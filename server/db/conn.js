const mongoose = require('mongoose');

const db = process.env.DATABASE;

mongoose.set('strictQuery', false);

mongoose.connect(db, { useNewUrlParser: true }).then(() => {
    console.log("Connection successful");
}).catch((err) => [
    console.log(err)
]);