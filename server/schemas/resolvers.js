const { signToken, AuthenticationError } = require('../utils/auth');
const { User, Location } = require('../models');

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
      }
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
      }
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
      }
    }
  }
};

module.exports = resolvers;