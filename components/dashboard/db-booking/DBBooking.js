import BookingTable from "./components/BookingTable";

const DBBooking = ({userId}) => {
  return (
    <>
      <div>

                <h1 className="text-30 lh-14 fw-600">Booking History</h1>
                <div className="text-15 text-light-1 mb-30">
                  My Bookings
                </div>

            <div className="p-2 sm:px-0 rounded-4 bg-theme shadow-3">
              <BookingTable userId={userId}/>
              {/* End tabs */}
            </div>
        {/* End dashbaord content */}
      </div>
      {/* End dashbaord content */}
    </>
  );
};

export default DBBooking;
