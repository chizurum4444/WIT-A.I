window.onload = function () {
    // Get the analysis results and uploaded image source from sessionStorage
    const analysisResults = sessionStorage.getItem("analysisResults");
    const uploadedImageSrc = sessionStorage.getItem("uploadedImageSrc");

    // Display the uploaded image
    const uploadedImage = document.getElementById("uploaded-image");
    uploadedImage.src = uploadedImageSrc;

    // Display the analysis results in the "analysis-results" div
    const analysisResultsDiv = document.getElementById("analysis-results");
    analysisResultsDiv.innerHTML = analysisResults;

    // Parse the analysisResults text into an array of objects
    const labelsAndConfidences = analysisResults.split('<tr>').filter((item) => item.trim() !== '').map((line) => {
        const [name, confidence] = line.split('</td>').filter((item) => item.trim() !== '').map((item) => item.trim().replace('<td>', ''));
        return { Name: name, Confidence: parseFloat(confidence.replace('%', '')) };
    });

    // Call the function to create the bar chart and pass the analysis results
    
   // createBarChart(labelsAndConfidences);
}

// Create the bar chart (WORK IN PROGRESS)
function createBarChart(analysisResults) {
    // Extract labels and confidence levels from the data
    const labels = analysisResults.map((item) => item.Name);
    const confidences = analysisResults.map((item) => item.Confidence);

    // Set the width and height of the chart
    const width = 400;
    const height = 300;

    // Define color scale for bars
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create an SVG element to contain the chart
    const svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Create a scale for the x-axis (labels)
    const xScale = d3.scaleBand()
        .domain(labels)
        .range([0, width])
        .padding(0.1);

    // Create a scale for the y-axis (confidence levels)
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(confidences)])
        .nice()
        .range([height, 0]);

    // Create the bars for the chart
    svg.selectAll(".bar")
        .data(analysisResults)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.Name))
        .attr("y", (d) => yScale(d.Confidence))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - yScale(d.Confidence))
        .attr("fill", (d, i) => color(i)); // Use color scale for bars

    // Add labels on top of the bars
    svg.selectAll(".label")
        .data(analysisResults)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (d) => xScale(d.Name) + xScale.bandwidth() / 2)
        .attr("y", (d) => yScale(d.Confidence) - 5) // Adjust label position
        .attr("text-anchor", "middle")
        .text((d) => `${d.Confidence.toFixed(2)}%`)
        .attr("fill", "white"); // Text color

    // Add x-axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end")
        .attr("fill", "black"); // X-axis label color

    // Add y-axis
    svg.append("g")
        .call(d3.axisLeft(yScale))
        .attr("fill", "black"); // Y-axis label color
}
