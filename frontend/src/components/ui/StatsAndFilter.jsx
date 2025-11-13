import { FilterTypes } from '@/lib/Data';
import { Badge } from './badge';
import React from 'react';
import { Button } from './button';
import { Filter } from 'lucide-react';

const StatsAndFilter = ({
  completeTaskCount = 0,
  activeTaskCount = 0,
  filter = 'all',
  setFilter,
}) => {
  return (
    <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
      {/* Thong ke  */}
      <div className='flex gap-3'>
        <Badge
          variant='secondary'
          className='bg-white/50  text-accent-foreground border-info/20'
        >
          {activeTaskCount} {FilterTypes.active}
        </Badge>
        <Badge
          variant='secondary'
          className='bg-white/50  text-success border-success/20'
        >
          {completeTaskCount} {FilterTypes.completed}
        </Badge>
      </div>
      {/* Lọc */}
      <div className='flex flex-col gap-2 sm:flex-row'>
        {Object.keys(FilterTypes).map((type) => (
          <Button
            key={type}
            variant={filter === type ? 'gradient' : 'ghost'}
            size='sm'
            className='capitalize'
            onClick={() => setFilter(type)}
          >
            <Filter className='size-4' />
            {FilterTypes[type]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilter;
