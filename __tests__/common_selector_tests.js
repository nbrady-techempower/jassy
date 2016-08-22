/**
 * This is a test to ensure that all css selectors work as it should
 * even when nested.
 */

import React from 'react';
import { jassy } from '../src/index.js';

// Class and ID Selectors
const classAndIdSelector = {
  '.class1': {
    'background': 'red'
  },
  '#id': {
    'background': 'red'
  }
};

/**
 * Descendant Selector
 *
 * Any #id element that is a descendant of an .class1 element
 */
const descendantSelector = {
  '#id .class1': {
    background: 'red'
  },
  '#id2': {
    '.class1': {
      background :'red'
    }
  }
};

/**
 * Child Selector
 *
 * Any .class1 element that is a child (i.e. direct descendant) of the
 * `div` element
 */
const childSelector = {
  '.class1 > div, #id > div': {
    background: 'red'
  },
  '.class2': {
    '& > div': {
      background: 'red'
    },
    // Spacing shouldn't matter
    '&>p': {
      background: 'red'
    }
  }
};


/**
 * Sibling Selector
 *
 * Any `div` element that is the next sibling of a `.class3` element
 * (that is: the next child of the same parent)
 */
const siblingSelector = {
  '.class3 + div, #id + p': {
    background: 'red'
  },
  '.class3': {
    '& + div': {
      background: 'red'
    },
    '&+p': {
      background: 'red'
    }
  }
};


describe('Selector Tests', () => {
  it('Properly converts Class and ID selectors', () => {
    expect(jassy(classAndIdSelector)).toBe(
      '.class1{background:red;}' +
      '#id{background:red;}'
    );
  });

  it('Properly converts Decendent Selectors', () => {
    expect(jassy(descendantSelector)).toBe(
      '#id .class1{background:red;}' +
      '#id2 .class1{background:red;}'
    );
  });

  it('Properly converts Child Selectors', () => {
    expect(jassy(childSelector)).toBe(
      '.class1>div, #id>div{background:red;}' +
      '.class2>div{background:red;}' +
      '.class2>p{background:red;}'
    );
  });

  it('Proplerly converts Sibling Selectors', () => {
    expect(jassy(siblingSelector)).toBe(
      '.class3+div,#id+p{background:red;}' +
      '.class3+div{background:red;}' +
      '.class3+p{background:red;}'
    );
  });
});
