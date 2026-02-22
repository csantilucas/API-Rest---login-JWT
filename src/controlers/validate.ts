import joi from "joi"; // ou @hapi/joi se não quiser atualizar

export const registerValidate = (data: any) => {
    
    const schema = joi.object({
        name: joi.string().required().min(3),
        email: joi.string().required().email(),
        password: joi.string().required().min(6)
    });

    return schema.validate(data);
};

export const loginValidate = (data: any) => {
    
    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required().min(6)
    });

    return schema.validate(data);
};