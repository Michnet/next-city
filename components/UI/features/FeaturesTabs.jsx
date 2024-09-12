function FeaturesTabs({features, exClass='', defTitle='Our Features'}) {
    let featuresView;

    if(features?.length > 0){
        if(features[0].list?.length > 0){
            const {title, descript, sub_title, list} = features[0];

                    featuresView = <div className="row">
                    <div className="col-md-6 offset-md-3 text-center" data-aos='fade-up'>
                        <h1>{title ?? defTitle}</h1>
                        <div className="separator"><span><i className="fa fa-circle"></i></span></div>
                        <div className="spacer-single"></div>
                        {descript ?? <></>}
                    </div>

                    <div className="col-md-12 px-0">
                        <div className="de_tab tab_steps">
                            <ul id="featuresTabs1" role="tablist" className="px-3 overflow-x-auto flex-nowrap pb-4 de_nav nav nav-tabs border-0 m-0">
                                {list.map((li, index) => {
                                    const {item_title, item_sub_title, mylisting_accordion_photo} = li;
                                    return <li data-bs-toggle="tab" data-bs-target={`#feat1-${index}`}  id={`feat1-${index}-tab`} className={`me-4 border-0 p-0 nav-link ${index == 0 ? 'active' : ''}`} data-aos='zoom-in' data-aos-delay="0s"><span className='position-relative p-0 bg-cover' style={{background: `url(${mylisting_accordion_photo})`}}><span className='feat_ind m-0'>0{index + 1}</span>{item_title}</span>
                                    <div className="v-border"></div>
                                </li>
                                })}
                            </ul>

                            <div className="de_tab_content tab-content mx-4" id="featuresTabs1Content">
                            {list.map((li, index) => {
                                    const {item_description} = li;
                                return <div role="tabpanel" id={`feat1-${index}`} className={`tab-pane fade ${index == 0 ? 'active show' : ''}`}>
                                    {item_description}
                                </div>
                            })}
                            </div>

                        </div>
                    </div>
                </div>
            
        }
       }
  return (
    <div className={`features_section ${exClass}`}>{featuresView}</div>
  )
}
export default FeaturesTabs