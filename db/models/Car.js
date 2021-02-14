const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define("Car", {
    year: {
      type: DataTypes.INTEGER,
    },
    manufacturer: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 10000,
      validate: {
        min: 100,
      },
    },
    image: {
      type: DataTypes.STRING,
      isUrl: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  SequelizeSlugify.slugifyModel(Car, {
    source: ["year", "manufacturer", "name"],
  });
  return Car;
};
