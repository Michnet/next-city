const SkeletonCube = ({height, width, exClass}) => {
    return (
            <div
            style={{height :  height ?? 100, width : width ?? '100%'}}
                className={`bg-border ${exClass ?? ''}`}/>
    );
};
export default SkeletonCube;
