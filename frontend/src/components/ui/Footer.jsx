import React from 'react';

const Footer = ({ completeTaskCount = 0, activeTaskCount = 0 }) => {
  const total = completeTaskCount + activeTaskCount;

  if (total === 0) return null;

  return (
    <div className='text-center mt-8'>
      <p className='text-sm text-muted-foreground'>
        {completeTaskCount > 0 && (
          <>
            Tuyệt vời ! Bạn đã hoàn thành được {completeTaskCount} việc
            {activeTaskCount > 0 && (
              <> – còn {activeTaskCount} việc nữa thôi ! Cố lên 💪</>
            )}
            !
          </>
        )}

        {completeTaskCount === 0 && activeTaskCount > 0 && (
          <>Hãy bắt đầu làm {activeTaskCount} việc nào ! 🚀</>
        )}
      </p>
    </div>
  );
};

export default Footer;
