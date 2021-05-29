export const loginStart = (userCred) => ({
    type : "LOGIN_START"
})

export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    //In case of success we recieve payload of user data
    payload : user
})

export const loginFail = (error) => ({
    type: "LOGIN_FAILED",
    payload: error
})


export const Follow = (userId) =>
({
    type: 'FOLLOW',
    payload: userId,
            
})
export const Unfollow = (userId) =>
({
    type: 'UNFOLLOW',
    payload: userId,
            
})