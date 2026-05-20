import { useNavigate, useLocation } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useEntryPoint } from '../context/EntryPointContext';
import { useState, useEffect } from 'react';

type EntryPoint = 'profile' | 'direct';
type DirectPluginSubView = 'recommended' | 'unhappyPath' | 'noCst';
type ProfileSubView = 'default' | 'noCst';

export function DemoControls() {
  const { entryPoint, setEntryPoint } = useEntryPoint();
  const navigate = useNavigate();
  const location = useLocation();
  const [noCstMode, setNoCstMode] = useState(false);

  // Check sessionStorage for NO CST mode
  useEffect(() => {
    const isNoCst = sessionStorage.getItem('pmm-no-cst') === 'true';
    setNoCstMode(isNoCst);
  }, [location.pathname]);

  const entryPointLabels: Record<EntryPoint, string> = {
    profile: 'Person Profile',
    direct: 'Direct Plugin'
  };

  const directPluginSubViews: { value: DirectPluginSubView; label: string; path: string; setNoCst?: boolean }[] = [
    { value: 'recommended', label: 'Recommended', path: '/', setNoCst: false },
    { value: 'unhappyPath', label: 'Unhappy Path', path: '/unhappy-path', setNoCst: false },
    { value: 'noCst', label: 'NO CST', path: '/', setNoCst: true },
  ];

  const profileSubViews: { value: ProfileSubView; label: string; path: string; setNoCst?: boolean }[] = [
    { value: 'default', label: 'Default', path: '/person-profile', setNoCst: false },
    { value: 'noCst', label: 'NO CST', path: '/person-profile', setNoCst: true },
  ];

  const handleEntryPointChange = (type: EntryPoint) => {
    setEntryPoint(type);
    if (type === 'profile') {
      sessionStorage.removeItem('pmm-no-cst');
      navigate('/person-profile');
    } else {
      sessionStorage.removeItem('pmm-no-cst');
      navigate('/');
    }
  };

  const handleSubViewClick = (path: string, setNoCst?: boolean) => {
    if (setNoCst) {
      sessionStorage.setItem('pmm-no-cst', 'true');
      // Reset view count and dismissal when toggling NO CST on (for demo purposes)
      localStorage.removeItem('pmm-cst-upsell-dismissed');
      localStorage.removeItem('pmm-cst-upsell-views');
    } else {
      sessionStorage.removeItem('pmm-no-cst');
      localStorage.removeItem('pmm-cst-upsell-dismissed');
      localStorage.removeItem('pmm-cst-upsell-views');
    }
    // Navigate first
    navigate(path, { replace: true, state: { noCst: setNoCst, timestamp: Date.now() } });
    // Force update by dispatching custom event
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('cst-mode-change', { detail: { noCst: setNoCst } }));
    }, 0);
  };

  // Determine which sub-view is active based on current path and NO CST mode
  const getActiveDirectSubView = (): DirectPluginSubView | null => {
    if (entryPoint !== 'direct') return null;

    if (noCstMode && location.pathname === '/') return 'noCst';
    if (location.pathname === '/unhappy-path') return 'unhappyPath';
    if (location.pathname === '/') return 'recommended';
    return null;
  };

  const getActiveProfileSubView = (): ProfileSubView1 | null => {
    if (entryPoint !== 'profile') return null;

    if (noCstMode && location.pathname === '/person-profile') return 'noCst';
    if (location.pathname === '/person-profile') return 'default';
    return null;
  };

  const activeDirectSubView = getActiveDirectSubView();
  const activeProfileSubView = getActiveProfileSubView();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'var(--spacing-2xl)',
        left: 'var(--spacing-2xl)',
        zIndex: 50,
        backgroundColor: 'var(--demo-bg)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-demo)',
        border: '1px solid var(--demo-border)',
        padding: 'var(--spacing-lg)',
        minWidth: '220px'
      }}
    >
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <p
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--muted-foreground)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: 'var(--font-medium)',
            fontFamily: 'var(--font-family)',
            marginBottom: 'var(--spacing-xs)'
          }}
        >
          Demo Controls
        </p>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--foreground)',
            fontWeight: 'var(--font-medium)',
            fontFamily: 'var(--font-family)',
          }}
        >
          Entry Point
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
        {(['profile', 'direct'] as const).map((type) => (
          <div key={type}>
            <button
              onClick={() => handleEntryPointChange(type)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                textAlign: 'left',
                backgroundColor: entryPoint === type ? 'var(--demo-pressed)' : 'transparent',
                color: 'var(--foreground)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-regular)',
                transition: 'all 0.15s ease',
                width: '100%',
              }}
              onMouseEnter={(e) => {
                if (entryPoint !== type) {
                  e.currentTarget.style.backgroundColor = 'var(--demo-hover) ';
                }
              }}
              onMouseLeave={(e) => {
                if (entryPoint !== type) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <ArrowRight size={14} color="#252525" />
              {entryPointLabels[type]}
            </button>
            
            {/* Show subitems when Direct Plugin is selected */}
            {type === 'direct' && entryPoint === 'direct' && (
              <div style={{ marginLeft: 'var(--spacing-lg)', marginTop: 'var(--spacing-xs)' }}>
                {directPluginSubViews.map((subView) => (
                  <button
                    key={subView.value}
                    onClick={() => handleSubViewClick(subView.path, subView.setNoCst)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: 'var(--spacing-xs) var(--spacing-md)',
                      textAlign: 'left',
                      backgroundColor: activeDirectSubView === subView.value ? 'var(--demo-pressed)' : 'transparent',
                      color: activeDirectSubView === subView.value ? 'var(--foreground)' : 'var(--muted-foreground)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-regular)',
                      transition: 'all 0.15s ease',
                      marginBottom: 'var(--spacing-xs)',
                    }}
                    onMouseEnter={(e) => {
                      if (activeDirectSubView !== subView.value) {
                        e.currentTarget.style.backgroundColor = 'var(--demo-hover)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeDirectSubView !== subView.value) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {subView.label}
                  </button>
                ))}
              </div>
            )}

            {/* Show subitems when Person Profile is selected */}
            {type === 'profile' && entryPoint === 'profile' && (
              <div style={{ marginLeft: 'var(--spacing-lg)', marginTop: 'var(--spacing-xs)' }}>
                {profileSubViews.map((subView) => (
                  <button
                    key={subView.value}
                    onClick={() => handleSubViewClick(subView.path, subView.setNoCst)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: 'var(--spacing-xs) var(--spacing-md)',
                      textAlign: 'left',
                      backgroundColor: activeProfileSubView === subView.value ? 'var(--demo-pressed)' : 'transparent',
                      color: activeProfileSubView === subView.value ? 'var(--foreground)' : 'var(--muted-foreground)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-regular)',
                      transition: 'all 0.15s ease',
                      marginBottom: 'var(--spacing-xs)',
                    }}
                    onMouseEnter={(e) => {
                      if (activeProfileSubView !== subView.value) {
                        e.currentTarget.style.backgroundColor = 'var(--demo-hover) ';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeProfileSubView !== subView.value) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {subView.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}