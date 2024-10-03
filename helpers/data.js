export const quickLinks = [
    {
      id: 1,
      title: "Website",
      menuList: [
        { name: "About Us", routerPath: "/about/about-us" },
        { name: "Around LyveCity", routerPath: "/news" },
        { name: "Version Updates", routerPath: "/about/whats-new" }
        /* { name: "Go Shopping", routerPath: "/market" }, */
      ],
    },
    {
      id: 2,
      title: "Support",
      menuList: [
        { name: "Contact", routerPath: "/support/contact" },
        { name: "FAQs", routerPath: "/support/frequently-asked" },
        { name: "Privacy Policy", routerPath: "/support/privacy" },
        { name: "Terms and Conditions", routerPath: "/support/tos" },
      ],
    }
  ]
export const exploreLinks = [
    {
      id: 3,
      title: "Events",
      menuList: [
        { name: "Top Rated", routerPath: "/explore/events?sort=top-rated" },
        { name: "Latest Events", routerPath: "/explore/events" },
        { name: "This Week", routerPath: "/explore/events?event-date=this-week" },
        { name: "This Weekend", routerPath: "/explore/events?event-date=this-weekend" },
        { name: "Happening Today", routerPath: "/explore/events?event-date=today" },
      ],
    },
    {
      id: 3,
      title: "Special sales",
      menuList: [
        { name: "Top Rated", routerPath: "/explore/special-sales?sort=top-rated" },
        { name: "Latest", routerPath: "/explore/special-sales" },
        { name: "This Week", routerPath: "/explore/special-sales?event-date=this-week" },
        { name: "This Weekend", routerPath: "/explore/special-sales?event-date=this-weekend" },
        { name: "Happening Today", routerPath: "/explore/special-sales?event-date=today" },
      ],
    },
  ]