export const siteFaqsContent = [
  {
    id: 1,
    collapseTarget: "One",
    questionName: "Who can post a listing on LyveCity?",
    acceptedAnswerText: `LyveCity is the peoples' directory. This means anyone abd everyone can post add their business place or event to get it infront of hundreds of thousands in the market`,
  },
  {
    id: 2,
    collapseTarget: "Two",
    questionName: "How much does it cost get listed on Lyvecity?",
    acceptedAnswerText: `The good news is that it doesn't cost anything to post a business place or event on LyveCity. Your listing will be added and made available for public viewing free of charge`,
  },
  {
    id: 3,
    collapseTarget: "Three",
    questionName: "Do I need certain expertise to manage my listing on LyveCity?",
    acceptedAnswerText: `If you can fill a form online, you have all the expertise needed to add and update your listing on LyveCity. We've made so easy, so you can continue focussing on your actual business as we continue telling the world about you`,
  }
];

const SiteFAQs = () => {
  let siteID = 'lc'

  return (
    <>
    {siteFaqsContent?.length > 0 ? 
        <div className="accordion border-0 accordion-s" id={`accord_${siteID}`}>{
          siteFaqsContent.map((item, index) => (
                <div key={item.id} className="accordion-item">
                    <button aria-expanded={index == 0 ? true : false} className="accordion-button collapsed px-0 bb-thin" type="button" data-bs-toggle="collapse" data-bs-target={`#accord_${siteID}_${index}`}>
                    <span className="font-600 font-13 line-height-s">{item.questionName}</span>
                    <i className="bi bi-plus font-20"></i>
                    </button>
                    <div id={`accord_${siteID}_${index}`} className={`accordion-collapse collapse ${index == 0 ? 'show' : ''}`} data-bs-parent={`#accord_${siteID}`}>
                    <p className="pb-3 opacity-60">
                     {item.acceptedAnswerText}
                    </p>
                    </div>
                </div>
        ))}</div> : <div>No questions answered yet</div>
        }
    </>
  );
};

export default SiteFAQs;
