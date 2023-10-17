import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider (props)  {
    
    let [counter, setCounter] = useState(0)

    function changeCounter() {
        setCounter(Math.random()*10)
    }
    return <CounterContext.Provider value={{counter,changeCounter}}>
        {props.children}
    </CounterContext.Provider>
}