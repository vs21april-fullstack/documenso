import { r as s } from './url-CP0Hgou8.js';
const v = (e) => {
    const { envelopeItem: t, token: n, presignToken: o } = e,
      { id: r, envelopeId: l } = t;
    {
      const a = e.version;
      return n
        ? s(`api/files/token/${n}/envelopeItem/${r}/download/${a}${o ? `?presignToken=${o}` : ''}`)
        : s(`api/files/envelope/${l}/envelopeItem/${r}/download/${a}`);
    }
  },
  d = (e) => {
    const { envelopeId: t, envelopeItemId: n, documentDataId: o, token: r, presignToken: l, version: a } = e,
      p = `envelope/${t}/envelopeItem/${n}/dataId/${o}/${a}/item.pdf`;
    if (r) {
      return s(`api/files/token/${r}/${p}`);
    }
    const i = s(`api/files/${p}`);
    return l ? `${i}?presignToken=${l}` : i;
  },
  I = (e) => {
    const { envelopeId: t, envelopeItemId: n, documentDataId: o } = e;
    return !t || !n || !o ? null : d(e);
  };
export { d as b, I as a, v as g };
