import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { n as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_9x-15Tc5.mjs';
import 'cookie';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/","cacheDir":"file:///C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/node_modules/.astro/","outDir":"file:///C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/dist/","srcDir":"file:///C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/","publicDir":"file:///C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/public/","buildClientDir":"file:///C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/dist/","buildServerDir":"file:///C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"aide/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/aide","isIndex":false,"type":"page","pattern":"^\\/aide\\/?$","segments":[[{"content":"aide","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/aide.astro","pathname":"/aide","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"conditions/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/conditions","isIndex":false,"type":"page","pattern":"^\\/conditions\\/?$","segments":[[{"content":"conditions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/conditions.astro","pathname":"/conditions","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"connexion/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/connexion","isIndex":false,"type":"page","pattern":"^\\/connexion\\/?$","segments":[[{"content":"connexion","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/connexion.astro","pathname":"/connexion","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"escape1/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/escape1","isIndex":false,"type":"page","pattern":"^\\/escape1\\/?$","segments":[[{"content":"escape1","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/escape1.astro","pathname":"/escape1","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"escapegame/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/escapegame","isIndex":false,"type":"page","pattern":"^\\/escapegame\\/?$","segments":[[{"content":"escapegame","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/escapegame.astro","pathname":"/escapegame","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"explorer/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/explorer","isIndex":false,"type":"page","pattern":"^\\/explorer\\/?$","segments":[[{"content":"explorer","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/explorer.astro","pathname":"/explorer","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"modification/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/modification","isIndex":false,"type":"page","pattern":"^\\/modification\\/?$","segments":[[{"content":"modification","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/modification.astro","pathname":"/modification","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"politiquedeconfidentialite/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/politiquedeconfidentialite","isIndex":false,"type":"page","pattern":"^\\/politiquedeconfidentialite\\/?$","segments":[[{"content":"politiquedeconfidentialite","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/politiquedeconfidentialite.astro","pathname":"/politiquedeconfidentialite","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"profil/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/profil","isIndex":false,"type":"page","pattern":"^\\/profil\\/?$","segments":[[{"content":"profil","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/profil.astro","pathname":"/profil","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"propos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/propos","isIndex":false,"type":"page","pattern":"^\\/propos\\/?$","segments":[[{"content":"propos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/propos.astro","pathname":"/propos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"quiz/commencer/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/quiz/commencer","isIndex":false,"type":"page","pattern":"^\\/quiz\\/commencer\\/?$","segments":[[{"content":"quiz","dynamic":false,"spread":false}],[{"content":"commencer","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/quiz/commencer.astro","pathname":"/quiz/commencer","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"quiz/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/quiz","isIndex":false,"type":"page","pattern":"^\\/quiz\\/?$","segments":[[{"content":"quiz","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/quiz.astro","pathname":"/quiz","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"site/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/site","isIndex":false,"type":"page","pattern":"^\\/site\\/?$","segments":[[{"content":"site","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/site.astro","pathname":"/site","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/chat","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/chat\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"chat","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/chat.ts","pathname":"/api/chat","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/connexion.astro",{"propagation":"none","containsHead":true}],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/aide.astro",{"propagation":"none","containsHead":true}],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/conditions.astro",{"propagation":"none","containsHead":true}],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/escape1.astro",{"propagation":"none","containsHead":true}],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/escapegame.astro",{"propagation":"none","containsHead":true}],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/explorer.astro",{"propagation":"none","containsHead":true}],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/modification.astro",{"propagation":"none","containsHead":true}],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/politiquedeconfidentialite.astro",{"propagation":"none","containsHead":true}],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/profil.astro",{"propagation":"none","containsHead":true}],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/propos.astro",{"propagation":"none","containsHead":true}],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/quiz.astro",{"propagation":"none","containsHead":true}],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/quiz/commencer.astro",{"propagation":"none","containsHead":true}],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/site.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/aide@_@astro":"pages/aide.astro.mjs","\u0000@astro-page:src/pages/api/chat@_@ts":"pages/api/chat.astro.mjs","\u0000@astro-page:src/pages/conditions@_@astro":"pages/conditions.astro.mjs","\u0000@astro-page:src/pages/connexion@_@astro":"pages/connexion.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/escape1@_@astro":"pages/escape1.astro.mjs","\u0000@astro-page:src/pages/escapegame@_@astro":"pages/escapegame.astro.mjs","\u0000@astro-page:src/pages/explorer@_@astro":"pages/explorer.astro.mjs","\u0000@astro-page:src/pages/modification@_@astro":"pages/modification.astro.mjs","\u0000@astro-page:src/pages/politiquedeconfidentialite@_@astro":"pages/politiquedeconfidentialite.astro.mjs","\u0000@astro-page:src/pages/profil@_@astro":"pages/profil.astro.mjs","\u0000@astro-page:src/pages/propos@_@astro":"pages/propos.astro.mjs","\u0000@astro-page:src/pages/quiz/commencer@_@astro":"pages/quiz/commencer.astro.mjs","\u0000@astro-page:src/pages/quiz@_@astro":"pages/quiz.astro.mjs","\u0000@astro-page:src/pages/site@_@astro":"pages/site.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_D3qhaFXX.mjs","C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CA3P5RGg.mjs","C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/escape1.astro?astro&type=script&index=0&lang.ts":"_astro/escape1.astro_astro_type_script_index_0_lang.BgcFitQh.js","C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/quiz/commencer.astro?astro&type=script&index=0&lang.ts":"_astro/commencer.astro_astro_type_script_index_0_lang.Dkhk0Fic.js","C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/components/Headersite.astro?astro&type=script&index=0&lang.ts":"_astro/Headersite.astro_astro_type_script_index_0_lang.uPnniwYE.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/escape1.astro?astro&type=script&index=0&lang.ts","var e=document.createElement(\"script\");e.async=!0;e.defer=!0;e.src=\"//dyv6f9ner1ir9.cloudfront.net/assets/js/nloader.js\",e.onload=function(){initIframe(\"68402e696e38e71c0838519f\")},document.querySelector(\"head\").appendChild(e);"],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/pages/quiz/commencer.astro?astro&type=script&index=0&lang.ts","var e=document.createElement(\"script\");e.async=!0;e.defer=!0;e.src=\"//dyv6f9ner1ir9.cloudfront.net/assets/js/nloader.js\",e.onload=function(){initIframe(\"68400fe16e38e71c08369576\")},document.querySelector(\"head\").appendChild(e);"],["C:/Users/adrie/OneDrive/Documents/GitHub/projet-co-s2-2025-19_hacksterix/src/components/Headersite.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"menuToggle\"),t=document.getElementById(\"mobileMenu\");e.addEventListener(\"click\",()=>{t.classList.toggle(\"hidden\")});"]],"assets":["/_astro/HACKSTERIX.BTNiRhTz.svg","/_astro/Facebook.BWap3eIY.svg","/_astro/Instagram.DYcLdz7v.svg","/_astro/Twitter.Cu-vqsSb.svg","/_astro/aide.BNMjNSEO.css","/_astro/aide.BNFLrn7Z.css","/1.webp","/102.webp","/18.webp","/3m.svg","/7.webp","/adrien.webp","/apple.svg","/asterix.svg","/avatar1.webp","/avatar2.webp","/avatar3.webp","/avatar4.webp","/avatar5.webp","/Badge1.svg","/Badge2.svg","/Badge3.svg","/banj.webp","/blob.webp","/blooo.webp","/bobel.png","/chaudron.webp","/communicant.webp","/cube.webp","/design1.webp","/design2.webp","/designer.webp","/detec.webp","/dev.webp","/email.webp","/globe.webp","/graphic.svg","/group27185.webp","/HACKSTERIX.svg","/image-14.webp","/infra.webp","/kpm.svg","/logo.webp","/mercedes.svg","/noah.webp","/oreole.png","/pg.svg","/planete.webp","/police.svg","/sap.svg","/slide.webp","/telus.svg","/annimation/globe.mp4","/lib/pocketbase.mjs","/fonts/SF-Pro-Display-Bold.otf","/fonts/SF-Pro-Display-Regular.otf","/js/carousel.js","/aide/index.html","/conditions/index.html","/connexion/index.html","/contact/index.html","/escape1/index.html","/escapegame/index.html","/explorer/index.html","/modification/index.html","/politiquedeconfidentialite/index.html","/profil/index.html","/propos/index.html","/quiz/commencer/index.html","/quiz/index.html","/site/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"IbHdBT9V2meGiGdubbGfWDVtgd8eiourpYyYcmwuNK8=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Users\\adrie\\OneDrive\\Documents\\GitHub\\projet-co-s2-2025-19_hacksterix\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
