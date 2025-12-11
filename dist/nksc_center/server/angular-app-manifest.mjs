
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "route": "/about"
  },
  {
    "renderMode": 2,
    "route": "/publications"
  },
  {
    "renderMode": 2,
    "route": "/elibrary"
  },
  {
    "renderMode": 2,
    "route": "/gallery"
  },
  {
    "renderMode": 2,
    "route": "/news"
  },
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 15251, hash: '8d271d17e0737b58bf8439436bc86a1476ff759a7c924d1c7a5effc3f74390fd', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1977, hash: '4fb67f73717c0a23beaef026f1bb1df5140a75c11e8f854cb51976e4ead3a6a7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'about/index.html': {size: 61526, hash: '3e20405e1087638c12304aca73e6d142c13a9c226420254ec7750edd13826f91', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'news/index.html': {size: 76128, hash: '9f6020b5a7cf242440469e66c3fe660d8b082ca28fa3ce80c557b0ad3ea5a693', text: () => import('./assets-chunks/news_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 57760, hash: '04117f7a576587724698920a4d1348bfacc4b7048d3eb3569f6ebb54b375b60b', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'gallery/index.html': {size: 81476, hash: 'be1bd395fae45a2d1221a0cc48c2ca47647b86e73aa0f6e32742a52e739dbbf7', text: () => import('./assets-chunks/gallery_index_html.mjs').then(m => m.default)},
    'elibrary/index.html': {size: 78798, hash: '633ad9f489ef9300db0591957d9cd5265cf61b8a0af20c0dac356717e6596ede', text: () => import('./assets-chunks/elibrary_index_html.mjs').then(m => m.default)},
    'publications/index.html': {size: 56647, hash: 'ddbbfc56f3a5fef97574caa394d4f8497b2af55aa5bb00b5b3db6a5e19e68cbb', text: () => import('./assets-chunks/publications_index_html.mjs').then(m => m.default)},
    'styles-OXXFGXGM.css': {size: 67338, hash: 'RpQEiVFOgZ8', text: () => import('./assets-chunks/styles-OXXFGXGM_css.mjs').then(m => m.default)}
  },
};
