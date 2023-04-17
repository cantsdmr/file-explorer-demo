import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import './App.css';
import FileExplorer from './components/FileExplorer';

function App() {
  const [path, setPath] = useState('/')

  return (
    <div>
      <header className="App-header">
        <Stack direction={'row'} gap={4} alignSelf={'flex-start'}>
          <p>File Explorer</p>
          <p>{path}</p>
        </Stack>
      </header>
      <section>
        <Box >
          <FileExplorer
            className="File-explorer"
            path={path}
            onPathChange={(_path: string) => setPath(_path)} />
        </Box>
      </section>
    </div>
  );
}

export default App;
