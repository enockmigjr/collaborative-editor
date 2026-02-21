import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./index-JhL3uwfD.js";import{a as n}from"./yjsSetup-T-58e8ju.js";import{U as x}from"./UserCard-f7NLRywl.js";import"./useLogsStore-CUpiJmqv.js";import"./react-C6W-rNNW.js";import"./createLucideIcon-BYi1qcPJ.js";function m(){const[t,p]=l.useState([]);return l.useEffect(()=>{const r=()=>{const a=Array.from(n.getStates().values()).map(s=>s.user).filter(Boolean);p(s=>s.length!==a.length?a:s.every((u,f)=>u.id===a[f].id)?s:a)};return r(),n.on("update",r),()=>n.off("update",r)},[]),e.jsxs("aside",{className:"w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-vercel-border bg-vercel-black flex-col shrink-0 flex h-full",children:[e.jsx("div",{className:"px-4 py-3 border-b border-vercel-border shrink-0",children:e.jsxs("h2",{className:"text-xs font-semibold text-vercel-muted uppercase tracking-wider",children:["Utilisateurs Actifs (",e.jsx("span",{translate:"no",children:t.length}),")"]})}),e.jsx("div",{className:"flex-1 overflow-y-auto p-2 scrollbar-thin",children:e.jsx("div",{className:"flex flex-col gap-1",children:t.map(r=>e.jsx(x,{user:r},r.id))})})]})}m.__docgenInfo={description:"",methods:[],displayName:"LeftPanel"};const w={title:"Components/LeftPanel",component:m,parameters:{layout:"fullscreen"}},h={id:"1",name:"John Doe",color:"#D946EF",avatar:"https://avatars.githubusercontent.com/u/1?v=4",isLocal:!0},o={args:{currentUser:h},decorators:[t=>e.jsx("div",{style:{height:"500px",display:"flex"},children:e.jsx(t,{})})]};var c,i,d;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    currentUser: mockUser
  },
  decorators: [Story => <div style={{
    height: '500px',
    display: 'flex'
  }}>\r
        <Story />\r
      </div>]
}`,...(d=(i=o.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};const E=["Default"];export{o as Default,E as __namedExportsOrder,w as default};
