import { handleValues } from './handle_values';
import { autoPrefix } from './handle_properties';
import { processJSS } from './process_jss';
import { dasherize, isObjNotArr } from './_helpers';

let fontFace = '';

export const _JSStoCSS = (jss) => {
  if (!isObjNotArr(jss)) {
    return jss + '';
  }
  let css = '';

  // separate fontFace array
  if (jss['fontFace']) {
    jss['fontFace'].forEach((ff, i) => {
      jss['fontFace'+i] = ff;
    });
    delete jss['fontFace'];
  }

  Object.keys(jss).forEach((k) => {

    autoPrefix(k).forEach(prefix => {
      if (prefix.indexOf('fontFace') === 0) {
        fontFace += '@font-face';
        const value = _JSStoCSS(jss[k]);
        fontFace += handleValues(jss[k], k, value);
      } else {
        // dasherize the prefix
        css += `${dasherize(prefix)}`;
        // Pass in the original key to match the proper values
        const value = _JSStoCSS(jss[k]);
        css += handleValues(jss[k], k, value);
      }
    });

  });

  // Before we return it, let's replace all the semi-colons in media queries
  // with !important;
  const idx = css.indexOf('@media');
  if (idx !== -1) {
    css = css.substr(0, idx) + css.substr(idx).replace(/;/g, ' !important;');
  }
  return css;
};

export const jassy = (jss) => {
  fontFace = '';
  // Flatten the object
  jss = processJSS(jss);
  // Then turn it into a css string
  return _JSStoCSS(jss) + fontFace;
};
