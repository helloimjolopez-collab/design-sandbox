import { ChevronRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { RockHeader } from '../components/RockHeader';
import { DemoControls } from '../components/DemoControls';
import { ApplicantsStep } from '../components/ApplicantsStep';

export default function BackgroundCheckManual() {
  const navigate = useNavigate();

  const handleNext = () => {
    // TODO: Navigate to next step
    console.log('Moving to next step');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <RockHeader />
      <DemoControls />

      <div style={{ padding: 'var(--spacing-2xl)', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Page Title */}
        <h1 style={{
          fontSize: 'var(--heading-1)',
          fontWeight: 'var(--font-semibold)',
          color: 'var(--foreground)',
          fontFamily: 'var(--font-family)',
          marginBottom: 'var(--spacing-md)',
        }}>
          Send Bulk Background Checks
        </h1>

        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-xs)',
          marginBottom: 'var(--spacing-2xl)',
          fontSize: 'var(--text-sm)',
          fontFamily: 'var(--font-family)',
        }}>
          <span style={{ color: 'var(--muted-foreground)' }}>Home</span>
          <ChevronRight size={14} color="var(--muted-foreground)" />
          <span style={{ color: 'var(--muted-foreground)' }}>Installed Plugins</span>
          <ChevronRight size={14} color="var(--muted-foreground)" />
          <a 
            href="/" 
            onClick={(e) => { e.preventDefault(); navigate('/'); }} 
            style={{ 
              color: 'var(--primary)', 
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Protect My Ministry v3 Integration
          </a>
          <ChevronRight size={14} color="var(--muted-foreground)" />
          <span style={{ color: 'var(--foreground)' }}>Send Bulk Background Checks</span>
        </div>

        {/* Yellow Notice Banner */}
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-sm)',
          padding: 'var(--spacing-md)',
          backgroundColor: '#FFF9E6',
          border: '1px solid #FFE794',
          borderRadius: 'var(--radius-sm)',
          marginBottom: 'var(--spacing-2xl)',
        }}>
          <AlertCircle size={16} color="#856404" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{
            fontSize: 'var(--text-sm)',
            fontFamily: 'var(--font-family)',
            color: '#856404',
            margin: 0,
            lineHeight: '1.5',
          }}>
            <strong>Notice:</strong> Roy Keane has had a background check processed within the past year.
          </p>
        </div>

        {/* Ordering Flow Title */}
        <h2 style={{
          fontSize: 'var(--section-heading)',
          fontWeight: 'var(--font-semibold)',
          fontFamily: 'var(--font-family)',
          color: 'var(--foreground)',
          marginBottom: 'var(--spacing-xl)',
        }}>
          Manual Order
        </h2>

        {/* Step 1: Applicants */}
        <ApplicantsStep orderType="background-check" onNext={handleNext} />
      </div>
    </div>
  );
}