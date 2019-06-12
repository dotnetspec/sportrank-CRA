import { createMemoryHistory } from 'history'
import {render, fireEvent} from '@testing-library/react'
import React from 'react'
import {withRouter} from 'react-router'
import {Router} from 'react-router-dom'

//const { performance } = require('performance');
/**
 * Limits the length of a string for display purposes, replacing the removed text
 * with the replacement entity specified
 *
 * @param {String} strToShorten - string to shorten.
 * @param {Number} maxLength - maximum length of string before appending the replacement entity.
 * @param {String} replacement - string to replace the removed text with, defaults to '…'
 * @param {Boolean} trimMiddle - if true, maxLength chars form the beginning and end will be
 * shown, and the middle of the string will be trimmed, ie '123…789' (maxLength = 3, delimiter = '…')
 * @example
 * const fullLength = '1234567890';
 * limitLength(fullLength, 3);
 * // returns '123…'
 * @example
 * const fullLength = '1234567890';
 * limitLength(fullLength, 3, '-', true);
 * // returns '123-890'
 * @returns {String} the shortened string
 */
export function limitLength (strToShorten, maxLength, replacement, trimMiddle){
    if(!strToShorten) return '';

    const fullStringLength = strToShorten.length;
    const ellips = replacement || '…';

    if(trimMiddle && fullStringLength > maxLength * 2){
      return  [strToShorten.substring(0, maxLength), ellips, strToShorten.substring(fullStringLength - maxLength)].join('');
    }

    if(fullStringLength > maxLength){
      return strToShorten.substring(0, maxLength) + ellips;
    }
    return strToShorten;
  }

/**
 * Limits the length of an address for display purposes, replacing the removed hex
 * chars with the replacement entity specified
 *
 * @param {String} address - address to shorten.
 * @param {Number} maxLength - maximum hex chars to show before appending the replacement.
 * @param {String} replacement - string to replace the removed hex chars with, defaults to '…'
 * @example
 * const fullLength = '0x3901F05c5e296E97c8Dc2ebEdCCa5F010f895552';
 * limitAddressLength(fullLength, 4);
 * // returns '0x3901…5552'
 * @example
 * const fullLength = '0x3901F05c5e296E97c8Dc2ebEdCCa5F010f895552';
 * limitAddressLength(fullLength, 3, '-');
 * // returns '0x390-552'
 * @returns {String} the shortened string
 */
export function limitAddressLength (address, maxLength, replacement){
  if(!address) return '';
  let prepend0x = false;

  if(address.startsWith('0x')){
    address = address.substring(2);
    prepend0x = true;
  }

  return `${prepend0x ? '0x': ''}${limitLength(address, maxLength, replacement, true)}`;
}

/**
 * Formats an ethereum amount using fixed-point notation.
 *
 * @param {any} eth - amount of ethereum to display.
 * @param {Number} decimals - number of decimal places to display.
 * @example
 * const eth = 123.12345678901234567890;
 * limitAddressLength(eth, 4);
 * // returns 123.1234
 * @returns {Number} the ethereum amount in fixed-point notation
 */
export function formatEth(eth, decimals){
  return Number.parseFloat(eth).toFixed(decimals);
}

//to check if an object is empty
export function isEmpty(obj) {
    if(obj === undefined || obj === null){
      return true;
    }else{
      return Object.keys(obj).length === 0;
  }
}

/**
 * Formats an ethereum balance for display
 * @param {*} balance to be formatted
 */
export function formatBalance(balance) {
  //trim middle set to false - looks better
  balance = formatEth(balance, 3)
  return 'Ξ' + limitLength(
    parseFloat(
      balance
    ).toFixed(4), 6, '', true
  );
}

//below just for testing familiarity
export function sum(a, b) {
  return a + b;
}

export function forEach(items, callback) {
for (let index = 0; index < items.length; index++) {
  callback(items[index]);
  }
}

//for testing purposes

export function renderWithRouter(
  ui,
  {route = '/', history = createMemoryHistory({initialEntries: [route]})} = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    //...render(<Router => props => <Router {...props} />,
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}

//for dev - utility - timer
//riteway test framework doesn't like this:
    // let startTime = window.performance.now();  //Run at the beginning of the code
    // export function executingAt() {
    //   return (window.performance.now() - startTime) / 1000;
    // }

  // export default = {
  //   limitLength,
  //   limitAddressLength,
  //   formatEth
  // }
