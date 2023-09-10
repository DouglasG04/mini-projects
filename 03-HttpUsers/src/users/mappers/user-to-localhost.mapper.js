import { User } from "../models/user";

/**
 * 
 * @param {User} user 
 */

export const userModelToLocalHost = (user) => {
    const {
        id,
        isActive,
        balance,
        avatar,
        firstName,
        lastName,
        gender,
    } = user;


    return {
        id,
        isActive,
        balance,
        avatar,
        first_name: firstName,
        last_name: lastName,
        gender,
    }
}