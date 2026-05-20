export default function SafetyTrainingAdd() {
  const handleUnlockClick = () => {
    window.open('https://www.protectmyministry.com/child-safety-training/', '_blank');
  };

  return (
    <div style={{
      backgroundColor: '#FDFAF9',
      borderRadius: '8px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-medium)',
          fontSize: '14px',
          color: '#141414',
          lineHeight: '16px',
        }}>
          <div>Leave No Gaps:</div>
          <div>Add Safety Training to your Screenings</div>
        </div>
        <p style={{
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-regular)',
          fontSize: '14px',
          color: '#757575',
          lineHeight: '16px',
          margin: 0,
        }}>
          Easily include training with your invites and protect your community at the highest level.
        </p>
      </div>
      <button
        onClick={handleUnlockClick}
        style={{
          backgroundColor: 'transparent',
          border: '1px solid #E0E0E0',
          borderRadius: '4px',
          padding: '2px 8px',
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-regular)',
          fontSize: '14px',
          color: '#1F1F1F',
          cursor: 'pointer',
          lineHeight: '20px',
        }}
      >
        Unlock Child Safety Training
      </button>
    </div>
  );
}