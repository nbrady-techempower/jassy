import { isObjNotArr, isUnitlessNumber } from './_helpers';

export const addUnit = (property, value) =>
  (isUnitlessNumber[property] || value === 0 || value === '0') ?
    value : `${value}px`;

export const handleValues = (block, key, value) => {
  let css = '';

  if (Array.isArray(value)) {
    css += value.join(',');
  } else if (!isObjNotArr(block)) {

    /**
     * Handle the display flex auto-prefixing
     * This is the only value that needs auto-prefixing
     */
    if (key == 'display' && value == 'flex') {
      css += ':-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;';
    } else if (isNaN(value)) {
      css += `:${value};`;
    } else {
      css += `:${addUnit(key, value)};`;
    }
  } else {
    css += `{${value}}`;
  }

  return css;
};