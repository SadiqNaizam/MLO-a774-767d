import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TaskItem {
  id: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

const initialTasks: TaskItem[] = [
  {
    id: '1',
    description: 'Review and make sure nothing slips through cracks',
    dueDate: '15 Sep, 2021',
    completed: false,
  },
  {
    id: '2',
    description: 'Send meeting invites for sales upcampaign',
    dueDate: '20 Sep, 2021',
    completed: false,
  },
  {
    id: '3',
    description: 'Weekly closed sales won checking with sales team',
    dueDate: '24 Sep, 2021',
    completed: true,
  },
  {
    id: '4',
    description: 'Add notes that can be viewed from the individual view',
    dueDate: '27 Sep, 2021',
    completed: false,
  },
  {
    id: '5',
    description: 'Move stuff to another page',
    dueDate: '27 Sep, 2021',
    completed: true,
  },
  {
    id: '6',
    description: 'Prepare presentation for Q4 review',
    dueDate: '01 Oct, 2021',
    completed: false,
  },
];

interface TasksListProps {
  className?: string;
}

const TasksList: React.FC<TasksListProps> = ({ className }) => {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  const handleToggleComplete = useCallback((taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const remainingTasksCount = tasks.length - completedTasksCount;

  return (
    <Card className={cn('shadow-sm flex flex-col h-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>My Tasks</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button variant="default" size="sm" className="bg-accent hover:bg-accent/90 h-8 px-3">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-4 flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground mb-3">
          {remainingTasksCount} of {tasks.length} remaining
        </p>
        <ScrollArea className="flex-1 pr-3 -mr-3">
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-start space-x-3 py-1.5">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => handleToggleComplete(task.id)}
                  className="mt-0.5 border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <div className="flex-1">
                  <label
                    htmlFor={`task-${task.id}`}
                    className={cn(
                      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                      task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                    )}
                  >
                    {task.description}
                  </label>
                  <p className={cn('text-xs mt-0.5', task.completed ? 'text-muted-foreground/70' : 'text-muted-foreground')}>
                    Due: {task.dueDate}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TasksList;
