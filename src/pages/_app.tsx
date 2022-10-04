import { AppProps } from "next/app";
import "styles/index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { useState } from "react";
export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState as any}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
