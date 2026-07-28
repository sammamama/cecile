import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: '#171717', lineHeight: 1.6 }}>
      <h2 style={{ margin: '0 0 16px', fontWeight: 500 }}>New inquiry from the website</h2>
      <p style={{ margin: '0 0 4px' }}>
        <strong>Name:</strong> {name}
      </p>
      <p style={{ margin: '0 0 16px' }}>
        <strong>Email:</strong> {email}
      </p>
      <p style={{ margin: '0 0 8px' }}>
        <strong>Message</strong>
      </p>
      <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{message}</p>
    </div>
  );
}
