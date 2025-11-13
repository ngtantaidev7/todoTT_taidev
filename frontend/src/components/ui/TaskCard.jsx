import { Card } from './card';
import { cn } from '@/lib/utils';
import { Button } from './button';
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from 'lucide-react';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { useState } from 'react';
import { Input } from './input';

export const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || '');
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/task/${taskId}`);
      toast.success('Nhiệm vụ đã xóa');
      handleTaskChanged();
    } catch (error) {
      console.error('Lỗi xảy ra khi xóa task:', error);
      toast.error('Lỗi xảy ra khi xóa nhiệm vụ mới!');
    }
  };

  const updateTask = async () => {
    try {
      setIsEditing(false);
      await api.put(`/task/${task._id}`, {
        title: updateTaskTitle,
      });
      toast.success('Nhiệm vụ đã cập nhật thành công');
      handleTaskChanged();
    } catch (error) {
      console.error('Lỗi xảy ra khi cập nhật task:', error);
      toast.error('Lỗi xảy ra khi cập nhật nhiệm vụ mới!');
    }
  };

  const toggleTaskCompleteButton = async () => {
    try {
      if (task.status === 'active') {
        await api.put(`/task/${task._id}`, {
          status: 'completed',
          completedAt: new Date().toISOString(),
        });
        toast.success('Nhiệm vụ đã hoàn thành');
      } else {
        await api.put(`/task/${task._id}`, {
          status: 'active',
          completedAt: null,
        });
        toast.success(
          'Nhiệm vụ đã hoàn thành đã được cập nhật lại chưa hoàn thành xong'
        );
      }
      handleTaskChanged();
    } catch (error) {
      console.error('Lỗi xảy ra khi cập nhật task:', error);
      toast.error('Lỗi xảy ra khi cập nhật nhiệm vụ mới!');
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') updateTask();
  };
  return (
    <Card
      className={cn(
        'p-4 bg-gradient-card border-0  shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group',
        task.status === 'completed' && 'opacity-75'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className='flex items-center gap-4 '>
        {/* Button tròn dùng để đánh dấu nv hoàn thành chưa  */}
        <Button
          variant='ghost'
          size='icon'
          className={cn(
            'flex-shrink-0 size-8 rounded-full transition-all duration-200',
            task.status === 'completed'
              ? 'text-success hover:text-success/80'
              : 'text-muted-foreground hover:text-primary'
          )}
          onClick={toggleTaskCompleteButton}
        >
          {task.status === 'completed' ? (
            <CheckCircle2 className='size-5' />
          ) : (
            <Circle className='size-5' />
          )}
        </Button>

        {/* Hiển thị hoặc edit tiêu đề của nhiệm vụ */}
        <div className='flex-1 min-w-0'>
          {isEditing ? (
            <Input
              placeholder='Cần phải làm gì ?'
              className='flex-1 text-base h-12 border-border/50 focus:border-primary/50 focus:ring-primary/20'
              type='text'
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditing(false);
                setUpdateTaskTitle(task.title || '');
              }}
            />
          ) : (
            <p
              className={cn(
                'text-base transition-all duration-200',
                task.status === 'completed'
                  ? 'line-through text-muted-foreground'
                  : 'text-foreground'
              )}
            >
              {task.title}
            </p>
          )}
          {/* Hiển thị ngày tạo và ngày hoàn thành  */}
          <div className='flex items-center gap-2 mt-1'>
            <Calendar className='size-3 text-muted-foreground' />
            <span className='text-xs text-muted-foreground'>
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className='text-xs text-muted-foreground'> - </span>
                <Calendar className='size-3 text-muted-foreground' />
                <span className='text-xs text-muted-foreground'>
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Nút chỉnh và xóa */}
        <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
          {/* Nút edit */}
          <Button
            variant='ghost'
            size='icon'
            className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info'
            onClick={() => {
              setIsEditing(true);
              setUpdateTaskTitle(task.title || '');
            }}
          >
            <SquarePen className='size-4' />
          </Button>
          {/* Nút delete */}
          <Button
            variant='ghost'
            size='icon'
            className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive'
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className='size-4' />
          </Button>
        </div>
      </div>
    </Card>
  );
};
