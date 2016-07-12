import React from 'react';
import { JSStoCSS, processJSS } from '../src/index.js';

const jss = {
  boxShadow: [
    '0 2px 5px 0 rgba(0, 0, 0, 0.16)',
    '0 2px 10px 0 rgba(0, 0, 0, 0.12)'
  ]
};

describe('Toplevel Tests', () => {
  it('Properly combines property values when arrays at the top level', () => {
    expect(JSStoCSS(jss)).toBe(
      'box-shadow:0 2px 5px 0 rgba(0, 0, 0, 0.16)' +
      ',0 2px 10px 0 rgba(0, 0, 0, 0.12);'
    );
  });
});