import DualColorTitle from '@/components/UI/partials/headings/DualColorTitle';

function Features({features, exClass='', defTitle='Our Features'}) {
    let featuresView;

    if(features?.length > 0){
        if(features[0].list?.length > 0){
            
            const {title, descript, sub_title, list} = features[0];

                    featuresView = <div className="container">
                                <div className="row">
                                    <div className="col-md-6 offset-md-3 text-center" data-aos='fade-up'>
                                        <h1>{title ?? defTitle}</h1>
                                        <div className="separator"><span><i className="fa fa-circle"></i></span></div>
                                        <div className="spacer-single"></div>
                                        {descript ?? <></>}
                                    </div>

                                    {list.map((service, index) => {
                                            const {item_description, item_title, item_sub_title, mylisting_accordion_photo} = service;
                                            return <div className="col-md-4" data-aos='fade-left'>
                                                        <DualColorTitle string={item_title}/>
                                                        {item_description}
                                                        <div className="spacer-single"></div>
                                                        <a className="image-popup-no-margins" href="/archi/images/misc/pic_1.jpg">
                                                            <img src={mylisting_accordion_photo} className="img-responsive" alt=""/>
                                                        </a>
                                                    </div>
                                    }
                                    )
                                    }
                                </div>
                            </div>
            
        }
       }
  return (
    <div className={`features_section ${exClass}`}>{featuresView}</div>
  )
}
export default Features