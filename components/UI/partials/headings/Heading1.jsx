export const Heading1 = ({title, large, small, subtitle=null, desc, exClass='mb-20 mx-3'}) => {
  return (
    <div className={`sc_heading_3 pos-relative ${exClass}`}>
        {subtitle && <h5 className={`h_subtitle text-${large ? '16' : small ? '12' : '14'}`}>{subtitle}</h5>}
        <h4 className={`h_title text-${large ? '26' : small ? '14' : '18'}`}>{title}</h4>
    </div>
  )
}
export const HeadingSeparatorDot = ({title, align='center', small, subtitle=null, desc, exClass='px-3'}) => {
  return ( <div className={`text-${align} sc_heading_dot ${exClass}`} data-aos='fade-up'>
              <h3 className='text-30 mb-0 text-center'>{title}</h3>
              <div className="separator"><span><i className="fa fa-circle"></i></span></div>
          </div>
  )
}