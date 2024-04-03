import type { HtmlTagDescriptor, Plugin } from 'vite';

export function prefetch(): Plugin {
  return {
    name: 'prefetch',

    enforce: 'post',
    apply: 'build',

    transformIndexHtml: (html, ctx) => {
      const base = '/macos-web/'; // Add your base path here
      const tags = Object.keys(ctx.bundle).map(
        (chunkName) =>
          ({
            injectTo: 'head',
            tag: 'link',
            attrs: {
              rel: 'prefetch',
              // href: `/${chunkName}`,
              href: `${base}${chunkName}`, // Add the base path to the href
            },
          } as HtmlTagDescriptor),
      );

      return {
        html,
        tags,
      };
    },
  };
}
