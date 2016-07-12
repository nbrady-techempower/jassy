import React from 'react';
import { jassy } from '../jassy';

class Style extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <style dangerouslySetInnerHTML={{__html: jassy(this.props.rules)}}>
      </style>       
    );
  }
}

export default Style;
