const { default: Splider } = require("@/components/UI/partials/Splider");
const { default: Image } = require("next/image");

function HeroSlider({listing}){
    const {meta, title, cover} = listing ?? {};
    const {_wcu, type, _event_program, _stats, _links, "_event-sponsors": sponsors, "_special-guests": special_guests, _job_gallery:gallery, _performers, _wwd} = meta ?? {};
    let wcu = _wcu[0] ?? null

    let strengthsView;

    if(listing){
        if(Array.isArray(wcu?.list)){
            if(wcu?.list?.length > 0){
                const reasons = wcu.list;
                const reasonArr =  reasons.map((reason) => {
                    const {item_title, item_description, mylisting_accordion_photo} = reason;
                    return <div className='card card-style m-0 shadow-0 rounded-0 position-relative border-0 smLine' style={{height: '400px'}}>
                                <Image className='object-cover' fill src={mylisting_accordion_photo} alt=""/>
                                <div className='card-bottom w-100 h-100 p-5'>
                                    <div className="tp-caption big-white sft" data-aos='fade-left'>
                                    Our Expertise For
                                </div>

                                <div className="tp-caption ultra-big-white customin customout start" data-aos='zoom-in'>
                                    {title.rendered}
                                </div>

                                    <div className="tp-caption sfb" data-x="0" data-y="335" data-speed="400" data-start="800" data-easing="easeInOutExpo">
                                        <a href="#" className="btn-slider">Our Portfolio
                                        </a>
                                    </div>
                                </div>
                            </div>
                });
                strengthsView = <>
                        <div className={`features_1 listing_strengths mb-50`}>
                            <div className="row_content row" data-aos="fade-right">
                               {/*  {wcu?.wcu_intro_title ? <div className="strengths_intro col-12 col-md-4 mt-4 px-3 text-center text-md-end">
                                    <h3 className="section_head dark_text">{wcu.wcu_intro_title}</h3>
                                    <h4 className="section_subHead gray_text mb-3">{wcu.wcu_intro_detail}</h4>
                                </div> 
                                : 
                                <div className="strengths_intro col-12 col-md-4 mt-4 mb-4 px-3 text-center text-md-end">
                                    <h3 className="section_head dark_text">{type == 'event' ? 'Why Attend' : 'Why Consider'}</h3>
                                    <h4 className="section_subHead gray_text mb-3">{`Some reasons you may like this ${type == 'event' ? 'event' : 'place'}`}</h4>
                                </div>} */}
                                <div className="strengths_body col-12 p-0" >
                                    <Splider exClass={'in_color border-0 card card-style rounded-0 mx-0'} options={{autoWidth: false, perMove:1, perPage:1, padding:{right: '0%', left: '0%'}, fixedWidth:'100%'}} showDots>{reasonArr}</Splider>
                                </div>
                            </div>
                        </div>
                </>
            }
        }
    }

    return(
        <section  id="section-slider" className="py-0 fullwidthbanner-container" aria-label="section-slider">
                {strengthsView}
            </section>
    );
}
export default HeroSlider;