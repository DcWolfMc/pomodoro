import { differenceInSeconds } from "date-fns";
import {
  createContext,
  FunctionComponent,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { addNewCycleAction, InterruptCurrentCycleAction, MarkCurrentCycleAsAction } from "../reducers/cycles/actions";
import {Cycle, CyclesReducer } from "../reducers/cycles/reducer";


interface CreateCycleData {
  task: string;
  minutesAmount: number;
}
interface CycleActionType {}
interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}
interface CycleContextProviderProps {
  children: ReactNode;
}
export const CyclesContext = createContext({} as CycleContextType);

export const CycleContextProvider: FunctionComponent<CycleContextProviderProps> = ({ children }) => {
  
  const [cycleState, dispatch] = useReducer(CyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },()=>{
      const storageStateJSON = localStorage.getItem("@pomodoro:cycle-state-1.0.0")
      if(storageStateJSON){
        return JSON.parse(storageStateJSON)
      }
      return{cycles: [], activeCycleId: null}
    },
  );
  const {cycles, activeCycleId} = cycleState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(()=>{
    if(activeCycle){
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate) 
      );
    }
    return 0
  });
 
  useEffect(()=>{
    const stateJSON = JSON.stringify(cycleState)
    localStorage.setItem("@pomodoro:cycle-state-1.0.0",stateJSON)

  },[cycleState])

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(MarkCurrentCycleAsAction());
    
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    //setCycles((state) => [...state, newCycle]);
    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch(InterruptCurrentCycleAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};
