import React from 'react';
import { JSStoCSS } from '../jss_to_css';

class Style extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <style dangerouslySetInnerHTML={{__html: JSStoCSS(this.props.rules)}}>
      </style>       
    );
  }
}

export default Style;
