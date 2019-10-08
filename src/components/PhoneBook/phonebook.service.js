import * as R from 'ramda'

import { FIELDS } from './phonebook.config'
import { mapIndexed } from '@/utils/app.utils'

import { getPhoneBookEntries } from '@/api/phonebook.dataservice'
import logService from '@/services/log.service'

/**
 * Prepare data for component
 * @param {Object} params - Params needed for request and/or data parsing
 * @returns {Array} Array of parsed elements for component
 */
export const getEntries = async (params) => {
  try {
    const entries = await getPhoneBookEntries(params)
    const propsToPick = R.pluck('key', FIELDS)
    const processItem = (item, idx) => ({
      ...R.pick(propsToPick, item),
      id: idx + 1
    })

    return mapIndexed(processItem, entries)
  } catch (e) {
    logService.log(e)
  }
}
