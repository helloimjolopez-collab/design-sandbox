import { useState } from 'react';
import { Trash2, Info, Plus } from 'lucide-react';
import { OrderStepper } from './OrderStepper';

interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface ApplicantsStepProps {
  orderType: 'background-check' | 'child-safety-training';
  onNext: () => void;
}

export function ApplicantsStep({ orderType, onNext }: ApplicantsStepProps) {
  // Mock applicant - just Roy Keane for single person flows
  const [applicants, setApplicants] = useState<Applicant[]>([
    { id: '1', firstName: 'Roy', lastName: 'Keane', email: 'roy.keane@example.com' },
  ]);

  const [newApplicant, setNewApplicant] = useState<Applicant>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const steps = orderType === 'background-check' 
    ? [
        { number: 1, label: 'Applicants', completed: false, active: true },
        { number: 2, label: 'Searches', completed: false, active: false },
        { number: 3, label: 'Billing & Email', completed: false, active: false },
        { number: 4, label: 'Review Order', completed: false, active: false },
      ]
    : [
        { number: 1, label: 'Applicants', completed: false, active: true },
        { number: 2, label: 'Training', completed: false, active: false },
        { number: 3, label: 'Billing & Email', completed: false, active: false },
        { number: 4, label: 'Review Order', completed: false, active: false },
      ];

  const removeApplicant = (id: string) => {
    setApplicants(applicants.filter(a => a.id !== id));
  };

  const addApplicant = () => {
    if (newApplicant.firstName && newApplicant.lastName && newApplicant.email) {
      setApplicants([...applicants, { ...newApplicant, id: Date.now().toString() }]);
      setNewApplicant({ id: '', firstName: '', lastName: '', email: '' });
    }
  };

  return (
    <div>
      {/* Stepper */}
      <OrderStepper steps={steps} />

      {/* Main Content Card */}
      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-2xl)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        {/* Left Panel - Option 1 Input */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '200px 1fr',
          gap: 'var(--spacing-2xl)',
        }}>
          <div>
            <h3 style={{
              fontSize: 'var(--section-heading)',
              fontWeight: 'var(--font-semibold)',
              fontFamily: 'var(--font-family)',
              color: 'var(--foreground)',
              marginBottom: 'var(--spacing-sm)',
              margin: 0,
            }}>
              Option 1 Input
            </h3>
            <p style={{
              fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-family)',
              color: 'var(--muted-foreground)',
              lineHeight: '1.5',
              margin: 0,
              marginTop: 'var(--spacing-xs)',
            }}>
              Input applicant data on the next page. Each email or external ID required.
            </p>
          </div>

          {/* Applicants Section */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-lg)',
            }}>
              <h3 style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-semibold)',
                fontFamily: 'var(--font-family)',
                color: 'var(--foreground)',
              }}>
                Applicants
              </h3>
              <button
                onClick={addApplicant}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-xs)',
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  backgroundColor: 'var(--muted)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  color: 'var(--foreground)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-medium)',
                }}
              >
                <Plus size={16} />
                Add Applicant
              </button>
            </div>

            {/* Applicants Count */}
            <div style={{
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-family)',
              color: 'var(--foreground)',
              marginBottom: 'var(--spacing-lg)',
              fontWeight: 'var(--font-medium)',
            }}>
              {applicants.length} Applicants
            </div>

            {/* Table */}
            <div style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--muted)' }}>
                    <th style={{
                      padding: 'var(--spacing-md)',
                      textAlign: 'left',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-semibold)',
                      color: 'var(--foreground)',
                    }}>
                      First Name*
                    </th>
                    <th style={{
                      padding: 'var(--spacing-md)',
                      textAlign: 'left',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-semibold)',
                      color: 'var(--foreground)',
                    }}>
                      Last Name*
                    </th>
                    <th style={{
                      padding: 'var(--spacing-md)',
                      textAlign: 'left',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-semibold)',
                      color: 'var(--foreground)',
                    }}>
                      Email**
                    </th>
                    <th style={{ width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((applicant, index) => (
                    <tr key={applicant.id} style={{
                      backgroundColor: 'var(--card)',
                      borderTop: index > 0 ? '1px solid var(--border)' : 'none',
                    }}>
                      <td style={{
                        padding: 'var(--spacing-md)',
                        fontSize: 'var(--text-base)',
                        fontFamily: 'var(--font-family)',
                        color: 'var(--foreground)',
                      }}>
                        {applicant.firstName}
                      </td>
                      <td style={{
                        padding: 'var(--spacing-md)',
                        fontSize: 'var(--text-base)',
                        fontFamily: 'var(--font-family)',
                        color: 'var(--foreground)',
                      }}>
                        {applicant.lastName}
                      </td>
                      <td style={{
                        padding: 'var(--spacing-md)',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'var(--font-family)',
                        color: 'var(--muted-foreground)',
                      }}>
                        {applicant.email}
                      </td>
                      <td style={{ padding: 'var(--spacing-md)' }}>
                        <button
                          onClick={() => removeApplicant(applicant.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Trash2 size={16} color="var(--muted-foreground)" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Info note */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--spacing-sm)',
              marginTop: 'var(--spacing-md)',
              padding: 'var(--spacing-sm)',
            }}>
              <Info size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-family)',
                color: 'var(--muted-foreground)',
                lineHeight: '1.5',
              }}>
                Tip: Press Enter/Return after typing email of applicants to add new row.
              </p>
            </div>

            {/* Next Button */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 'var(--spacing-2xl)',
            }}>
              <button
                onClick={onNext}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: 'var(--button-label)',
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-medium)',
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}