import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import Layout from './Layout';

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./pages/**/*.jsx', { eager: true });
    const page = pages[`./pages/${name}.jsx`];

    if (!page) {
      throw new Error(`Page not found: ${name}`);
    }

    page.default.layout =
      page.default.layout || ((pageContent) => <Layout>{pageContent}</Layout>);

    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});