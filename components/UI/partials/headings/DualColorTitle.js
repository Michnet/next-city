import  { useEffect, useState } from "react";

const DualColorTitle = ({string}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false)
  
    return () => {
      setLoading(true)
    }
  }, [string]);
  

  let firstWord, lastWords;

  if(string){
    const wordArr = string.split(' ');
    if(wordArr){
      firstWord = wordArr[0];
      wordArr.shift();
      lastWords = wordArr.join(' ');
    }
  }

    return ( 
                   <h3 className={`ds_title styled_title`}><span className="ds_span _first" dangerouslySetInnerHTML={{__html: firstWord}}/> 
                    {lastWords}
                    </h3>);
  
};

export default DualColorTitle;
