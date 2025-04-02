const { signToken, AuthenticationError } = require("../utils/auth");
const {
  User,
  Location,
  FantasyLocation,
  Spell,
  SpellList,
  BlogPost,
} = require("../models");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate({
        path: "fantasyLocations",
        populate: {
          path: "realLocation",
        },
      });
    },

    userById: async (parent, { id }) => {
      try {
        return await User.findOne({ _id: id }).populate({
          path: "fantasyLocations",
          populate: {
            path: "realLocation",
          },
        });
      } catch (err) {
        console.error("Error finding user by id: ", err);
        throw new Error("Error finding user by id.");
      }
    },

    spellListById: async (parent, { id }) => {
      try {
        return await SpellList.findOne({ _id: id })
          .populate({ path: "user" })
          .populate({ path: "spell", populate: { path: "statBlock" } });
      } catch (e) {
        console.error("Error finding spell list by id: ", e);
        throw new Error("Error finding spell list by id");
      }
    },

    spellLists: async (parent, { userId }) => {
      try {
        return await SpellList.find({ user: userId })
          .populate({ path: "user" })
          .populate({ path: "spell", populate: { path: "statBlock" } });
      } catch (e) {
        console.error(`Error getting spell lists: ${e}`);
        throw new Error(`Error getting spell lists: ${e}`);
      }
    },

    locations: async () => {
      return await Location.find();
    },

    locationsByTags: async (parent, { tags }) => {
      try {
        return await Location.find({ tags: { $all: tags } });
      } catch (err) {
        console.error("Error finding location by tags: ", err);
        throw new Error("Error finding location by tags");
      }
    },

    fantasyLocations: async () => {
      try {
        return await FantasyLocation.find().populate("realLocation");
      } catch (err) {
        console.error("Error finding fantasy locations: ", err);
        throw new Error("Error finding fantasy locations");
      }
    },

    fantasyLocationByName: async (parent, { name }) => {
      try {
        return await FantasyLocation.findOne({ name: name }).populate(
          "realLocation"
        );
      } catch (err) {
        console.error("Error finding fantasy location by name: ", err);
        throw new Error("Error finding fantasy location by name");
      }
    },

    spells: async () => {
      try {
        return await Spell.find().populate("createdBy").populate("statBlock");
      } catch (err) {
        console.error("Error finding all spells: ", err);
        throw new Error("Error finding all spells");
      }
    },

    filteredSpells: async (parent, { levels, schools }) => {
      try {
        // Checks for which filters are actually used
        const filter = {};
        if (schools && schools.length) {
          filter.school = { $in: schools };
        }
        if (levels && levels.length) {
          filter.level = { $in: levels };
        }

        return await Spell.find(filter)
          .populate("createdBy")
          .populate("statBlock");
      } catch (err) {
        console.error("Error filtering spells: ", err);
        throw new Error("Error filtering spells");
      }
    },

    blogPosts: async () => {
      try {
        return await BlogPost.find();
      } catch (e) {
        console.error(e);
        throw new Error("Error getting blog posts", e);
      }
    },
  },

  Mutation: {
    addUser: async (parent, { email, password }) => {
      try {
        const user = await User.create({ email: email, password: password });
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error("Error creating user: ", err);
        throw new Error("Could not create user.");
      }
    },

    login: async (parent, { email, password }) => {
      try {
        // Checks for valid user
        const user = await User.findOne({ email });
        if (!user) {
          throw AuthenticationError;
        }

        // Checks for valid password
        const validPassword = await user.isValidPassword(password);
        if (!validPassword) {
          throw AuthenticationError;
        }

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.error("Error logging in :", err);
        throw new Error("Could not log in.");
      }
    },

    updateUser: async (
      parent,
      { id, email, password, weatherCreateInstruction }
    ) => {
      try {
        const updates = {};

        if (email) {
          updates.email = email;
        }

        if (password) {
          const saltRounds = 10;
          updates.password = await bcrypt.hash(password, saltRounds);
        }

        if (weatherCreateInstruction !== undefined) {
          updates.weatherCreateInstruction = weatherCreateInstruction;
        }

        const updatedUser = await User.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $set: updates,
          },
          {
            new: true,
            runValidators: true,
          }
        );

        return updatedUser;
      } catch (err) {
        console.error("Could not update user: ", err);
        throw new Error("Could not update user.");
      }
    },

    createFantasyLocation: async (parent, { name, realLocation }) => {
      try {
        return (
          await FantasyLocation.create({
            name: name,
            realLocation: realLocation,
          })
        ).populate("realLocation");
      } catch (err) {
        console.error("Could not create fantasy location: ", err);
        throw new Error("Could not create fantasy location");
      }
    },

    addFantasyLocation: async (parent, { id, fantasyLocationId }) => {
      try {
        return await User.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $addToSet: { fantasyLocations: fantasyLocationId },
          },
          {
            new: true,
          }
        ).populate({
          path: "fantasyLocations",
          populate: {
            path: "realLocation",
          },
        });
      } catch (err) {
        console.error("Could not add fantasy location: ", err);
        throw new Error("Could not add fantasy location.");
      }
    },

    editFantasyLocation: async (parent, { name, locationId }) => {
      try {
        return await FantasyLocation.findOneAndUpdate(
          {
            name: name,
          },
          {
            $set: {
              name: name,
              realLocation: locationId,
            },
          },
          {
            new: true,
          }
        ).populate({
          path: "fantasyLocations",
          populate: {
            path: "realLocation",
          },
        });
      } catch (err) {
        console.error("Could not edit fantasy location: ", err);
        throw new Error("Could not edit fantasy location");
      }
    },

    removeFantasyLocation: async (parent, { id, fantasyLocationId }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $pull: { fantasyLocations: fantasyLocationId },
          },
          {
            new: true,
          }
        ).populate({
          path: "fantasyLocations",
          populate: {
            path: "realLocation",
          },
        });

        await FantasyLocation.deleteOne({ _id: fantasyLocationId });

        return updatedUser;
      } catch (err) {
        console.error("Could not remove fantasy location: "), err;
        throw new Error("Could not remove fantasy location");
      }
    },

    deleteSpell: async (parent, { id }) => {
      try {
        await Spell.deleteOne({ _id: id });
      } catch (err) {
        console.error("Error deleting spell: ", err);
        throw new Error("Error deleting spell");
      }
    },

    createSpellList: async (parent, args) => {
      const { name, spell, user, spellSlots, preparedSpells } = args;

      try {
        const list = await SpellList.create({
          name,
          spell,
          user,
          spellSlots,
          preparedSpells,
          class: args.class,
        });

        return (await list.populate("user")).populate("spell");
      } catch (e) {
        throw new Error(`Error creating spell list: ${e}`);
      }
    },

    updateSpellList: async (
      parent,
      { listId, name, spells, preparedSpells, spellSlots, listClass }
    ) => {
      try {
        return await SpellList.findOneAndUpdate(
          { _id: listId },
          {
            $set: {
              name,
              spell: spells,
              preparedSpells,
              class: listClass,
              spellSlots,
            },
          },
          { new: true }
        )
          .populate({ path: "user" })
          .populate({ path: "spell", populate: { path: "statBlock" } });
      } catch (e) {
        throw new Error(`Error updating spell list: ${e}`);
      }
    },

    deleteSpellList: async (parent, { id }) => {
      try {
        await SpellList.deleteOne({ _id: id });
        return true;
      } catch (e) {
        throw new Error(`Error deleting spell list: ${e}`);
      }
    },
  },
};

module.exports = resolvers;
