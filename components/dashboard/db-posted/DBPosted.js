//import WishlistTable from "./components/WishlistTable";

import ListingsBlock from "@/components/UI/Listings/ListingsBlock";

const DBPosted = ({userId}) => {

  let postedView;

    if(userId){
      postedView = <ListingsBlock forAuthor layout={'horizontal'} mini exClass={'px-2 pt-20'} noCats title = {'Posted Items'}  author = {userId}/>
    }
  return (
    <>
      <div>
                <h1 className="text-30 lh-14 fw-600">My Pages</h1>
                <div className="text-15 text-light-1 mb-20">
                </div>

            <div className="p-2 rounded-4 bg-theme shadow-3">
              {/* <WishlistTable /> */}
              {postedView}
            </div>
          </div>
      {/* End dashbaord content */}
    </>
  );
};

export default DBPosted;
