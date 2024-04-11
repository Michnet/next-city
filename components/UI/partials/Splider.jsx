import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

const Splider = ({children, options={}, height, showDots=false, exClass=''}) => {
    let optObj = {type: 'loop', autoWidth: true, ...options,  pagination: showDots, wheel: false}
    return (
        <div className={`splider ${exClass}`} style={{height: height ?? 'auto'}}>
            {children?.length > 0 && <Splide hasTrack={false} style={{height: 'inherit'}} options={...optObj}>
                <SplideTrack style={{height: 'inherit'}}>
                    {children.map((chi, i) => <SplideSlide key={i}>{chi}</SplideSlide>)}
                </SplideTrack>
            </Splide>}
        </div>
    )
}
export default Splider;