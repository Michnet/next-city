import TimelineCard from "../../Listings/cards/TimelineCard";

const ListingTimeline = ({items, dualColumn}) => {
  return (
    <div className="event_timeline gx-timeline-center">
        {items.map((el, i) => {
          const {category} = el;
          if(i%2 != 0 && dualColumn){
             return <TimelineCard key={i} styleName={`gx-timeline-inverted`} flipped item={el} color={`${category.color ?? 'var(--secTheme)'}`}>
                        <i className="icon icon-map-google gx-p-2"/>
                  </TimelineCard>
          }
          return <TimelineCard item={el} key={i} color={`${category.color ?? 'var(--secTheme)'}`}>
            <i className="icon icon-map-google gx-p-2"/>
                </TimelineCard>
        })
      }
    </div>
  )
};

export default ListingTimeline;

