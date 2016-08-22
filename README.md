# jassy
A js to css runtime transpiler. Why write your css in css when you can write css in js?

### In Beta - API Likely to change

## Features

* Write css as javascript objects
* Allows for nesting like less and sass
* Allows for nested media queries
* React integration
* Auto-prefixing
* Easy debugging
* Adds px unit to numbers if needed
* easily "mixin" one style object into another with a `mixin` property.
* Use a `fontFace` property anywhere to add fonts to a page

## Use Cases

Being able to access your styles as javascript objects allows you to manipulate values more easily and create css effects in a way that is familiar. If you're using require/imports, you can easily import smaller pieces of styling into only the necessary places in your project. **Q:** "But I thought inline styles were bad?" **A:** Everything is bad. But seriously, jassy doesn't encourage 'inline styling' in the sense that pollutes your content from design any more than using jQuery to manipulate css. Your jassy objects should be structured in their own styling folders and imported where needed. Often times, and especially in SPA's, this is better than loading 1000's of lines of css up front. 

## Installing and Using

#### npm
```bash
npm install --save jassy
```

#### Use with es6 projects
```javascript
import { jassy } from 'jassy';

// Returns a css string that can be placed in a style tag in the DOM
const myStyle = jassy({ 
  '.hello-world': {
    color: 'red',
    ':hover': {
      color: 'blue'
    }
  }
});
```

#### Use with React
```javascript
import React from 'react';
import { Style } from 'jassy';
// import your js style object
import myStyleObj from './mystyle.js';

class MyComponent extends React.Component {
  
  // your react stuff
  
  render() {
    return (
      <div className="my-component-container">
        {/* Inserts a style tag with all your rules */}
        <Style rules={myStyleObj} />
        <div className="a-class-from-my-obj">
          Hello, Stylish World!
        </div>
      </div>
    );
  }
}

```


## Examples

#### Use camelCase to write css as javascript objects.

```javascript
const myStyle = {
  '.class1': {
    textAlign: 'center'
  }
};
```

After transpiling with jassy becomes:

```css
.class1{text-align:center;}
```

#### Don't worry about vendor prefixes! jassy stays up-to-date.

Use the standard feature name, and jassy will take care of the rest.

```javascript
  const myStyle = {
    '.class1': {
      transform: 'rotate(30deg)'
    }
  }
```

Becomes:

```css
.class1{transform:rotate(30deg);-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);}
```

Keys in the object are automatically dasherized. Any uppercase letter will become lowercase and be preceded by a dash so if we don't support the vendor prefix for a particular property, simply add your own as the key like so:
```javascript
  const myStyle = {
    '.another-class': {
      WebkitOpacity: 0.5
    }
  }
  // WebKitOpacity becomes -webkit-opacity
```

#### mixins

```javascript
// Let's say you want a hover style that could be used in several different classes. Define a style object
// without wrapping it in a class and then mix it in to another style.
const reusableStyle = {
  ':hover': {
    fontSize: 19,
    color: 'green'
  }
}

// This class will now have the hover pseudo-selector
const myStyle = {
  '.my-class': {
    mixin: reusableStyle,
    fontSize: 33
  }
}
```

You can also pass an array of objects to mixin.

#### fontFace

```javascript
  const myStyle = {
    fontFace: [
      {
        fontFamily: 'ProximaNovaLight',
        src: `url('/fonts/ProximaNovaLight.ttf') format('truetype')`
      },
      {
        fontFamily: 'ProximaNovaRegular',
        src: `url('/fonts/ProximaNovaRegular.ttf') format('truetype')`
      }
    ],
    // more classes and jss objects can go here
  };
```

This will transpile to:
```css
@font-face {
  font-family: ProximaNovaLight;
  src: url('/fonts/ProximaNovaLight.ttf')format('truetype');
}
@font-face {
  font-family: ProximaNovaRegular;
  src: url('/fonts/ProximaNovaRegular.ttf')format('truetype');
}
```

### ToDo: More docs coming soon!
