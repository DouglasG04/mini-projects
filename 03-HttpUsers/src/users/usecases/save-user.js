import { localHostUserToModel } from "../mappers/localhost-user.mapper";
import { userModelToLocalHost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user";


/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async (userLike) => {

    const user = new User(userLike);

    if (!user.firstName || !user.lastName) throw 'First name and last name are required'



    //TODO: mapper
    const userToSave = userModelToLocalHost(user);
    let userUpdated;


    if (user.id) {
        userUpdated = await updateUser(userToSave)
    } else {
        userUpdated = await createUser(userToSave);
    }

    return localHostUserToModel(userUpdated);
}



/**
 * 
 * @param {Like<User>} user
 */

export const createUser = async (user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users`

    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const newUser = res.json();
    console.log({ newUser });

    return newUser;
}



/**
 * 
 * @param {Like<User>} user
 */

export const updateUser = async (user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`

    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const updatedUser = res.json();
    console.log({ updatedUser });

    return updatedUser;
}