/**
 * TODO: Start using immutable objects
 * TODO: And clean up code duplication
 */

import {
  isClass,
  isConnectedClass,
  isHTMLTag,
  isPseudoSelector,
  isMediaQuery
} from './_helpers';

export const processJSS = (style) => {

  if (Array.isArray(style)) return;

  let completedStyle = {};

  // Collect all the media strings
  const completedMediaQueries = {};

  let checkStyle = Object.assign({}, style);

  /**
   * While there's still styles to check. We'll use checkStyle to
   * loop back over styles that might need to be retested.
   */
  while (Object.keys(checkStyle).length) {

    const checkingStyle = Object.assign({}, checkStyle);
    // Reset checkStyle
    checkStyle = {};

    // Begin looping over all the style keys
    Object.keys(checkingStyle).forEach(selector => {
      const value = checkingStyle[selector];

      // If fontFace and it exists already, concat the arrays
      if (selector === 'fontFace') {
        completedStyle['fontFace'] = (completedStyle['fontFace']) ?
          completedStyle['fontFace'].concat(value) : value;

        return;
      }

      /**
       * If the key is a comma separated string, it needs to exist on its
       * own. Break it up, copy the same values in, and add it to be checked
       */
      if (selector.includes(',')) {
        selector.split(',').forEach(selectorKey => {

          /**
           * Checks for whitespace and removes it from the selector
           */
          if (/\s/g.test(selectorKey)) {
            selectorKey = selectorKey.replace(/\s/g, '');
          }

          checkStyle[selectorKey] = checkingStyle[selector];
        });

        return;
      }

      if (typeof checkingStyle[selector] === 'object') {

        if (selector === 'mixin') {
          const mixin = Array.isArray(value) ? value : [value];
          const mixins = Object.assign({}, ...mixin);

          checkStyle = Object.assign(checkStyle || {}, processJSS(mixins));

          delete checkingStyle.mixin;

          return;
        }

        if (selector === 'fontFace') {
          completedStyle['fontFace'] = (completedStyle['fontFace']) ?
            completedStyle['fontFace'].concat(value) : value;

          return;
        }

        // When value is an array at the top level
        if (Array.isArray(checkingStyle[selector])) {
          completedStyle[selector] = checkingStyle[selector];
        }

        Object.keys(checkingStyle[selector]).forEach(key2 => {
          const value2 = checkingStyle[selector][key2];

          /**
           * If the key is a comma separated string, it needs to exist on its
           * own. Break it up, copy the same values in, and add it to be checked
           */
          if (key2.indexOf(',') !== -1) {
            key2.split(',').forEach(k => {
              checkStyle[selector + ' ' + k.trim()] = value2;
            });

            return;
          }

          /**
           * Move out media queries
           */
          if (isMediaQuery(key2)) {
            completedMediaQueries[key2] = completedMediaQueries[key2] || {};
            completedMediaQueries[key2][selector] = checkingStyle[selector][key2];
          }
          else if (key2 === 'mixin') {
            const mixin = Array.isArray(value2) ? value2 : [value2];
            const mixins = Object.assign({}, ...mixin);
            checkStyle[selector] =
              Object.assign(checkStyle[selector] || {}, processJSS(mixins));
          }

          // Move psuedo-selectors
          else if (isPseudoSelector(key2)) {
            checkStyle[selector + key2] = checkingStyle[selector][key2];
          }

          // Move connected classes out
          else if (isConnectedClass(key2)) {
            checkStyle[selector + key2.slice(1)] = checkingStyle[selector][key2];
          }

          // Move html tags and classes out and nested
          else if (isHTMLTag(key2) || isClass(key2) || key2.indexOf('>') === 0) {
            checkStyle[selector + ' ' + key2] = checkingStyle[selector][key2];
          }
          else {
            completedStyle[selector] = completedStyle[selector] || {};
            completedStyle[selector][key2] = checkingStyle[selector][key2];
          }
        });
      } else {
        completedStyle[selector] = checkingStyle[selector];
      }
    });

  }

  // Check the media queries for pseudo-selectors
  Object.keys(completedMediaQueries).forEach(media => {
    Object.keys(completedMediaQueries[media]).forEach(key => {
      Object.keys(completedMediaQueries[media][key]).forEach(key2 => {
        if (key2.indexOf(':') === 0) {
          completedMediaQueries[media][key + key2] = 
            completedMediaQueries[media][key][key2];

          delete completedMediaQueries[media][key][key2];
        }
      });
    });
  });

  completedStyle = Object.assign({}, completedStyle, completedMediaQueries);

  return completedStyle;
};