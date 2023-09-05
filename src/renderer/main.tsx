import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@renderer/App';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
