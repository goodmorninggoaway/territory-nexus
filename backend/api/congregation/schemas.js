const Joi = require('joi');

exports.CongregationId = Joi.string();
exports.CongregationName = Joi.string().min(3).description('Name of the congregation, group, or pre-group').optional();
exports.CongregationLanguage = Joi.string().min(2).description('Primary language');
exports.CongregationAlternateLanguages = Joi.array().items(exports.CongregationLanguage).description('Other languages this congregation is responsible for.');
exports.CongregationUsers = Joi.array().items(
    Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
    }),
);
exports.CreateCongregationRequestValidator = {
    payload: Joi.object({
        name: exports.CongregationName,
        language: exports.CongregationLanguage,
        alternateLanguages: exports.CongregationAlternateLanguages,
        admin: Joi.object({
            name: Joi.string().min(2).max(30).required().description('Human-readable name'),
            email: Joi.string().email().required(),
        }).required()
            .description('Initial admin user that will receive the invitation'),
    }).requiredKeys('name', 'language', 'admin'),
};
exports.UpdateCongregationRequestValidator = {
    payload: Joi.object({
        name: exports.CongregationName,
        language: exports.CongregationLanguage,
        alternateLanguages: exports.CongregationAlternateLanguages,
    }).requiredKeys('name', 'language'),
};

exports.Congregation = Joi.object({
    _id: exports.CongregationId,
    name: exports.CongregationName,
    language: exports.CongregationLanguage,
    alternateLanguages: exports.CongregationAlternateLanguages,
    users: exports.CongregationUsers,
}).meta({ className: 'Congregation' });
