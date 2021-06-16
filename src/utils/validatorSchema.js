//joi is used for validation
const Joi = require('joi');

const registerBodySchema = (user)=>{
    const schema = Joi.object({
        fullName:Joi.string().min(2).max(30).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(7).max(12).required()

    })
    return schema.validate(user);
}

const loginBodySchema = (user)=> {
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(7).max(12).required()
    })
    return schema.validate(user);
}

module.exports = {registerBodySchema, loginBodySchema};
