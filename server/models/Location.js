const { Schema, model } = require('mongoose');

const locationSchema = new Schema(
    {
        lat: {
            type: Number,
            required: true,
        },
        lon: {
            type: Number,
            required: true,
        },
        tags: {
            type: Array,
            required: true,
        }
    }
);

const Location = model('Location', locationSchema);

module.exports = Location;