const customers = require('./customers');

module.exports = {
  /**
   * @param {string} search
   */
  getAll: search => {
    if (search) {
      return (
        customers.filter(
          p =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            (p.firstname || '').toLowerCase().includes(search.toLowerCase()) ||
            (p.hobbies &&
              p.hobbies.some(h =>
                h.toLowerCase().includes(search.toLowerCase())
              ))
        ) || []
      );
    }

    return customers;
  },
  getById: id => customers.find(p => p.id === +id),
  create: newCustomer => {
    let lastCustomer = customers.sort((a, b) => b.id - a.id)[0];
    lastCustomer = lastCustomer || { id: 0 };

    newCustomer.id = lastCustomer.id + 1;
    customers.push(newCustomer);

    return newCustomer;
  },
  update: customer => {
    let index = customers.findIndex(p => p.id === +customer.id);
    customers.splice(index, 1, { ...customers[index], ...customer });

    return customer;
  },
  delete: id => {
    const index = customers.findIndex(i => i.id === +id);

    if (index > -1) {
      customers.splice(index, 1);
    }

    return {};
  }
};
