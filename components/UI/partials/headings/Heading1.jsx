export const Heading1 = ({title, large, small, subtitle=null, desc, exClass='mb-20 mx-3'}) => {
  return (
    <div className={`sc_heading_3 pos-relative ${exClass}`}>
        {subtitle && <h5 className={`h_subtitle text-${large ? '16' : small ? '12' : '14'}`}>{subtitle}</h5>}
        <h4 className={`h_title text-${large ? '26' : small ? '14' : '18'}`}>{title}</h4>
    </div>
  )
}