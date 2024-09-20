

export const sanitize = (user) => {
    
    const { created_at, password, ...rest } = user

    return rest;


}



export const sanitizeUserArray = (users) => {

    return users.map((user) => {
        return sanitize(user)
    })
        
    
    // const sanitized = []

    // for (let i = 0; i < users.length; i) {
    //     sanitized.push(sanitize(users[i]))
    // }

    // return sanitized
}