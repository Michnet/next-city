import { shortenNum } from "@/helpers/universal";

export const StatCard = (props) => {
    const {number, text} = props;
    return (
      <div className={'stat_card'}>
       {/*  <img
          alt={props.image_alt}
          src={props.image_src}
          className={styles['image']}
        /> */}
        
        <span className={'number lh-1'}>{number}{/* <CountUp scrollSpyOnce enableScrollSpy start={0} end={number}/> */}</span>
        <span className={'text opacity-60'}>{text}</span>
      </div>
    )
}
  
const ListingStats = ({stats}) => {

    return <div className={'numbers-container'}>
          {stats?.map((st, i) => {
            const {stat_name, stat_number} = st;
            return <StatCard
            key = {i}
            text={stat_name}
            number={shortenNum(stat_number, 2)}
            image_src="/teleportHq/interfacecalendarfavorite-200h.png"/>
          })}
        </div>
  }

  export default ListingStats;