import { QueryClientProvider } from "@tanstack/react-query"
import { MainLayout } from "./app/layout/main-layout"
import { Dashboard } from "./modules/dashboard/dashboard"
import { queryClient } from "./lib/query/query-client"


function App() {
  return (
     <QueryClientProvider client={queryClient}>
    <MainLayout>
      <Dashboard />
    </MainLayout>
    </QueryClientProvider>
  )
}

export default App
