const db = require('../config/db.config.js');
const Customer = db.Customer;

// Create a Customer
exports.create = (req, res) => {
  let customer = {};

  try {
    // Create Customer object from upoading request's body
    customer.first_name = req.body.first_name;
    customer.last_name = req.body.last_name;
    customer.company = req.body.company;
    customer.address = req.body.address;
    customer.city = req.body.city;
    customer.state = req.body.state;
    customer.country = req.body.country;
    customer.postal_code = req.body.postal_code;
    customer.phone = req.body.phone;
    customer.fax = req.body.fax;
    customer.email = req.body.email;

    // Save to database
    Customer.create(customer).then((result) => {
      // send message to client
      res.status(200).json({
        message: ' Successfully Uploaded a Customer',
      });
    });
  } catch (error) {
    res.status(500).json({
      message: 'Fail!',
      error: error.message,
    });
  }
};
exports.retrieveAllCustomers = (req, res) => {
  // find all Customer information
  Customer.findAll()
    .then((customerInfos) => {
      res.status(200).json({
        message: 'Successfull!',
        customers: customerInfos,
      });
    })
    .catch((error) => {
      // log on console
      console.log(error);

      res.status(500).json({
        message: 'Error!',
        error: error,
      });
    });
};
exports.getCustomerById = (req, res) => {
  // find all Customer information from
  let customerId = req.params.id;
  Customer.findByPk(customerId)
    .then((customer) => {
      res.status(200).json({
        message: ' Successfully fetched customer: ' + customerId,
        customers: customer,
      });
    })
    .catch((error) => {
      // log on console
      console.log(error);

      res.status(500).json({
        message: 'Error!',
        error: error,
      });
    });
};
exports.updateById = async (req, res) => {
  try {
    let customerId = req.params.id;
    let customer = await Customer.findByPk(customerId);

    if (!customer) {
      // return a response to client
      res.status(404).json({
        message: 'Sorry, customer not found' + customerId,
        customer: '',
        error: '404',
      });
    } else {
      // update change to database
      let updatedObject = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        age: req.body.age,
      };
      let result = await Customer.update(updatedObject, {
        returning: true,
        where: { id: customerId },
      });

      // return the response to client
      if (!result) {
        res.status(500).json({
          message: 'Error: Cannot update a customer with id:' + req.params.id,
          error: 'Oops Cannot Update ',
        });
      }

      res.status(200).json({
        message: 'Update successfully a Customer with id = ' + customerId,
        customer: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error -> Can not update a customer with id = ' + req.params.id,
      error: error.message,
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    let customerId = req.params.id;
    let customer = await Customer.findByPk(customerId);

    if (!customer) {
      res.status(404).json({
        message: 'Sorry Customer does not exist',
        error: '404',
      });
    } else {
      await customer.destroy();
      res.status(200).json({
        message:
          ' Congratulations, Successfully deleted the Customer: ' + customerId,
        customer: customer,
      });
    }
  } catch (error) {
    res.status(500).json({
      message:
        'Error...... Sorry, unable to find the customer: ' + req.params.id,
      error: error.message,
    });
  }
};
