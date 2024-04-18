import { siteColors } from "@/helpers/base";
import { randomEither } from "@/helpers/universal";
import Link from "next/link";


const randColor = randomEither(siteColors);


function AddListingCard({exClass='', height=200, shadowy=false}) {

  return ( <>
<div className={`card card-style round-medium  top-30 ${shadowy && 'shadow-bg shadow-bg-l'}  ${exClass} ${`bg-${randColor}-dark`}`} style={{ height: height}}>
            
            <div className="card-top mt-3 mx-3">
                <div className='row_flex gap-2 mb-2 justify-between'>
                    <h2 className="color-white pt-0 pb-1 truncate-2">List Your Event</h2>
                    <i className='fa'/>
                </div>
                <p className="color-white opacity-80 lh-13"> 
                  Get the word out with a free lading page for your event
                </p>
            </div>
            <div className="card-bottom mb-3 me-3">
                
            </div>
            <div className="card-bottom px-3 pb-2 row_flex gap-3 justify-between align-items-center">
                <div>
                <h5 className={`font-13 mb-n1 truncate-2 ${`color-${randColor}-light`}`} style={{color: randColor}}>Start Today</h5>
                </div>
                <Link href={`/add-listing`} className="h-fit border-dark-light color-gray-dark text-nowrap  btn btn-s rounded-xl font-900 mt-2 text-uppercase font-11">Add Event</Link>
            </div>
            <div className={`card-overlay opacity-90 `} style={{background: randColor}}/>
            <div className="card-overlay bg-gradient"/>
        </div>

</>
  )
}

export default AddListingCard