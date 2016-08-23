import React from 'react';
import {jassy} from '../src/index.js';


const pseudoChildSelector = {
  '.class1:first-child': {
    background: 'red'
  },
  '#id:last-child': {
    background: 'red'
  },
  '.class1:nth-child(2n+1)': {
    background: 'red'
  },
  '.class1:nth-child(even), .class1:nth-child(odd)': {
    background: 'red'
  },
  '.class1:nth-last-child(-n+3)': {
    background: 'red'
  },
  '#id': {
    '&:first-child': {
      background: 'blue'
    },
    '&:last-child': {
      background: 'blue'
    }
  },
  '.class2': {
    '&:nth-child(2n+1)': {
      background: 'blue'
    },
    '&:nth-last-child(-n+3)': {
      background: 'blue'
    },
    '&:nth-chld(even), &:nth-child(odd)': {
      background: 'blue'
    }
  }
};

const pseudoLinkSelector = {
  '.class1:link': {
    background: 'red'
  },
  '#id:visited': {
    background: 'red'
  },
  '.class1:active': {
    background: 'red'
  },
  '.class1:hover, .class1:focus': {
    background: 'red'
  },
  '.class1': {
    '&:link': {
      background: 'blue'
    },
    '&:visited': {
      background: 'blue'
    }
  },
  '#id': {
    '&:active, &:hover': {
      background: 'blue'
    }
  },
  '.class2': {
    '&:active, &:hover, &:visited': {
      background: 'blue'
    }
  }
};

const pseudoTypeSelector = {
  'p:nth-of-type(2n+1)': {
    background: 'red'
  },
  /**
   * Yes, the space was put there on purpose.
   * There is a difference with a space and without which you can
   * see in this example in jsfiddle https://jsfiddle.net/api/mdn/
   *
   * This type of selector is space sensitive.
   */
  'p :nth-of-type(2n-1)': {
    background: 'red'
  },
  'p:first-of-type': {
    background: 'red'
  },
  'div :first-of-type': {
    background: 'red'
  },
  '.class1': {
    ':first-of-type': {
      background: 'blue'
    },
    '&:first-of-type': {
      background: 'blue'
    }
  },
  '#id': {
    ':first-of-type, :nth-of-type(2n+1)': {
      background: 'blue'
    },
    '&:first-of-type, & > :nth-of-type(2n)': {
      background: 'blue'
    }
  }
};

const pseudoSpecialSelector = {
  'div:empty': {
    background: 'red'
  },
  ':target': {
    background: 'red',

    '&::before': {
      background: 'blue'
    },
    '&::after': {
      background: 'blue'
    }
  },
  ':checked': {
    background: 'red'
  },
  'input[type=radio]:checked': {
    background: 'red'
  },
  'input[type=checkbox]:checked': {
    background: 'red'
  },
  'input[type=radio], input[type=checkbox]': {
    '&:checked': {
      background: 'blue'
    }
  },
  'input': {
    '&:disabled': {
      background: 'blue'
    },
    '&:enabled': {
      background: 'blue'
    },
    '&:disabled, &:enabled': {
      color: 'gold'
    }
  }
};

describe('Pseudo Selector Tests', () => {
  it('Properly converts Pseudo Child Selector', () => {
    expect(jassy(pseudoChildSelector)).toBe(
      '.class1:first-child{background:red;}' +
      '#id:last-child{background:red;}' +
      '.class1:nth-child(2n+1){background:red;}' +
      '.class1:nth-child(even),.class1:nth-child(odd){background:red;}' +
      '.class1:nth-last-child(-n+3){background:red;}' +
      '#id:first-child{background:blue;}' +
      '#id:last-child{background:blue;}' +
      '.class2:nth-child(2n+1){background:blue;}' +
      '.class2:nth-last-child(-n+3){background:blue;}' +
      '.class2:nth-child(even),.class2:nth-child(odd){background:blue;}'
    )
  });

  it('Properly converts Pseudo Link Selector', () => {
    expect(jassy(pseudoLinkSelector)).toBe(
      '.class1:link{background:red;}' +
      '#id:visited{background:red;}' +
      '.class1:active{background:red;}' +
      '.class1:hover,.class1:focus{background:red;}' +
      '.class1:link{background:blue;}' +
      '.class1:visited{background:blue;}' +
      '#id:active,#id:hover{background:blue;}' +
      '.class2:active,.class2:hover,.class2:visited{background:blue;}'
    )
  });

  it('Properly converts Pseudo Type Selector', () => {
    expect(jassy(pseudoTypeSelector)).toBe(
      'p:nth-of-type(2n+1){background:red;}' +
      'p :nth-of-type(2n-1){background:red;}' +
      'p:first-of-type{background:red;}' +
      'div :first-of-type{background:red;}' +
      '.class1 :first-of-type{background:blue;}' +
      '.class1:first-of-type{background:blue;}' +
      '#id :first-of-type :nth-of-type(2n+1){background:blue;}' +
      '#id:first-of-type #id > :nth-of-type(2n){background:blue;}'
    );
  });

  it('Properly converts Pseudo Special Selector', () => {
    expect(jassy(pseudoSpecialSelector)).toBe(
      'div:empty{background:red;}' +
      ':target{background:red;}' +
      ':target::before{background:blue;}' +
      ':target::after{background:blue;}' +
      ':checked{background:red;}' +
      'input[type=radio]:checked{background:red;}' +
      'input[type=checkbox]:checked{background:red;}' +
      'input[type=radio]:checked{background:blue;}input[type=checkbox]:checked{background:blue;}' +
      'input:disabled{background: blue;}' +
      'input:enabled{background:blue;}' +
      'input:disabled,input:enabled{color:gold;}'
    );
  });
});
