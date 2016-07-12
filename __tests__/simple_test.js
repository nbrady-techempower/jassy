import React from 'react';
import { JSStoCSS } from '../src/index.js';

const jss = {
  '.class1': {
    'background': 'red'
  }  
};

console.log('\n',JSStoCSS(jss));

describe('Simple Tests', () => {
  it('Properly converts simplest class', () => {
    expect(JSStoCSS(jss)).toBe('.class1{background:red;}');
  });
});