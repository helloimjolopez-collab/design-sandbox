import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface Order {
  name: string;
  requested: string;
  completed: string;
  package: string;
  status: 'Pending' | 'Invited' | 'Opened' | 'Failed' | 'Incomplete' | 'Complete' | '-';
  recommendation: string;
  hasReport?: boolean;
  training: string;
  trainingStatus: string;
  hasCertificate?: boolean;
}

const orders: Order[] = [
  // BG check complete with report available
  { name: 'Jones, Julie', requested: '16/03/2026', completed: '18/03/2026', package: 'Essential', status: 'Complete', recommendation: 'Approved', hasReport: true, training: '-', trainingStatus: '-', hasCertificate: false },
  
  // Training only - complete with certificate
  { name: 'Martinez, Carlos', requested: '15/03/2026', completed: '17/03/2026', package: '-', status: '-', recommendation: '-', hasReport: false, training: 'Volunteer', trainingStatus: 'Complete', hasCertificate: true },
  
  // Both BG check and training - BG complete with report, training pending
  { name: 'Slippers, Fuzzy', requested: '16/03/2026', completed: '18/03/2026', package: 'Essential + MVR', status: 'Complete', recommendation: 'Conditional', hasReport: true, training: 'Employee', trainingStatus: 'Pending', hasCertificate: false },
  
  // Training only - in progress, no certificate yet
  { name: 'Williams, Sarah', requested: '14/03/2026', completed: '-', package: '-', status: '-', recommendation: '-', hasReport: false, training: 'Volunteer', trainingStatus: 'In Progress', hasCertificate: false },
  
  // Both BG check and training - training complete with certificate, BG pending
  { name: 'Test, 16_3_2026', requested: '16/03/2026', completed: '-', package: 'Essential', status: 'Pending', recommendation: '-', hasReport: false, training: 'Employee', trainingStatus: 'Complete', hasCertificate: true },
  
  // Both complete with report AND certificate
  { name: 'Keane, Roy', requested: '10/03/2026', completed: '12/03/2026', package: 'Essential', status: 'Complete', recommendation: 'Approved', hasReport: true, training: 'Volunteer', trainingStatus: 'Complete', hasCertificate: true },
  
  // BG check failed with report
  { name: 'Thompson, Mark', requested: '12/03/2026', completed: '14/03/2026', package: 'Statewide criminal search only', status: 'Failed', recommendation: 'Not Approved', hasReport: true, training: '-', trainingStatus: '-', hasCertificate: false },
  
  // Training only - complete with certificate
  { name: 'Brown, Lisa', requested: '11/03/2026', completed: '13/03/2026', package: '-', status: '-', recommendation: '-', hasReport: false, training: 'Employee', trainingStatus: 'Complete', hasCertificate: true },
  
  // BG check opened (in review)
  { name: 'Willis, Jessie', requested: '10/03/2026', completed: '-', package: 'MVR Only', status: 'Opened', recommendation: '-', hasReport: false, training: '-', trainingStatus: '-', hasCertificate: false },
  
  // BG check invited, no training
  { name: 'Snow, Michael', requested: '09/03/2026', completed: '-', package: 'Essential', status: 'Invited', recommendation: '-', hasReport: false, training: '-', trainingStatus: '-', hasCertificate: false },
];

export function RecentOrdersTable() {
  return (
    <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
      <h2 style={{ 
        marginBottom: 'var(--spacing-xl)', 
        fontSize: 'var(--section-heading)', 
        fontWeight: 'var(--font-medium)',
        color: '#4A4A4A',
        fontFamily: 'var(--font-family)',
      }}>
        Recent Requests
      </h2>
      <div
        style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th
                  style={{
                    padding: 'var(--spacing-lg)',
                    textAlign: 'left',
                    color: 'var(--muted-foreground)',
                    fontWeight: 'var(--font-medium)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-family)',
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: 'var(--spacing-lg)',
                    textAlign: 'left',
                    color: 'var(--muted-foreground)',
                    fontWeight: 'var(--font-medium)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-family)',
                  }}
                >
                  Requested
                </th>
                <th
                  style={{
                    padding: 'var(--spacing-lg)',
                    textAlign: 'left',
                    color: 'var(--muted-foreground)',
                    fontWeight: 'var(--font-medium)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-family)',
                  }}
                >
                  Completed
                </th>
                <th
                  style={{
                    padding: 'var(--spacing-lg)',
                    textAlign: 'left',
                    color: 'var(--muted-foreground)',
                    fontWeight: 'var(--font-medium)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-family)',
                  }}
                >
                  Background Check Package
                </th>
                <th
                  style={{
                    padding: 'var(--spacing-lg)',
                    textAlign: 'left',
                    color: 'var(--muted-foreground)',
                    fontWeight: 'var(--font-medium)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-family)',
                  }}
                >
                  Background Check Status
                </th>
                <th
                  style={{
                    padding: 'var(--spacing-lg)',
                    textAlign: 'left',
                    color: 'var(--muted-foreground)',
                    fontWeight: 'var(--font-medium)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-family)',
                  }}
                >
                  BG Check Recommendation
                </th>
                <th
                  style={{
                    padding: 'var(--spacing-lg)',
                    textAlign: 'left',
                    color: 'var(--muted-foreground)',
                    fontWeight: 'var(--font-medium)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-family)',
                  }}
                >
                  BG Check Report
                </th>
                <th
                  style={{
                    padding: 'var(--spacing-lg)',
                    textAlign: 'left',
                    color: 'var(--muted-foreground)',
                    fontWeight: 'var(--font-medium)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-family)',
                  }}
                >
                  Training
                </th>
                <th
                  style={{
                    padding: 'var(--spacing-lg)',
                    textAlign: 'left',
                    color: 'var(--muted-foreground)',
                    fontWeight: 'var(--font-medium)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-family)',
                  }}
                >
                  Training Status
                </th>
                <th
                  style={{
                    padding: 'var(--spacing-lg)',
                    textAlign: 'left',
                    color: 'var(--muted-foreground)',
                    fontWeight: 'var(--font-medium)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-family)',
                  }}
                >
                  Training Certificate
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: index < orders.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <td style={{ 
                    padding: 'var(--spacing-lg)', 
                    fontSize: 'var(--text-base)', 
                    fontFamily: 'var(--font-family)',
                    color: 'var(--foreground)'
                  }}>
                    {order.name}
                  </td>
                  <td style={{ 
                    padding: 'var(--spacing-lg)', 
                    fontSize: 'var(--text-base)', 
                    fontFamily: 'var(--font-family)',
                    color: 'var(--foreground)'
                  }}>
                    {order.requested}
                  </td>
                  <td style={{ 
                    padding: 'var(--spacing-lg)', 
                    fontSize: 'var(--text-base)', 
                    fontFamily: 'var(--font-family)',
                    color: 'var(--foreground)'
                  }}>
                    {order.completed}
                  </td>
                  <td style={{ 
                    padding: 'var(--spacing-lg)', 
                    fontSize: 'var(--text-base)', 
                    fontFamily: 'var(--font-family)',
                    color: 'var(--foreground)'
                  }}>
                    {order.package}
                  </td>
                  <td style={{ padding: 'var(--spacing-lg)' }}>
                    {order.status === '-' ? (
                      <span style={{ 
                        color: 'var(--muted-foreground)', 
                        fontSize: 'var(--text-base)', 
                        fontFamily: 'var(--font-family)' 
                      }}>
                        -
                      </span>
                    ) : (
                      <Badge>{order.status}</Badge>
                    )}
                  </td>
                  <td style={{ 
                    padding: 'var(--spacing-lg)', 
                    color: 'var(--muted-foreground)', 
                    fontSize: 'var(--text-base)', 
                    fontFamily: 'var(--font-family)' 
                  }}>
                    {order.recommendation}
                  </td>
                  <td style={{ 
                    padding: 'var(--spacing-lg)', 
                    color: 'var(--muted-foreground)', 
                    fontSize: 'var(--text-base)', 
                    fontFamily: 'var(--font-family)' 
                  }}>
                    {order.hasReport ? (
                      <FileText 
                        size={18} 
                        style={{ color: '#4A90E2', cursor: 'pointer' }} 
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td style={{ 
                    padding: 'var(--spacing-lg)', 
                    fontSize: 'var(--text-base)', 
                    fontFamily: 'var(--font-family)',
                    color: 'var(--foreground)'
                  }}>
                    {order.training}
                  </td>
                  <td style={{ padding: 'var(--spacing-lg)' }}>
                    {order.trainingStatus === '-' ? (
                      <span style={{ 
                        color: 'var(--muted-foreground)', 
                        fontSize: 'var(--text-base)', 
                        fontFamily: 'var(--font-family)' 
                      }}>
                        -
                      </span>
                    ) : (
                      <Badge>{order.trainingStatus}</Badge>
                    )}
                  </td>
                  <td style={{ 
                    padding: 'var(--spacing-lg)', 
                    color: 'var(--muted-foreground)', 
                    fontSize: 'var(--text-base)', 
                    fontFamily: 'var(--font-family)' 
                  }}>
                    {order.hasCertificate ? (
                      <FileText 
                        size={18} 
                        style={{ color: '#4A90E2', cursor: 'pointer' }} 
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          style={{
            padding: 'var(--spacing-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border)',
          }}
        >
          <p style={{ 
            color: 'var(--muted-foreground)', 
            fontSize: 'var(--text-sm)', 
            fontFamily: 'var(--font-family)' 
          }}>
            Showing 1-8 of 127
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <Button variant="outline" size="sm">
              <ChevronLeft size={14} />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}