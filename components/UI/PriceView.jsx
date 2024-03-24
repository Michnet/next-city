export const PriceView = ({price, priceHTml, exClass, preText}) => {
    if(priceHTml){
      if(priceHTml == 'Free'){
        return <span className={`price_view _free ${exClass ?? ''}`}><span className="_price">Free Entry</span> </span>
      }
      return <span className={`price_view ${exClass ?? ''}`}><span className="handy _pre">{preText ?? 'From'} </span> <span className="_price" dangerouslySetInnerHTML={{__html: priceHTml}}/></span>
    }
 }