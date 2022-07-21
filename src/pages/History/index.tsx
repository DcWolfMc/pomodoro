import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, StatusDot } from "./styles";

export const History = () => {
  const { cycles } = useContext(CyclesContext);
  return (
    <HistoryContainer>
      <h1>Meu Históricos</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount}</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      locale: ptBR,
                      addSuffix:true,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <StatusDot statusColor="green">Concluido</StatusDot>
                    )}
                    {cycle.interruptedDate && (
                      <StatusDot statusColor="red">Interrompido</StatusDot>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <StatusDot statusColor="yellow">Em Andamento</StatusDot>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};
