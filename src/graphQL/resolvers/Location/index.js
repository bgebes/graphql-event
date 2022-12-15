import MockData from '../../../assets/json/data.json' assert { type: 'json' };
const { locations } = MockData;

export const locationQueries = {
  locations: () => locations,
  location: (_, args) => locations.find((l) => l.id == args.id),
};

export const locationMutations = {
  addLocation: (_, { data }) => {
    let lastID = locations.at(-1).id ?? -1;

    const newLocation = { id: lastID + 1, ...data };

    locations.push(newLocation);
    return newLocation;
  },
  updateLocation: (_, { id, data }) => {
    const selected_index = locations.findIndex((location) => location.id == id);

    if (selected_index == -1) {
      throw new Error('Location not found!');
    }

    const location = locations[selected_index];
    const updatedState = { ...location, ...data };

    location[selected_index] = updatedState;
    return updatedState;
  },
  deleteLocation: (_, { id }) => {
    const location_index = locations.findIndex((location) => location.id == id);

    if (location_index == -1) {
      throw new Error('Location not found!');
    }

    const location = locations[location_index];

    locations.splice(location_index, 1);
    return location;
  },
  deleteAllLocations: () => {
    const count = locations.length;
    locations.splice(0, count);

    return { count };
  },
};
