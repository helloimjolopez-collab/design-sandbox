import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { RockHeader } from '../components/RockHeader';
import { DemoControls } from '../components/DemoControls';
import { PersonSelector } from '../components/PersonSelector';
import { GroupsSelector } from '../components/GroupsSelector';
import { ArrowLeft } from 'lucide-react';

interface Person {
  id: string;
  name: string;
  role: string;
  address: string;
  email: string;
}

interface Group {
  id: string;
  name: string;
}

export default function CandidateSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Try to get nextPath from location.state first, then fallback to sessionStorage
  const nextPath = location.state?.nextPath || sessionStorage.getItem('pmm-next-path') || '/background-check-invite';
  
  const [orderMode, setOrderMode] = useState<'single' | 'bulk'>('single');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [selectedGroups, setSelectedGroups] = useState<Group[]>([]);

  const canProceed = orderMode === 'single' ? selectedPerson !== null : selectedGroups.length > 0;

  const handleInitiateOrder = () => {
    if (canProceed) {
      // Clear the stored path after using it
      sessionStorage.removeItem('pmm-next-path');
      navigate(nextPath);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <RockHeader />

      <DemoControls />

      <div style={{ padding: 'var(--spacing-2xl)', maxWidth: '800px', margin: '0 auto' }}>
        <button
          onClick={() => navigate('/')}
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

        {/* Toggle between Single and Bulk */}
        <div style={{ 
          marginBottom: 'var(--spacing-xl)',
          display: 'inline-flex',
          backgroundColor: 'var(--muted)',
          borderRadius: 'var(--radius-md)',
          padding: '4px',
        }}>
          <button
            onClick={() => {
              setOrderMode('single');
              setSelectedGroups([]);
            }}
            style={{
              padding: 'var(--spacing-sm) var(--spacing-lg)',
              backgroundColor: orderMode === 'single' ? 'var(--card)' : 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-medium)',
              color: orderMode === 'single' ? 'var(--foreground)' : 'var(--muted-foreground)',
              boxShadow: orderMode === 'single' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Single Candidate
          </button>
          <button
            onClick={() => {
              setOrderMode('bulk');
              setSelectedPerson(null);
            }}
            style={{
              padding: 'var(--spacing-sm) var(--spacing-lg)',
              backgroundColor: orderMode === 'bulk' ? 'var(--card)' : 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-medium)',
              color: orderMode === 'bulk' ? 'var(--foreground)' : 'var(--muted-foreground)',
              boxShadow: orderMode === 'bulk' ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Bulk Invite
          </button>
        </div>

        {/* Selection Field */}
        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-xl)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: 'var(--spacing-xl)',
        }}>
          {orderMode === 'single' ? (
            <PersonSelector 
              selectedPerson={selectedPerson}
              onSelectPerson={setSelectedPerson}
            />
          ) : (
            <GroupsSelector
              selectedGroups={selectedGroups}
              onSelectGroups={setSelectedGroups}
            />
          )}
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