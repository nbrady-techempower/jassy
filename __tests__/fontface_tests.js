import React from 'react';
import { jassy, processJSS } from '../src/index.js';

describe('FontFace Tests', () => {

  it('Properly converts font faces', () => {
    const jss = {
      fontFace: [
        {
          fontFamily: 'ProximaNovaLight',
          src: `url('/fonts/ProximaNovaLight.ttf') format('truetype')`
        },
        {
          fontFamily: 'ProximaNovaRegular',
          src: `url('/fonts/ProximaNovaRegular.ttf') format('truetype')`
        }
      ]
    };

    expect(jassy(jss)).toBe(`@font-face{font-family:ProximaNovaLight;src:url('/fonts/ProximaNovaLight.ttf') format('truetype');}@font-face{font-family:ProximaNovaRegular;src:url('/fonts/ProximaNovaRegular.ttf') format('truetype');}`);
  });

  it('Properly converts font faces as a mixin', () => {
    const mixin = {
      fontFace: [
        {
          fontFamily: 'ProximaNovaLight',
          src: `url('/fonts/ProximaNovaLight.ttf') format('truetype')`
        },
        {
          fontFamily: 'ProximaNovaRegular',
          src: `url('/fonts/ProximaNovaRegular.ttf') format('truetype')`
        }
      ]
    };

    const jss = {
      '.class1': {
        mixin,
        color: 'red'
      }
    };

    expect(jassy(jss)).toBe(`.class1{color:red;}@font-face{font-family:ProximaNovaLight;src:url('/fonts/ProximaNovaLight.ttf') format('truetype');}@font-face{font-family:ProximaNovaRegular;src:url('/fonts/ProximaNovaRegular.ttf') format('truetype');}`);
  });

});