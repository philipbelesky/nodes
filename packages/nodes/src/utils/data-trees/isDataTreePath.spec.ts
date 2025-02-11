import { expect, test } from '@jest/globals';
import { isDataTreePath } from './isDataTreePath'

test('{0}', () => {
    const value = '{0}'
    const result = isDataTreePath(value)
    expect(result).toBe(true)
})

test('{0;}', () => {
    const value = '{0;}'
    const result = isDataTreePath(value)
    expect(result).toBe(false)
})


