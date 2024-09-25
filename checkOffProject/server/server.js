require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const baseTypeDefs = require('./graphql/schema.js');
const userTypeDefs = require('./graphql/typeDefs/userTypeDefs');
const taskTypeDefs = require('./graphql/typeDefs/taskTypeDefs');

const { mergeTypeDefs } = require('@graphql-tools/merge');
const typeDefs = mergeTypeDefs([baseTypeDefs, userTypeDefs, taskTypeDefs]);


const resolvers = require('./graphql/resolvers');
const bodyParser = require('body-parser');





// const authRouter = require('./routes/auth');

const app = express();



//middleware to verify JWT token
app.use((req, res, next) => { 
    const token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

        } catch (error) {
            console.error('Token Verification Error', error);
        }
    }
    next();
});

//apollo server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user}),
});

(async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    //connect to mongoDB
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
    });

})();

