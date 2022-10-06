const Joi = require('joi');

const uRegistrationValidation = data => {
    const userSchema = Joi.object({
        name: Joi.string().min(3).max(60).required(),
        email: Joi.string().required().email().trim().lowercase(),
        mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        password: Joi.string().min(6).required(),
        repeat_password: Joi.ref('password')
    });

    return userSchema.validate(data);
};

const uCategoryValidation = data => {
    const uCategorySchema = Joi.object({
        title: Joi.string().required(),
        userId: Joi.string().required().hex().length(24)
    });

    return uCategorySchema.validate(data);
};

const uProductValidation = data => {
    const uProductSchema = Joi.object({
        product_name: Joi.string().required(),
        categoryId: Joi.string().required().hex().length(24),
        prize: Joi.number().integer().required(),
        discount: Joi.number().integer().required(),
        total_quantity: Joi.number().integer().required()
    });

    return uProductSchema.validate(data);
};

const uProductReviewValidation = data => {
    const uReviewSchema = Joi.object({
        productId: Joi.string().required().hex().length(24),
        reviewedBy: Joi.string().required(),
        rating: Joi.number().integer().required(),
        review: Joi.string().required()
    });

    return uReviewSchema.validate(data);
};

const sRegistrationValidation = data => {
    const sellerSchema = Joi.object({
        name: Joi.string().min(3).max(60).required(),
        company_name: Joi().string.required(),
        email: Joi.string().required().email().trim().lowercase(),
        mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        password: Joi.string().min(6).required(),
        repeat_password: Joi.ref('password')
    });

    return sellerSchema.validate(data);
};

const sCategoryValidation = data => {
    const sCategorySchema = Joi.object({
        title: Joi.string().required(),
        sellerId: Joi.string().required().hex().length(24)
    });

    return sCategorySchema.validate(data);
};

const sProductValidation = data => {
    const sProductSchema = Joi.object({
        product_name: Joi.string().required(),
        categoryId: Joi.string().required().hex().length(24),
        prize: Joi.number().integer().required(),
        discount: Joi.number().integer().required(),
        total_quantity: Joi.number().integer().required()
    });

    return sProductSchema.validate(data);
};

const sProductReviewValidation = data => {
    const sReviewSchema = Joi.object({
        productId: Joi.string().required().hex().length(24),
        reviewedBy: Joi.string().required(),
        rating: Joi.number().integer().required(),
        review: Joi.string().required()
    });

    return sReviewSchema.validate(data);
};

module.exports = { uRegistrationValidation, uCategoryValidation, uProductValidation, uProductReviewValidation, sRegistrationValidation, sCategoryValidation, sProductValidation, sProductReviewValidation };
