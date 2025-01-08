import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  message: string;
}

export function EmailTemplate({ firstName, message }: EmailTemplateProps) {
    return (
      <div>
        <h1>Hej {firstName}!</h1>
        <p>{message}</p>
      </div>
    );
  }