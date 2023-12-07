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

