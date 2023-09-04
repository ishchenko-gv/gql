export default `#graphql
  type UserProfile {
    firstName: String
    lastName: String
    fullName: String
  }

  type User {
    _id: ID!
    email: String
    profile: UserProfile
  }
`;
