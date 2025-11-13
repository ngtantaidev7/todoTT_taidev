import AddTask from '@/components/ui/AddTask';
import DateTimeFilter from '@/components/ui/DateTimeFilter';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import StatsAndFilter from '@/components/ui/StatsAndFilter';
import TaskList from '@/components/ui/TaskList';
import TaskListPagination from '@/components/ui/TaskListPagination';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { visibleTaskLimit } from '@/lib/Data';

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]); //state luu data tong
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [dateQuery, setDateQuery] = useState('today');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);
  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  //get du lieu
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/task?filter=${dateQuery}`);
      setTaskBuffer(res.data.task);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.error('Loi khi truy xuat data', error);
      toast.error('Loi xay ra khi truy xuat data');
    }
  };

  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  //bien trang thai
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'completed';
      default:
        return true;
    }
  });

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );
  if (visibleTasks.length === 0) {
    handlePrev();
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);
  return (
    <div className='min-h-screen w-full relative bg-white'>
      {/* Purple Glow Right */}
      <div
        className='absolute inset-0 z-0'
        style={{
          background: '#ffffff',
          backgroundImage: `
        radial-gradient(
          circle at top right,
          rgba(173, 109, 244, 0.5),
          transparent 70%
        )
      `,
          filter: 'blur(80px)',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Your Content/Components */}
      <div className='container pt-8 mx-auto relative z-10'>
        <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
          <Header />
          <AddTask handleNewTaskAdded={handleTaskChanged} />
          <StatsAndFilter
            filter={filter}
            setFilter={setFilter}
            activeTaskCount={activeTaskCount}
            completeTaskCount={completeTaskCount}
          />
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />
          <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>
          <Footer
            completeTaskCount={completeTaskCount}
            activeTaskCount={activeTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
