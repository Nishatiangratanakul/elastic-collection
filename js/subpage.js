document.addEventListener("DOMContentLoaded", function () {
    // Extract entryId from the id attribute of the content element
    const entryId = document.querySelector('.entry-details').id;
    console.log('Entry ID:', entryId); // Log the entryId to verify if it's correctly retrieved

    // Step 2: Fetch the JSON data
    fetch('../data.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('JSON data:', data); // Log the retrieved JSON data to verify its content
            // Step 3: Find the entry with the corresponding ID
            const entry = data.find(entry => entry.title === entryId);
            console.log('Found entry:', entry); // Log the found entry to verify if it's found
            if (entry) {
                // Step 4: Populate the entry details on the page
                const entryDetails = document.getElementById(entryId);
                entryDetails.innerHTML = `
                    <img src="../assets/${entry.File}" alt="${entry.title}">
                    <div class="entry-text">
                        <h2>Source:</h2><p>${entry.source}</p>
                        <h2>Maker:</h2><p>${entry.maker}</p>
                        <h2>Case:</h2><p>${entry.case}</p>
                        <h2>Mods:</h2><p>${entry.mods}</p>
                        <h2>Plate:</h2><p>${entry.plate}</p>
                        <h2>PCB:</h2><p>${entry.pcb}</p>
                        <h2>Layout:</h2><p>${entry.layout}</p>
                        <h2>Switches:</h2><p>${entry.switches}</p>
                        <h2>Keycaps:</h2><p>${entry.keycaps}</p>
                    </div>
                `;
            } else {
                console.error('Entry not found');
            }
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
});
