import Link from "next/link";
import { DualColorHeader } from "../Partials";
// import DualColorHeader from "~/appComponents/components/partials/DualColorHeader";


const Block1 = () => {
  return (
    <div className="row">
      <div className="col-12">
        <section className="p-3 p-md-5">
        <h2 className="text-30 fw-600">About LyveCity</h2>
        <p className="mb-3 fw-bold">Where discoveries that matter happen</p>
        <p className="text-dark-1  text-16 mb-4">
        Welcome to LyveCity, your ultimate destination for discovering the world of events around you! This is the gateaway platform for event organisers to showcase and event enthusiasts to start their next memories. On LyveCity, every click brings you closer to an opportunity to learn, connect, and celebrate. We are dedicated to bringing you a diverse range of events, all in one place.
        </p>

        <h2 className="text-20 text-dark-3 mb-1">Our Mission</h2>
        <p className="text-dark-1 mb-4 text-16 ">
          <span className="fw-bold">At LyveCity, our mission is to bridge the gap between you and the vibrant tapestry of events happening in your city and beyond. </span>
          <br/>
          
        </p>
        </section>
        </div>

        <div className="col-12 px-0">
        <section className="bg-blue-2 p-3 p-md-5">
          <h2 className="text-22 mb-4 fw-300 text-end">For EveryOne</h2>
        <div className="row mb-5">
        <div className="bg-cover col-12 col-md-5" style={{minHeight: 200, background: `url(/img/events/music.jpg)`}}/>
        <div className="col-12 col-md-7 p-4">
        <DualColorHeader  title={'Event Lovers'}/>
        <p className="text-dark-1 mt-3 text-16 mb-3 boxed">
          For event-goers, LyveCity is a treasure trove of opportunities. Our user-friendly interface allows you to explore events effortlessly, filter by category, location, date, and more. Each event is presented with its own elegantly designed landing page, providing you with all the information you need to make an informed decision about your next adventure. From ticketing options to event details and reviews, we've got you covered.
          </p>
          <div className="my-3">
          <Link
            className=" btn  px-30 fw-400 text-14 btn-outline-theme radius-30"
            href="/explore"
          >
            Explore listings
          </Link>
        </div>
          </div>
        </div>

        <div className="row">
        <div className="col-12 col-md-7 p-4">
          <DualColorHeader exClass={'text-right justify-content-end'} title={'Event Organisers'}/>
          <p className="text-dark-1 text-16 text-right mb-3 mt-3">
          For organizers, we offer a robust platform to promote their events to a wider audience, allowing them to connect with like-minded individuals who share their passion and enthusiasm. We empower organizers to craft beautifully detailed <strong>landing pages</strong> for their events, showcasing the essence of what they have to offer.
          </p>
          <div className="my-3 w-fit ms-auto me-0">
          <Link
            className=" btn  px-30 fw-400 text-14 btn-theme radius-30"
            href="/add-listing"
          >
            Create a free event page
          </Link>
        </div>
          </div>
        <div className="bg-cover col-12 col-md-5" style={{minHeight: 200, background: `url(/img/events/mic.jpg)`}}>
        </div>

        </div>
        </section>
      </div>
    </div>
  );
};

export default Block1;
