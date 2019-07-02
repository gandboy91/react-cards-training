/**
 * checks if passed argument is function
 * @param fnToCheck
 * @returns {*|boolean}
 */
export const isFunction = fnToCheck => fnToCheck && ({}.toString.call(fnToCheck) === '[object Function]')
