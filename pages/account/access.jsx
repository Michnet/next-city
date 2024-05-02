import AuthUI from '@/components/auth/AuthUI';

export async function getServerSideProps() {
  return {
    props: {
      headerTitle: 'My Account',
      settings : {
        //mMenu: 'hide',
        //noFooter : true
      }
    }
  }
}

function Access() {

  return (
    <div className="page-content pb-0">
        <AuthUI/>
    </div>
  )
}
export default Access