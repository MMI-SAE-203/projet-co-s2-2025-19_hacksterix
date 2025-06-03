import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_tszsDBim.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/chat.astro.mjs');
const _page2 = () => import('./pages/conditions.astro.mjs');
const _page3 = () => import('./pages/connexion.astro.mjs');
const _page4 = () => import('./pages/explorer.astro.mjs');
const _page5 = () => import('./pages/politiquedeconfidentialite.astro.mjs');
const _page6 = () => import('./pages/profil.astro.mjs');
const _page7 = () => import('./pages/propos.astro.mjs');
const _page8 = () => import('./pages/quiz/commencer.astro.mjs');
const _page9 = () => import('./pages/quiz.astro.mjs');
const _page10 = () => import('./pages/site.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/chat.ts", _page1],
    ["src/pages/conditions.astro", _page2],
    ["src/pages/connexion.astro", _page3],
    ["src/pages/explorer.astro", _page4],
    ["src/pages/politiquedeconfidentialite.astro", _page5],
    ["src/pages/profil.astro", _page6],
    ["src/pages/propos.astro", _page7],
    ["src/pages/quiz/commencer.astro", _page8],
    ["src/pages/quiz.astro", _page9],
    ["src/pages/site.astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "524145da-8e49-4157-b63e-472ac3fca455"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
