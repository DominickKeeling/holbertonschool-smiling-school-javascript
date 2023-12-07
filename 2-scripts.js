//========== Popular Section ==========

function generatePopularSlide({title, thumb_url, author, author_pic_url, star, duration, topic, views, keywords}, isActive= false) {
  return `
    <div class="carousel-item ${isActive ? 'active' : ''}">
      <div class="row align-items-center mx-auto">
        <div
          class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center"
        >
          <div class="card">
            <img
              src="${thumb_url}"
              class="card-img-top"
              alt="Video thumbnail"
            />
            <div class="card-img-overlay text-center">
              <img
                src="images/play.png"
                alt="Play"
                width="64px"
                class="align-self-center play-overlay"
              />
            </div>
            <div class="card-body">
              <h5 class="card-title font-weight-bold">${title}</h5>
              <p class="card-text text-muted">
                Lorem ipsum dolor sit amet, consect adipiscing elit,
                sed do eiusmod.
              </p>
              <div class="creator d-flex align-items-center">
                <img
                  src="${author_pic_url}"
                  alt="Creator of
                  Video"
                  width="30px"
                  class="rounded-circle"
                />
                <h6 class="pl-3 m-0 main-color">${author}</h6>
              </div>
              <div class="info pt-3 d-flex justify-content-between">
                <div class="rating">
                  ${Array(star).fill('<img src="images/star_on.png" alt="star on" width="15px"/>').join('')}
                  ${Array(5 - star).fill('<img src="images/star_off.png" alt="star off" width="15px"/>').join('')}
                </div>
                <span class="main-color">${duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}   

console.log('Script 2 start')
jQuery(document).ready(function () {
  console.log('Document 2 is ready')
  const cardContainer = $('#carouselExampleControls2 .carousel-inner');
  const loader = $('.loader2');
  loader.show();
  
  $.get("https://smileschool-api.hbtn.info/popular-tutorials")
  .done(function (data) {
    console.log('API request 2 working');
    loader.hide();
    cardContainer.empty();

    const slides = data.map((card, index) => generatePopularSlide(card, index === 0)).join('');
    cardContainer.append(slides);

    console.log('Slides are added to the carousel');

    $('.slick-carousel').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,

  })
  .fail(function (error) {
    console.log('API  request failed', error);
    loader.hide();
  }); 
}); 