import './app-uAhqo_pP.js';
import { i as o } from './index-CBoJQWs5.js';
import { r as i } from './url-CP0Hgou8.js';
const s = (n) => {
  const e =
      'Join Omni Sign, the open signing infrastructure, and get a 10x better signing experience. Sign in now and enjoy a faster, smarter, and more beautiful document signing process.',
    t = n ? (o.locale ? o._(n) : (n.message ?? n.id)) : null;
  return [
    { title: t ? `${t} - Omni Sign` : 'Omni Sign' },
    { name: 'description', content: e },
    {
      name: 'keywords',
      content: 'Omni Sign, electronic signatures, document signing, fast signing, secure signing, smart templates',
    },
    { name: 'author', content: 'Omni Sign' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Omni Sign - Electronic Document Signing' },
    { property: 'og:description', content: e },
    { property: 'og:image', content: i('/opengraph-image.jpg') },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@documenso' },
    { name: 'twitter:description', content: e },
    { name: 'twitter:image', content: i('/opengraph-image.jpg') },
  ];
};
export { s as a };
