import { User } from "../models/user"
import { loadUserByPage } from "../usecases/load-users-by-page"

const state = {
    currentPage: 0,
    users: []
}

const loadNextPage = async () => {
    const user = await loadUserByPage(state.currentPage + 1)
    if (user.length === 0) return

    state.currentPage += 1
    state.users = user
}

const loadPreviousPage = async () => {
    if (state.currentPage === 1) return

    const user = await loadUserByPage(state.currentPage - 1)
    state.currentPage -= 1
    state.users = user


}

/**
 * 
 * @param {User} updatedUser 
 */
const onUserChange = (updatedUser) => {
    let wasFound = false

    state.users = state.users.map(user => {
        if (user.id === updatedUser.id) {
            wasFound = true
            return updatedUser;
        }

        return user
    });

    if (state.users.length < 10 && !wasFound) {
        state.users.push(updatedUser);
    }
}


const reloadPage = async () => {
    const user = await loadUserByPage(state.currentPage)
    if (user.length === 0){
        await loadPreviousPage();
        return;
    }
    state.users = user
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChange,
    reloadPage,


    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users],

    /**
     * 
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage,
}