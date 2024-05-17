import SiteFAQs from "@/components/UI/site/SiteFAQs";
import dynamic from "next/dynamic";
//import CallToActions from "../components/common/CallToActions";
//import DefaultHeader from "../components/header/default-header";
//import DefaultFooter from "../components/footer/default";
import Image from "next/image";
//import HowWorks from "../components/block/HowWorks";
//import Block2 from "../components/about/Block2";
// const Faq = dynamic(() => import("../components/faq/Faq"));
import { useRecoilValue } from "recoil";
import { authState } from "@/contexts/atoms";
// const SiteHead = dynamic(() => import("~/appComponents/components/SiteHead"));
//import Link from "next/link";
// import { WPDomain } from './../server/WpBase';
import SiteHead from "@/components/UI/SiteHead";
import { WPDomain } from "@/helpers/base";

export async function getServerSideProps(context) {
  return {
    props: {
      headerTitle: 'Add Listing',
      seoMeta:{title: 'Add Listing'}/* 
      settings : {
        mMenu: 'show',
        mMenuContent:{
          icon : 'las la-filter', 
          data_bs_toggle : "offcanvas",
          'data_bs_target' : "#mobileFilters"}
      } */
    } 
  }
}
const CreateListing = () => {
  const {user, token} = useRecoilValue(authState);
  
  return (
    <>
      <SiteHead title="Add a listing" slug={'/add-listing'}/>

      <section className="section-bg layout-pt-lg layout-pb-lg position-relative">
        <div className="section-bg__item col-12 bottom-0 w-100">
          <Image
            fill
            className='object-cover'
            src="/img/general/1.png"
            alt="image"
            priority
          />
        </div>
        {/* End section-bg__item */}

        <div className="container pos-relative z-2">
          <div className="row justify-center text-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <h1 className="text-40 md:text-25 fw-600 text-white">
                Welcome to the listing creation center
              </h1>
              <div className="text-white mt-15">
                Let's get the word out
              </div>
            </div>
          </div>
        </div>
        {/* End .container */}
      </section>
      {/* End About Banner Section */}

     {/*  <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">How does it work?</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>

          <div className="row y-gap-30 justify-between pt-40">
            <HowWorks />
          </div>
        </div>
      </section> */}

      <section className="section-bg layout-pt-lg layout-pb-lg md:pt-0 md:pb-60 sm:pb-40 bg-light z-auto">
<section class="call-action-area call-action-one">
   <div class="container pt-4">
      <div class="row align-items-center call-action-content">
         <div class="col-xl-8 col-lg-8 mb-40">
            <div class="call-action-text">
              <p class="text-20">
                  You are currently using the users' website.
               </p>
               <h5 class="action-title">
                  Switch to the authors' site to add and manage your listing
               </h5>
            </div>
         </div>
         <div class="col-xl-4 col-lg-4">
            <div class="call-action-btn rounded-buttons text-lg-end">
               <a href={`${WPDomain}${user ? '?lc_tok='+token : ''}`} class="btn btn-theme rounded-22" target={'_blank'}>
                Authors' Site
               </a>
            </div>
         </div>
      </div>
   </div>
</section>
      </section>
      {/* End about section block */}

      <section className="layout-pt-lg layout-pb-lg bg-theme">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  In case you were wondering ....
                </h2>{/* 
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Interdum et malesuada fames
                </p> */}
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-30 justify-center pt-40 sm:pt-20">
            <div className="col-xl-8 col-lg-10">
              <div
                className="accordion -simple row y-gap-20 js-accordion"
                id="Faq1"
              >
                <SiteFAQs/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/* const PageLayout = dynamic(() => import('~/appComponents/core/Layout/PageLayout'));

CreateListing.getLayout = function getLayout({children}) {
  return (
      <PageLayout>{children}</PageLayout>
  )
} */

export default CreateListing;

//export default dynamic(() => Promise.resolve(CreateListing), { ssr: false });
