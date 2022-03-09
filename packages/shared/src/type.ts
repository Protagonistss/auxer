/** @format */

import { TReturnBool } from '../typings'

const _toString = Object.prototype.toString

export const isObject: TReturnBool = arg => {
  if (_toString.call(arg) === '[object Object]') {
    return true
  }
  return false
}

export const isNull: TReturnBool = arg => {
  if (_toString.call(arg) === '[object Null]') {
    return true
  }
  return false
}

export const isUndefined: TReturnBool = arg => {
  if (_toString.call(arg) === '[object Undefined]') {
    return true
  }
  return false
}

export const isArray: TReturnBool = arg => {
  if (_toString.call(arg) === '[object Array]') {
    return true
  }
  return false
}

export const isString: TReturnBool = arg => {
  if (_toString.call(arg) === '[object String]') {
    return true
  }
  return false
}

export const isExist: TReturnBool = arg => {
  if (!arg) {
    return false
  }
  if (isNull(arg)) {
    return false
  }
  if (isUndefined(arg)) {
    return false
  }
  return true
}
