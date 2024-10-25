import { siteColors } from "@/helpers/base";
import { randomEither } from "@/helpers/universal";
import Link from "next/link";
import { Client } from 'react-hydration-provider';


const randColor = randomEither(siteColors);


function AddListingCard({exClass='', height=200, shadowy=false}) {

  return ( <>
  <Client>
<div className={`card card-style round-medium  top-30 ${shadowy && 'shadow-bg shadow-bg-l'}  ${exClass}`} /* style={{ height: height}} */>
            
            <div className="position-relative z-2  mt-3 mx-3">
                <div className='row_flex gap-2 mb-2 justify-between'>
                    <h2 className="color-white pt-0 pb-1 truncate-2 lh-1">Get Listed on LyveCity</h2>
                    <i className='fa'/>
                </div>
                <p className="color-white opacity-80 lh-13 text-15 mb-4"> 
                  Connect with more customers and grow your business with a free listing on LyveCity
                </p>
            </div>
            <div className="position-relative z-2 px-3 pb-2 row_flex gap-3 justify-between align-items-center">
                <div>
                <h5 className={`font-14 mb-n1 truncate-2 ${`color-highlight`}`}>{/* <i className='far fa-thumbs-up'/> */}It's Free</h5>
                </div>
                <Link href={`/add-listing`} className="h-fit border-dark-light color-gray-dark text-nowrap  btn btn-s rounded-xl font-900 mt-2 text-uppercase font-11">Learn More</Link>
            </div>
            <div className={`card-overlay opacity-90 bg-highlight`}/>
            <div className="card-overlay bg-gradient"/>
        </div>
        </Client>

</>
  )
}

export default AddListingCard