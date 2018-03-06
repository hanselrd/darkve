export default `
  type User {
    id: ID!
    name: String!
    email: String!
    dob: Date!
    language: String!
    online: Boolean!
  }

  type Query {
    users: [User!]
    user(id: ID!): User
    currentUser: User
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!, dob: Date!, language: String): AuthPayload!
    login(email: String!, password: String): AuthPayload!
  }
`;
