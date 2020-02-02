import * as moment from 'moment';
import * as uuidv4 from 'uuid/v4'
import { PersonType, PersonParams } from '../types/types'

class Person {
    id: string
    email: string
    password: string
    firstName: string
    lastName: string
    createdAt: moment.Moment

    constructor(options: PersonParams) {
        this.id = uuidv4()
        this.email = options.email || ''
        this.password = options.password || ''
        this.firstName = options.firstName || ''
        this.lastName = options.lastName || ''
        this.createdAt = moment()
    }

    create() {
        
    }

    static getById(id: string): Person {
        return 
    }

    static getByEmail(email: string): Person {
        return
    }
}

export default Person