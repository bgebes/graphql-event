export const typeUser = `
type User {
    id: ID!
    username: String!
    email: String!
}
`;

export const addUserInput = `
input addUserInput {
    username: String!
    email: String!
}
`;

export const updateUserInput = `
input updateUserInput {
    username: String
    email: String
}
`;
