import React from 'react';
import { JSStoCSS } from '../src/index.js';

const jss = {
  '.class1': {
    'h1, h2, h3, h4': {
      'background': 'red'
    }
  }
};

describe('Property Tests', () => {
  it('Properly splits nested keys', () => {
    expect(JSStoCSS(jss)).toBe(
      '.class1 h1{background:red;}' +
      '.class1 h2{background:red;}' +
      '.class1 h3{background:red;}' +
      '.class1 h4{background:red;}'
    );
  });
});