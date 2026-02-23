import joi from "joi"; // ou @hapi/joi se não quiser atualizar

export const registerValidate = (data: any) => {
    
    const schema = joi.object({
        name: joi.string().required().min(3).max(50),
        email: joi.string().required().email().max(70),
        password: joi.string().required().min(6)
    });

    return schema.validate(data);
};

export const registerValidateEvent = (data: any) => {
    const schema = joi.object({
        title: joi.string().required().min(3).max(50),
        description: joi.string().required().max(5000), // Removido .describe()
        date: joi.date().required(),
        capacity: joi.number().required()
    });

    return schema.validate(data);
};

export const loginValidate = (data: any) => {
    
    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required()
    });

    return schema.validate(data);
};


export const registerValidateLinkEvent = (data: any) => {
    
    const schema = joi.object({
        userID: joi.string().required()
    });

    return schema.validate(data);

};


