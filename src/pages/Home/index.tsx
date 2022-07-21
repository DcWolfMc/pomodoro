import { HandPalm, Play } from "phosphor-react";
import { createContext, useContext, useEffect, useState } from "react";
import { Timer } from "../../components/Timer";
import { TimerForm } from "../../components/TimerForm";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
  TaskTitle,
} from "./styles";
import { differenceInSeconds } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo deve ser de no mínimo 5 minutos")
    .max(60, "O ciclo deve ser de no máximo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const Home = () => {
  const { activeCycle, interruptCurrentCycle, createNewCycle } =
    useContext(CyclesContext);
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });
  const { handleSubmit, watch, reset, formState } = newCycleForm;
  const task = watch("task");
  const IsSubmitDisabled = !task;
  const formErrors = formState.errors;

  function handleCreateNewCycle(data:NewCycleFormData) {
    createNewCycle(data)
    reset()
    
  }
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <TimerForm />
        </FormProvider>
        <Timer />
        {activeCycle ? (
          <>
            <TaskTitle>
              Trabalhando em: <b>{activeCycle.task}</b>{" "}
            </TaskTitle>
            <StopCountdownButton onClick={interruptCurrentCycle} type="button">
              <HandPalm size={24} /> Interromper Ciclo
            </StopCountdownButton>
          </>
        ) : (
          <StartCountdownButton type="submit">
            <Play size={24} /> Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
};
