import { ReactNode } from 'react';

interface IFrameContainerProps {
  children: ReactNode;
}

export function IFrameContainer({ children }: IFrameContainerProps) {
  return (
    <div
      className="border p-8"
      style={{
        backgroundColor: 'var(--muted)',
        borderColor: 'var(--border)',
        borderRadius: 'var(--radius-card)',
        minHeight: '500px',
      }}
    >
      <div
        className="mb-4 px-3 py-2 inline-block"
        style={{
          backgroundColor: '#fef3c7',
          color: '#92400e',
          borderRadius: 'var(--radius-button)',
          fontSize: 'var(--text-label)',
          fontWeight: 'var(--font-weight-medium)',
        }}
      >
        📦 PMM Product IFrame (Step 1 "Add Applicants" skipped)
      </div>
      
      <div
        className="p-8 border"
        style={{
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
          borderRadius: 'var(--radius-input)',
        }}
      >
        {children}
      </div>
    </div>
  );
}