
//import Skeleton from 'react-loading-skeleton'
//import 'react-loading-skeleton/dist/skeleton.css';
import { Skeleton } from "./Skeletons";

// import { Skeleton } from "../UI/components";

const SkeletonProduct = ({height}) => {
    return (
        <div className="ps-skeleton--product">
            <Skeleton active={true} style={{height: height ?? 100}} className='gx-w-100 gx-mb-10'/>
            <Skeleton count={2}/>
        </div>
    );
};

export default SkeletonProduct;
