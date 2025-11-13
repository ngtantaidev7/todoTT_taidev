import React, { useState } from 'react';
import { Card } from './card';
import { Input } from './input';
import { Button } from './button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/axios';

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState(''); // lưu giá trị input

  // Hàm gửi dữ liệu lên backend
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post('/task', {
          title: newTaskTitle,
        });
        toast.success(`Nhiệm vụ "${newTaskTitle}" đã được thêm vào.`);
        handleNewTaskAdded?.(); // tránh lỗi nếu prop chưa được truyền
      } catch (error) {
        console.error('Lỗi xảy ra khi thêm task:', error);
        toast.error('Lỗi xảy ra khi thêm nhiệm vụ mới!');
      }
      setNewTaskTitle('');
    } else {
      toast.error('Bạn cần nhập nội dung của nhiệm vụ!');
    }
  };

  // Enter để thêm task
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <Card className='p-6 border-0 bg-gradient-card shadow-custom-lg'>
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Input
          type='text'
          placeholder='Thêm một nhiệm vụ mới'
          className='h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20'
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button variant='gradient' size='xl' className='px-6' onClick={addTask} disabled={!newTaskTitle.trim()}>
          <Plus className='size-4' />
          Thêm nhiệm vụ
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
