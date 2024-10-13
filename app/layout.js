//import { memo, useEffect, useMemo } from "react";
import "@/public/scss/bootstrap.scss";
import "@/styles/globals.css";
import "@/public/fonts/css/all.min.css";
import "@/public/scss/style.min.css";
import "@/public/styles/custom.min.css";
//import { getSession } from "next-auth/react";
//import { closeMenus } from "@/helpers/appjs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";
//import Aos from "aos";
import "aos/dist/aos.css";
import '@splidejs/react-splide/css';
import { Analytics} from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Providers from "./layouts/Providers";
//import Layout from "@/components/layouts/Layout";
import { Jost, Cookie } from 'next/font/google'
import Script from "next/script";
import Layout from "@/components/layouts/Layout";
//import Layout from "./layouts/appLayout";

export const metadata = {
  title: 'App Router',
  manifest: '/_manifest.json'
}

const jost = Jost({subsets: ['latin']})

export default function RootLayout({ children, params}) {


  return <html lang="en" className={jost.className}>
              <head>
              <link href="https://fonts.googleapis.com/css?family=Cookie|Source+Sans+Pro:100,300,400,500,600,700,900|Jost:100,300,400,500,600,700,800,900&display=swap" rel="stylesheet"/>
              </head>
              <body className="theme-light" data-highlight="highlight-orange" data-gradient="body-default">
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
              <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"/>
                <Providers>
                    <Layout appRouter={true}>
                    {children}
                    </Layout>
                  </Providers>
                </body>
              <Analytics/>
              <SpeedInsights/>
        </html>
}
