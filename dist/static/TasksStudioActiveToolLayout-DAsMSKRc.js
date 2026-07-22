import"./rolldown-runtime-CNC7AqOf.js";import{t as e}from"./jsx-runtime-DiK4U9sA.js";import{t}from"./react-9ZasmZpi.js";import{t as n}from"./compiler-runtime-Bc4rjXEQ.js";import{Ct as r,F as i,H as a,Ot as o,R as s,gt as c,kt as l}from"./dist-8eCeUlHs.js";import{Ao as u,Fo as d,Ho as f,Ro as p,Uo as m,Vo as h,bu as g,eo as _,jo as v,pn as y,ps as b,to as x,ts as S,ws as C,zo as w}from"./index2-BiypL9Bl.js";import"./react-B8bFi7jP.js";var T=e(),E=n();t(),g(),m(),f(),d(),S(),h(),w(),p(),C(),b(),v(),u();var D=1,O=3,k=l(s).withConfig({displayName:`RootFlex`,componentId:`sc-1y8zfkj-0`})(({theme:e})=>o`
    min-height: 100%;

    @media (max-width: ${e.sanity.media[O]}px) {
      position: relative;
    }
  `),A=l(a).withConfig({displayName:`SidebarMotionLayer`,componentId:`sc-1y8zfkj-1`})(({theme:e})=>{let t=e.sanity.media;return o`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 360px;
    border-left: 1px solid var(--card-border-color);
    box-sizing: border-box;
    overflow: hidden;

    box-shadow:
      0px 6px 8px -4px var(--card-shadow-umbra-color),
      0px 12px 17px -1px var(--card-shadow-penumbra-color);

    @media (max-width: ${t[O]}px) {
      bottom: 0;
      position: absolute;
      right: 0;
      top: 0;
    }

    @media (max-width: ${t[D]}px) {
      border-left: 0;
      min-width: 100%;
      left: 0;
    }
  `});function j(e){let t=(0,E.c)(12),n=c(),{state:a}=x(),{isOpen:o}=a,s=n<=D&&o?`hidden`:`auto`,l;t[0]===e?l=t[1]:(l=e.renderDefault(e),t[0]=e,t[1]=l);let u;t[2]!==s||t[3]!==l?(u=(0,T.jsx)(i,{flex:1,height:`fill`,overflow:s,children:l}),t[2]=s,t[3]=l,t[4]=u):u=t[4];let d;t[5]===o?d=t[6]:(d=o&&(0,T.jsx)(A,{zOffset:100,height:`fill`,children:(0,T.jsx)(y,{})}),t[5]=o,t[6]=d);let f;t[7]===d?f=t[8]:(f=(0,T.jsx)(r,{initial:!1,children:d}),t[7]=d,t[8]=f);let p;return t[9]!==u||t[10]!==f?(p=(0,T.jsxs)(k,{sizing:`border`,height:`fill`,children:[u,f]}),t[9]=u,t[10]=f,t[11]=p):p=t[11],p}function M(e){let t=(0,E.c)(4),{enabled:n}=_();if(!n){let n;return t[0]===e?n=t[1]:(n=e.renderDefault(e),t[0]=e,t[1]=n),n}let r;return t[2]===e?r=t[3]:(r=(0,T.jsx)(j,{...e}),t[2]=e,t[3]=r),r}export{M as TasksStudioActiveToolLayout};