import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { ActiveQueryOption } from "@/components/UI/Partials";

const DateSearchEvents = ({dates, setDates, params, setParams, query}) => {
  const [selectType, setSelectType] = useState('block');

  function reset(){
    setDates([])
    const tempObj = {...params}
    delete tempObj['event-date'];
    setParams({...tempObj});
    setSelectType('block');
  }

  function processDate(Arr){
    let tempArr =[]
    Arr.map((el) => {
      const {year, monthIndex, day} = el;
      tempArr.push(`${year}-${monthIndex + 1}-${day}`)
    });
    return tempArr;
  }

  const block_items = [
    {title: 'Today', link:'today'},
    {title: 'Tomorrow', link:'tomorrow'},
    {title: 'This Week', link:'this-week'},
    {title: 'This Weekend', link:'this-weekend'},
    {title: 'This Month', link:'this-month'},
    {title: 'Next week', link:'next-week'},
    {title: 'Next Month', link:'next-month'}
  ];

  function createBlocks(){
    return block_items.map((block) => {
      const {title, link} = block;
      return <span type='button' style={{marginRight: '5px'}} className={`btn btn-sm btn-outline-info date_block rounded-22 text-10 lh-2 py-0 h-auto mb-2 ${dates == link ? 'active' : ''}`} onClick={() => {setDates(link); setParams({...params, 'event-date' : link })}}>
              {title}
            </span>
    })
  }

  return (
    <>
    {query && query['event-date'] && <ActiveQueryOption query={query} queryKey="event-date"/>}
    <div className="d-flex flex-row flex-nowrap gap-3">
      <div className="form-check">
      <input onChange={(e) => setSelectType(e.target.id)} className="form-check-input" type="radio" name="select_type" id="range" checked={selectType == 'range'}/>
      <label className="form-check-label gray_text text-12" for="date_range">
        Date Range
      </label>
      </div>
      <div className="form-check">
        <input onChange={(e) => setSelectType(e.target.id)} className="form-check-input" type="radio" name="select_type" id="block" checked={selectType == 'block'}/>
        <label className="form-check-label gray_text text-12" for="date_block">
          Date Block
        </label>
      </div>
    </div>
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      {selectType == 'range' ?
        <DatePicker
          inputClass="custom_input-picker"
          containerClassName="custom_container-picker"
          value={dates}
          onChange={(dateArr) => {
            setDates;
            setParams({...params, 'event-date' : processDate(dateArr).join('..') })
          }}
          numberOfMonths={1}
          offsetY={10}
          range
          placeholder="Select Dates"
          format="MMMM DD"
        />:
        <div className="date_blocks">
          {createBlocks()}
        </div>
        }
    </div>
    {dates?.length > 0 && <button className="btn-outline-secondary btn btn-sm rounded" onClick={() => reset()}>Reset</button>}
    </>
  );
};

export default DateSearchEvents;
