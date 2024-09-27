
// sanitize user
export const sanitize = (user) => {
    
    const { created_at, password, ...rest } = user

    return rest;


}


//sanitize all users
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

// //sanitize user table join to account table
// export const sanitizeUserTableJoin = (userTableJoin) => {

//     const { Id, created_at, password, ...rest } = userTableJoin

//     return rest;
// }
