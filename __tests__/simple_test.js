import React from 'react';
import { jassy } from '../src/index.js';

const jss = {
  '.class1': {
    'background': 'red'
  }
};

describe('Simple Tests', () => {
  it('Properly converts simplest class', () => {
    expect(jassy(jss)).toBe('.class1{background:red;}');
  });
});
