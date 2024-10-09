import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

const Splider = ({children, options={}, height=null, autoHeight=true, showDots=false, exClass='', type= 'loop' }) => {
    let optObj = {snap: true, drag: 'free', arrows: true, pagination: false,  breakpoints: { 600: { arrows: false, pagination: true}, }, pauseOnHover: true, autoWidth: true, height: height, type:type, autoHeight: autoHeight,  pagination: showDots, wheel: false, ...options}
    return (
        <div className={`splider ${exClass}`}>
            {children?.length > 0 && <Splide options={{...optObj}}>
                    {children.map((chi, i) => <SplideSlide key={i}>{chi}</SplideSlide>)}
            </Splide>}
        </div>
    )
}
export default Splider;