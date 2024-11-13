import Splider from '@/components/UI/partials/Splider';
import {  RowLoader, Skeleton, TitleWithSub} from '../Skeletons'
import { generateTempArray } from '@/helpers/universal';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const ListingSkeleton = () => {
  const sectionClass='gx-border-cyan gx-p-3 gx-border br-10';
  return (
    <div id='page_skeleton'>   
    <div className='gx-m-0 py-2 row'>
      <div className='col-12'>
        <div className='gx-mb-5'> <RowLoader height={300}/> </div>
      </div>
      <div className='col-12 col-md-9'>
        <div className={`gx-mb-5 ${sectionClass ?? ''}`}> <TitleWithSub width={300}/> </div>
        <div className={`gx-mb-5 ${sectionClass ?? ''}`}><Skeleton height={200} /> </div>
        <div className={`gx-mb-5 ${sectionClass ?? ''}`}><Skeleton  height={150} /> </div>
      </div>
      <div className='col-12 col-md-3'  >
        <div className={`gx-mb-5 ${sectionClass ?? ''}`} >
          <div className='gx-mb-5'> <TitleWithSub width={100} subWidth={150}/> </div>
          <div className='gx-m-1'><Skeleton  height={400}/> </div>
          <div className='gx-m-1'><Skeleton  active /> </div>
        </div>
      </div>
    </div>
    </div>
 
  )
}

export default ListingSkeleton

export const ExploreSkeleton = () => {
  const sectionClass='gx-border-cyan gx-p-3 gx-border br-10';
  return (
    <div id='page_skeleton'>   
    <div className='gx-m-0 py-2 row'>
      <div className='col-12 col-md-3 d-none d-md-block'>
        <div className='gx-m-1 h-100'><Skeleton  height={'100%'} active/></div>
      </div>
      <div className='col-12 col-md-9'>
        <div className='gx-mb-5'> <RowLoader height={300}/> </div>
        <div className='gx-m-0 py-2 row'>
          <div className='col-12'>
            <div className={`gx-mb-5 ${sectionClass ?? ''}`}> <TitleWithSub width={300}/> </div>
            <Splider>{generateTempArray(5).map((el, i) => (<div key={i} className={`gx-mb-5 ${sectionClass ?? ''}`}><Skeleton width={200} height={200}/></div>))}</Splider> 
            </div>
          </div>
          <div className='col-12'>
          <div className={`gx-mb-5 ${sectionClass ?? ''}`}> <TitleWithSub width={300}/> </div>
            <Splider>{generateTempArray(5).map((el, i) => (<div key={i} className={`gx-mb-5 ${sectionClass ?? ''}`}><Skeleton width={180} height={180}/></div>))}</Splider> 
            </div>
          <div className='col-12'>
          <div className={`gx-mb-5 ${sectionClass ?? ''}`}> <TitleWithSub width={300}/> </div>
            <ResponsiveMasonry className='hero_grid' columnsCountBreakPoints={{0: 1, 480: 2, 600: 3, 992: 4}}>
              <Masonry className='grid_box' gutter='10px'>{generateTempArray(5).map((el, i) => (<div key={i} className={`gx-mb-5 ${sectionClass ?? ''}`}><Skeleton width={'100%'} height={180}/></div>))}
              </Masonry>
            </ResponsiveMasonry> 
          </div>
        </div>
      </div>
    </div>
  )
}