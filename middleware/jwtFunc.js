import jwt from "jsonwebtoken"

export const jwtCheck = (token) =>{
    try {
        const check = jwt.verify(token.value, process.env.JWT_KEY)
        return check
    } catch (error) {
        return false
    }
}

export const jwtGen = (payload) =>{
    const token = jwt.sign(payload, process.env.JWT_KEY)
    return token
}