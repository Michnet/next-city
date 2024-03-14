
//import Skeleton from 'react-loading-skeleton'
//import 'react-loading-skeleton/dist/skeleton.css';

import SkeletonCube from "./SkeletonCube";

// import { Skeleton } from "../UI/components";

const SkeletonProduct = ({height}) => {
    return (
        <div className="ps-skeleton--product">
            <SkeletonCube active={true} style={{height: height ?? 100}} className='gx-w-100 gx-mb-10'/>
            <SkeletonCube count={2}/>
        </div>
    );
};

export default SkeletonProduct;
