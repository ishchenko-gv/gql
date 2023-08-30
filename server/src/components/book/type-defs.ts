export default `#graphql
  type Book {
    _id: ID!
    title: String!
    authors: [Author]!
    released: String
    coverImgUrl: String
  }
`;
