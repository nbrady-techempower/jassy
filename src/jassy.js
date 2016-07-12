import { handleValues } from './handle_values';
import { autoPrefix } from './handle_properties';
import { processJSS } from './process_jss';
import { dasherize, isObjNotArr } from './_helpers';

export const _JSStoCSS = (jss) => {
  if (!isObjNotArr(jss)) {
    return jss + '';
  }
  let css = '';
  Object.keys(jss).forEach((k) => {

    autoPrefix(k).forEach(prefix => {
      // dasherize the prefix
      css += `${dasherize(prefix)}`;
      // Pass in the original key to match the proper values
      const value = _JSStoCSS(jss[k]);
      css += handleValues(jss[k], k, value);
    });

  });
  return css;
};

export const jassy = (jss) => {
  // Flatten the object
  jss = processJSS(jss);
  // Then turn it into a css string
  return _JSStoCSS(jss);
};
