document.addEventListener('DOMContentLoaded', function() {
    // Load typing test into container
    var container = document.getElementById('typing-test-container');
    container.innerHTML = '<object type="text/html" data="../typing-test/index.html" width="100%" height="600px"></object>';
});

// Define a function to create entries based on filtered data
function createEntries(filteredData) {
    const gridContainer = document.getElementById('data-display');
    gridContainer.innerHTML = ''; // Clear previous entries

    filteredData.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');

        // Concatenate multiple values for filtering, separated by a space
        const dataItemValue = `${entry.color} ${entry.maker} ${entry.source}`; // Add more attributes as needed

        entryDiv.setAttribute(`data-item`, dataItemValue);

        // Create anchor element as a wrapper for the entry content
        const anchor = document.createElement('a');
        anchor.href = `../pages/${entry.title}.html`;
        anchor.classList.add('entry-link');

        // Create content elements
        const maker = document.createElement('p');
        maker.textContent = entry.maker;

        const source = document.createElement('p');
        source.textContent = entry.source;

        const switches = document.createElement('p');
        switches.textContent = entry.switches;

        const keycaps = document.createElement('p');
        keycaps.textContent = entry.keycaps;

        // Background color from JSON data
        entryDiv.style.backgroundColor = entry.colormain;

        // Apply text color from JSON data
        maker.style.color = entry.colorsecondary;
        source.style.color = entry.colorsecondary;
        switches.style.color = entry.colorsecondary;
        keycaps.style.color = entry.colorsecondary;

        // Append content elements to entryDiv
        entryDiv.appendChild(maker);
        entryDiv.appendChild(source);
        entryDiv.appendChild(switches);
        entryDiv.appendChild(keycaps);

        // Append entryDiv to anchor element
        anchor.appendChild(entryDiv);

        // Append anchor element to data-display
        gridContainer.appendChild(anchor);
    });
}

// Fetch data and create entries initially
document.addEventListener("DOMContentLoaded", function () {
    let data; // Variable to store fetched data

    fetch('../data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responseData => {
        data = responseData; // Store fetched data in a variable

        // Call createEntries initially with all data
        createEntries(data);

        // Filter functionality
        document.querySelectorAll('.filter').forEach(filter => {
            filter.addEventListener('change', () => {
                const selectedFilters = Array.from(document.querySelectorAll('.filter:checked')).map(el => el.value);
                
                // Update selected filters display section
                const selectedFiltersDisplay = document.getElementById('selected-filters');

                // Clear previous filters
                selectedFiltersDisplay.innerHTML = '';

                // Add each selected filter to the display section

// Wrap all the filters in a div with class "banana-wrapper"
selectedFiltersDisplay.innerHTML = '<div class="banana-wrapper">' +
    selectedFilters.map(filter => {
        const filterLabel = document.querySelector(`label[for="${filter}"]`);
        if (filterLabel) {
            // Create the checkbox and label elements for the selected filter with class "banana"
            return `<input type="checkbox" class="banana color-filter selected" id="${filter}" value="${filter}" checked>
                <label for="${filter}" class="selected" style="background-color: ${filterLabel.style.backgroundColor}; color: ${filterLabel.style.color}">${filter}</label>`;
        }
        return '';
    }).join('') +
'</div>';

                    
                

                const filteredData = data.filter(entry => {
                    const entryValues = [entry.color, entry.layout, entry['switch-type']].filter(value => value !== undefined);
                    console.log('Entry Values:', entryValues);
                    console.log('Selected Filters:', selectedFilters);
                    return selectedFilters.some(filter => entryValues.includes(filter));
                });                
                

                // Create entries based on filtered data
                createEntries(filteredData);
            });
        });

        // Event listener for removing selected filters
        document.querySelectorAll('#selected-filters input[type="checkbox"]').forEach(selectedFilter => {
            selectedFilter.addEventListener('change', () => {
                const filterId = selectedFilter.id;
                const filterLabel = document.querySelector(`label[for="${filterId}"]`);

                // Remove the selected filter from the display section
                if (!selectedFilter.checked) {
                    selectedFilter.parentElement.remove();
                }

                // Uncheck the corresponding checkbox
                if (filterLabel) {
                    filterLabel.checked = false;
                }

                // Trigger change event on filter to update the filtered data
                document.querySelector(`#${filterId}`).dispatchEvent(new Event('change'));
            });
        });
        
// Event listener for clear button
document.getElementById('clear-filters').addEventListener('click', () => {
    // Reload the entire page
    window.location.reload();
});

    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });

    // Show all entries initially
    createEntries(data);
});