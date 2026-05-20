import svgPaths from '../../imports/svg-dqhmg9h8h5';
import { Shield, Baby } from 'lucide-react';

interface OrderTypeCardProps {
  type: 'background-check' | 'child-safety-training';
  onInviteClick: () => void;
  onManualClick?: () => void;
}

export function OrderTypeCard({ type, onInviteClick, onManualClick }: OrderTypeCardProps) {
  const isBackgroundCheck = type === 'background-check';
  const Icon = isBackgroundCheck ? Shield : Baby;

  return (
    <div
      style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-xl)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        height: '200px'
      }}
    >
      <div style={{ flex: 1, marginBottom: 'var(--spacing-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: 'var(--icon-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Icon size={18} color="var(--icon-fg)" strokeWidth={2} />
          </div>
          <h3 style={{ 
            fontSize: 'var(--text-md)', 
            fontWeight: 'var(--font-medium)',
            color: 'var(--foreground)'
          }}>
            {isBackgroundCheck ? 'Background Check' : 'Child Safety Training'}
          </h3>
        </div>
        <p style={{ 
          color: 'var(--secondary-foreground)', 
          fontSize: 'var(--text-base)', 
          lineHeight: '20px',
          marginBottom: 'var(--spacing-sm)'
        }}>
          {isBackgroundCheck
            ? 'Order Background checks via candidate invite or start a manual order. You can add safety training invite to background check orders too.'
            : 'Order Child Safety Training for groups or individuals'}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 'var(--spacing-lg)' }}>
        {isBackgroundCheck && onManualClick && (
          <button
            onClick={onManualClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              padding: 'var(--spacing-sm) 0',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--foreground)',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-medium)',
              lineHeight: '20px',
            }}
          >
            Manual Order
          </button>
        )}
        <button
          onClick={onInviteClick}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-sm)',
            padding: '6px 8px',
            backgroundColor: isBackgroundCheck ? 'var(--primary)' : 'transparent',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            color: isBackgroundCheck ? 'var(--primary-foreground)' : 'var(--primary)',
            fontSize: 'var(--text-base)',
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-medium)',
            lineHeight: '20px',
          }}
        >
          {isBackgroundCheck ? 'Start Invite Order' : 'Start Order'}
          <div style={{
            width: '18px',
            height: '18px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg 
              width="8" 
              height="8" 
              viewBox="0 0 8 8" 
              fill="none" 
              style={{ display: 'block' }}
            >
              <path 
                d={svgPaths.p3f3ab100} 
                fill={isBackgroundCheck ? 'var(--primary-foreground)' : 'var(--primary)'} 
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}