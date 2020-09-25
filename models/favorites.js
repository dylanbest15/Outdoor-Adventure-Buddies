// Creating our Favorites model
module.exports = function (sequelize, DataTypes) {
  const Favorite = sequelize.define("Favorite", {
    // The email cannot be null, and must be a proper email before creation
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true
    }
  });

  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Favorite.belongsTo(models.HikingTrail, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Favorite;
};
