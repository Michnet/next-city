import Image from "next/image";
import SiteHead from "@/components/UI/SiteHead";
import Block1 from "@/components/UI/about/Block1";
import WhyChooseUs from './../../components/UI/about/WhyChooseUs';

const About = () => {
  return (
    <>
      <SiteHead title={'About LyveCity'}/>
      <div className="page-content">
      <section className="section-bg layout-pt-lg layout-pb-lg pos-relative">
        <div className="section-bg__item col-12">
          <Image
            //width={1920}
            //height={400}
            fill
            className="object-cover"
            src="/img/events/pexels-jonas-von-werne-2897462.jpg"
            alt="image"
            priority
          />
        </div>
        <div className="cover_overlay" style={{top: 0, background: '#0000008f'}}/>

        <div className="container pos-relative">
          <div className="row justify-center text-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <h1 className="text-40 md:text-25 fw-600 text-white">
                Looking for something to do?
              </h1>
              <div className="text-white mt-15 text-24">
                <span className="fw-200">Welcome to</span> <span className="handy">LyveCity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md bg-body">
            <Block1/>
      </section>

      <section className="layout-pt-lg layout-pb-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Designed for you</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  For that ultimate experience
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row y-gap-40 px-5 justify-between pt-50">
            <WhyChooseUs/>
          </div>
      </section>

      {/* <section className="pt-60">
        <div className="container">
          <div className="border-bottom-light pb-40">
            <div className="row y-gap-30 justify-center text-center">
              <Counter />
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Our Team</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Lorem ipsum dolor sit amet
                </p>
              </div>
            </div>
          </div>

          <div className=" pt-40 js-section-slider">
            <div className="item_gap-x30">
              <Team1 />
            </div>
          </div>
        </div>
      </section>

      <section className="section-bg layout-pt-lg layout-pb-lg">
        <div className="section-bg__item -mx-20 bg-light-2" />
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Overheard from travelers
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular destinations have a lot to offer
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden pt-80 js-section-slider">
            <div className="item_gap-x30">
              <Testimonial />
            </div>
          </div>

          <div className="row y-gap-30 items-center pt-40 sm:pt-20">
            <div className="col-xl-4">
              <Counter2 />
            </div>

            <div className="col-xl-8">
              <div className="row y-gap-30 justify-between items-center">
                <Brand />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      </div>
    </>
  );
};

/* About.getLayout = function getLayout({children}) {
  return (
      <PageLayout>{children}</PageLayout>
  )
} */
export default About;
//export default dynamic(() => Promise.resolve(About), { ssr: false });
