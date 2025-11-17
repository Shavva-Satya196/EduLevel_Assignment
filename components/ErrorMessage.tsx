import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="error-message">
      <p><b>Error:</b> {message}</p>
    </div>
  );
};

export default ErrorMessage;