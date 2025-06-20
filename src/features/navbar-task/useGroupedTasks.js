import { useSelector, useDispatch } from 'react-redux';

const useGroupedTasks = () => {
  const tasks = useSelector((state) => state.task.task_data);

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return new Date(`${year}-${month}-${day}`);
  };

  const getWeekRange = (date) => {
    const day = date.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diffToMonday);
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);
    const format = (d) => d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    return `${format(monday)} to ${format(friday)}`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const today = new Date();
  const thisWeekRange = getWeekRange(today);
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  const lastWeekRange = getWeekRange(lastWeek);

  const groupedTasks = tasks.reduce((acc, task) => {
    const taskDate = parseDate(task.task_date);
    const weekRange = getWeekRange(taskDate);
    if (!acc[weekRange]) acc[weekRange] = [];
    acc[weekRange].push(task);
    return acc;
  }, {});

  const groupByDay = (tasks) => {
    return tasks.reduce((acc, task) => {
      const taskDate = parseDate(task.task_date);
      const dayKey = formatDate(taskDate);
      if (!acc[dayKey]) acc[dayKey] = { tasks: [], total_task_time: 0 };
      acc[dayKey].tasks.push(task);
      acc[dayKey].total_task_time += task.task_time;
      return acc;
    }, {});
  };

  const thisWeekTasks = groupedTasks[thisWeekRange] || [];
  const lastWeekTasks = groupedTasks[lastWeekRange] || [];

  const filteredGroupedTasks = Object.keys(groupedTasks).reduce((acc, weekRange) => {
    if (weekRange !== thisWeekRange && weekRange !== lastWeekRange) {
      acc[weekRange] = groupedTasks[weekRange];
    }
    return acc;
  }, {});

  const calculateCompletedHours = (tasks) => tasks.reduce((sum, task) => sum + task.task_time, 0);

  return [
    {
      weekRange: 'This Week',
      tasks: groupByDay(thisWeekTasks),
      completed_hours: calculateCompletedHours(thisWeekTasks),
    },
    {
      weekRange: 'Last Week',
      tasks: groupByDay(lastWeekTasks),
      completed_hours: calculateCompletedHours(lastWeekTasks),
    },
    ...Object.keys(filteredGroupedTasks).map((weekRange) => ({
      weekRange,
      tasks: groupByDay(filteredGroupedTasks[weekRange]),
      completed_hours: calculateCompletedHours(filteredGroupedTasks[weekRange]),
    })),
  ];
};

export default useGroupedTasks;
