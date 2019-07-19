import React, { Component } from 'react'
import contrast from "get-contrast"

export default class Chip extends Component {
  constructor(props) {
    super(props)
    this.checkHex = this.checkHex.bind(this);
  }
  //This needs rework to better validate if a hex colour is validate
  // Currently only checking for 3 or 6 digit hex with the # ..
  // Returns white just to stop the contras ratio script going mad
  checkHex(hex) {
    if(hex.length === 7 || hex.length === 4) {
      if(hex.charAt(0) === "#") {
        return hex
      }
      return "#fff"
    } else {
      return "#fff"
    }
  }
  //contrast accepts HEX RGB REGA
  // contrast.ratio('#fafafa', 'rgba(0,0,0,.75)') // => 10
  // contrast.score('#fafafa', 'rgba(0,0,0,.75)') // => 'AAA'
  // contrast.isAccessible('#fafafa', 'rgba(0,0,0,.75)') // => true

  render() {
    let setOpacity = "1"
    //Make it easier to use props but also remove any spaces - Might be better to do this sooner?
    const propHex1 = this.props.color1
    const propHex2 = this.props.color2
    const hex1 = propHex1.split(' ').join('')
    const hex2 = propHex2.split(' ').join('')

    const ratio = Math.round(
      contrast.ratio(
        this.checkHex(hex1),
        this.checkHex(hex2)
      ) * 100) / 100
    // Set opacity if test has failed and user has requested to hide failed tests
   if(contrast.score(this.checkHex(hex1), this.checkHex(hex2)) === 'F' && this.props.hideFailed){
      setOpacity = '0.1'
    }

    return (
      <div style={{
        background: hex1,
        color: hex2,
        padding: '0.2rem',
        textAlign: 'center',
        borderRadius: '3px',
        opacity: setOpacity
      }}>
        {this.props.children}&nbsp;
        {contrast.score(this.checkHex(hex1), this.checkHex(hex2))}&nbsp;
        {this.props.hideRatio ? null : ratio}
      </div>
    )
  }
}
