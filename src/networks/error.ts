import { NetworkMessage } from './base'

export class ApiError extends Error {
  constructor(errMsg: NetworkMessage) {
    super(`${errMsg.message}`)
  }
}
