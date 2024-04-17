//import Image from "next/image";
import { useEffect, useState } from "react";
import MainFilterSearchBox from "./MainFilterSearchBox";
//import Image from "next/image";
//import { Client } from "react-hydration-provider";

const HeroSearch = ({categories, topLocations}) => {
  const [dates, setDates] = useState([]);
  const [category, setCategory] = useState(null);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    if(categories){
      setLoaded(true)
    }
  }, [categories]);

 /*  function getImage(){
    if(category){
      return category?.term_meta.image_url;
    }else if(starterItem){
      return starterItem?.term_meta?.image_url;
    }else{
      return "/img/events/pexels-jonas-von-werne-2897462.jpg";
    }
  } */

  const heroBg = "/img/events/city.jpg";
  //const heroBg = "/img/events/pexels-jonas-von-werne-2897462.jpg";
  
  return (
    <section className="masthead -type-2 z-2 _hero _events">
      <div className="hero_im_holder h-xl-100" >
      <div className="masthead__bg h-100 bg-cover">
        {/* <Image quality={90} className="z--1 opacity-25" src={heroBg} priority fill style={{objectFit:'cover'}}/> */}
        <div className="container hero_content">

        <div className="masthead__content px-lg-5">
        <div className="header-margin mt-md-0"></div>

          <div className="row  align-items-center">
            <div className="col-xl-6 px-0 px-sm-30">
              <div className="mb-50"><h1 className="z-2 lh-1 text-60 lg:text-40 text-white pt-80 xl:pt-0">
                <span className="handy _loud" /* data-aos="zoom-in" */>Update</span>
                <br />
                <span className="fw-700 text-30 mb-20 heady" >Your Calendar</span>
              </h1>
              <p className="z-2 text-white text-18" >
                Checkout Upcoming <span style={{color : category?.term_meta.color ?? 'inherit', filter: 'brightness(1.5)'}}>{category?.name ?? ''}</span> Events Near You.
              </p>
              </div>
              <div className="masthead__tabs mb-30" style={{paddingTop: 0}} /* data-aos="zoom-in" */>
                {categories?.length > 0 ? <div className="tabs -bookmark-2 js-tabs position-relative">
                  <div className="search_holder gap-2 no-scrollbar mb-3 text-end pr-24 d-flex flex-column align-items-end">
                    <p className="text-white fw-300 text-20">Select a Category</p>
                    <hr className='border-loud opacity-100 w-48' style={{borderTopWidth: '3px'}}/>
                    <div>{categories?.map((tab) => {
                      const {term_meta, id} = tab;
                      return (
                      <button
                        key={tab?.id}
                        style={{/* borderLeft: `3px solid ${term_meta.color}`, */ filter: 'brightness(1.5)'}}
                        className={`hero_cat_links pl-10 py-1 fw-600  mb-1 ml-5 lh-1 pr-0 d-inline-block ${
                          category?.id === id ? "text-success  is-tab-el-active" : ""
                        }`}
                        onClick={() => setCategory(tab)}
                      >
                        {/* <i className={`${term_meta.rl_awesome} text-16 mr-10 sm:mr-5`} style={{filter: 'brightness(1.5)', color: category?.id === id ? term_meta.color ?? '#fff' : '#fff'}}></i> */}
                        <span style={{color: term_meta.color}}>#</span>{tab?.name.replace(' and ', '+').replace(' &amp; ', '+')}
                      </button>
                    )})}</div>
                  </div>
                </div> : <p>No Categories</p>}
              </div>

              <MainFilterSearchBox  locations = {topLocations} categories={categories} category={category} setCategory={setCategory} dates={dates} setDates={setDates}/>

            </div>

            <div className="col-xl-6 d-none d-xl-block">
              <div className="masthead__images relative-1">
                <div>
                  <img
                    src="/img/events/wedding.jpg"
                    alt="image"
                    className="js-mouse-move"
                  />
                </div>
                <div>
                  <img
                    src="/img/events/music.jpg"
                    alt="image"
                    className="js-mouse-move"
                  />
                </div>
                <div >
                  <img
                    src="/img/events/mic.jpg"
                    alt="image"
                    className="js-mouse-move"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="edge_shaper"/>

      </div>
      </div>


      
    </section>
  );
};

export default HeroSearch;
