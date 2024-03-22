const Social = () => {
  const socialContent = [
    { id: 1, icon: "icon-facebook", link: "https://www.facebook.com/100093731295832/" },
    { id: 2, icon: "icon-twitter", link: "https://twitter.com/Lyve_City" },
    { id: 3, icon: "icon-instagram", link: "https://instagram.com/lyvecity" }
  ];
  return (
    <>
      {socialContent.map((item) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          key={item.id}
        >
          <i className={`${item.icon} text-14`} />
        </a>
      ))}
    </>
  );
};

export default Social;
