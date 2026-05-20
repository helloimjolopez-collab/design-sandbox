import { RouterProvider } from 'react-router';
import { router } from './routes';
import { EntryPointProvider } from './context/EntryPointContext';

export default function App() {
  return (
    <EntryPointProvider>
      <RouterProvider router={router} />
    </EntryPointProvider>
  );
}