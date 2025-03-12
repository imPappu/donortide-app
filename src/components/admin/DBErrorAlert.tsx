
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ErrorSeverity = 'error' | 'warning' | 'info';

interface DBErrorAlertProps {
  error: string | null;
  severity?: ErrorSeverity;
  title?: string;
  onDismiss?: () => void;
  className?: string;
}

const DBErrorAlert = ({ 
  error, 
  severity = 'error',
  title,
  onDismiss,
  className = ''
}: DBErrorAlertProps) => {
  if (!error) return null;
  
  const getIcon = () => {
    switch (severity) {
      case 'error':
        return <XCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    switch (severity) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
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
      variant={getVariant() as any} 
      className={cn("mb-4 relative", className)}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          {(title || severity !== 'info') && (
            <AlertTitle className="text-sm font-medium">
              {title || getDefaultTitle()}
            </AlertTitle>
          )}
          <AlertDescription className="mt-1 text-sm">{error}</AlertDescription>
        </div>
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className="absolute top-4 right-4 text-foreground/70 hover:text-foreground"
            aria-label="Dismiss"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </Alert>
  );
};

export default DBErrorAlert;
