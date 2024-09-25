import DualColorTitle from '@/components/UI/partials/headings/DualColorTitle';
import { siteMasks } from '@/helpers/base';
import { randomEither } from '@/helpers/universal';
import { HeadingSeparatorDot } from '../partials/headings/Heading1';
import Splider from '../partials/Splider';

function FeaturesCarousel({features, exClass='', defTitle='Our Features'}) {
    let featuresView;

    if(features?.length > 0){
        if(features[0].list?.length > 0){
            
            const {title, descript, sub_title, list} = features[0];

                    featuresView = <div className="features _carousel ">
                                <div>
                                    <HeadingSeparatorDot exClass='mb-5 px-5' title={title ?? defTitle} subtitle={sub_title ?? null} descript={descript ?? null}/>
                                    <Splider  options={{padding: {left: 20, right: 30}}}>{list.map((service, index) => {
                                            const {item_description, item_title, item_sub_title, mylisting_accordion_photo} = service;
                                            return <div className="feat_item me-3" style={{width: 300}}>
                                                        <img src={mylisting_accordion_photo} className={`mb-4 masked mask-${randomEither(siteMasks)}`} alt=""/>
                                                        <DualColorTitle string={item_title}/>
                                                        <p className='text-16'>{item_description}</p>
                                                        <div className="spacer-single"></div>
                                                        
                                                    </div>
                                    }
                                    )
                                    }</Splider>
                                </div>
                            </div>
            
        }
       }
  return (
    <div className={`features_section ${exClass}`}>{featuresView}</div>
  )
}
export default FeaturesCarousel