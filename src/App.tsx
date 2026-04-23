import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'
import { MainLayout } from './app/layout/main-layout'
import { DashboardPage } from './modules/dashboard/dashboard'

import { queryClient } from './lib/query/query-client'
import { ToolsPage } from './modules/tools/tools'


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tools" element={<ToolsPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
