export const locationQueries = {
  locations: (_, __, { db }) => db.locations,
  location: (_, args, { db }) => db.locations.find((l) => l.id == args.id),
};

export const locationMutations = {
  addLocation: (_, { data }, { db }) => {
    let lastID = db.locations.at(-1).id ?? -1;

    const newLocation = { id: lastID + 1, ...data };

    db.locations.push(newLocation);
    return newLocation;
  },
  updateLocation: (_, { id, data }, { db }) => {
    const selected_index = db.locations.findIndex(
      (location) => location.id == id
    );

    if (selected_index == -1) {
      throw new Error('Location not found!');
    }

    const location = db.locations[selected_index];
    const updatedState = { ...location, ...data };

    db.locations[selected_index] = updatedState;
    return updatedState;
  },
  deleteLocation: (_, { id }, { db }) => {
    const location_index = db.locations.findIndex(
      (location) => location.id == id
    );

    if (location_index == -1) {
      throw new Error('Location not found!');
    }

    const location = db.locations[location_index];

    db.locations.splice(location_index, 1);
    return location;
  },
  deleteAllLocations: (_, __, { db }) => {
    const count = db.locations.length;
    db.locations.splice(0, count);

    return { count };
  },
};
