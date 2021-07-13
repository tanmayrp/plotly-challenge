/**
 * Create Guage
 * @param {array} samples: dataset for all samples given
 * @param {string} selectedNameIndex: selected index for the test subject from dropdown
 */
 function buildGauge(wfreq){

    var trace = {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: {"text": "Belly Button Washing Frequency<br><span style='font-size:0.8em;color:black'>Scrubs per Week</span>"},
        type: "indicator",
        mode: "gauge",
        gauge: {
          axis: {
            range: [null, 9],
            tickwidth: 3,
            tickcolor: "black",
            tick0: 0,
            dtick: 1,
          },
          steps: [
            { range: [0, 1], color: 'rgb(244,248,248)' },
            { range: [1, 2], color: 'rgb(233,242,242)' },
            { range: [2, 3], color: 'rgb(212,229,229)' },
            { range: [3, 4], color: 'rgb(190,217,216)' },
            { range: [4, 5], color: 'rgb(168,204,205)' },
            { range: [5, 6], color: 'rgb(146,191,192)' },
            { range: [6, 7], color: 'rgb(123,180,179)' },
            { range: [7, 8], color: 'rgb(100,166,166)' },
            { range: [8, 9], color: 'rgb(75,154,154)' }
        ],
          threshold: {
            line: { color: "purple", width: 8 },
            thickness: 0.75,
            value: wfreq,
          }
        }
      };
    
      var data = [trace];
    
      var layout = {
        width: 500,
        height: 500,
        margin: { t: 0, b: 0 },
      };
    
      Plotly.newPlot("gauge", data, layout);
    
}
