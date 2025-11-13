import React from 'react';
import { Card } from './card';
import { Circle } from 'lucide-react';

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className='p-8 text-center border-0 bg-gradient-card shadow-custom-md'>
      <div className='space-y-3'>
        <Circle className='size-12 mx-auto text-muted-foreground' />
        <div className=''>
          <h3 className='font-medium text-foreground'>
            {filter === 'active'
              ? 'Không có nhiệm vụ đang hoạt động'
              : filter === 'completed'
              ? 'Không có nhiệm vụ nào đã hoàn thành'
              : 'Không có nhiệm vụ nào'}
          </h3>
          <p>
            {filter === 'all'
              ? 'Thêm nhiệm vụ đầu tiên'
              : `Chuyển sang tất cả để thấy những nhiệm vụ ${
                  filter === 'active' ? 'Đã hoàn thành' : 'Đang làm'
                }`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
