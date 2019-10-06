/**
 * Phone book dataservice
 */
import { phonebook } from '@/config/endpoint.config'

/**
 * Get list of phone book entries
 * @param {Object} params - Params for request
 * @param {Number} params.amount - Params needed for request and/or data parsing
 * @returns {Promise<Array>} Fetched elements
 */
export const getPhoneBookEntries = ({ amount }) => {
  return fetch(`${phonebook.list}${amount}`)
    .then(res => res.json())
}
