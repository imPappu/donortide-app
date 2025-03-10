
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, XCircle, AlertTriangle } from 'lucide-react';

export type ErrorSeverity = 'error' | 'warning' | 'info';

interface DBErrorAlertProps {
  error: string | null;
  severity?: ErrorSeverity;
  title?: string;
  onDismiss?: () => void;
}

const DBErrorAlert = ({ 
  error, 
  severity = 'error',
  title,
  onDismiss 
}: DBErrorAlertProps) => {
  if (!error) return null;
  
  const getIcon = () => {
    switch (severity) {
      case 'error':
        return <XCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    switch (severity) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'default';
      case 'info':
        return 'default';
      default:
        return 'destructive';
    }
  };

  const getDefaultTitle = () => {
    switch (severity) {
      case 'error':
        return 'Database Error';
      case 'warning':
        return 'Database Warning';
      case 'info':
        return 'Database Information';
      default:
        return 'Database Message';
    }
  };
  
  return (
    <Alert 
      variant={getVariant()} 
      className="mb-4 relative"
    >
      {getIcon()}
      {(title || severity !== 'info') && (
        <AlertTitle className="ml-2">
          {title || getDefaultTitle()}
        </AlertTitle>
      )}
      <AlertDescription className="ml-2">{error}</AlertDescription>
      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="absolute top-4 right-4 text-foreground/70 hover:text-foreground"
          aria-label="Dismiss"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </Alert>
  );
};

export default DBErrorAlert;
