import React, { Component } from 'react'

export default class Cell extends Component {
  constructor(props) {
    super(props)
    this.checkHex = this.checkHex.bind(this);
  }


  render() {
    //Make it easier to use props but also remove any spaces - Might be better to do this sooner?
    const propHex1 = this.props.color1
    const propHex2 = this.props.color2
    const style = this.props.style

    const hex1 = propHex1.split(' ').join('')
    const hex2 = propHex2.split(' ').join('')

    if (hex1 === hex2 ) {
      return (
        <div/>
      )
    } else {
      return (
      <div style={{
        ...style,
        paddingBottom: '16px',
        borderBottom: '1px solid #c1c1c1'
      }}>hi</div>
      )
    }

  }
}
