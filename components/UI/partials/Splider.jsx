import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

const Splider = ({children, options, height}) => {
    return (
        <div className='splider' style={{height: height ?? 'auto'}}>
            {children?.length > 0 && <Splide hasTrack={false} style={{height: options?.pagination ? height - 40 : height}} options={...options}>
                <SplideTrack style={{height: 'inherit'}}>
                    {children.map((chi, i) => <SplideSlide key={i}>{chi}</SplideSlide>)}
                </SplideTrack>
            </Splide>}
        </div>
    )
}
export default Splider;