const { LoaderRingBoxed } = require("../Loaders")

const PageLoader = ({route}) => {
  return <div style={{height: '100vh'}}><LoaderRingBoxed/></div>
}

export default PageLoader;