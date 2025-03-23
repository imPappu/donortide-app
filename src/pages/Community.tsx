
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // Only redirect if we're at exactly /community
    if (location.pathname === '/community') {
      navigate('/community/feed', { replace: true });
    }
  }, [navigate, location.pathname]);

  return (
    <div className="container mx-auto p-4">
      <Outlet />
    </div>
  );
};

export default Community;
