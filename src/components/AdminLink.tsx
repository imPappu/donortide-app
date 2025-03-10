
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLink = ({ adminPath }: { adminPath: string }) => {
  return (
    <div className="fixed bottom-24 right-4 z-50">
      <Button asChild variant="default" size="sm" className="shadow-lg">
        <Link to={`/${adminPath}`} className="flex items-center gap-1">
          <ShieldCheck className="h-4 w-4" />
          <span>Admin</span>
        </Link>
      </Button>
    </div>
  );
};

export default AdminLink;
