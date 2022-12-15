export const mutation = `
type Mutation {
    addUser(data: addUserInput!): User!
    updateUser(id: ID!, data: updateUserInput!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: deleteAllOfListOutput!

    addEvent(data: addEventInput!): Event!
    updateEvent(id: ID!, data: updateEventInput!): Event!
    deleteEvent(id: ID!): Event!
    deleteAllEvents: deleteAllOfListOutput!

    addLocation(data: addLocationInput!): Location!
    updateLocation(id: ID!, data: updateLocationInput!): Location!
    deleteLocation(id: ID!): Location!
    deleteAllLocations: deleteAllOfListOutput!

    addParticipant(data: addParticipantInput!): Participant!
    updateParticipant(id: ID!, data: updateParticipantInput!): Participant!
    deleteParticipant(id: ID!): Participant!
    deleteAllParticipants: deleteAllOfListOutput!
}
`;
