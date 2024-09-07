export const largeResp = [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ];

export const s_settings = {
  dots: true,
  infinite: true,
  speed: 500,
  variableWidth: true,
  slidesToScroll: 1
};

export const responsiveCarousel = {
  pauseOnHover: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  export const spliderVariableWidth = {pagination: false, arrows: false, autoWidth: true, wheel: false, padding: { left: 0, right: 15}, perPage:1, perMove: 1, interval:4000, type:'loop'}

  export  const fadingSlide = {
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '0px',
    dots: true,
    autoplay: true,
    fade: true,
    infinite: true,
    interval: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false
  };


  export const variableWidth = {
    pauseOnHover: true,
    dots: true,
    infinite: true,
    speed: 1000,
    variableWidth: true,
    slidesToScroll: 1
  }