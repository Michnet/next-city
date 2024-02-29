export const PriceView = ({price, priceHTml, exClass, preText}) => {
    if(priceHTml){
      if(priceHTml == 'Free'){
        return <div className={`price_view _free ${exClass ?? ''}`}><p><span className="_title truncate-2">Free Entry</span> </p></div>
      }
      return <div className={`price_view ${exClass ?? ''}`}><p><span className="handy _pre">{preText ?? 'From'} </span> <span className="_title truncate-2" dangerouslySetInnerHTML={{__html: priceHTml}}/></p></div>
    }
 }