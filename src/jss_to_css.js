import { handleValues } from './handle_values';
import { autoPrefix } from './handle_properties';
import { processJSS } from './process_jss';
import { dasherize, isObjNotArr } from './_helpers';

export const _JSStoCSS = (jss) => {
  if (!isObjNotArr(jss)) {
    return jss + '';
  }
  let css = '';
  Object.keys(jss).forEach((k,i) => {
    autoPrefix(k).forEach(prefix => {
      css += `${dasherize(prefix)}`;
      // After dasherizing, pass in the original key to handle proper values
      let value = _JSStoCSS(jss[k]);
      css += handleValues(jss[k], k, value);
    });
  });
  return css;
};

export const JSStoCSS = (jss) => {
  jss = processJSS(jss);
  return _JSStoCSS(jss);
};
