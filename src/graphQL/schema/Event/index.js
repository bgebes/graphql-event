export const typeEvent = `
type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    location: Location!
    user_id: ID!
    user: User!
    participants: [Participant!]!
}
`;

export const addEventInput = `
input addEventInput {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
}
`;

export const updateEventInput = `
input updateEventInput {
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: ID
    user_id: ID
}
`;
