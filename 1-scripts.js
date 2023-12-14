function generateQuoteSlide({pic_url, name, title, text}, isActive = false) {
  return `
    <div class="carousel-item ${isActive ? 'active' : ''}">
      <div class="row mx-auto align-items-center">
        <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
          <img
            src="${pic_url}"
            class="d-block align-self-center"
            alt="Carousel Pic 1"
          />
        </div>
        <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
          <div class="quote-text">
            <p class="text-white">${text}</p>
            <h4 class="text-white font-weight-bold">${name}</h4>
            <span class="text-white">${title}</span>
          </div>
        </div>
      </div>
    </div>
    `;
}

function loadCourses(searchValue, topicValue, sortValue) {
  $.ajax({
    url: 'https://smileschool-api.hbtn.info/courses',
    type: 'GET',
    data: {
        q: searchValue,
        topic: topicValue,
        sort: sortValue
    },
    beforeSend: function() {
        $("#video-cards-container").html('<div class="loader">Loading...</div>');
    },
    success: function(response) {
        // Remove loader
        $("#video-cards-container .loader").remove();

        // Update the courses and dropdowns
        updateCourses(response.courses);
        updateDropdowns(response.topics, 'topic-dropdown', topicValue);
        updateDropdowns(response.sorts, 'sort-dropdown', sortValue);

        // Update the video count display
        var videoCount = response.courses.length; // Get the length of the courses array
        $('.video-count').text(videoCount + ' videos'); // Update the text with the count
    },
    error: function() {
        $("#video-cards-container").html('<p>Error loading courses.</p>');
    }
  });
}

  // Function to update the courses cards
  function updateCourses(courses) {
      let html = courses.map(course => `
          <div class="col-12 col-sm-6 col-lg-3 mb-4">
              <div class="card">
                  <img src="${course.thumb_url}" class="card-img-top" alt="${course.title}">
                  <div class="card-body">
                      <h5 class="card-title">${course.title}</h5>
                      <p class="card-text">${course['sub-title']}</p>
                  </div>
                  <div class="card-footer">
                      <div class="user-info d-flex align-items-center">
                          <img src="${course.author_pic_url}" class="author-pic rounded-circle mr-3" alt="${course.author}">
                          <div>
                              <small class="text-muted">${course.author}</small>
                              <div class="rating">${generateStars(course.star)}</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `).join('');
      $("#video-cards-container").html(html);
  }

  // Helper function to generate star ratings
  function generateStars(rating) {
      let stars = '';
      for (let i = 0; i < 5; i++) {
          stars += i < rating ? '<img src="images/star_on.png" alt="Star On">' : '<img src="images/star_off.png" alt="Star Off">';
      }
      return stars;
  }

  // Function to update dropdowns
  function updateDropdowns(options, dropdownId, selectedValue) {
      let dropdownHtml = options.map(option => `<option value="${option}" ${option === selectedValue ? 'selected' : ''}>${option}</option>`).join('');
      $(`#${dropdownId}`).html(dropdownHtml);
  }

  // Load courses initially
  loadCourses('', 'All', 'Most popular');

  // Event listener for search input
  $('#search-input').on('input', function() {
      loadCourses(this.value, $('#topic-dropdown').val(), $('#sort-dropdown').val());
  });

  // Event listeners for topic and sort dropdowns
  $('#topic-dropdown, #sort-dropdown').on('change', function() {
      loadCourses($('#search-input').val(), $('#topic-dropdown').val(), $('#sort-dropdown').val());
  });
  
console.log('Script 1 start')
$(document).ready(function () {
  console.log('Document 1 Ready');
  const quoteContainer = $('#carouselExampleControls .carousel-inner');
  const loader = $('.loader');
  loader.show();

  $.get("https://smileschool-api.hbtn.info/quotes")
    .done(function (data) {
    console.log('API request 1 working');
    loader.hide();
    quoteContainer.empty();

    const slides = data.map((quote, index) => generateQuoteSlide(quote, index === 0)).join('');
    quoteContainer.append(slides);

    console.log('Slide 1 added to the carousel');
  })
  .fail(function (error) {
    console.error('API request 1 failed', error);
    loader.hide();
  })
}); 

