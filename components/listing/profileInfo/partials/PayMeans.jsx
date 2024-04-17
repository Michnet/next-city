import { useEffect, useState } from "react";
import { getDirPaymentMethods } from "@/helpers/rest";
import { DualColorHeader } from "@/components/UI/Partials";
import TermTag from "@/components/UI/partials/TermTag";
import Widget from "@/components/UI/partials/Widget";

function PayMeans({listingId}) {
    const [payMeans, setPayMeans] = useState(null);

    async function getPayMeans(id){
        const means = await getDirPaymentMethods({post : id});
        if(means){
        setPayMeans(means.items);
        }
    }

    useEffect(() => {
        if(listingId){
            getPayMeans(listingId)
        }
      return () => {
        setPayMeans(null)
      }
    }, [listingId]);

    let payView;

    if(payMeans?.length > 0){
        payView = <Widget 
        title= {<DualColorHeader exClass={'mb-0 sm-font'} title={'Payment Methods'}/>}
        icon = {<i className="bi bi-wallet2"/> }
        subtitle={'Payment options accepted in this event'}
        >
          <div className="listing_tags">
            {payMeans.map((item) => {
              return <TermTag key={item.id} term={item} type={'icon-box'} collection/>
            })}
          </div>
        </Widget>
    }
    
  return (<>{payView}</>)
}
export default PayMeans