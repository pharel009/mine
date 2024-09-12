

export const sanitize = (user) => {
    
    const { created_at, password, ...rest } = user

    return rest;


}