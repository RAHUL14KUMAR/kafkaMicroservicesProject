const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { emitEvent } = require('../events/emitter');

const createToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const resolvers = {
    Query: {
        user: async (_, { id }) => {
            try {
                const user = await User.findById(id);
                return user;
            } catch (error) {
                throw new Error('User not found');
            }
        },
    },
    Mutation: {
        register: async (_, { username, email, password }) => {
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await User.create({ username, email, password: hashedPassword });

                emitEvent('user-events', { user: user });
                const token = createToken(user);
                return { token, user };


            } catch (error) {
                throw new Error('Registration failed');
            }
        },

        login: async (_, { email, password }) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('User not found');
                }
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error('Invalid password');
                }
                const token = createToken(user);
                return { token, user };
            } catch (error) {
                throw new Error('Login failed');
            }
        },

        updateProfile: async (_, { username, email }, { user }) => {
            try {
                const updatedUser = await User.findByIdAndUpdate(user.id, { username, email }, { new: true });
                emitEvent('user-events', { user: updatedUser });
                return updatedUser;
            }catch (error) {
                throw new Error('Profile update failed');
            }
        }
    }
}

module.exports = resolvers;