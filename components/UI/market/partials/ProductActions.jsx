import Link from "next/link"
import PostLike from "../../partials/social/PostLike"
// import PostLike from "~/appComponents/components/Social/PostLike"

const ProductActions = ({whatsApp, phone, exClass='', id}) => {
  return (
    <div className={`pdt_actions ${exClass}`}>
    <div className={`button_group d-flex flex-row`}>
        {whatsApp && <button>
          <Link href={`https://wa.me/${whatsApp}`}><i className="lab la-whatsapp" style={{color: '#25D366'}}/></Link>
        </button>}
        {phone && <button> 
          <Link href={`tel:${phone}`}><i className="las la-phone" style={{color: 'var(--secTheme)'}}/></Link>
        </button>}
        <button> 
          <PostLike listing={id}/>
        {/* <i className={`lar la-heart`} style={{color: 'var(--theme)', fontSize: smallIcons ? '14px' : '20px',}}/> */}
        </button>
      </div>
    </div>
  )
}
export default ProductActions