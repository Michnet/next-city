import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

const Splider = ({children, options={}, height=null, autoHeight=true, showDots=false, exClass='', type= 'loop', gap=10 }) => {
    let optObj = {snap: false, drag: 'free', arrows: true, pagination: false,  breakpoints: { 600: { arrows: false, pagination: true}, }, pauseOnHover: true, autoWidth: true, height: height, type:type, autoHeight: autoHeight,  pagination: showDots, wheel: false, ...options}
    const {padding} = options ?? {};
    return (
        <div className={`splider htm_carousel ${exClass}`} style={{paddingLeft: padding?.left ?? '0', paddingRight: padding?.right ?? '0'}}>
            {children?.length > 0 && <>
                    {children.map((chi, i) => <div className="slide" style={{marginRight: gap}} key={i}>{chi}</div>)}
            </>}
        </div>
    )
}
export default Splider;

export const SpliderJs = ({children, options={}, height=null, autoHeight=true, showDots=false, exClass='', type= 'loop' }) => {
    let optObj = {snap: false, drag: 'free', arrows: true, pagination: false,  breakpoints: { 600: { arrows: false, pagination: true}, }, pauseOnHover: true, autoWidth: true, height: height, type:type, autoHeight: autoHeight,  pagination: showDots, wheel: false, ...options}
    return (
        <div className={`splider ${exClass}`}>
            {children?.length > 0 && <Splide options={{...optObj}}>
                    {children.map((chi, i) => <SplideSlide key={i}>{chi}</SplideSlide>)}
            </Splide>}
        </div>
    )
}
