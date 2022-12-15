import MockData from '../../../assets/json/data.json' assert { type: 'json' };
const { users } = MockData;

export const userQueries = {
  users: () => users,
  user: (_, args) => users.find((u) => u.id == args.id),
};

export const userMutations = {
  addUser: (_, { data }) => {
    let lastID = users.at(-1).id ?? -1;

    const newUser = { id: lastID + 1, ...data };

    users.push(newUser);
    return newUser;
  },
  updateUser: (_, { id, data }) => {
    const selected_index = users.findIndex((user) => user.id == id);

    if (selected_index == -1) {
      throw new Error('User not found!');
    }

    const user = users[selected_index];
    const updatedState = { ...user, ...data };

    users[selected_index] = updatedState;
    return updatedState;
  },
  deleteUser: (_, { id }) => {
    const user_index = users.findIndex((user) => user.id == id);

    if (user_index == -1) {
      throw new Error('User not found!');
    }

    const user = users[user_index];

    users.splice(user_index, 1);
    return user;
  },
  deleteAllUsers: () => {
    const count = users.length;
    users.splice(0, count);

    return { count };
  },
};
