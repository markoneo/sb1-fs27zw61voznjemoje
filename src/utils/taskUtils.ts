import { Task } from '../types/task';

export function sortTasksByDateTime(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    // Put tasks without datetime at the end
    if (!a.datetime && !b.datetime) return 0;
    if (!a.datetime) return 1;
    if (!b.datetime) return -1;

    // Sort by datetime
    const dateA = new Date(a.datetime);
    const dateB = new Date(b.datetime);
    return dateA.getTime() - dateB.getTime();
  });
}