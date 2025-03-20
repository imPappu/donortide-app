
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Default to the community feed page
    navigate('/community/feed', { replace: true });
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <Outlet />
    </div>
  );
};

export default Community;
