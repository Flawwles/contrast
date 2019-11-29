import React, { Component } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
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
    this.setState({hexValues: ["#F04E4E","#2B2B2B","#353535","#3F3F3F","#E3E1E8","#EDEBF2","#F7F5FC","#212121","#FFFFFF","#F03A61","#FC4870","#FF6385","#CC9F37","#DAAE45","#E6BA55","#00A682","#00BE96","#0ACCA2","#1691CF","#239EDB","#30ABE8","#D7FF00","#1094E6","#1DA1F2","#2BAEFF","#0B6AE6","#1776F2","#2684FF","#AB3A85","#B74792","#C456A0","#E09975","#EEAA88","#FABB9B","#E13D00","#FF4500","#FF5719","#29394F","#35465D","#415269","#3D699C","#4A76A8","#5984B5","#D10000","#DE0000","#E20000","#3E944C","#4CA15A","#5AAD68","#C93A3A","#D74A4A","#E35959","#E89F90","#F5B1A4","#FFC3B8","#E884A6","#FFABC8","#D64B6B","#F06C8B","#9C2452","#A72E5E","#B53C6A","#815A99","#9D7BB3","#7D8FC9","#A3B2E3","#515594","#6063A1","#7174AD","#2E6DBF","#3B79CC","#4A88D9","#6CC7EB","#7FD6F8","#93DEFC","#45C0D9","#66DBF2","#19A1B0","#30BAC9","#248564","#2F9170","#3A9E7D","#52A84C","#60B45A","#70C26B","#7DB82C","#97D147","#BABA0F","#D4D426","#E3DF10","#F0EC1D","#FCF92B","#F0C905","#FCD512","#FFDC2E","#F2B200","#FEC731","#ED8424","#FF9D43","#F25D46","#FF6D56","#BF760F","#CD811A","#D98F27","#91552D","#AB6E46","#B0954C","#BDA35B","#C9B06B","#918064","#9E8E75","#AB9D87","#A7A2B3","#BBB9C0","#CCCCCC","#67818F","#8A9EA8","#57B7DD","#FF7E6A","#F598B7","#E35A7A","#906BA7","#90A0D6","#55CDE6","#24ADBD","#C8C819","#8AC539","#FFBE0A","#F99132","#9E6139","#78909C"] })
  }

  loadDefault() {
    this.setState({hexValues: ['#ffffff', '#3F3F3F', '#1691CF', '#bada33'] });
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


    let sampleText = 'Text'

    const Cell = ({ columnIndex, rowIndex, style }) => (
    <div style={{
      ...style,
      padding: "3px"
    }}>
      <Chip
      color1={this.state.hexValues[rowIndex]}
      color2={this.state.hexValues[columnIndex]}
      hideFailed={this.state.hideFailed}
      hideRatio={this.state.hideRatio}
      >
      {sampleText}
      </Chip>
    </div>
  );

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

            <div className="default-options">
               <span className="default-option" onClick={this.loadAxiom}>Load Axiom Colours</span> &nbsp;
               <span className="default-option" onClick={this.loadDefault}>Load Default Colours</span>
             </div>
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

        <Grid
         columnCount={this.state.hexValues.length}
         columnWidth={300}
         height={300}
         rowCount={this.state.hexValues.length}
         rowHeight={35}
         width={1100}
       >
         {Cell}
       </Grid>
      </div>
    );
  }
}
