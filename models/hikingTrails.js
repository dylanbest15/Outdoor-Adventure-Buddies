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
            type: DataTypes.DECIMAL(10,2),
        },
        elevation_gain: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.STRING,
        },
        trail_photo: {
            type: DataTypes.STRING
        }, 
        peakId: {
            type: DataTypes.STRING
        }, 
        regionId: {
            type: DataTypes.STRING
        }
    });
    return HikingTrail;
};
