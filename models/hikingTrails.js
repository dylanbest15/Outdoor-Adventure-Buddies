module.exports = function (sequelize, DataTypes) {
    const HikingTrail = sequelize.define("HikingTrail", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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
        }
        // Eventually add peak_id foreign key here
    });
    return HikingTrail;
};
