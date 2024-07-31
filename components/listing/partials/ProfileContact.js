// import { ListingContact } from "../../UI/components";
import CallToActions from "@/components/UI/CallToActions";
import { authState } from "@/contexts/atoms";
import { useRecoilValue } from "recoil";
import { ListingContact } from "./ListingContact";
import ProfileChat from "./ProfileChat";


const ProfileContact = ({listing, count}) => {
  const {id, thumbnail, author_id, slug} = listing;
  const {user} = useRecoilValue(authState);

  let contactView;
  if(id){
    contactView = <>
    <div className="gx-profile-info">
              <div className="row">
                {author_id == user?.id ? 
                <CallToActions exClass="border m-0" bgClass='bg-transparent' light title={'Authored Page'} descript='Contact options are not available in a listing you own. Only other users can see contact options'/>
                :
                <>
                <div className="col-12 col-lg-8 p-0 mb-15">
                  <ProfileChat slug={slug} id={id} thumbnail={thumbnail} author={author_id} count={count}/>
                </div>
                <div className="col-12 col-lg-4 lg:pl-0 lg:pr-0">
                  <ListingContact bgClass={'bg-theme'} border={true} light={true} listing={listing} title={'More Options'} descript={"There are more ways to connect with this listing's team"}/>
                </div>
                </>}
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
