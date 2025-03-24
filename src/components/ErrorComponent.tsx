
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

interface ErrorComponentProps {
  title?: string;
  description?: string;
  error?: Error;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  title = "Something went wrong",
  description = "We encountered an unexpected error.",
  error
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {error && (
          <div className="text-sm text-gray-500 mb-4 p-2 bg-gray-100 rounded overflow-auto text-left">
            <p>{error.toString()}</p>
          </div>
        )}
        
        <div className="flex flex-col space-y-2">
          <Button 
            onClick={() => window.location.reload()} 
            className="w-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh Page
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="w-full"
          >
            <Home className="mr-2 h-4 w-4" /> Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
