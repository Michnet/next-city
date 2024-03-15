const ChangeLog = () => {

const changes = [
    {
        version : '1.3',
        date:  '5th Oct 2023',
        features: [ "<b>Private chat</b> with listing owner"]
    },
    {
        version : '1.2',
        date:  '7th Aug 2023',
        features: [ "Login with your google account", "See top rated listings in explore","See listings near you in explore"]
    },
    {
        version : "1.1",
    date : "4th Aug 2023",
    features: [
        "Color themes",
    ]
    }
] 
  return (
    <div class="container change_log bg-body py-5 mw-100">
    <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10 col-12">
          {changes.map((item) => {
            const {version, date, features} = item;
            return <div key={version}>
            <h5 class="mt-4 text-14"> <span class="p-2 bg-light shadow rounded text-success"> Version {version}</span> - {date}</h5>
            <ul class="list-dotted mt-3">
                {features.map((el, index) => <li key={index} className="text-muted ml-3 mb-2" dangerouslySetInnerHTML={{   __html: el }} />
 )}
            </ul>
            </div>
          })}

            <h5 class="mt-4 text-14"> <span class="p-2 bg-light shadow rounded text-success"> Version 1.0.0</span> - 1st Aug, 2020</h5>
            <ul class="list-dotted mt-3">
                <li class="text-muted ml-3">Initial Released</li>
            </ul>
          

            {/* <div class="mt-4">
                <a href="#" class="btn btn-theme">Suggest a Feature</a>
            </div> */}
        </div>
    </div>
</div>
  )
}



import dynamic from "next/dynamic";
/* const PageLayout = dynamic(() => import('~/appComponents/core/Layout/PageLayout'));

ChangeLog.getLayout = function getLayout({children}) {
  return (
      <PageLayout>{children}</PageLayout>
  )
}
 */
export default ChangeLog