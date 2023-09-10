import { localHostUserToModel } from "../mappers/localhost-user.mapper"
import { User } from "../models/user"

/**
 * 
 * @param {String | Number} id 
 * @returns {Promise<User[]>}
 */




export const getUserById = async (id = 1) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`
    const response = await fetch(url)
    const data = await response.json()
    const user = localHostUserToModel(data);


    return user
}