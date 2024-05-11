// import { srcWithFallback } from "~/server/UniversalFunctions";

import { srcWithFallback } from "@/helpers/universal";

function AuthorCard({author, setActiveKey, cover, exClass}) {
  let authorView;
  if(author?.id){

    const {avatar_urls, name, registered_date} = author; 
   authorView = <div className={`author_card ${exClass ?? ''}`}>

   <div className="card card-style text-center shadow-sm m-0">
   <div style={{height: '100px', background: `url(${srcWithFallback(cover)})`}} className="bg-cover card-img-top position-relative">
      <div className="header-content position-absolute w-100 flex-center d-flex">
       <img src={avatar_urls['96']} alt="" width="70" height='70' className="img-fluid rounded-circle img-thumbnail border-0"/>
       </div>
   </div>
   <div className="card-body">
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
  return (<>
  {authorView
    }</>
  )
}
export default AuthorCard