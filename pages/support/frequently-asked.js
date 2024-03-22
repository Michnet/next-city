// import FAQs from "@/components/UI/FAQs"
import SiteFAQs from "@/components/UI/site/SiteFAQs";
import SiteHead from "@/components/UI/SiteHead";

const HelpCenter = () => {
  return (
    <>
      <SiteHead title="Help Center" />
      <div className="page-content">
      <section className="layout-pt-lg layout-pb-lg bg-white">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Frequently Asked Questions
                </h2>
              </div>
            </div>
          </div>

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
      </div>
    </>
  );
};

export default HelpCenter;
