document.addEventListener('DOMContentLoaded', () => {
    const filterInput = document.getElementById('filter');
    filterInput.addEventListener('input', () => {
        const filterValue = filterInput.value.toLowerCase();
        const images = document.querySelectorAll('#gallery-container img');
        images.forEach(img => {
            const altText = img.alt.toLowerCase();
            if (altText.includes(filterValue)) {
                img.style.display = '';
            } else {
                img.style.display = 'none';
            }
        });
    });

    // Fetch gallery images from the server
    fetch('/api/gallery')
        .then(response => response.json())
        .then(data => {
            const galleryContainer = document.getElementById('gallery-container');
            data.forEach(image => {
                const img = document.createElement('img');
                img.src = image.url;
                img.alt = image.alt;
                galleryContainer.appendChild(img);
            });
        });
});
