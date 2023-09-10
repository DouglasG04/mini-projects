import modalHtml from './render-modal.html?raw'
import './render-modal.css'
import { getUserById } from '../../usecases/get-user-by-id';

let modal, form;
let loadedUser = {};

/**
 * 
 * @param {String | Number} id 
 */
export const showModal = async (id) => {
    modal?.classList.remove('hide-modal')
    loadedUser = {}

    if (!id) return;

    const user = await getUserById(id);

    setFormValues(user)
    //console.log(user)

}

export const hideModal = () => {
    modal?.classList.add('hide-modal')
    form?.reset();
}

/**
 * 
 * @param {User} user 
 */
export const setFormValues = (user) => {
    form.querySelector('[name="firstName"]').value = user.firstName
    form.querySelector('[name="lastName"]').value = user.lastName
    form.querySelector('[name="balance"]').value = user.balance
    form.querySelector('[name="isActive"]').value = user.isActive

    loadedUser = user;
    console.log(loadedUser)
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike) => Promise<void>} callback 
 */
export const renderModal = (element, callback) => {
    if (modal) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml
    modal.classList = 'modal-container hide-modal'

    form = modal.querySelector('form')



    modal.addEventListener('click', (event) => {
        console.log(event.target)
        if (event.target.className === 'modal-container') {
            hideModal();
        }

    });


    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const userLike = { ...loadedUser }
        const isActive = document.querySelector('#is-active').checked;

        for (const [key, value] of formData) {
            if (key === 'balance') {
                userLike[key] = +value;
                continue;
            }

            if (key === 'isActive') {
                userLike['isActive'] = true
                continue;
            }

            if(!isActive){
                userLike['isActive'] = false;
                continue;
            }

            userLike[key] = value
        }
        
        await callback(userLike)
        hideModal();

        console.log(userLike)

    })

    element.append(modal)



}