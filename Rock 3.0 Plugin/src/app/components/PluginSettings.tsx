import { useState } from 'react';
import { ChevronDown, ChevronUp, Webhook, RefreshCw, ExternalLink } from 'lucide-react';

const webhookUrls = [
  'https://rock.church/api/pmm/webhook',
  'https://backup.rock.church/api/pmm/webhook',
];

export function PluginSettings() {
  const [isWebhooksOpen, setIsWebhooksOpen] = useState(false);

  return (
    <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
      <h2 style={{ 
        marginBottom: 'var(--spacing-xl)', 
        fontSize: 'var(--section-heading)', 
        fontWeight: 'var(--font-medium)',
        color: '#4A4A4A',
        fontFamily: 'var(--font-family)',
      }}>
        Plugin Settings
      </h2>

      <div
        style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-xl)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          {/* Webhooks Settings */}
          <div style={{ flex: 1 }}>
            <button
              onClick={() => setIsWebhooksOpen(!isWebhooksOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-sm) 0',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--foreground)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-medium)',
                fontFamily: 'var(--font-family)',
                lineHeight: '20px',
                marginBottom: isWebhooksOpen ? 'var(--spacing-md)' : 0
              }}
            >
              <Webhook size={16} />
              <span>Advanced Settings</span>
              {isWebhooksOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isWebhooksOpen && (
              <div style={{ paddingLeft: '24px', marginTop: 'var(--spacing-md)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                {/* Subscribed Webhooks */}
                <div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    marginBottom: 'var(--spacing-md)' 
                  }}>
                    <p style={{ 
                      fontSize: 'var(--text-base)', 
                      fontWeight: 'var(--font-medium)',
                      color: 'var(--foreground)'
                    }}>
                      Subscribed Webhooks
                    </p>
                    <button
                      style={{
                        padding: 'var(--spacing-sm) var(--spacing-md)',
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border')',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        color: 'var(--foreground)',
                        fontSize: 'var(--text-base)',
                        fontFamily: 'var(--font-family)',
                        fontWeight: 'var(--font-medium)',
                        lineHeight: '20px',
                      }}
                    >
                      Edit
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    {webhookUrls.map((url, index) => (
                      <div
                        key={index}
                        style={{
                          padding: 'var(--spacing-md)',
                          backgroundColor: 'var(--muted)',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        <p style={{ 
                          fontSize: 'var(--text-sm)', 
                          fontFamily: 'monospace', 
                          color: 'var(--foreground)' 
                        }}>
                          {url}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* API Secret */}
                <div>
                  <p style={{ 
                    fontSize: 'var(--text-base)', 
                    fontWeight: 'var(--font-medium)',
                    color: 'var(--foreground)',
                    marginBottom: 'var(--spacing-md)'
                  }}>
                    API Secret
                  </p>
                  <div
                    style={{
                      padding: 'var(--spacing-md)',
                      backgroundColor: 'var(--muted)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    <p style={{ 
                      fontSize: 'var(--text-sm)', 
                      fontFamily: 'var(--font-family)',
                      color: 'var(--foreground)' 
                    }}>
                      Configured
                    </p>
                  </div>
                </div>

                {/* Update Group */}
                <div>
                  <p style={{ 
                    fontSize: 'var(--text-base)', 
                    fontWeight: 'var(--font-medium)',
                    color: 'var(--foreground)',
                    marginBottom: 'var(--spacing-md)'
                  }}>
                    Update Group
                  </p>
                  <div
                    style={{
                      padding: 'var(--spacing-md)',
                      backgroundColor: 'var(--muted)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    <p style={{ 
                      fontSize: 'var(--text-sm)', 
                      fontFamily: 'var(--font-family)',
                      color: 'var(--foreground)' 
                    }}>
                      Completed Background Checks Notified Group
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginLeft: 'var(--spacing-lg)', flexShrink: 0 }}>
            {/* Go to Protect My Ministry Button */}
            <button
              onClick={() => window.open('https://www.protectmyministry.com/', '_blank')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-sm) var(--spacing-lg)',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                color: 'var(--foreground)',
                fontSize: 'var(--text-base)',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-medium)',
                lineHeight: '20px',
              }}
            >
              <span>Go to Protect My Ministry</span>
              <ExternalLink size={16} />
            </button>

            {/* Sync Plugin Button */}
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-sm) var(--spacing-lg)',
                backgroundColor: 'var(--muted)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                color: 'var(--foreground)',
                fontSize: 'var(--text-base)',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-medium)',
                lineHeight: '20px',
              }}
            >
              <RefreshCw size={16} />
              <span>Sync Plugin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}