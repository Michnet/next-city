import dynamic from "next/dynamic";
import CallToActions from "@/components/UI/CallToActions";
import WhyChooseUs from "@/components/UI/about/WhyChooseUs";
import Address from "@/components/UI/about/Address";
import Social from "@/components/UI/about/Social";
import SiteHead from "@/components/UI/SiteHead";

const Contact = () => {
  return (
    <>
      <SiteHead title="Contact Support" />
      <div className="page-content">
      {/* <LocationTopBar /> */}
      {/* End location top bar section */}

      {/* <div className="map-outer">
        <div className="map-canvas">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d182586.0420340798!2d-73.99038430252834!3d40.749936548349346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1670824458615!5m2!1sen!2sbd"
            loading="lazy"
          ></iframe>
        </div>
      </div>
 */}
     {/*  <section className="relative container">
        <div>
            <div className="map-form px-40 pt-40 pb-50 lg:px-30 lg:py-30 md:px-24 md:py-24 bg-theme rounded-4 shadow-4">
              <div className="text-22 fw-500">Send a message</div>
              <ContactForm />
            </div>
          </div>
      </section> */}
      {/* End contact section form */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container px-5">
          <div className="row x-gap-80 y-gap-20 justify-between">
            <div className="col-12">
              <div className="text-30 sm:text-24 fw-600">Contact Us</div>
            </div>
            {/* End .col */}

            <Address/>
            {/* End address com */}

            <div className="col-auto">
              <div className="text-14 text-light-1">
                Follow us on social media
              </div>
              <div className="d-flex x-gap-20 items-center mt-10">
                <Social/>
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End Address Section */}

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Stay where you are</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  We are working tirelessly to make your events and places search awesome
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-40 justify-between pt-50">
            <WhyChooseUs/>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Why Choose Us section */}

      <CallToActions/>
      {/* End Call To Actions Section */}
      </div>
    </>
  );
};


/* const PageLayout = dynamic(() => import('~/appComponents/core/Layout/PageLayout'));

Contact.getLayout = function getLayout({children}) {
  return (
      <PageLayout>{children}</PageLayout>
  )
} */

export default Contact;
//export default dynamic(() => Promise.resolve(Contact), { ssr: false });
