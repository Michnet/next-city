import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";



export default class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
      <Head>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        {/* <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/> */}
        {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossOrigin="anonymous"/> */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
        <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"/>
        {/* <link rel="stylesheet" type="text/css" href="/styles/bootstrap.css"></link>
        <link rel="stylesheet" type="text/css" href="/styles/style.min.css"></link> */}
        {/* <link rel="stylesheet" type="text/css" href="/fonts/bootstrap-icons.css"></link> */}
        {/* <link rel="stylesheet" type="text/css" href="/styles/style.css"></link> */}
        <link href="https://fonts.googleapis.com/css?family=Dr+Sugiyama|Roboto:300,300i,400,400i,500,500i,700,700i,900,900i|Source+Sans+Pro:300,300i,400,400i,600,600i,700,700i,900,900i|Jost:100,300,400,500,600,700,800,900&display=swap" rel="stylesheet"/>
        {/* <link href="https://fonts.googleapis.com/css?family=Dr+Sugiyama|Roboto:300,300i,400,400i,500,500i,700,700i,900,900i|Source+Sans+Pro:300,300i,400,400i,600,600i,700,700i,900,900i&display=swap" rel="stylesheet"/> */}
        <link rel="stylesheet" type="text/css" href="/fonts/css/all.min.css"/>    
        <link rel="manifest" href="/_manifest.json" data-pwa-version="set_in_manifest_and_pwa_js"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/app/icons/icon-192x192.png"></link>
        <link rel="shortcut icon" href="/favicon.ico"/>

        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-8TK57T8M95" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-8TK57T8M95');
          `}
        </Script>
      </Head>
      <body className="theme-light" data-highlight="highlight-brown" data-gradient="body-default">
        
        <Main/>
        <NextScript />
        {/* <script defer='true' strategy={"afterInteractive"} src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossOrigin="anonymous"></script> */}
        <Script strategy={'afterInteractive'} type={'module'} onReady={() => console.log('Main loaded')} src="/scripts/bootstrap.min.js"/>
        {/* 
        <Script defer='true'  strategy={"afterInteractive"} onReady={() => console.log('Custom loaded')} src="/scripts/custom.js"/> */}
      
      </body>
    </Html>
    );
  }
}

