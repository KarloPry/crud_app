import Task from "./Task";

export default function TestComponent({ tasks, setTasks }) {
  return (
    <>
      {tasks &&
        tasks.map(function (task) {
          return <Task task={task} setTasks={setTasks} />;
        })}
    </>
  );
}
