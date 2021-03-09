module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "ermm.. Username already exists",
      },
    },
    password: {
      type: DataTypes.PASSWORD,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "This email address is already used",
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Must be standard email format (email@domain.com)",
        },
      },
    },

    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  });
  return User;
};
