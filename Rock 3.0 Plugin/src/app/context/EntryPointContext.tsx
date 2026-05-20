import { createContext, useContext, useState, ReactNode } from 'react';

type EntryPoint = 'profile' | 'direct';

interface EntryPointContextType {
  entryPoint: EntryPoint;
  setEntryPoint: (entryPoint: EntryPoint) => void;
}

const EntryPointContext = createContext<EntryPointContextType | undefined>(undefined);

export function EntryPointProvider({ children }: { children: ReactNode }) {
  const [entryPoint, setEntryPoint] = useState<EntryPoint>('direct');

  return (
    <EntryPointContext.Provider value={{ entryPoint, setEntryPoint }}>
      {children}
    </EntryPointContext.Provider>
  );
}

export function useEntryPoint() {
  const context = useContext(EntryPointContext);
  if (context === undefined) {
    throw new Error('useEntryPoint must be used within an EntryPointProvider');
  }
  return context;
}
