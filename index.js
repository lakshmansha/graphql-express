// index.js

// Import required modules
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const db = require('./db');

// Intialize DB
db.init();

// Import the Post model
const Post = require('./models/post');

// GraphQL schema
const schema = buildSchema(`
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    hello: String
    getPosts: [Post]
  }
`);

// Root resolver
const root = {
  hello: () => 'Hello, GraphQL Server',
  getPosts: async () => {
    try {
      // Fetch all posts from MongoDB
      const posts = await Post.find();
      return posts;
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  },
};

// Create an Express server
const app = express();

// Create a GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // Set this to false if you don't want the GraphiQL interface
  })
);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`);
});
