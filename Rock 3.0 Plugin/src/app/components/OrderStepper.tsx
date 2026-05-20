import { Check } from 'lucide-react';

interface Step {
  number: number;
  label: string;
  completed: boolean;
  active: boolean;
}

interface OrderStepperProps {
  steps: Step[];
}

export function OrderStepper({ steps }: OrderStepperProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--spacing-md)',
      marginBottom: 'var(--spacing-2xl)',
      paddingTop: 'var(--spacing-xl)',
    }}>
      {steps.map((step, index) => (
        <div key={step.number} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            {/* Circle */}
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: step.active ? 'var(--primary)' : step.completed ? 'var(--primary)' : 'var(--muted)',
              color: step.active || step.completed ? 'white' : 'var(--muted-foreground)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-semibold)',
              fontFamily: 'var(--font-family)',
            }}>
              {step.completed ? <Check size={16} /> : step.number}
            </div>
            
            {/* Label */}
            <span style={{
              fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-family)',
              color: step.active ? 'var(--foreground)' : 'var(--muted-foreground)',
              fontWeight: step.active ? 'var(--font-semibold)' : 'var(--font-normal)',
            }}>
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div style={{
              width: '40px',
              height: '2px',
              backgroundColor: 'var(--muted)',
            }} />
          )}
        </div>
      ))}
    </div>
  );
}
