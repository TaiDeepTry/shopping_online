require("../utils/MongooseUtil");
const Models = require("./Models");

const ReviewDAO = {
    //select review by product id
    async selectAll() {
        const query = {};
        const review = await Models.Review.find(query).exec();
        return review;
    },
    async selectByProductId(_id) {
        const query = { productId: _id };
        const reviews = await Models.Review.find(query).exec();
        let result = [];
        for (let review of reviews) {
            const customer = await Models.Customer.findById(review.customerId);
            const customerName = customer ? customer.name : 'Anonymous';
            const comment = review.comment;
            const star = review.star;
            result.push({customerName, comment, star});
        }
        return result; 
    },
    async insert(review) {
        const mongoose = require("mongoose");
        review._id = new mongoose.Types.ObjectId();
        const result = await Models.Review.create(review);
        return result;
    },
}

module.exports = ReviewDAO;


