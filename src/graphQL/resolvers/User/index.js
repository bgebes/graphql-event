export const userQueries = {
  users: (_, __, { db }) => db.users,
  user: (_, args, { db }) => db.users.find((u) => u.id == args.id),
};

export const userMutations = {
  addUser: (_, { data }, { pubsub, db }) => {
    let lastID = db.users.at(-1).id ?? -1;

    const newUser = { id: lastID + 1, ...data };

    db.users.push(newUser);
    pubsub.publish('userCreated', newUser);

    return newUser;
  },
  updateUser: (_, { id, data }, { db }) => {
    const selected_index = db.users.findIndex((user) => user.id == id);

    if (selected_index == -1) {
      throw new Error('User not found!');
    }

    const user = db.users[selected_index];
    const updatedState = { ...user, ...data };

    db.users[selected_index] = updatedState;
    return updatedState;
  },
  deleteUser: (_, { id }, { db }) => {
    const user_index = db.users.findIndex((user) => user.id == id);

    if (user_index == -1) {
      throw new Error('User not found!');
    }

    const user = db.users[user_index];

    db.users.splice(user_index, 1);
    return user;
  },
  deleteAllUsers: (_, __, { db }) => {
    const count = db.users.length;
    db.users.splice(0, count);

    return { count };
  },
};

export const userSubscriptions = {
  userCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.subscribe('userCreaxted'),
    resolve: (payload) => payload,
  },
};
