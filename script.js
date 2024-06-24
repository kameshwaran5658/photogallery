document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.getElementById('gallery');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    const body = document.body;
    const navbar = document.getElementById('navbar');
    const downloadButton = document.getElementById('downloadButton');
  
    const images = [
      { src: '/images/n1.jpg', category: 'nature' },
      { src: '/images/n2.jpg', category: 'nature' },
      { src: '/images/n3.jpg', category: 'nature' },
      { src: '/images/c1.jpg', category: 'city' },
      { src: '/images/c2.jpg', category: 'city' },
      { src: '/images/c3.jpg', category: 'city' },
      { src: '/images/p1.jpg', category: 'people' },
      { src: '/images/p2.jpg', category: 'people' },
      { src: '/images/p3.jpg', category: 'people' }
      // Add more images as needed
    ];
  
    // Function to load images based on the selected filter
    function loadImages(filter = 'all') {
      gallery.innerHTML = '';
      const filteredImages = filter === 'all' ? images : images.filter(image => image.category === filter);
      filteredImages.forEach(image => {
        const div = document.createElement('div');
        div.classList.add('col-md-4', 'gallery-item');
        div.innerHTML = `
          <img src="${image.src}" class="img-fluid" alt="${image.category}" data-toggle="modal" data-target="#lightboxModal" data-src="${image.src}">
          <div class="overlay">
            <a href="${image.src}" download class="btn btn-primary btn-sm mt-2">Download</a>
          </div>
        `;
        gallery.appendChild(div);
      });
    }
  
    // Event listeners for filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        filterButtons.forEach(btn => btn.classList.remove('btn-primary'));
        this.classList.add('btn-primary');
        const filter = this.getAttribute('data-filter');
        loadImages(filter);
      });
    });
  
    // Event listener for opening the lightbox modal
    $('#lightboxModal').on('show.bs.modal', function (event) {
      const img = $(event.relatedTarget); // Image that triggered the modal
      const src = img.data('src');
      const modal = $(this);
      modal.find('#lightboxImage').attr('src', src);
      downloadButton.href = src; // Update download button link
    });
  
    // Initial load of all images
    loadImages();
  
    // Theme toggle functionality
    themeToggleCheckbox.addEventListener('change', function () {
      if (themeToggleCheckbox.checked) {
        body.classList.add('dark-mode');
        navbar.classList.remove('navbar-light', 'bg-light');
        navbar.classList.add('navbar-dark', 'bg-dark');
      } else {
        body.classList.remove('dark-mode');
        navbar.classList.remove('navbar-dark', 'bg-dark');
        navbar.classList.add('navbar-light', 'bg-light');
      }
    });
  
  });
  