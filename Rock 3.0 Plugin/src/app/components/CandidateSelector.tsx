import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Search, X } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  type: 'person' | 'group';
}

interface CandidateSelectorProps {
  entryPoint: 'profile' | 'direct';
  isStandalone?: boolean;
}

const mockPeople = [
  { id: '1', name: 'Jenny Michaels', email: 'jenny.michaels@email.com' },
  { id: '2', name: 'Marcus Chen', email: 'marcus.chen@email.com' },
  { id: '3', name: 'Sarah Johnson', email: 'sarah.johnson@email.com' },
  { id: '4', name: 'David Lee', email: 'david.lee@email.com' },
];

const mockGroups = [
  { id: 'g1', name: 'Sunday Youth School', memberCount: 24 },
  { id: 'g2', name: 'Volunteer Team', memberCount: 15 },
  { id: 'g3', name: 'Leadership Group', memberCount: 8 },
];

export function CandidateSelector({ entryPoint, isStandalone = false }: CandidateSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [addMode, setAddMode] = useState<'individual' | 'group' | null>(null);
  const [searchValue, setSearchValue] = useState('');
  
  // Initialize candidates based on entry point
  const initialCandidates: Candidate[] = 
    entryPoint === 'profile' 
      ? [{ id: '1', name: 'Jenny Michaels', email: 'jenny.michaels@email.com', type: 'person' }]
      : [];
  
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);

  const handleAddCandidate = (item: { id: string; name: string; email?: string; memberCount?: number }) => {
    const newCandidate: Candidate = {
      id: item.id,
      name: item.name,
      email: item.email || `${item.memberCount} members`,
      type: addMode === 'group' ? 'group' : 'person'
    };
    setCandidates([...candidates, newCandidate]);
    setSearchValue('');
    setAddMode(null);
    setShowAddOptions(false);
  };

  const handleRemoveCandidate = (id: string) => {
    setCandidates(candidates.filter(c => c.id !== id));
  };

  const filteredPeople = mockPeople.filter(p => 
    !candidates.find(c => c.id === p.id) &&
    (p.name.toLowerCase().includes(searchValue.toLowerCase()) || 
     p.email.toLowerCase().includes(searchValue.toLowerCase()))
  );

  const filteredGroups = mockGroups.filter(g => 
    !candidates.find(c => c.id === g.id) &&
    g.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (candidates.length === 0 && !isStandalone) return null;

  return (
    <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
      {isStandalone && (
        <h2 style={{ 
          marginBottom: 'var(--spacing-lg)', 
          fontSize: 'var(--text-lg)', 
          fontWeight: 'var(--font-medium)',
          color: 'var(--foreground)'
        }}>
          Select Candidates
        </h2>
      )}
      
      <div
        style={{
          backgroundColor: 'rgba(246, 244, 243, 0.4)',
          border: '0.5px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden'
        }}
      >
        {/* List Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px var(--spacing-lg)',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-family)',
          }}
        >
          <span style={{ 
            fontSize: 'var(--text-base)', 
            fontWeight: 'var(--font-medium)',
            color: 'var(--foreground)'
          }}>
            Candidates Added <span style={{ color: 'var(--muted-foreground)', fontWeight: 'var(--font-regular)' }}>({candidates.length})</span>
          </span>
          {isExpanded ? <ChevronUp size={16} color="#6B6B6B" /> : <ChevronDown size={16} color="#6B6B6B" />}
        </button>

        {/* List Items */}
        {isExpanded && (
          <div style={{ borderTop: '0.5px solid var(--border)' }}>
            {candidates.map((candidate, index) => (
              <div key={candidate.id}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px var(--spacing-lg)',
                    gap: 'var(--spacing-md)'
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'var(--muted)',
                      borderRadius: '50%',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-medium)',
                      color: 'var(--muted-foreground)',
                      flexShrink: 0,
                    }}
                  >
                    {candidate.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ 
                      fontSize: 'var(--text-base)', 
                      fontWeight: 'var(--font-medium)',
                      color: 'var(--foreground)',
                      marginBottom: '2px'
                    }}>
                      {candidate.name}
                    </p>
                    <p style={{ 
                      fontSize: 'var(--text-sm)', 
                      color: 'var(--muted-foreground)'
                    }}>
                      {candidate.email}
                    </p>
                  </div>
                  {(candidates.length > 1 || isStandalone) && (
                    <button
                      onClick={() => handleRemoveCandidate(candidate.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 'var(--spacing-xs)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--muted-foreground)'
                      }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                {index < candidates.length - 1 && (
                  <div style={{ 
                    height: '0.5px', 
                    backgroundColor: 'var(--border)',
                    marginLeft: 'var(--spacing-lg)',
                    marginRight: 'var(--spacing-lg)'
                  }} />
                )}
              </div>
            ))}
            
            {/* Add More Section */}
            <div style={{ borderTop: '0.5px solid var(--border)', padding: 'var(--spacing-md) var(--spacing-lg)' }}>
              {!addMode && (
                <button
                  onClick={() => setShowAddOptions(!showAddOptions)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    padding: 'var(--spacing-sm)',
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
                  <Plus size={14} />
                  <span>Add more</span>
                </button>
              )}
              
              {showAddOptions && !addMode && (
                <div style={{ 
                  marginTop: 'var(--spacing-sm)', 
                  marginLeft: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-xs)'
                }}>
                  <button
                    onClick={() => {
                      setAddMode('individual');
                      setShowAddOptions(false);
                    }}
                    style={{
                      padding: 'var(--spacing-sm)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--muted-foreground)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'var(--font-family)',
                      textAlign: 'left',
                      fontWeight: 'var(--font-regular)',
                    }}
                  >
                    Add individual applicants
                  </button>
                  <button
                    onClick={() => {
                      setAddMode('group');
                      setShowAddOptions(false);
                    }}
                    style={{
                      padding: 'var(--spacing-sm)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--muted-foreground)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'var(--font-family)',
                      textAlign: 'left',
                      fontWeight: 'var(--font-regular)',
                    }}
                  >
                    Add group of applicants
                  </button>
                </div>
              )}

              {/* Search and Add Interface */}
              {addMode && (
                <div style={{ marginTop: 'var(--spacing-sm)' }}>
                  <div style={{ position: 'relative', marginBottom: 'var(--spacing-sm)' }}>
                    <Search size={16} color="#6B6B6B" style={{ position: 'absolute', left: 'var(--spacing-md)', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder={`Search ${addMode === 'individual' ? 'people' : 'groups'}...`}
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      autoFocus
                      style={{
                        width: '100%',
                        height: '36px',
                        padding: '0 var(--spacing-md) 0 36px',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'var(--font-family)',
                        color: 'var(--foreground)',
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--input-border)',
                        borderRadius: 'var(--radius-sm)',
                        outline: 'none',
                      }}
                    />
                  </div>
                  
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {addMode === 'individual' ? (
                      filteredPeople.map(person => (
                        <button
                          key={person.id}
                          onClick={() => handleAddCandidate(person)}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)',
                            padding: 'var(--spacing-sm)',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            borderRadius: 'var(--radius-sm)',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <div style={{
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'var(--muted)',
                            borderRadius: '50%',
                            fontSize: '11px',
                            fontWeight: 'var(--font-medium)',
                            color: 'var(--muted-foreground)',
                            flexShrink: 0,
                          }}>
                            {person.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'var(--foreground)' }}>
                              {person.name}
                            </p>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                              {person.email}
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      filteredGroups.map(group => (
                        <button
                          key={group.id}
                          onClick={() => handleAddCandidate(group)}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)',
                            padding: 'var(--spacing-sm)',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            borderRadius: 'var(--radius-sm)',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <div>
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'var(--foreground)' }}>
                              {group.name}
                            </p>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                              {group.memberCount} members
                            </p>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                  
                  <button
                    onClick={() => {
                      setAddMode(null);
                      setSearchValue('');
                    }}
                    style={{
                      marginTop: 'var(--spacing-sm)',
                      padding: 'var(--spacing-sm)',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--muted-foreground)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-regular)',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}