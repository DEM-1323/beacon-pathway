document.addEventListener('DOMContentLoaded', () => {
    // Get the opportunities link
    const opportunitiesLink = document.getElementById('opportunities-link');
    const contentFrame = document.getElementById('content-frame');

    // Add click event listener to the "Opportunities" link
    opportunitiesLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default anchor behavior

        // Load opportunities.html into the iframe
        contentFrame.src = 'opportunities.html';
    });
});
