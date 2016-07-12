import {
  isClass, isConnectedClass, isHTMLTag, isPseudoSelector, isMediaQuery
} from './_helpers';

export const processJSS = (style) => {

  if (Array.isArray(style)) return;

  // Collect all the media strings
  let completedStyle = {};
  let completedMediaQueries = {};
  let checkStyle = Object.assign({}, style);

  while (Object.keys(checkStyle).length) {

    let checkingStyle = Object.assign({}, checkStyle);
    checkStyle = {};

    Object.keys(checkingStyle).forEach(key => {
      if (typeof checkingStyle[key] === 'object') {

        /**
         * For top level / anonymous mixins
         */
        if (key === 'mixin') {
          let mixins = Object.assign({}, ...checkingStyle.mixin);
          completedStyle = Object.assign(completedStyle || {}, processJSS(mixins));
          delete checkingStyle.mixin;
          return;
        }
        /**
         * End top level mixins
         */
        // When value is an array at the top level
        if (Array.isArray(checkingStyle[key])) {
          completedStyle[key] = checkingStyle[key];
        }

        Object.keys(checkingStyle[key]).forEach(key2 => {
          let value2 = checkingStyle[key][key2];

          /**
           * Move out media queries
           */
          if (isMediaQuery(key2)) {
            completedMediaQueries[key2] = completedMediaQueries[key2] || {};
            completedMediaQueries[key2][key] = checkingStyle[key][key2];
          }
          else if (key2 === 'mixin') {
            let mixins = Object.assign({}, ...checkingStyle[key].mixin);
            completedStyle[key] = Object.assign(completedStyle[key] || {}, processJSS(mixins));
          }
          // Move psuedo-selectors
          else if (isPseudoSelector(key2)) {
            checkStyle[key + key2] = checkingStyle[key][key2];
          }

          // Move connected classes out
          else if (isConnectedClass(key2)) {
            checkStyle[key + key2.slice(1)] = checkingStyle[key][key2];
          }

          // Move html tags and classes out and nested
          else if (isHTMLTag(key2) || isClass(key2) || key2.indexOf('>') === 0) {
            checkStyle[key + ' ' + key2] = checkingStyle[key][key2];
          }
          else {
            completedStyle[key] = completedStyle[key] || {};
            completedStyle[key][key2] = checkingStyle[key][key2];
          }
        });
      } else {
        completedStyle[key] = checkingStyle[key];
      }
    });

  }

  // Check the media queries for pseudo-selectors
  Object.keys(completedMediaQueries).forEach(media => {
    Object.keys(completedMediaQueries[media]).forEach(key => {
      Object.keys(completedMediaQueries[media][key]).forEach(key2 => {
        if (key2.indexOf(':') === 0) {
          completedMediaQueries[media][key + key2] = completedMediaQueries[media][key][key2];
          delete completedMediaQueries[media][key][key2];
        }
      });
    });
  });
  completedStyle = Object.assign(completedStyle, completedMediaQueries);

  return completedStyle;
};