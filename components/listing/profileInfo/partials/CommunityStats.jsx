
const CommunityStats = ({listing, views, likes, comments, communitySize}) => {


  let statsView, likesView, commentsView, viewsView;

  if(listing){

    const {acf, comment_num, page_views} = listing;

    let statArr = [];

    if(comment_num && comment_num > 0){
      statArr.push(
        { 
          id: 'comments',
          cssClass: 'comments_stat',
          iconClass : 'lar la-comments',
          title: 'Public Chat',
          value: parseInt(comment_num)
        }
      )
    }
    
    /* if(likes){
    if(acf){
      const {community} = acf;
        if(community){
          const liked = community.likes;
          if(liked.length > 0){
            statArr.push(
              { 
                id: 'likes',
                cssClass: 'likes_stat',
                iconClass : 'bi bi-heart',
                title: 'Likes',
                value: parseInt(comment_num)
              }
            )
          }
        }
    }
   } */

   if(views){
    statArr.push(
      { 
        id: 'views',
        cssClass: 'likes_stat',
        iconClass : 'lar la-eye',
        title: 'Page Views',
        value: page_views
      }
    );
   }

   if(communitySize){
    statArr.push(
      { 
        id:'community',
        cssClass: 'community_stat',
        iconClass : 'bi bi-people',
        title: 'Community',
        value: parseInt(communitySize)
      }
    )
   }

   statsView = <>{statArr.map((it) => {
    const {id, cssClass, iconClass, title,value} = it;
        return <li key={id} className={cssClass}>
        <i className={iconClass}></i>
        <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">{value}</span>
        <span className="gx-fs-sm">{title}</span>
      </li>
  })}</>;

  }
  
  return (
              <div className="stats no-scrollbar">
                <ul className="community_stats gx-follower-list">
                  {statsView}
                </ul>
              </div>
  )
};

export default CommunityStats;
