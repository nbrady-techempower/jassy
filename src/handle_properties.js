export const autoPrefix = (property) => {
  let properties = [property];

  /**
   * Animations
   */
  if (property.indexOf('@keyframes') == 0) {
    properties.push(property.replace('@keyframes', '@-webkit-keyframes'));
  }
  else if (property.indexOf('animation') == 0) {
    properties.push('-webkit-' + property);
  }

  /**
   * Box reflection
   * No official feature yet
   */

  /**
   * Filters
   */
  else if (property.indexOf('filter') == 0) {
    properties.push('-webkit-' + property);
  }

  /**
   * Flexbox
   * Display needs values to be prefixed. See handle_values.js
   * Not handling old width: syntax
   */
  else if (property.indexOf('flex:') == 0) {
    properties.push('-webkit-box-' + property);
    properties.push('-webkit-' + property);
    properties.push('-ms-' + property);
  }

  /**
   * Font-feature-settings
   */
  else if (property.indexOf('font-feature-setting') == 0) {
    properties.push('-webkit-' + property);
    properties.push('-moz-' + property);
  }

  /**
   * Grids
   * No official feature yet
   */

  /**
   * Hyphens
   */
  else if (property.indexOf('word-break') == 0) {
    properties.push('-ms-' + property);
  }
  else if (property.indexOf('hyphens') == 0) {
    properties.push('-webkit-' + property);
    properties.push('-moz-' + property);
    properties.push('-ms-' + property);
  }

  /**
   * Masks
   * No official feature yet, currently just WebKit
   */

  /**
   * Multicolumn
   */
  else if (property.indexOf('column-count') == 0) {
    properties.push('-webkit-' + property);
    properties.push('-moz-' + property);
  }
  else if (property.indexOf('column-gap') == 0) {
    properties.push('-webkit-' + property);
    properties.push('-moz-' + property);
  }
  else if (property.indexOf('column-rule') == 0) {
    properties.push('-webkit-' + property);
    properties.push('-moz-' + property);
  }

  /**
   * Object-fit
   */
  else if (property.indexOf('object-fit') == 0) {
    properties.push('-o-' + property);
  }

  /**
   * Regions
   * No official feature yet, still experimental
   */

  /**
   * Transforms
   */
  else if (property.indexOf('transform') == 0) {
    properties.push('-webkit-' + property);
    properties.push('-ms-' + property);
  }

  /**
   * Appearance
   */
  else if (property.indexOf('appearance') == 0) {
    properties.push('-webkit-' + property);
    properties.push('-moz-' + property);
  }

  return properties;
};