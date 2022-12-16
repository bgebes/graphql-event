export const typeParticipant = `
type Participant {
    id: ID!
    user_id: ID!
    user: User!
    event_id: ID!
    event: Event!
}
`;

export const addParticipantInput = `
input addParticipantInput {
    user_id: ID!
    event_id: ID!
}
`;

export const updateParticipantInput = `
input updateParticipantInput {
    user_id: ID
    event_id: ID
}
`;

export const participantSubscriptionType = `
participantAdded: Participant!
participantUpdated: Participant!
participantDeleted: Participant!
`;
