import { useRecoilValue } from 'recoil';
import { UISizes } from '@/contexts/atoms';
import { fetchPageUrl } from '@/helpers/rest';
import { Client } from 'react-hydration-provider';
import { BSReveal } from '@/components/UI/partials/BSReveal';
import TableOfContents from '@/components/UI/partials/TableOfContents';
import { openOffCanvas } from '@/helpers/appjs';
import SiteHead from '@/components/UI/SiteHead';

const Privacy = ({content}) => {
    const {isTab} = useRecoilValue(UISizes);

    return (
        <>
            <SiteHead title={'Privacy Policy'} robots={'noindex,nofollow'}/>

            <div className="page-content ps-page--single site_terms text-page ps-container" style={{overflow: 'initial'}}>
               
                        {content &&
                        <>
                                <>
                           <Client>{isTab ?
                                    <div className='row p-2'>
                                    
                                    <div>
                                        <main dangerouslySetInnerHTML={{
                                            __html: `${content?.content?.rendered}`,
                                        }}/>
                                    </div>
                                    <button style={{left: 20, bottom: 80}} className='btn ui-1 w-auto fixed-bottom right-auto'  data-menu="toc" onClick={(e) => openOffCanvas(e)}>
                                        Subsections
                                        </button>
                                    </div>
                                    :
                                    <div className='row p-4 ps-0'>
                                        <div className='col-md-3 sticky_col' style={{top:70}}>
                                            <TableOfContents/> 
                                        </div>
                                        <div className='col-md-9'>
                                            <main dangerouslySetInnerHTML={{
                                                __html: `${content?.content?.rendered}`,
                                            }}/>
                                        </div>
                                    </div>
                                }</Client>
                            </>
                            </>
                    }

            </div>
            <BSReveal children={<TableOfContents/>} id={'toc'}/>
        </>
    );
};

export async function getStaticProps() {

    async function getPage(id, fields) {

        const page = await fetch(`${fetchPageUrl(id, fields)}`);
        const data = await page.json();
        return data;
    }

    const content = await getPage(202, "title, content");

    return {
      props: {
        headerTitle: 'Your Privacy',
        head: {
            title : 'Terms of Use',
            robots : "noindex,nofollow"
        },
        content : content
      }, 
  }
}

/* const PageLayout = dynamic(() => import('~/appComponents/core/Layout/PageLayout'));
import { BSReveal } from './../../components/UI/partials/BSReveal';

Privacy.getLayout = function getLayout({children}) {
  return (
      <PageLayout>{children}</PageLayout>
  )
} */

export default Privacy;
