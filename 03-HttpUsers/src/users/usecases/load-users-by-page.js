import { localHostUserToModel } from "../mappers/localhost-user.mapper"
import { User } from "../models/user"


/**
 * 
 * @param {Number} page 
 * @returns {Promise<User[]>}
 */




export const loadUserByPage = async (page = 1) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    const user = data.map(userLike => localHostUserToModel(userLike))


    return user
}