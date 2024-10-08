import DualColorTitle from '@/components/UI/partials/headings/DualColorTitle';
import { siteMasks } from '@/helpers/base';
import { randomEither } from '@/helpers/universal';

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
                                    </div>{list.map((service, index) => {
                                            const {item_description, item_title, item_sub_title, mylisting_accordion_photo} = service;
                                            return <div className="col-md-4" data-aos='fade-left'>
                                                        <img src={mylisting_accordion_photo} className={`mb-4 masked mask-${randomEither(siteMasks)}`} alt=""/>
                                                        <DualColorTitle string={item_title}/>
                                                        {item_description}
                                                        <div className="spacer-single"></div>
                                                        
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