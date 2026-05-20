import { useState, useRef, useEffect } from 'react';
import { User, ChevronDown, Search } from 'lucide-react';

interface Person {
  id: string;
  name: string;
  role: string;
  address: string;
  email: string;
}

const mockPeople: Person[] = [
  {
    id: '1',
    name: 'Roy Keane',
    role: 'Adult',
    address: 'testing Street\nAlgonac, MI 48001\nIreland',
    email: 'mary.healy+RK@ministrybrands.com',
  },
  {
    id: '2',
    name: 'Jenny Michaels',
    role: 'Adult',
    address: '123 Main Street\nSpringfield, IL 62701\nUSA',
    email: 'jenny.michaels@example.com',
  },
  {
    id: '3',
    name: 'Marcus Chen',
    role: 'Adult',
    address: '456 Oak Avenue\nPortland, OR 97201\nUSA',
    email: 'marcus.chen@example.com',
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    role: 'Adult',
    address: '789 Pine Road\nAustin, TX 78701\nUSA',
    email: 'sarah.johnson@example.com',
  },
];

interface PersonSelectorProps {
  selectedPerson: Person | null;
  onSelectPerson: (person: Person | null) => void;
}

export function PersonSelector({ selectedPerson, onSelectPerson }: PersonSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPeople = mockPeople.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts.map(p => p[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
      <label style={{
        display: 'block',
        fontSize: 'var(--text-base)',
        fontWeight: 'var(--font-medium)',
        color: 'var(--foreground)',
        fontFamily: 'var(--font-family)',
        marginBottom: 'var(--spacing-sm)',
      }}>
        Person <span style={{ color: '#EE7624' }}>*</span>
      </label>
      
      <div style={{ position: 'relative' }} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--input-border')',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontSize: 'var(--text-base)',
            fontFamily: 'var(--font-family)',
            color: selectedPerson ? 'var(--foreground)' : 'var(--muted-foreground)',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <User size={18} color={selectedPerson ? 'var(--foreground)' : 'var(--muted-foreground)'} />
            <span>{selectedPerson ? selectedPerson.name : ''}</span>
          </div>
          <ChevronDown size={18} />
        </button>

        {/* Focus indicator */}
        {isOpen && (
          <div style={{
            position: 'absolute',
            bottom: '-2px',
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: '#EE7624',
            zIndex: 10,
          }} />
        )}

        {/* Dropdown */}
        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border')',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-md)',
            zIndex: 50,
            maxHeight: '400px',
            overflow: 'auto',
          }}>
            {/* Search */}
            <div style={{ 
              padding: 'var(--spacing-md)', 
              borderBottom: '1px solid var(--border)' 
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-sm)',
                backgroundColor: 'var(--background)',
                borderRadius: 'var(--radius-sm)',
              }}>
                <Search size={14} color="var(--muted-foreground)" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e} => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-family)',
                    color: 'var(--foreground)',
                  }}
                />
              </div>
              <div style={{
                marginTop: 'var(--spacing-sm)',
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                fontFamily: 'var(--font-family)',
              }}>
                Name
              </div>
            </div>

            {/* Results */}
            <div>
              {filteredPeople.map((person) => (
                <div
                  key={person.id}
                  onClick={() => {
                    onSelectPerson(person);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                  style={{
                    padding: 'var(--spacing-md)',
                    cursor: 'pointer',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    gap: 'var(--spacing-md)',
                    alignItems: 'flex-start',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--muted)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#D4C5A0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-medium)',
                    color: 'var(--foreground)',
                    flexShrink: 0,
                  }}>
                    {getInitials(person.name)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-medium)',
                      color: 'var(--foreground)',
                      fontFamily: 'var(--font-family)',
                      marginBottom: '2px',
                    }}>
                      {person.name}
                    </div>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-family)',
                      marginBottom: '2px',
                    }}>
                      {person.role}
                    </div>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'var(--font-family)',
                      whiteSpace: 'pre-line',
                    }}>
                      {person.address}
                    </div>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--primary')',
                      fontFamily: 'var(--font-family)',
                      marginTop: '2px',
                    }}>
                      {person.email}
                    </div>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--primary)',
                      fontFamily: 'var(--font-family)',
                      marginTop: '4px',
                      cursor: 'pointer',
                    }}>
                      View Profile
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
