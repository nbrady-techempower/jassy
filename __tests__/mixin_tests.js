import React from 'react';
import { jassy } from '../src/index.js';

/**
 * After running through the processor, mixins get added to
 * the end of the styles
 */
describe('Mixin Tests', () => {

  it('Properly includes 1 mixin within a class', () => {
    const mixin1 = {
      color: 'blue'
    };

    const jss = {
      '.class1': {
        mixin: mixin1,
        background: 'red'
      }
    };
    expect(jassy(jss)).toBe('.class1{background:red;color:blue;}');
  });

  it('Properly includes 1 mixin without a class', () => {
    const mixin1 = {
      color: 'blue'
    };

    const jss = {
      mixin: mixin1,
      background: 'red',
      something: 'yellow'
    };
    // No braces because this is essentially like creating a new mixin obj
    // to be included in another class
    expect(jassy(jss)).toBe('background:red;something:yellow;color:blue;');
  });

  it('Properly includes 2 mixins within a class', () => {
    const mixin1 = {
      color: 'blue'
    };

    const mixin2 = {
      fontSize: 22
    };

    const jss = {
      '.class1': {
        mixin: [
          mixin1,
          mixin2
        ],
        background: 'red'
      }
    };
    expect(jassy(jss)).toBe('.class1{background:red;color:blue;font-size:22px;}');
  });

  it('Properly aligns new classes found within a mixin', () => {
    const mixin1 = {
      '.blue-stuff': {
        color: 'blue'
      }
    };

    const jss = {
      '.class1': {
        mixin: mixin1,
        background: 'red'
      }
    };
    // No braces because this is essentially like creating a new mixin obj
    // to be included in another class
    expect(jassy(jss)).toBe('.class1{background:red;}.class1 .blue-stuff{color:blue;}');
  });

});