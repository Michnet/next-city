import { randomEither } from "@/helpers/universal"

function Section({overlay=true, sideImg, fullWidth=false, children, dark=true, id='', exClass='', bgUrl, title, exContainerClass='', containerStyle={}}) {
    let locStyle = {}
    if(bgUrl){
        locStyle.background = `url(${bgUrl})`
    }

  return (
    <section id={id} className={`section_container position-relative bg-cover bg-center ${!dark ? '_light' : ''} ${sideImg ? 'sec_sideImg' : ''} ${exClass}`} style={{...locStyle}}>
        {overlay && <div className={`position-absolute w-100 h-100 left-0 top-0 z-0 ${dark ? 'bgDarkTransparent2' : 'bg-theme-transparent-2'}`}/>}
        {title && <div className="row">
            <div className="col-md-6 offset-md-3 text-center" data-aos='fade-up'>
                <h2 className='text-30 mb-0'>{title}</h2>
                <div className="separator"><span><i className="fa fa-circle"></i></span></div>
            </div>
        </div>}
        <div className={`sect_content position-relative z-1 mx-auto ${exContainerClass}`} style={{maxWidth: fullWidth ? '100%' : '800px'}}>
            {sideImg && <div className="sideImg bg-cover bg-center" style={{minWidth: '30%', ...locStyle}}/>}
            {children}
        </div>
    </section>
  )
}
export default Section