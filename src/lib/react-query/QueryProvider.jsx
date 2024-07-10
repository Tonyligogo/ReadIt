import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()
// eslint-disable-next-line react/prop-types
function QueryProvider({children}) {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default QueryProvider