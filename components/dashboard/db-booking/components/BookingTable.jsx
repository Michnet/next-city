import CallToActions from "@/components/UI/CallToActions";
import { getBookings } from "@/helpers/WooRest";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
//import { localiseDate } from "~/server/UniversalFunctions";
//import { fetchProductUrl } from "~/server/WpRest";
//import Pagination from "../../common/Pagination";
import ActionsButton from "../components/ActionsButton";

const BookingTable = ({userId}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [bookings, setBookings] = useState(null);

  async function getThem(){
    const theBooks = await getBookings({author:userId});
    if(theBooks){
        setBookings(theBooks)
    }
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

    <div className="tabs -underline-2 js-tabs">
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

      <div className="tabs__content pt-30 js-tabs-content">
        <div className="tabs__pane -tab-item-1 is-tab-el-active">
          <div className="overflow-scroll scroll-bar-1">
            <table className="table-3 -border-bottom col-12">
              <thead className="bg-light-2">
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Order Date</th>
                 {/*  <th>Check In</th>
                  <th>Check Out</th> */}
                  <th>Price</th>
                  <th>Status</th>
                 {/*  <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {bookings?.map((el) => {
                  const {cost, start, status, product_id, product_thumb, product_title, end, date_created} = el;
                  return <tr>
                  <td><img src={product_thumb}/></td>
                  <td><Link href={`/market/product/${product_id}`}>{product_title}</Link></td>
                  <td>{`${dayjs.unix(date_created)}`}</td>
                 {/*  <td className="lh-16">
                    <span className="text-black-50">Check in :</span> {`${dayjs(localiseDate(dayjs.unix(start)))}`}
                  </td>
                  <td>
                    <span className="text-black-50">Check out :</span> {`${dayjs.unix(end)}`}
                  </td> */}
                  <td className="fw-500">{cost}</td>
                  <td>
                    <span className={`py-1 px-10 text-center text-14 fw-500 ${statusObj(status).classNm}`}>
                      {`${statusObj(status).text}`}
                    </span>
                  </td>
                 {/*  <td>
                    <ActionsButton />
                  </td> */}
                </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
   {/*  <Pagination /> */}
  </>
  }else{
    pageView = <CallToActions light bgClass={'bg-white'} icon={'bi-calendar-check'} title={'No bookings yet'} descript={'We have not recorded any booking made through your user account. You can start your booking today'} actionComponent={<Link className="btn btn-theme" href={'/explore/events'}>Explore Listings</Link>}/>
  }

  return (
    <>
    {pageView}
    </>
  );
};

export default BookingTable;
