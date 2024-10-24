export const Heading1 = ({title, large, small, subtitle=null, desc, exClass='mb-20 mx-3'}) => {
  return (
    <div className={`sc_heading_3 pos-relative ${exClass}`}>
        {subtitle && <h5 className={`h_subtitle text-${large ? '16' : small ? '12' : '14'}`}>{subtitle}</h5>}
        <h2 className={`h_title text-${large ? '26' : small ? '15' : '18'}`}>{title}</h2>
    </div>
  )
}
export const HeadingSeparatorDot = ({title, light=false, align='center', small, subtitle=null, desc, exClass='px-3'}) => {
  return ( <div className={`text-${align} bg-transparent sc_heading_dot ${exClass} ${light ? 'theme-dark' : ''}`} data-aos='fade-up'>
              <h3 className='mb-0 _title'>{title}</h3>
              <div className="separator"><span><i className="fa fa-circle"></i></span></div>
              {subtitle && <p className='_subtitle'>{subtitle}</p>}
          </div>
  )
}