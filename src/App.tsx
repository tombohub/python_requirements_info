import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import Main from "./components/Main";

function App() {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
