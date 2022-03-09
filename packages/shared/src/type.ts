/** @format */
import type { TUnknownReturnBool } from '../types'

const _toString = Object.prototype.toString

export const isObject: TUnknownReturnBool = arg => {
  if (_toString.call(arg) === '[object Object]') {
    return true
  }
  return false
}

export const isNull: TUnknownReturnBool = arg => {
  if (_toString.call(arg) === '[object Null]') {
    return true
  }
  return false
}

export const isUndefined: TUnknownReturnBool = arg => {
  if (_toString.call(arg) === '[object Undefined]') {
    return true
  }
  return false
}

export const isArray: TUnknownReturnBool = arg => {
  if (_toString.call(arg) === '[object Array]') {
    return true
  }
  return false
}

export const isExist: TUnknownReturnBool = arg => {
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

export const isString: TUnknownReturnBool = arg => {
  return typeof arg === 'string'
}

export const isNumber: TUnknownReturnBool = arg => {
  return typeof arg === 'number'
}

export const isBool: TUnknownReturnBool = arg => {
  return typeof arg === 'boolean'
}

export const isInt: TUnknownReturnBool = arg => {
  return isNumber(arg) && (arg as number) % 1 === 0
}
