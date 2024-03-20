import GuestPrompt from "@/components/UI/GuestPrompt";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
// import GuestPrompt from "~/routes/userAuth/GuestPrompt";
import { createBooking, getSlotAvailability } from "@/helpers/WooRest";
import { LoaderDualRingBoxed } from "@/components/skeletons/Loaders";
// import { LoaderDualRingBoxed } from "../skeletons/React-content-loader/Loaders";

const SlotBooking = ({slotObj}) => {
 const [loading, setLoading] = useState(true);
 const [bookable, setBookable] = useState(false);
 const [available, setAvailable] = useState(true);
 const [success, setSuccess] = useState(false);
 

 const {productId, slots, startDate, userId, endDate, cost} = slotObj;

 let params = {
    product_id: productId,
    start_date: startDate?.replaceAll('-', '').replaceAll(" ", "").replaceAll(":", ""),
    end_date: endDate,
    meta_start_date: startDate?.replaceAll('-', '').replaceAll(" ", "").replaceAll(":", ""),
    occurrence_slots: slots,
    user_id : userId,
    cost: cost
}

 function reset(){
    setLoading(false);
    setBookable(null);
    setSuccess(false)

 }

 
 const getAvailability = async() => {
  setLoading(true);
  const avail = await getSlotAvailability(params);
  if(avail?.available){
      setBookable(true);
  }else{
    setBookable(false);
    setAvailable(false);
  }
  setLoading(false);
}

 useEffect(() => {
  setLoading(false);
  getAvailability()
 
   return () => {
     reset()
   }
 }, [slotObj]);

 const getSlot= async() => {
    setLoading(true);
    const avail = await createBooking({...params, start_date: dayjs(startDate).unix(), end_date: dayjs(endDate).unix()});
    if(avail){
      setLoading(false);
      if(avail.status === 'occ_added' || avail.status === 'occ_increased'){
        setSuccess(true);
      }else{
        setSuccess(false);
      }
    }
 }
 
 useEffect(() => {
   setLoading(false)
   return () => {
     reset()
   }
 }, [productId, startDate]);
 
 
  return (
    <>{userId ? 
      <>{success ? <>
        <div>
            <div className='feedback_box mb-5 d-flex gap-3 align-items-center justify-center' data-aos="zoom-in">
              <i className="lar la-thumbs-up mr-2" style={{fontSize: 42, color: 'var(--bs-success)'}}></i>
              <span  style={{fontSize : 20}}>Your booking was successfully created. The listing's owner should be contacting you soon</span>
            </div>
          <button className='btn btn-sm btn-outline-secondary' onClick={() => reset()}>And another booking</button>
        </div>
      </> : <>{available ? <div className="p-3 position-relative">
      <div className="mb-3 text-16">
      {!bookable && <div>Check the event's availability on this date</div>}
      {bookable && <div>Slots are available. Go ahead, and book</div>}
      </div>
      <div><button onClick={() =>  {bookable ? getSlot() : getAvailability()}} className="btn btn-theme">{bookable ? 'Book Now' : 'Check Slots'}</button></div>
      <div className="position-absolute w-100" style={{top: 0, left: 0, zIndex: 3}}>{loading && <LoaderDualRingBoxed/>}</div>
      </div> : <p>No slots available on this date. Try checking for availability on other dates</p>}
      </>}</> 
      :
    <GuestPrompt title={'Sign in to continue'}/>}</>
  )
}
export default SlotBooking