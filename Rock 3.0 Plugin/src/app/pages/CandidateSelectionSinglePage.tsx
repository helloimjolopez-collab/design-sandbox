import { useState } from 'react';
import { useNavigate } from 'react-router';
import { RockHeader } from '../components/RockHeader';
import { DemoControls } from '../components/DemoControls';
import { PersonSelector } from '../components/PersonSelector';
import { ArrowLeft } from 'lucide-react';

interface Person {
  id: string;
  name: string;
  role: string;
  address: string;
  email: string;
}

export default function CandidateSelectionSinglePage() {
  const navigate = useNavigate();
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const canProceed = selectedPerson !== null;

  const handleInitiateOrder = () => {
    if (canProceed) {
      sessionStorage.removeItem('pmm-next-path');
      navigate('/child-safety-training');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <RockHeader />

      <DemoControls />

      <div style={{ padding: 'var(--spacing-2xl)', maxWidth: '800px', margin: '0 auto' }}>
        <button
          onClick={() => navigate('/direct-plugin-option-b')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            marginBottom: 'var(--spacing-xl)',
            padding: 0,
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--primary)',
            cursor: 'pointer',
            fontSize: 'var(--text-base)',
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-medium)',
          }}
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <h1 style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-semibold)',
          color: 'var(--foreground)',
          fontFamily: 'var(--font-family)',
          marginBottom: 'var(--spacing-xl)',
        }}>
          Select Applicants
        </h1>

        {/* Selection Field - Person Only */}
        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-xl)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: 'var(--spacing-xl)',
        }}>
          <PersonSelector 
            selectedPerson={selectedPerson}
            onSelectPerson={setSelectedPerson}
          />
        </div>

        {/* Initiate Order Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleInitiateOrder}
            disabled={!canProceed}
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--primary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: canProceed ? 'pointer' : 'not-allowed',
              color: 'var(--primary-foreground)',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-medium)',
              opacity: canProceed ? 1 : 0.5,
            }}
          >
            Initiate Order
          </button>
        </div>
      </div>
    </div>
  );
}
