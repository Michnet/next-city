import {  RowLoader, Skeleton, TitleWithSub} from '../Skeletons'

const ListingSkeleton = () => {
  const sectionClass='gx-border-cyan gx-p-3 gx-border br-10';
  return (
    <div id='page_skeleton'>   
    <div className='gx-m-0 gx-pt-3 row'>
      <div className='col-12'  span={24}>
        <div className='gx-mb-5'> <RowLoader/> </div>
      </div>
      <div className='col-12 col-md-9'>
        <div className={`gx-mb-5 ${sectionClass ?? ''}`}> <TitleWithSub width={300}/> </div>
        <div className={`gx-mb-5 ${sectionClass ?? ''}`}><Skeleton  active /> </div>
        <div className={`gx-mb-5 ${sectionClass ?? ''}`}><Skeleton  active /> </div>
      </div>
      <div className='col-12 col-md-3'  >
        <div className={`gx-mb-5 ${sectionClass ?? ''}`} >
          <div className='gx-mb-5'> <TitleWithSub width={100} subWidth={150}/> </div>
          <div className='gx-m-1'><Skeleton  active /> </div>
          <div className='gx-m-1'><Skeleton  active /> </div>
        </div>
      </div>
    </div>
    </div>
 
  )
}

export default ListingSkeleton