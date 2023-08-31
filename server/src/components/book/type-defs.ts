export default `#graphql
  type Book {
    _id: ID!
    title: String!
    description: String
    authors: [Author]!
    released: String
    coverImgUrl: String
  }

  type BooksResponse {
    items: [Book!]!
    totalCount: Int!
  }
`;
