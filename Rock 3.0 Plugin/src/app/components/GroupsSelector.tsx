import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface Group {
  id: string;
  name: string;
}

const mockGroups: Group[] = [
  { id: '1', name: 'Adult Member & Attendees' },
  { id: '2', name: 'Marys Data View' },
  { id: '3', name: 'Youth Volunteers' },
  { id: '4', name: 'Children\'s Ministry Team' },
  { id: '5', name: 'Worship Team Members' },
  { id: '6', name: 'Small Group Leaders' },
];

interface GroupsSelectorProps {
  selectedGroups: Group[];
  onSelectGroups: (groups: Group[]) => void;
}

export function GroupsSelector({ selectedGroups, onSelectGroups }: GroupsSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const availableGroups = mockGroups.filter(
    (group) => !selectedGroups.some((selected) => selected.id === group.id)
  );

  const filteredGroups = availableGroups.filter((group) =>
    group.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelectGroup = (group: Group) => {
    onSelectGroups([...selectedGroups, group]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleRemoveGroup = (groupId: string) => {
    onSelectGroups(selectedGroups.filter((g) => g.id !== groupId));
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
        Groups <span style={{ color: '#EE7624' }}>*</span>
      </label>
      
      <div style={{ position: 'relative' }} ref={containerRef}>
        {/* Input field */}
        <div
          onClick={() => {
            setIsOpen(true);
            inputRef.current?.focus();
          }}
          style={{
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--spacing-sm)',
            padding: 'var(--spacing-sm)',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--input-border)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'text',
          }}
        >
          {/* Selected groups as chips */}
          {selectedGroups.map((group) => (
            <div
              key={group.id}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                padding: '4px var(--spacing-sm)',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-family)',
                color: 'var(--foreground)',
              }}
            >
              <span>{group.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveGroup(group.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--muted-foreground)',
                }}
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedGroups.length === 0 ? 'Select groups...' : ''}
            style={{
              flex: 1,
              minWidth: '120px',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-family)',
              color: 'var(--foreground)',
              padding: 'var(--spacing-xs)',
            }}
          />
        </div>

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
        {isOpen && filteredGroups.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-md)',
            zIndex: 50,
            maxHeight: '300px',
            overflow: 'auto',
          }}>
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                onClick={() => handleSelectGroup(group)}
                style={{
                  padding: 'var(--spacing-md)',
                  cursor: 'pointer',
                  fontSize: 'var(--text-base)',
                  fontFamily: 'var(--font-family)',
                  color: 'var(--foreground)',
                  borderBottom: '1px solid var(--border)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--muted)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {group.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
