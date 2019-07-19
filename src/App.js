import React, { Component } from 'react';
import Chip from './components/chip.js';
import Badge from './components/badge.js';
import Swatch from './components/swatch.js';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hexValues: ['#ffffff', '#3F3F3F', '#1691CF', '#bada33'],
      hideFailed: false,
      hideRatio: true
    };

    this.handelInputChange = this.handelInputChange.bind(this);
    this.handelCheckboxFailed = this.handelCheckboxFailed.bind(this);
    this.handelCheckboxRatio = this.handelCheckboxRatio.bind(this);
    this.loadAxiom = this.loadAxiom.bind(this);
    this.loadDefault = this.loadDefault.bind(this);
  }

  handelInputChange(event) {
    console.log(event.target.value)
    let hexValuesArray = event.target.value.split(',')
    this.setState({hexValues: hexValuesArray});
    console.log(hexValuesArray)
  }

  loadAxiom() {
    this.setState({hexValues: "#353535, #EDEBF2, #212121, #FFFFFF, #4CA15A, #D74A4A, #BBB9C0, #F5B1A4 ,#F498B7, #E35A7A, #A72E5E, #9C73B2, #90A0D6, #6063A1, #3B79CC, #7FD6F8, #55CDE6, #24ADBD, #2F9170, #74C971, #80BE4C, #C8C819, #F0EC1D, #FCD512, #FFBE0A, #F98A39, #FF6D56, #CD811A, #9E6139, #BDA35B, #9E8E75, #BBB9C0 ,#78909C" });
  }

  loadDefault() {
    this.setState({hexValues: "#ffffff, #3F3F3F, #1691CF, #bada33" });
  }

  handelCheckboxFailed() {
    this.setState(prevState => ({
      hideFailed: !prevState.hideFailed
    }))
  }

  handelCheckboxRatio() {
    this.setState(prevState => ({
      hideRatio: !prevState.hideRatio
    }))
  }

  render() {
    let hexValuesString = " "
    hexValuesString = this.state.hexValues.join(",").replace(/ /g,'')
    const isColor = this.state.hexValues.map((hex) => {
      if( /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#ac3') ) {
        return(hex)
      } else {
        return(null)
      }

    })

    let sampleText = 'Text'

    return (
      <div className="container">
        <section className="intro-section">
          <Badge type="alpha" tooltip="Tooltip message here"/>
          <h1>Contrast Ratio</h1>
          <p>Understand color accessability across a set of hex values</p>
        </section>

        <header className="App-header">
        <label>Hex values</label>
          <input
            type="text"
            className="hex-input"
            value={hexValuesString}
            onChange={this.handelInputChange}
            spellCheck="false"
            />
            <div className="contrast-grid" style={{
                gridTemplateColumns: `repeat(${this.state.hexValues.length +1}, 1fr)`
              }}>
                {/* Leave top left blank */}
                <div className="grid-static"/>
                {/* Header row & Columns */}
                {this.state.hexValues.map((hexValueItem, index) => {
                  return (
                    <React.Fragment key={`${hexValueItem}-header-loop`}>
                      <div key={`${hexValueItem}-header-column`} className="grid-header">
                        <Swatch color={hexValueItem}/>
                          <span>{hexValueItem}</span>
                      </div>
                      <div key={`${hexValueItem}-header-row`} className="grid-header" style={{gridRow: index+2}}>
                        <Swatch color={hexValueItem}/>
                          {hexValueItem}
                      </div>
                    </React.Fragment>
                  )
                })}
                {/* Main colours */}
                {this.state.hexValues.map((hexValue1, index1) => {
                  return (
                    <React.Fragment key={`${hexValue1}-value-loop`}>
                      {this.state.hexValues.map((hexValue2) => {
                        const key = `${hexValue1}-${hexValue2}-value`
                        if(hexValue1 !== hexValue2) {
                          return (
                            <div key={key}>
                              <Chip
                              color1={hexValue1}
                              color2={hexValue2}
                              hideFailed={this.state.hideFailed}
                              hideRatio={this.state.hideRatio}
                              >
                              {sampleText}
                              </Chip>
                            </div>
                          )
                        } else { return ( <div key={key} />)}
                      })}
                    </React.Fragment>
                  );
                })}
              </div>
        </header>
      </div>
    );
  }
}
