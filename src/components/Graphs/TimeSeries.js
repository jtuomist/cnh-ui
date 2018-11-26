import React from 'react';
import { withTheme } from 'styled-components';
import Plot from 'react-plotly.js';
import plotData from '../../data/hsy-paastodata.json';

class TimeSeries extends React.Component {
 
  constructor(props) {
    super(props);
    this.plotColors = [
      props.theme.helTram,
      props.theme.helSummer,
      props.theme.helFog,
      props.theme.helGold,
      props.theme.helCopper,
      props.theme.helCoat,
      props.theme.helGold
    ]
  }

  mapColor(index) {
    // Repeat colors from the beginning of array if colors run out
    let colorIndex = index;
    let colorsAvailable = this.plotColors.length;
    if (colorIndex >= colorsAvailable)
      colorIndex=index % this.plotColors.length; 
    return this.plotColors[colorIndex];
  }
  
  render() {
    let styledData = plotData.data.map((bar, ndx) => {
      bar.marker = { color: this.mapColor(ndx) };
      return bar;
    })
    return (
      <Plot
        data={styledData}
        layout={{
          autosize: true,
          barmode: 'stack',
          separators: ", ",
          xaxis: {
            type: 'category'
          },
          yaxis: {
            hoverformat: '.3r',
            separatethousands: true,
            title: 'KHK-päästöt (kt CO₂-ekv.)'
          },
          font: {
            family: '"HelsinkiGrotesk", Arial'
          },
          shapes: [{
              line: {
                color: this.props.theme.dark,
                dash: "dash",
                width: 2
              },
              opacity: 0.5,
              type: "line",
              x0: 0.5,
              x1: 0.5,
              xref: "x",
              y0: -.15,
              y1: 1,
              yref: "paper"
            }]
        }}
        useResizeHandler 
        displayModeBar = { false }
        style= {{width: "100%", height: "100%"}}
      />
    );
  }
}

export default withTheme(TimeSeries);