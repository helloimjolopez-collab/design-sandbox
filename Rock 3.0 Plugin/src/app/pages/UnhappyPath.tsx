import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ExternalLink, Baby, X } from 'lucide-react';
import { RockHeader } from '../components/RockHeader';
import { CandidateSelector } from '../components/CandidateSelector';
import { OrderTypeCard } from '../components/OrderTypeCard';
import { RecentOrdersTable } from '../components/RecentOrdersTable';
import { PluginSettings } from '../components/PluginSettings';
import { DemoControls } from '../components/DemoControls';
import { useEntryPoint } from '../context/EntryPointContext';

export default function UnhappyPath() {
  const { entryPoint } = useEntryPoint();
  const navigate = useNavigate();
  const [showCstUpsell, setShowCstUpsell] = useState(false);

  // Set the unhappy path flag when this component mounts
  useEffect(() => {
    sessionStorage.setItem('pmm-unhappy-path', 'true');
    // Don't clean up - we want the flag to persist throughout the ordering flow
  }, []);

  // Check if we should show CST upsell - show max 3 times or until dismissed
  useEffect(() => {
    const checkNoCst = () => {
      const noCst = sessionStorage.getItem('pmm-no-cst') === 'true';
      const dismissed = localStorage.getItem('pmm-cst-upsell-dismissed') === 'true';
      const viewCount = parseInt(localStorage.getItem('pmm-cst-upsell-views') || '0');

      console.log('CST Upsell Check (Unhappy):', { noCst, dismissed, viewCount });

      // Show if NO CST mode AND not dismissed AND viewed less than 3 times
      const shouldShow = noCst && !dismissed && viewCount < 3;
      setShowCstUpsell(shouldShow);

      // Increment view count ONLY on first render when it should show
      if (shouldShow && !showCstUpsell) {
        const newCount = viewCount + 1;
        localStorage.setItem('pmm-cst-upsell-views', String(newCount));
        console.log('Incrementing view count to:', newCount);
      }
    };

    checkNoCst();

    // Listen for storage events
    window.addEventListener('storage', checkNoCst);
    return () => window.removeEventListener('storage', checkNoCst);
  }, [showCstUpsell]);

  const handleDontShowAgain = () => {
    localStorage.setItem('pmm-cst-upsell-dismissed', 'true');
    setShowCstUpsell(false);
  };

  const handleClose = () => {
    setShowCstUpsell(false);
  };

  const handleOrderClick = (path: string) => {
    console.log('=== UnhappyPath handleOrderClick ===');
    console.log('Navigating to candidate-selection with nextPath:', path);
    console.log('===================================');
    // Store the destination path in sessionStorage so it persists
    sessionStorage.setItem('pmm-next-path', path);
    // On the home page (UnhappyPath), ALWAYS go through candidate-selection first
    navigate('/candidate-selection', { state: { nextPath: path } });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <RockHeader />

      <DemoControls />

      <div style={{ padding: 'var(--spacing-2xl)', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Page Header */}
        <div style={{ marginBottom: 'var(--spacing-4xl)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            marginBottom: 'var(--spacing-sm)',
            flexWrap: 'wrap'
          }}>
            <h1 style={{
              fontSize: 'var(--heading-1)',
              fontWeight: 'var(--font-semibold)',
              color: 'var(--foreground)',
              fontFamily: 'var(--font-family)',
              margin: 0,
            }}>
              Protect My Ministry
            </h1>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-medium)',
              color: 'var(--muted-foreground)',
              fontFamily: 'var(--font-family)',
              backgroundColor: '#F0F0F0',
              padding: '2px var(--spacing-sm)',
              borderRadius: 'var(--radius-sm)',
            }}>
              V3 Integration
            </span>
          </div>
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--secondary-foreground)',
            fontFamily: 'var(--font-family)',
          }}>
            Order Background Checks and Safety Training, and manage your PMM Plugin
          </p>
        </div>

        {/* Candidate Selector */}
        <CandidateSelector entryPoint={entryPoint} />

        {/* Order Type Selection */}
        <div style={{ marginBottom: 'var(--spacing-3xl)', marginTop: 'var(--spacing-3xl)' }}>
          <h2 style={{
            marginBottom: 'var(--spacing-xl)',
            fontSize: 'var(--section-heading)',
            fontWeight: 'var(--font-medium)',
            color: '#4A4A4A',
            fontFamily: 'var(--font-family)',
          }}>
            What would you like to order?
          </h2>

          {showCstUpsell ? (
            // NO CST MODE ONLY: Fixed width, centered BG check tile
            <div style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <div style={{ width: '540px' }}>
                <OrderTypeCard
                  type="background-check"
                  onInviteClick={() => handleOrderClick('/background-check-invite')}
                  onManualClick={() => handleOrderClick('/background-check-manual')}
                />
              </div>
            </div>
          ) : (
            // NORMAL MODE: Responsive grid (DO NOT TOUCH)
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--spacing-lg)'
            }}>
              <OrderTypeCard
                type="child-safety-training"
                onInviteClick={() => handleOrderClick('/child-safety-training')}
              />
              <OrderTypeCard
                type="background-check"
                onInviteClick={() => handleOrderClick('/background-check-invite')}
                onManualClick={() => handleOrderClick('/background-check-manual')}
              />
            </div>
          )}

          {/* CST Upsell Banner - below the cards, dismissible - ONLY in NO CST mode */}
          {showCstUpsell && (
            <div style={{
              backgroundColor: '#F9F9F9',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--spacing-md)',
              marginTop: 'var(--spacing-lg)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              maxWidth: '680px',
              margin: 'var(--spacing-lg) auto 0 auto',
            }}>
              {/* Icon */}
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
                <Baby size={18} color="var(--icon-fg)" strokeWidth={2} />
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <span style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-medium)',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-family)',
                }}>
                  Leave No Gaps: Add Safety Training to your Screenings.{' '}
                </span>
                <a
                  href="https://www.protectmyministry.com/child-safety-training/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--primary)',
                    fontFamily: 'var(--font-family)',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Learn more
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', flexShrink: 0 }}>
                <button
                  onClick={handleDontShowAgain}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0',
                    color: 'var(--muted-foreground)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-family)',
                    textDecoration: 'underline',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Don't show again
                </button>
                <button
                  onClick={handleClose}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 'var(--spacing-xs)',
                    color: 'var(--muted-foreground)',
                    fontSize: '18px',
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          backgroundColor: 'var(--border)',
          marginBottom: 'var(--spacing-2xl)'
        }} />

        {/* Plugin Settings */}
        <PluginSettings />

        {/* Divider */}
        <div style={{
          height: '1px',
          backgroundColor: 'var(--border)',
          marginBottom: 'var(--spacing-2xl)'
        }} />

        {/* Recent Orders Table */}
        <RecentOrdersTable />
      </div>
    </div>
  );
}
