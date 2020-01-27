import * as moment from 'moment';

export interface PersonType {
    id: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    created_at: moment.Moment,
}

export interface ItemType {
    item_id: string,
    access_token: string,
    created_at: moment.Moment,
}