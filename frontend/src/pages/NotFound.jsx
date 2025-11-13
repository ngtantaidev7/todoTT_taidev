import React from 'react';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center bg-slate-50'>
      <img src='404_NotFound.png' alt='' className='max-w-full mb-6 w-96' />
      <p className='text-xl font-semibold'>Bạn đã đi vào vùng cấm địa</p>
      <a href='/' className='inline-block mt-3 px-6 py-3 text-white font-medium transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark'>Quay lại trang chủ</a>
    </div>
  );
};

export default NotFound;
