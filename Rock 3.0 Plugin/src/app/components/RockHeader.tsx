export function RockHeader() {
  return (
    <header 
      className="px-6 py-4 border-b"
      style={{ 
        backgroundColor: '#E87722',
        borderColor: 'rgba(0,0,0,0.1)'
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 flex items-center justify-center rounded"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <span style={{ color: '#fff' }}>⛰</span>
          </div>
          <h4 style={{ color: '#fff', margin: 0 }}>Rock RMS</h4>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>/</span>
        <span style={{ color: '#fff' }}>Protect My Ministry</span>
      </div>
    </header>
  );
}
