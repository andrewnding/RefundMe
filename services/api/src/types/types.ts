import * as moment from 'moment'

export interface PersonType {
    id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    createdAt: moment.Moment,
}

export interface PersonParams {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    createdAt?: moment.Moment
}

export interface ItemType {
    item_id: string,
    access_token: string,
    created_at: moment.Moment,
}