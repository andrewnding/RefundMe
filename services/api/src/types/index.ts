import * as moment from 'moment'

export interface PersonType {
    id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    createdAt: moment.Moment,
}

export interface PersonTypeDb {
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

export interface DataStoreType {
    getPersonById: (person_id: string) => Promise<PersonType>
    getPersonByEmail: (email: string) => Promise<PersonType>
    createPerson: (person: PersonType) => Promise<PersonType>
    getItemsFromPerson: (person_id: string) => Promise<ItemType[]>
    createAndAddItemToPerson: (person_id: string, item_id: string, access_token: string) => Promise<void>
}