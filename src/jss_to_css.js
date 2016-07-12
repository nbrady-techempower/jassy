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

    // If the property has commas, let's split it up
    // const newKeys = (k.indexOf(',') !== -1) ?
    //   k.split(',').map(i=>i.trim()) : [k.trim()];
    const newKeys = [k];
    // For each of these new keys, let's see if they need prefixing
    newKeys.forEach(nk => {
      autoPrefix(nk).forEach(prefix => {
        // dasherize the prefix
        css += `${dasherize(prefix)}`;
        // Pass in the original key to match the proper values
        const value = _JSStoCSS(jss[k]);
        css += handleValues(jss[k], k, value);
      });
    });

  });
  return css;
};

export const JSStoCSS = (jss) => {
  jss = processJSS(jss);
  return _JSStoCSS(jss);
};
