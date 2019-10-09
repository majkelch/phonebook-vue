/**
 * Common utils for app
 */
import * as R from 'ramda'

/**
 * Adds index to R.map
 */
export const mapIndexed = R.addIndex(R.map)

/**
 * Remove one element by index from collection
 */
export const removeOneFromCollectionByIdx = (index) => R.remove(index, 1)
