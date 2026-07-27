import{r as a}from"./chunk-KS7C4IRE-DVEX7FC-.js";import{j as m}from"./jsx-runtime-D-YXddpN.js";function S(t,e,n){const r=a.useRef(typeof window<"u"&&"BroadcastChannel"in window?new BroadcastChannel(`${t}-channel`):null);return w(r,"message",e),w(r,"messageerror",n),a.useCallback(s=>{var i;(i=r?.current)==null||i.postMessage(s)},[])}function w(t,e,n=()=>{}){a.useEffect(()=>{const r=t.current;if(r)return r.addEventListener(e,n),()=>r.removeEventListener(e,n)},[e,n])}function x(t){const e=document.createElement("style");e.appendChild(document.createTextNode(`* {
       -webkit-transition: none !important;
       -moz-transition: none !important;
       -o-transition: none !important;
       -ms-transition: none !important;
       transition: none !important;
    }`)),document.head.appendChild(e),t(),setTimeout(()=>{window.getComputedStyle(e).transition,document.head.removeChild(e)},100)}function k({disableTransitions:t=!1}={}){return a.useCallback(e=>{t?x(()=>{e()}):e()},[t])}var C=(t=>(t.DARK="dark",t.LIGHT="light",t))(C||{}),A=Object.values(C),g=a.createContext(void 0);g.displayName="ThemeContext";var p="(prefers-color-scheme: light)",T=()=>window.matchMedia(p).matches?"light":"dark",h=typeof window<"u"?window.matchMedia(p):null;function j({children:t,specifiedTheme:e,themeAction:n,disableTransitionOnThemeChange:r=!1}){const s=k({disableTransitions:r}),[i,c]=a.useState(()=>e?A.includes(e)?e:null:typeof window!="object"?null:T()),[l,u]=a.useState(e?"USER":"SYSTEM"),f=S("remix-themes",o=>{s(()=>{console.log("broadcastThemeChange",r),c(o.data.theme),u(o.data.definedBy)})});a.useEffect(()=>{if(l==="USER")return()=>{};const o=d=>{s(()=>{c(d.matches?"light":"dark")})};return h?.addEventListener("change",o),()=>h?.removeEventListener("change",o)},[s,l]);const y=a.useCallback(o=>{const d=typeof o=="function"?o(i):o;if(d===null){const v=T();s(()=>{c(v),u("SYSTEM"),f({theme:v,definedBy:"SYSTEM"})}),fetch(`${n}`,{method:"POST",body:JSON.stringify({theme:null})})}else s(()=>{c(d),u("USER")}),f({theme:d,definedBy:"USER"}),fetch(`${n}`,{method:"POST",body:JSON.stringify({theme:d})})},[f,s,i,n]),E=a.useMemo(()=>[i,y,{definedBy:l}],[i,y,l]);return m.jsx(g.Provider,{value:E,children:t})}var M=String.raw`
(() => {
  const theme = window.matchMedia(${JSON.stringify(p)}).matches
    ? 'light'
    : 'dark';
  
  const cl = document.documentElement.classList;
  const dataAttr = document.documentElement.dataset.theme;

  if (dataAttr != null) {
    const themeAlreadyApplied = dataAttr === 'light' || dataAttr === 'dark';
    if (!themeAlreadyApplied) {
      document.documentElement.dataset.theme = theme;
    }
  } else {
    const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
    if (!themeAlreadyApplied) {
      cl.add(theme);
    }
  }
  
  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  }
})();
`;function P({ssrTheme:t,nonce:e}){const[n]=b();return m.jsxs(m.Fragment,{children:[m.jsx("meta",{name:"color-scheme",content:n==="light"?"light dark":"dark light"}),t?null:m.jsx("script",{dangerouslySetInnerHTML:{__html:M},nonce:e,suppressHydrationWarning:!0})]})}function b(){const t=a.useContext(g);if(t===void 0)throw new Error("useTheme must be used within a ThemeProvider");return t}export{P,j as T,C as a,b as u};
