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
        const value = _JSStoCSS(jss[k]);

        fontFace += '@font-face';
        fontFace += handleValues(jss[k], k, value);
      } else {
        const value = _JSStoCSS(jss[k]);

        // dasherize the prefix
        css += `${dasherize(prefix)}`;
        // Pass in the original key to match the proper values
        css += handleValues(jss[k], k, value);
      }
    });

  });

  return css;
};

export const jassy = (jss) => {
  fontFace = '';

  /**
   * Flatten the object with processJSS and then
   * turn it into a css string with _JSStoCSS
   */
  jss = _JSStoCSS(processJSS(jss));

  /**
   * Before we return it, let's replace all the semi-colons in media queries
   * with !important;
   */
  const idx = jss.indexOf('@media');
  if (idx !== -1) {
    jss = jss.substr(0, idx) + jss.substr(idx).replace(/;/g, ' !important;');
  }

  // now return it with the appended fontFace
  return jss + fontFace;
};
