import CallToActions from "@/components/UI/CallToActions";
import { getBookings } from "@/helpers/WooRest";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
//import { localiseDate } from "~/server/UniversalFunctions";
//import { fetchProductUrl } from "~/server/WpRest";
//import Pagination from "../../common/Pagination";
//import ActionsButton from "../components/ActionsButton";

import { localiseDate} from "@/helpers/universal";
import { LoaderDualRingBoxed } from "@/components/skeletons/Loaders";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)


const BookingTable = ({userId}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true)

  async function getThem(){
    const theBooks = await getBookings({author:userId});
    if(theBooks){
        setBookings(theBooks)
    }
    setLoading(false)
  }

  function statusObj(status){
    switch (status) {
      case "unpaid":
        return {classNm : 'bg-yellow-4 text-yellow-3', text : 'Unpaid' }
    
      default:
        break;
    }
  }

  useEffect(() => {
    getThem();
  }, []);
  

  const handleTabClick = (index) => {
    setActiveTab(index);
  };


  let pageView;
  if(bookings?.length > 0){
    pageView = <>

    <div className="tabs -underline-2 js-tabs" style={{overflow: 'hidden', overflowX: 'auto'}}>
     {/*  <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
        {tabItems.map((item, index) => (
          <div className="col-auto" key={index}>
            <button
              className={`tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button ${
                activeTab === index ? "is-tab-el-active" : ""
              }`}
              onClick={() => handleTabClick(index)}
            >
              {item}
            </button>
          </div>
        ))}
      </div> */}

            <table className="table table-borderless text-center" >
                <thead>
                    <tr className="bg-night-light">
                        <th></th>
                        <th scope="col" className="color-white">Title</th>
                        <th scope="col" className="color-white">Order date</th>
                        <th scope="col" className="color-white">Event date/time</th>
                        <th scope="col" className="color-white">Price</th>
                        <th scope="col" className="color-white">Status</th>
                    </tr>
                </thead>
                <tbody>
                {bookings?.map((el, ind) => {
                  const {cost, start, status, product_id, product_thumb, product_title, end, date_created} = el;
                  return <tr key={ind}>
                  <td><img width='80' height='80' src={product_thumb}/></td>
                  <td scope="row"><Link href={`/market/product/${product_id}`}>{product_title}</Link></td>
                  <td>{`${dayjs.unix(date_created).format('h:ma, DD MMM YYYY')}`}</td>
                  <td className="lh-16">
                    <span className="text-black-50"></span> {`${dayjs(localiseDate(dayjs.unix(start))).format('h:ma, DD MMM YYYY')}`}
                  </td>
                  <td className="fw-500">{cost}</td>
                  <td>
                    <span className={`py-1 px-10 text-center text-14 fw-500 ${statusObj(status).classNm}`}>
                      {`${statusObj(status).text}`}
                    </span>
                  </td>
                </tr>
                })}
                   {/*  <tr>
                        <th scope="row">Apple</th>
                        <td className="color-green-dark">$500</td>
                        <td><i className="fa fa-arrow-up rotate-45 color-green-dark"></i></td>
                    </tr> */}
                </tbody>
            </table>
    </div>
   {/*  <Pagination /> */}
  </>
  }else{
    pageView = <>{loading ?  <div style={{height: 300}}><LoaderDualRingBoxed/></div> : <CallToActions light bgClass={'bg-theme'} icon={'bi-calendar-check'} title={'No bookings yet'} descript={'We have not recorded any booking made through your user account. You can start your booking today'} actionComponent={<Link className="btn btn-theme" href={'/explore/events'}>Explore Listings</Link>}/>}</>
  }

  return (
    <>
    {pageView}
    </>
  );
};

export default BookingTable;
