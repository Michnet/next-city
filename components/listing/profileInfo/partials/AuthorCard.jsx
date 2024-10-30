// import { srcWithFallback } from "~/server/UniversalFunctions";

import { resizedImage, srcWithFallback } from "@/helpers/universal";

function AuthorCard({author, setActiveKey, cover, exClass, listingId}) {
  let authorView;
  if(author?.id){
    if(author.id == 1){
      const {avatar_urls, name, registered_date} = author; 
      authorView = <div /* data-aos='zoom-in' */ className={`author_card ${exClass ?? ''}`}>
   
      <div className="card card-style text-center shadow-sm m-0" style={{minHeight: '300px'}}>
      <div style={{background: `url(${srcWithFallback(resizedImage(cover, 'medium_large'))})`}} className="position-absolute z-1 h-100 bg-cover card-img-top position-relative">
      </div>
      <div className="card-body z-2 position-relative bg-gradient-fade justify-end d-flex flex-column">
          <h5 className="card-title mb-0">Created By LyveCity</h5>
          <span className="small smLine">If you are the owner or organiser of this listing, you can claim it and take over it's management on LyveCity</span>
          {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
          <div className='card_actions mt-20'><a href={`https://lyvecityclub.com/claim-listing/?listing_id=${listingId}`} target={'_blank'} className="border-0 btn btn-primary mx-auto">Claim</a></div>
      </div>
      
      </div>
     
   </div>
    }else{
      const {avatar_urls, name, registered_date} = author; 
      authorView = <div /* data-aos='zoom-in' */ className={`author_card ${exClass ?? ''}`}>
   
      <div className="card card-style text-center shadow-sm m-0" style={{minHeight: '300px'}}>
      <div style={{background: `url(${srcWithFallback(resizedImage(cover, 'medium_large'))})`}} className="h-100 bg-cover card-img-top position-absolute">
         
      </div>
      <div className="card-body bg-gradient-fade">
      <div className="header-content h-fit w-100 flex-center d-flex" style={{height: 'fit-content'}}>
          <img style={{marginBottom: '10px'}} src={avatar_urls['96']} alt="" width="70" height='70' className="img-fluid rounded-circle img-thumbnail border-0"/>
          </div>
          <h5 className="card-title mb-0">{name}</h5>
          <span className="small text-uppercase text-muted">Author</span>
          {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
          <div className='card_actions mt-20'><button onClick={() => setActiveKey('private-chat')} className="btn btn-primary mx-auto">Contact</button></div>
      </div>
      {/* <div className="card-footer text-gray">
          2 days ago
      </div> */}
      </div>
     
   </div>
    }
  }
  return (<>
  {authorView
    }</>
  )
}
export default AuthorCard