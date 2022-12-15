export const typeLocation = `
type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
}
`;

export const addLocationInput = `
input addLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
}
`;

export const updateLocationInput = `
input updateLocationInput {
    name: String
    desc: String
    lat: Float
    lng: Float
}
`;
