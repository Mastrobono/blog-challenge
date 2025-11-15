import type { Preview } from '@storybook/nextjs-vite'
import React, { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  decorators: [
    (Story) => {
      // Create a new QueryClient for each story to avoid state sharing
      const queryClient = useMemo(
        () =>
          new QueryClient({
            defaultOptions: {
              queries: {
                retry: false,
                staleTime: 0,
              },
              mutations: {
                retry: false,
              },
            },
          }),
        []
      );

      return React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;