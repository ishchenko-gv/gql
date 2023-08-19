import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from "graphql";
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);
const app = express();
app.all('/graphql', createHandler({ schema }));
app.listen(5001, () => console.log('Server is running on http://localhost:5001'));
