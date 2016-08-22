import React from 'react';
import { jassy, processJSS } from '../src/index.js';

const jss = {
  '@media (min-width: 500px)': {
    h1: {
      color: 'red'
    },
    '.class1': {
      background: 'blue'
    }
  }
};

describe('Media Query Tests', () => {
  it('Properly adds !important; to all media query values', () => {
    expect(jassy(jss)).toBe(
      '@media (min-width: 500px) h1{color:red !important;}' +
      '@media (min-width: 500px) .class1{background:blue !important;}'
    );
  });
});