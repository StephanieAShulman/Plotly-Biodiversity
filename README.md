# Biodiversity in Human Anatomy
The focus of this project was to create an interactive dashboard with JavaScript and Plotly that allows <br/>
the user to examine the biodiversity of bacteria making up parts of the human anatomy.

![BBD_reduced](https://user-images.githubusercontent.com/30667001/158801383-585e7899-8fb2-4976-abf4-f199190f01fb.png)

This dashboard is available at https://stephanieashulman.github.io/Plotly-Biodiversity/.

## Resources
* Data Source: JSON data of samples with related participant demographic data
* Software: Visual Studio Code 1.65.0
* Libraries: JavaScripts Data Driven Documents Library (D3)
* Applications/Languages: Chrome Dev Tools, HTML, JavaScript, CSS

## Project Overview
In an effort to create a delicious meat substitute with flavors gleaned from proteins produced by bacteria colonizing human anatomy, the Improbable Beef Laboratory has collected samples from individuals across the country. Individuals are identified by a single ID that corresponds with:
* Demographic information, including age, bbtype, ethnicity, gender, location, and wash frequency.
* Colonized bacteria samples, defined by the operational taxonomic unit ID, corresponding name, and organism count.

From this data, three charts were created to display the related information:
* A dropdown menu that allows the site visitor to look up a participant by ID.
* A meter that displays the washing frequency by that participant.
* A bubble chart of bacteria.

D3.json was used to parse the data. Functional programming in JavaScript allowed for manipulation of the data. With the inclusion of an event handler, site visitors can choose the ID of interest to review.

The final dashboard is accessible at GitHub Pages through the link above.
