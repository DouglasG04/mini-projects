import { v4 as uuid } from 'uuid';
/**
 * @param {string} description
 */

export class Todo {
    constructor(description) {
        this.id = uuid();
        this.description = description
        this.done = false
        this.createdDate = new Date()
    }
}