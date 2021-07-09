/**
 * Set Subject ID No drop down for selection purposes 
 * @param {array} names: the list of names/ids 
 * @param {string} selectedName: selected name/id from dropdown
 */
function setSubjectIDDropDown(names, selectedName) {
    var dropDownMenu = d3.select("#selDataset");
    names.forEach((d) => {
        dropDownMenu.append("option").text(d);
    });
}

/**
 * Build Demographic Info div with data from the selected test subject
 * @param {string} demographicData: demo data for a selected test subject
 */
function buildDemographicInfo(demographicData) {
    var demoDiv = d3.select("#sample-metadata");
    demoDiv.html("");
    Object.entries(demographicData).forEach(([k,v]) => {
        demoDiv.append("p").text(`${k.toUpperCase()}: ${v}`);
    });
}

/**
 * Create Bar Chart
 * @param {array} samples: dataset for all samples given
 * @param {string} selectedNameIndex: selected index for the test subject from dropdown
 */
function buildBarChart(samples, selectedNameIndex){

    var sampleList = [];
    var OTUIdList = [];
    var OTULabelsList = [];

    //Build data for bar graph - limited to top 10 per instructions
    for (var i = 0; i < 10; i++) {
        OTUIdList.push("OTU " + samples[selectedNameIndex].otu_ids[i]);
        OTULabelsList.push(samples[selectedNameIndex].otu_labels[i]);
        sampleList.push(samples[selectedNameIndex].sample_values[i]);
    }

    var trace = {
        x: sampleList,
        y: OTUIdList,
        text: OTULabelsList,
        orientation: "h",
        type: "bar",
      };
    
      var data = [trace];
    
      var layout = {
        title: `Top 10 Bacteria Cultures Found`,
        yaxis: {
          autorange: "reversed"
        },
      };
    
      Plotly.newPlot("bar", data, layout);
}

/**
 * Create Bubble Chart
 * @param {array} samples: dataset for all samples given
 * @param {string} selectedNameIndex: selected index for the test subject from dropdown
 */
function buildBubbleChart(samples, selectedNameIndex){
    var sampleList = samples[selectedNameIndex].sample_values;
    var OTUIdList =  samples[selectedNameIndex].otu_ids;
    var OTULabelsList = samples[selectedNameIndex].otu_labels;

    var trace = {
        x: OTUIdList,
        y: sampleList,
        mode: "markers",
        marker: {
          size: sampleList,
          color: OTUIdList,
        },
        text: OTULabelsList,
      };
    
      var data = [trace];
    
      var layout = {
        title: "Bacteria Cultures per Sample",
        xaxis: {
          title: "OTU ID",
        }
      };
    
      Plotly.newPlot("bubble", data, layout);
}

/**
 * Main driver for the entire page
 * @param {string} selectedName: selected name for the test subject; default 940
 */
function buildPlots(selectedName) {
    d3.json("../../data/samples.json").then((data) => {
        var names = data.names;
        var metadata = data.metadata;
        var samples = data.samples;

        //Set drop down values while defaulting to 940 on page load
        setSubjectIDDropDown(names, selectedName);

        //get selected index 
        var selectedNameIndex = names.indexOf(d3.select("#selDataset").property("value"));

        buildDemographicInfo(metadata[selectedNameIndex]);
        buildBarChart(samples, selectedNameIndex);
        buildBubbleChart(samples, selectedNameIndex);
    });
}

function optionChanged(userSelection) {
    console.log(userSelection);
    buildPlots(userSelection);
  }
  
buildPlots("940");