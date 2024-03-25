import Link from "next/link";

const NotFound = () => {
  const data = {
    imageSrc: "/img/general/404.svg",
    title: "Oops! It looks like you're lost.",
    description:
      "The page you're looking for isn't available. Try to search again or use the go to.",
    buttonLabel: "Go back to homepage",
    buttonUrl: "/",
  };

  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row y-gap-30 justify-between items-center">
          <div className="col-lg-6">
            <img className='w-100' src={data.imageSrc} alt="image"/>
          </div>
          <div className="col-lg-5">
            <div className="no-page">
              <div className="no-page__title font-22 fw-700 mb-3">
                Not<span className="color-highlight">found</span>
              </div>
              <h2 className="text-30 fw-600">{data.title}</h2>
              <div className="pr-30 mt-5 font-14">{data.description}</div>
              <div className="d-inline-block mt-40 md:mt-20">
                <Link
                  href={data.buttonUrl}
                  className="button btn gradient-highlight -md -dark-1 bg-blue-1 text-white"
                >
                  {data.buttonLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
