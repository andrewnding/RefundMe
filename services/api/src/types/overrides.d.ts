import { PersonType } from 'types'

declare global {
  namespace Express {
    export interface Request {
      context?: any
    }
  
    export interface User extends PersonType {}
  }
}