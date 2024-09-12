function Section({children, dark=true, id='', exClass='', bgUrl, title}) {
    let locStyle = {}
    if(bgUrl){
        locStyle.background = `url(${bgUrl})`
    }

  return (
    <section id={id} className={`section_container position-relative bg-cover bg-center ${exClass}`} style={{...locStyle}}>
        <div className={`bg-overlay top-0 z-0 ${dark ? 'bgDarkTransparent2' : 'bg-theme-transparent-2'}`}/>
        {title && <div className="row">
            <div className="col-md-6 offset-md-3 text-center" data-aos='fade-up'>
                <h2 className='text-30'>{title}</h2>
                <div className="separator"><span><i className="fa fa-circle"></i></span></div>
                <div className="spacer-single"></div>
            </div>
        </div>}
        <div className='sect_content position-relative z-1'>{children}</div>
    </section>
  )
}
export default Section