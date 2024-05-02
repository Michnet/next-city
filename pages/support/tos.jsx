import { useRecoilValue } from 'recoil';
import { BSReveal } from '@/components/UI/partials/BSReveal';
import { UISizes } from '@/contexts/atoms';
import TableOfContents from '@/components/UI/partials/TableOfContents';
import { fetchPageUrl } from '@/helpers/rest';
import { openOffCanvas } from '@/helpers/appjs';
import SiteHead from '@/components/UI/SiteHead';

export async function getStaticProps(context) {
    return {
      props: {
        headerTitle: 'Terms of Use',/* 
        settings : {
          mMenu: 'show',
          mMenuContent:{
            icon : 'las la-filter', 
            data_bs_toggle : "offcanvas",
            'data_bs_target' : "#mobileFilters"}
        } */
      } 
    }
  }

const TermsOfService = ({content}) => {
    const {isTab} = useRecoilValue(UISizes);

    return (
        <> <SiteHead title={'Terms of Service'} robots={'noindex,nofollow'}/>
            <div className="page-content ps-page--single site_terms text-page ps-container" style={{overflow: 'initial'}}>
               
                        {content &&
                        <>
                           {isTab ? 
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
                                <div className='col-md-3 p-0 sticky_col' style={{top:70}}>
                                    <TableOfContents/> 
                                </div>
                                <div className='col-md-9'>
                                    <main dangerouslySetInnerHTML={{
                                        __html: `${content?.content?.rendered}`,
                                    }}/>
                                </div>
                            </div>
                            }
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

    const content = await getPage(201, "title, content");

    return {
      props: {
        head: {
            title : 'Terms of Use',
            robots : "noindex,nofollow"
        },
        content : content
      }, 
  }
}

/* 
import dynamic from "next/dynamic";
const PageLayout = dynamic(() => import('~/appComponents/core/Layout/PageLayout'));

TermsOfService.getLayout = function getLayout({children}) {
  return (
      <PageLayout>{children}</PageLayout>
  )
} */


export default TermsOfService;
