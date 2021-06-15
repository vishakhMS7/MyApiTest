module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('customer', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    company: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },

    state: {
      type: Sequelize.STRING,
    },

    country: {
      type: Sequelize.STRING,
    },

    postal_code: {
      type: Sequelize.STRING,
    },

    phone: {
      type: Sequelize.STRING,
    },

    fax: {
      type: Sequelize.STRING,
    },

    email: {
      type: Sequelize.STRING,
    },
  });

  return Customer;
};
