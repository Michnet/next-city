import { introState } from "@/contexts/atoms";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide"
import { useRecoilState } from "recoil";

function Splash() {

    const [intro, setIntro] = useRecoilState(introState);
    const screens = [
        {
            id: 1,
            imgSrc: "images/undraw/1.svg",
            title: "StickyMobile 5.0",
            subtitle: "Simply the Best Mobile Webkit on Envato", 
            descript: "Powered by Bootstrap 5.x with AJAX Transitions providing full PWA, RTL and Dark Mode integrations!"
        },
        {
            id: 2,
            imgSrc: "images/walkthrough/calendar.png",
            title: "Events near you",
            subtitle: "Stay updated with what's happening around", 
            descript: "Powered by Bootstrap 5.x with AJAX Transitions providing full PWA, RTL and Dark Mode integrations!"
        }
    ];

    if(intro){
        return <></>
    }else{
        return (
            <div style={{height: '100vh', width: '100vw', zIndex: '100'}} className = 'position-fixed top-0 left-0'>
                <Splide options={{classes:{next  : 'splide__arrow--next cover-next slider-next'}, type: 'loop', perMove:1, perPage:1}} hasTrack={ false }>
                    <SplideTrack>
                        {screens.map((el) => {
                            const {id,title,subtitle,descript,imgSrc} = el;
                            return <SplideSlide key={id}>
                                <div  className="card" style={{height: '100vh', width: '100vw'}}>
                                    <div className="card-center text-center">
                                        <div className="content mt-n5">
                                            <img className="mb-3 mx-auto" width="320" src={imgSrc}/>
                                            <h1 className="mt-5 mb-0 font-30">{title}</h1>
                                            <p className="mt-n1 color-highlight font-12">{subtitle}</p>
                                            <p className="boxed-text-xl">
                                                {descript}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SplideSlide>
                        })}
                    </SplideTrack>
        
        
                    <div className="splide__progress">
                        <div className="splide__progress__bar" />
                    </div>
        
                    <div className="splide__arrows">
                        <button className="splide__arrow splide__arrow--prev"><i class="fa fa-angle-left me-4 ms-4"/>Previous</button>
                        <button className="splide__arrow splide__arrow--next">Next<i class="fa fa-angle-right me-4 ms-3"/></button>
                    </div>
        
                </Splide>
        
                <div className="cover-button-bottom">
                    <a href="#" className="btn scale-box btn-m mt-5 btn-center-l rounded-l shadow-xl bg-highlight font-800 text-uppercase" onClick={() => setIntro(true)}>Get Started</a>
                </div>
                
                <a href="#" class="cover-next slider-next splide__arrow--next color-gray-dark">Next<i class="fa fa-angle-right me-4 ms-3"></i></a>
                <a href="#" class="cover-prev slider-prev splide__arrow--prev color-gray-dark"><i class="fa fa-angle-left me-4 ms-4"></i>Previous</a>
        
                </div>
          )
    }
}
export default Splash