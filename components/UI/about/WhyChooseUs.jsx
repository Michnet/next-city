const WhyChooseUs = () => {
  const blockContent = [
    {
      id: 1,
      icon: "/img/featureIcons/1/1.svg",
      title: "Verified Event Listings",
      text: `Keep up with what\'s happening all around you. Never miss an important event`,
      delayAnim: "0",
    },
    {
      id: 2,
      icon: "/img/featureIcons/1/2.svg",
      title: "Easy & Quick Booking",
      text: `Link with event organisers to book your slot in time and with ease`,
      delayAnim: "50",
    },
    {
      id: 3,
      icon: "/img/featureIcons/1/4.svg",
      title: "Share with the world",
      text: `Be the first to know and share trending events with your friends`,
      delayAnim: "100",
    },
  ];
  return (
    <>
      {blockContent.map((item) => (
        <div
          className="col-12 col-md-4"
          data-aos="fade"
          data-aos-delay={item.delayAnim}
          key={item.id}
        >
          <div className="featureIcon -type-1 ">
            <div className="d-flex justify-center">
              <img src={item.icon} alt="image" className="js-lazy" />
            </div>
            <div className="text-center mt-30">
              <h4 className="text-18 fw-500">{item.title}</h4>
              <p className="text-15 mt-10">{item.text}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );

};

export default WhyChooseUs;
