import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../contexts/CyclesContext";



export const TimerForm = () => {
  const {activeCycle} = useContext(CyclesContext);
  const { register } = useFormContext()


  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        placeholder="Dê um nome para o seu projeto"
        id="task"
        type="text"
        list="task-suggestions"
        disabled={!!activeCycle}
        {...register('task')}

      />
      <datalist id='task-suggestions'>
        <option value='projeto'/>
        <option value='projeto2'/>
        <option value='projeto3'/>
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        placeholder="00"
        id="minutesAmount"
        type="number"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount',{valueAsNumber: true})}
      />
      <span>minutos.</span>
    </FormContainer>
  );
};
