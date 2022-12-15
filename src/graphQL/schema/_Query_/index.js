export const query = `
type Query {
    events: [Event!]!
    event(id: ID!): Event!

    locations: [Location!]!
    location(id: ID!): Location!

    users: [User!]!
    user(id: ID!): User!

    participants: [Participant!]!
    participant(id: ID!): Participant!
}
`;
