import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeConfig = {
    success: {
      bg: 'bg-secondary/10',
      border: 'border-secondary',
      text: 'text-secondary',
      icon: CheckCircle,
    },
    error: {
      bg: 'bg-danger/10',
      border: 'border-danger',
      text: 'text-danger',
      icon: AlertCircle,
    },
    info: {
      bg: 'bg-primary/10',
      border: 'border-primary',
      text: 'text-primary',
      icon: Info,
    },
  };

  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div className={`fixed bottom-6 right-6 max-w-md p-4 rounded-lg border ${config.bg} ${config.border} border-l-4 shadow-lg animate-slide-in z-50`}>
      <div className="flex items-start gap-3">
        <Icon size={20} className={config.text} />
        <div className="flex-1">
          <p className={`text-sm font-medium ${config.text}`}>{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`p-1 ${config.text} hover:opacity-70 transition-opacity`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
