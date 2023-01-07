import { useState } from 'react';
import './App.css';
import {MonthPicker} from './components/monthPicker/monthPicker'

function App() {
  const [multiSelection, setMultiSelection] = useState([]);
  const [singleSelection, setSingleSelection] = useState([]);
  
  const onChange = (e) =>{
    setMultiSelection(e)
  }
  const onChangeSingleSelection = (e) =>{
    setSingleSelection(e)
  }
  return (
    <div className="App">
      <MonthPicker
        handleMultipleAllocation={(e)=>onChange(e)}
        dataSource={multiSelection}
        placeHolder='Select Months'
        enableMultiSelection={true}
      />
       <MonthPicker
        handleMultipleAllocation={(e)=>onChangeSingleSelection(e)}
        dataSource={singleSelection}
        placeHolder='Select Month'
        enableMultiSelection={false}
      />
    </div>
  );
}

export default App;
