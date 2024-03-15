const Address = () => {
  const addressContent = [
    /* {
      id: 1,
      colClass: "col-lg-3",
      title: "Address",
      content: (
        <>328 Queensberry Street, North Melbourne VIC 3051, Australia.</>
      ),
    }, */
    {
      id: 2,
      colClass: "col-auto",
      title: "Phone support",
      content: (
        <div className="d-flex flex-column">
          <a href="tel:+256786452553">+256 786 452553</a>
          <a href="tel:+256700824237">+256 700 824237</a>
        </div>
      ),
    },
    {
      id: 3,
      colClass: "col-auto",
      title: "Email support",
      content: (
        <>
          {" "}
          <a href="mailto:support@spotlists.com">support@lyvecityclub.com</a>
        </>
      ),
    },
  ];
  return (
    <>
      {addressContent.map((item) => (
        <div className={`${item.colClass}`} key={item.id}>
          <div className="text-14 text-light-1">{item.title}</div>
          <div className="text-18 fw-500 mt-10">{item.content}</div>
        </div>
      ))}
    </>
  );
};

export default Address;
