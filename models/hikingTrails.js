const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const HikingTrail = sequelize.define("HikingTrail", {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        trail_name: {
            type: DataTypes.STRING,
        },
        mileage: {
            type: DataTypes.INTEGER,
        },
        elevation_gain: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.STRING,
        },
        trail_photo: {
            type: DataTypes.STRING
        }
        // Eventually add peak_id foreign key here
    });
    return HikingTrail;
};
