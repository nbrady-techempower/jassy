export const isUnitlessNumber = {

  /**
   * Copied from https://github.com/facebook/react/blob/
   * 102cd291899f9942a76c40a0e78920a6fe544dc1/
   * src/renderers/dom/shared/CSSProperty.js
   */
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

export const HTMLTags = [
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio',
  'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button',
  'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data',
  'datalist', 'dd', 'del', 'dfn', 'div', 'dl', 'dt', 'em', 'embed',
  'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2',
  'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'i',
  'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend',
  'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript',
  'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre',
  'progress', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script',
  'section', 'select', 'small', 'source', 'span', 'strong', 'style',
  'sub', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot',
  'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video',
  'wbr'
];

export const hexToRgb = (hex) => {
  const bigint = parseInt(hex.replace('#', ''), 16);

  return [
    (bigint >> 16) & 255,    // R
    (bigint >> 8) & 255,     // G
    (bigint & 255)           // B
  ].join();
};

export const isPseudoSelector = (str) =>
  (str.indexOf(':') === 0);

export const isClass = (str) =>
  (str.indexOf('.') === 0);

export const isConnectedClass = (str) =>
  (str.indexOf('&.') === 0);

export const isHTMLTag = (str) =>
  HTMLTags.filter(k => (
    str === k ||
    str.indexOf(k + ' ') === 0 ||
    str.indexOf(k + ':') === 0
  )).length > 0;

export const isMediaQuery = (str) =>
  (str.indexOf('@media') === 0);

export const isKeyframe = (str) =>
  (str.indexOf('@keyframe') === 0);

export const dasherize = (str) =>
  str.replace(/([A-Z])/g, '-$1').toLowerCase();

export const isObjNotArr = (value) =>
  (typeof value === 'object' && !Array.isArray(value));