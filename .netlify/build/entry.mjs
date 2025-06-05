import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_D3qhaFXX.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/aide.astro.mjs');
const _page2 = () => import('./pages/api/chat.astro.mjs');
const _page3 = () => import('./pages/conditions.astro.mjs');
const _page4 = () => import('./pages/connexion.astro.mjs');
const _page5 = () => import('./pages/contact.astro.mjs');
const _page6 = () => import('./pages/escape1.astro.mjs');
const _page7 = () => import('./pages/escapegame.astro.mjs');
const _page8 = () => import('./pages/explorer.astro.mjs');
const _page9 = () => import('./pages/modification.astro.mjs');
const _page10 = () => import('./pages/politiquedeconfidentialite.astro.mjs');
const _page11 = () => import('./pages/profil.astro.mjs');
const _page12 = () => import('./pages/propos.astro.mjs');
const _page13 = () => import('./pages/quiz/commencer.astro.mjs');
const _page14 = () => import('./pages/quiz.astro.mjs');
const _page15 = () => import('./pages/site.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/aide.astro", _page1],
    ["src/pages/api/chat.ts", _page2],
    ["src/pages/conditions.astro", _page3],
    ["src/pages/connexion.astro", _page4],
    ["src/pages/contact.astro", _page5],
    ["src/pages/escape1.astro", _page6],
    ["src/pages/escapegame.astro", _page7],
    ["src/pages/explorer.astro", _page8],
    ["src/pages/modification.astro", _page9],
    ["src/pages/politiquedeconfidentialite.astro", _page10],
    ["src/pages/profil.astro", _page11],
    ["src/pages/propos.astro", _page12],
    ["src/pages/quiz/commencer.astro", _page13],
    ["src/pages/quiz.astro", _page14],
    ["src/pages/site.astro", _page15],
    ["src/pages/index.astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "f50dc6d1-97a3-425a-b628-6736a850bdf8"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
