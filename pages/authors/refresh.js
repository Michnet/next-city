import { LoaderEllipsis } from "@/components/skeletons/Loaders";
import { serializeQuery } from "@/helpers/base";
import { localiseDate } from "@/helpers/universal";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
//import { NextRequest, NextResponse } from "next/server";
import {useState} from "react";
//import revalidateHandler from "../api/revalidate";
//import { LoaderEllipsis } from '~/appComponents/components/skeletons/React-content-loader/Loaders';
//import { serializeQuery } from './../../server/WpBase';
//import { siteKeys } from "~/server/Base"

function Refresh({ timestamp }) {

  const [completed, setCompleted] = useState('pending');
  const [refreshing, setRefreshing] = useState(false);

  const {query} = useRouter();

  //const  = NextRequest.nextUrl;
  //const req = {query: NextRequest?.nextUrl?.searchParams}
  const revalidate = async () => {
    setRefreshing(true);
    const result = await fetch(`/api/revalidate?${serializeQuery({...query/* , secret: siteKeys.rebuild_key */})}`);
    //const result = await revalidateHandler(router, NextResponse);
    if(result.ok){
        //console.log('res', result.);
        setCompleted('complete');
        setRefreshing(false);
        //return result;
    }else{
      setCompleted('errored');
      setRefreshing(false);
    }
    //setResult("Done. Try to refresh the page");
  }

  return (
    <div className='text-center'>
        <div style={{maxWidth: '500px'}} className="d-flex gap-4 flex-wrap justify-center align-items-center flex-col h-400 p-5 sm:pr-15 sm:pl-15">
      <div className="timestamp mb-30"><p>The current version of the listing's page visible to users was generated <span className="d-block text-25">{dayjs(localiseDate(timestamp)).fromNow()}</span></p></div>
      <div className='mb-20'>
        {completed === 'pending' && <p>If you have edited your page after that, refresh it here to make the new version available to your page visitors</p>}
        {completed === 'errored' && <p>That wasn't successful. Try checking your internet connection and refresh again</p>}
        {completed === 'complete' && <p>Great!! The new version should now be publicly available</p>}
      </div>
      <div className="actions">
        {completed !== 'complete' && <button className="btn btn-outline-theme w-100" onClick={() => { revalidate()}}>{refreshing ? <LoaderEllipsis/> : 'Refresh'}</button>}
        {completed === 'complete' && <Link data-aos="zoom-in" href={query.path}>
           <span className="btn btn-success w-100">See New Version</span>
        </Link>}
      </div>

    </div>
    </div>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  return {
    props: {
      timestamp: new Date().toISOString()
    },
  }
}

export default Refresh