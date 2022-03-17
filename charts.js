// Create a function that initializes the dashboard charts to prepopulate with the first sample of the JSON data
function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  // Create a function to allow change to the dashboard
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    
  }
  
  // Define the demographic data for the metadata panel 
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
}
  
  // Define the data for the three charts  
  // 1. Create the buildCharts function.
  function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      console.log(data);
      // 3. Create a variable that holds the samples array.
      var samples = data.samples;
      console.log(samples);
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      console.log(resultArray);
      //  5. Create a variable that holds the first sample in the array.
      var result = resultArray[0];
      console.log(result);
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var idOTU = result.otu_ids                // ID of each bacterium type
      var labelsOTU = result.otu_labels         // rollup name of each bacterium type
      var sampleValues = result.sample_values   // count of bacterium type
      
      console.log(idOTU);
      console.log(labelsOTU);
      console.log(sampleValues);

      // 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
      var yticks = idOTU.slice(0,10).map(idOTU => "OTU " + idOTU).reverse();
      console.log(yticks)

      // 8. Create the trace for the bar chart. 
      var barData = [{
        x: sampleValues.slice(0,10).reverse(),
        y: yticks,
        text: labelsOTU.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h'
    }];
      // 9. Create the layout for the bar chart. 
      var barLayout = {
        title: "Top 10 Baceterial Species (OTUs) per Individual",
        xaxis: {title: "Sample Counts"}    
    };
      // 10. Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", barData, barLayout);

    
    // Bubble Charts
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
        x: idOTU,
        y: sampleValues,
        text: labelsOTU,
        mode: 'markers',
        marker: {
          color: idOTU,
          size: sampleValues,
        }       
      }];
      
      // 2. Create the layout for the bubble chart.
      var bubbleLayout = {
        hovermode:'closest',
        title: "Bacteria Cultures per Individual's Sample",
        xaxis: {title: "OTU ID"},
        showlegend: false,
        height: 400,
        width: 1200
      };
      
      // 3. Use Plotly to plot the data with the layout.
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
 

    // Gauge Charts
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadataFilter = data.metadata.filter(sampleObj => sampleObj.id == sample);
    console.log(metadataFilter);

    // 3. Create a variable that holds the washing frequency.
    var washFreq = +metadataFilter[0].wfreq;
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washFreq,
        title: {text: "<b>Belly Button Washing Frequency</b><br>Scrubs per week"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: {
            range: [null, 10],
            tickmode: "array",
            tickvals: [0,2,4,6,8,10],
            ticktext: [0,2,4,6,8,10]
          },
          bar: {color: "black"},
          steps: [
            { range: [0, 2], color: "#CD5C5C" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "chartreuse" },
            { range: [8, 10], color: "forestgreen" }]
        }
      }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      autosize: true,
      annotations: [{
        xref: 'paper',
        yref: 'paper',
        x: 0.5,
        xanchor: 'center',
        y: 0,
        yanchor: 'center',
        text: "Frequency with which an individual scrubs",
        showarrow: false
      }]
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout, {responsive: true});
  
    });
}