// import ListingsBlock from "~/appComponents/components/dashboard/Listing/ListingsBlock";
//import WishlistTable from "./components/WishlistTable";

import ListingsBlock from "@/components/UI/Listings/ListingsBlock";

const DBSaved = ({user_meta}) => {

  const {likes} = user_meta;

  let likesView;

    if(likes.length > 0){
      likesView = <ListingsBlock exClass={'px-2 pt-20'} noCats title = {'Saved Items'} mini  ids = {likes}/>
    }
  return (
    <>
      <div>
                <h1 className="text-30 lh-14 fw-600">Wishlist</h1>
                <div className="text-15 text-light-1 mb-20">
                  My Favorites.
                </div>

            <div className="py-30 px-30 rounded-4 bg-theme shadow-3">
              {/* <WishlistTable /> */}
              {likesView}
            </div>
          </div>
      {/* End dashbaord content */}
    </>
  );
};

export default DBSaved;
