
//import { Col, Row } from 'react-bootstrap';
import { generateTempArray } from '@/helpers/universal'
//import Skeleton from 'react-loading-skeleton';
//import 'react-loading-skeleton/dist/skeleton.css'

export const Skeleton = ({height, width, rounded, roundy=false, maxWidth='none', bottom='10'}) => {
    return <div className={`loader_skeleton mb-${bottom} ${roundy ? 'rounded' : ''}`} style={{maxWidth: maxWidth, borderRadius: rounded ? '50%' : '0', height :  height ?? 40, width : width ?? '100%'}}/>
  }
  

export const RowSkeleton = (props) => {
    const {height} = props;
    return ( <></>
       /*  <ContentLoader 
                //height="400" 
                width="1000" 
                viewBox="0 0 1200 400"
                backgroundColor={bgColor} 
                foregroundColor = {fgColor}
                style = {{ width: '100%'}}
               >
                <rect x="0" y="0" rx="4" ry="4" width="1350" height={height}/>
        </ContentLoader> */
    )

}

export const TitleWithSub = ({width, subWidth}) => {
return   <>
            <Skeleton className='title_with_sub' title={{width: width ?? 140}} paragraph={{rows : 1, width: subWidth ?? 180}} active />
        </>
}

export const SectionHeaderSkeleton = ({height, width}) => {
    return (<>
            <div style={{height :  height ?? 40, width : width ?? '30%'}} className='bg-border mb-10'/>
            <div style={{height :  height ?? 28, width : width ?? '40%'}} className='bg-border mb-10'/>
            </>
    );
};


export const AvatarWithText = ({avatarWidth = 40, textWidth, maxWidth}) => {
    return <div className='row_flex' style={{columnGap: '10px'}}>
        <Skeleton rounded width={avatarWidth}/>
        <Skeleton maxWidth={maxWidth} width={textWidth ?? `calc(100% - ${avatarWidth}px)`}/>
    </div>;
}

export const AvatarWithTitle = ({avatarWidth = 40, textWidth, maxWidth}) => {
    return <div className='row_flex' style={{columnGap: '10px'}}>
        <Skeleton rounded width={avatarWidth}/>
        <div style={{width : textWidth ?? `calc(100% - ${avatarWidth+10}px)`}}>
        <Skeleton height={20} maxWidth={maxWidth - 30} width={textWidth ?? `calc(100% - ${avatarWidth * 2}px)`}/>
        <Skeleton height={10} maxWidth={maxWidth} width={textWidth ?? `calc(100% - ${avatarWidth}px)`}/>
        </div>
    </div>;
}
/* 
export const RowOfAvatars = ({size}) => {

    return  <Row className='h_margin_0'>
    {generateTempArray(8).map((item) => (
        <Col className='d-flex justify-centre' key={item} xl={6} md={6} sm={8} xs={12}
            ><div className='d-flex flex-dir-col justify-centre'>
            
               <Skeleton.Avatar active size={size} shape='circle' />
               <Skeleton className='avatar_title _centered' paragraph={{rows : 0, width: 40}} active />
            </div>
        </Col>
            ))
        }
        </Row>
} */

export const AvatarsRow = ({size}) => {

    return  <div className='row h_margin_0 flex-nowrap overflow-hidden'>
    {generateTempArray(8).map((item) => (
        <div className='col px-0 d-flex justify-centre' >
            <AvatarWithText size={size ?? 100}/>
               {/* <div className='circle' style={{height: size ?? '50px', width: size ?? '50px'}}/>
               <Skeleton className='avatar_title _centered' paragraph={{rows : 0, width: 40}} active /> */}
        </div>
            ))
        }
        </div>
}

export const ThumbnailWithSubtitle = ({size}) => {

    return  <div className='thumbnail_loader'>
               <Skeleton className='thumbnail' paragraph={{rows : 0}} active />
               {/* <Skeleton className='avatar_title _centered' paragraph={{rows : 0, width: 60}} active /> */}
               <TitleWithSub  titlewidth={80}/>
            </div>
}

export const RowLoader = () => {
    return <Skeleton className='full-width' paragraph={{rows : 0}} active />
}

export const BigTitle = () => {
    return <TitleWithSub titlewidth={300}/>
}

export const SectionLoader = ({num}) => {
    return <>{generateTempArray(num).map((item) => (
                <>
                    <div className='gx-mb-3 gx-ml-1'> <TitleWithSub titlewidth={300}/> </div>
                    <div className='gx-m-3'><Skeleton  active /> </div>
                    <div className='gx-m-3'><Skeleton  active /> </div>
                </>
                ))
            }
            </>
}

export const CommentLoader = ({num}) => {
    return <>{generateTempArray(num).map((item) => (
            <div key={item} className='mb-28'>
                <AvatarWithTitle avatarWidth={40} maxWidth={200}/>
                <Skeleton height={150} bottom='0'/>
            </div>
    ))
            }</>

}
