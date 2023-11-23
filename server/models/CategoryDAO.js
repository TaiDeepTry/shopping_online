require('../utils/MongooseUtil');
const Models = require('./Models');

const CategoryDAO = {
  async selectAll() {
    const query = {};
    const categories = await Models.Category.find(query).exec();
    return categories;
  },
  async insert(category) {
    const mongoose = require('mongoose');
    category._id = new mongoose.Types.ObjectId();
    const result = await Models.Category.create(category);
    return result;
  },
  async delete(_id) {
    const result = await Models.Category.findByIdAndRemove(_id);
    return result;
  },
  async selectByID(_id) {
    const category = await Models.Category.findById(_id).exec();
    return category;
  } 
};
module.exports = CategoryDAO;