// Creating our Favorites model
module.exports = function(sequelize, DataTypes) {
    const Favorite = sequelize.define("Favorite", {
      // The email cannot be null, and must be a proper email before creation
      userID: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
      },
      trails: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
    return Favorite;
};