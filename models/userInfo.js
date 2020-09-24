// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const userInfo = sequelize.define("userInfo", {
    // The email cannot be null, and must be a proper email before creation
    user_name: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return userInfo;
};
