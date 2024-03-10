const { signToken, AuthenticationError } = require('../utils/auth');
const { User, Location, FantasyLocation } = require('../models');

const resolvers = {
  Query: {
    locations: async () => {
      return await Location.find();
    },

    locationsByTags: async (parent, { tags }) => {
      try {
        return await Location.find({ tags: { $all: tags }});
      } catch (err) {
        console.error('Error finding location by tags: ', err);
        throw new Error('Error finding location by tags');
      };
    },

    fantasyLocations: async () => {
      try {
          return await FantasyLocation.find();
      } catch (err) {
        console.error('Error finding fantasy locations: ', err);
        throw new Error('Error finding fantasy locations');
      };
    },

    fantasyLocationByName: async (parent, { name }) => {
      try {
        return await FantasyLocation.findOne({ name: name });
      } catch (err) {
        console.error('Error finding fantasy location by name: ', err);
        throw new Error('Error finding fantasy location by name');
      };
    }
  },

  Mutation: {
    addUser: async (parent, { userData }) => {
      try {
        const user = await User.create({ userData });
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error('Error creating user: ', err);
        throw new Error('Could not create user.');
      };
    },

    login: async (parent, { email, password }) => {
      try {

        // Checks for valid user
        const user = await User.findOne({ email });
        if (!user) {
          throw AuthenticationError;
        };

        // Checks for valid password
        const validPassword = await user.isValidPassword(password);
        if (!validPassword) {
          throw AuthenticationError;
        };

        const token = signToken(user);
        return { token, user }

      } catch (err) {
        console.error('Error logging in :', err);
        throw new Error('Could not log in.');
      };
    },

    addFantasyLocation: async (parent, { name, locationId }) => {
      try {
        return await FantasyLocation.create({ name, locationId });
      } catch (err) {
        console.error('Could not add fantasy location: ', err);
        throw new Error('Could not add fantasy location');
      };
    },

    editFantasyLocation: async (parent, { name, locationId }) => {
      try {
        return await FantasyLocation.findOneAndUpdate(
          {
            name: name,
          },
          {
            $set: {
              name, locationId
            }
          },
          {
            new: true
          }
        )
      } catch (err) {
        console.error('Could not edit fantasy location: ', err);
        throw new Error('Could not edit fantasy location');
      };
    }
  }
};

module.exports = resolvers;