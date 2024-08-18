import Link from "next/link";
import { LoaderDualRingBoxed } from "../skeletons/Loaders";
import CallToActions from "../UI/CallToActions";

const DashboardCard = ({user, ownPosts, setPage, loading}) => {
  const {likes, following} = user?.user_meta ? user?.user_meta : {};

  return (
    <div className="row d-grid gap-3 mb-20 dash_cards p-0">
        {likes?.length > 0 && 
          <div className="px-10 pb-10 rounded-4 bg-theme shadow-3">
            <div className="row justify-between items-center">
              <div className="col-auto py-3">
                <div className="fw-500 lh-14">Favourites</div>
                <div className="text-26 lh-16 fw-600 mt-2">{likes?.length}</div>
                <div className="text-15 lh-14 text-light-1 mt-2">
                  My saved items
                </div>
              </div>
              <div className="col-auto">
                <button onClick={() => setPage('saved')} className="btn btn-light shadow-sm border px-20">See All</button>
              </div>
            </div>
        </div>}

          <div className="px-10 pb-10 rounded-4 bg-theme shadow-3">
            <div className="row justify-between items-center">
              <div className="col-auto py-3">
                <div className="fw-500 lh-14">Posted Listings</div>
                <div className="text-26 lh-16 fw-600 mt-2">{ownPosts}</div>
                <div className="text-15 lh-14 text-light-1 mt-2">
                  My posted Listings
                </div>
                {loading ?  <LoaderDualRingBoxed/> : <div className="section_info">
                {ownPosts && ownPosts > 0 ? <></> : <CallToActions noPadLeft
                actionComponent={ <div className="flex_horizontal gap-3"> 
                <Link href={'/add-listing'}><button className="btn btn-theme  w-auto px-20 text-15 fw-500" > Create First Listing </button></Link> 
                <Link href={'/about/about-us'}><button className="btn btn-outline-theme  w-auto px-20  text-15 fw-500" > Learn More </button></Link> </div> } 
                thin light bgClass={'bg-transparent shadow-0'} title={''} descript={"You have not created your first listing. You can start now. It's completely free"}/>}
                </div>}
              </div>
              {ownPosts && ownPosts > 0 && <div className="col-auto">
                <button onClick={() => setPage('posted')} className="btn btn-light shadow-sm border px-20">See All</button>
              </div>}
            </div>
        </div>
    </div>
  );
};

export default DashboardCard;
