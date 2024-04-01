// import { ListingContact } from "../../UI/components";
import { ListingContact } from "./ListingContact";
import ProfileChat from "./ProfileChat";


const ProfileContact = ({listing, count}) => {
  const {id, thumbnail, author_id} = listing;

  let contactView;
  if(id){
    contactView = <>
    <div className="gx-profile-info">
              <div className="row">
                <div className="col-12 col-lg-8 p-0 mb-15">
                  <ProfileChat id={id} thumb={thumbnail} author={author_id} count={count}/>
                </div>
                <div className="col-12 col-lg-4 lg:pl-0 lg:pr-0">
                  <ListingContact bgClass={'bg-theme'} border={true} light={true} listing={listing} title={'More Options'} descript={"There are more ways to connect with this listing's team"}/>
                </div>
              </div>
          </div>
    </>
  }
  return (
    <>
    {contactView}
    </>
  )
}

export default ProfileContact;
