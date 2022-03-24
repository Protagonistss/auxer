import { describe, it, expect } from 'vitest'
import {
  isObject,
  isNull,
  isUndefined,
  isArray,
  isExist,
  isString,
  isNumber,
  isBool,
  isInt
} from '../src/type'

describe('Test Suit Type File', () => {
  it('isObject case', () => {
    expect(isObject([])).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject('')).toBe(false)
    expect(isObject({})).toBe(true)
    expect(isObject(null)).toBe(false)
    expect(isObject(2)).toBe(false)
    expect(isObject(true)).toBe(false)
  })
  it('isNull case', () => {
    expect(isNull([])).toBe(false)
    expect(isNull(undefined)).toBe(false)
    expect(isNull('')).toBe(false)
    expect(isNull({})).toBe(false)
    expect(isNull(null)).toBe(true)
    expect(isNull(2)).toBe(false)
    expect(isNull(true)).toBe(false)
    expect(isNull(false)).toBe(false)
  })
  it('isUndefined case', () => {
    expect(isUndefined([])).toBe(false)
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined('')).toBe(false)
    expect(isUndefined({})).toBe(false)
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined(2)).toBe(false)
    expect(isUndefined(true)).toBe(false)
  })
  it('isArray case', () => {
    expect(isArray([])).toBe(true)
    expect(isArray(undefined)).toBe(false)
    expect(isArray('')).toBe(false)
    expect(isArray({})).toBe(false)
    expect(isArray(null)).toBe(false)
    expect(isArray(2)).toBe(false)
    expect(isArray(true)).toBe(false)
  })
  it('isExist case', () => {
    expect(isExist([])).toBe(true)
    expect(isExist({})).toBe(true)
    expect(isExist(2)).toBe(true)
    expect(isExist(undefined)).toBe(false)
    expect(isExist('')).toBe(false)
    expect(isExist('hello')).toBe(true)
    expect(isExist(null)).toBe(false)
    expect(isExist(true)).toBe(true)
    expect(isExist(false)).toBe(false)
  })
  it('isString case', () => {
    expect(isString([])).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString(2)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString('')).toBe(true)
    expect(isString(null)).toBe(false)
    expect(isString(true)).toBe(false)
  })
  it('isNumber case', () => {
    expect(isNumber([])).toBe(false)
    expect(isNumber({})).toBe(false)
    expect(isNumber(2)).toBe(true)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber('')).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(true)).toBe(false)
  })
  it('isBool case', () => {
    expect(isBool([])).toBe(false)
    expect(isBool({})).toBe(false)
    expect(isBool(2)).toBe(false)
    expect(isBool(undefined)).toBe(false)
    expect(isBool('')).toBe(false)
    expect(isBool(null)).toBe(false)
    expect(isBool(true)).toBe(true)
  })
  it('isInt case', () => {
    expect(isInt([])).toBe(false)
    expect(isInt({})).toBe(false)
    expect(isInt(2)).toBe(true)
    expect(isInt(undefined)).toBe(false)
    expect(isInt('')).toBe(false)
    expect(isInt(null)).toBe(false)
    expect(isInt(true)).toBe(false)
    expect(isInt(2.2)).toBe(false)
    expect(isInt(-2.2)).toBe(false)
    expect(isInt(-2)).toBe(true)
  })
})
