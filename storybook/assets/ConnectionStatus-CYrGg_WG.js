import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{u as n}from"./useNetworkSim-RERlBAN6.js";import{c as a}from"./createLucideIcon-Djn2jL0E.js";/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],i=a("loader-circle",c);/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69",key:"1dl1wf"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523",key:"4k23kn"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643",key:"1grhjp"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764",key:"z3jwby"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],o=a("wifi-off",d);/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r=[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0",key:"1x1e6c"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]],p=a("wifi",r);function h(){const{status:t,latencyMs:s}=n();return e.jsxs("div",{className:"flex items-center gap-2 text-sm",children:[t==="connected"&&e.jsx(p,{className:"w-4 h-4 text-green-500"}),t==="disconnected"&&e.jsx(o,{className:"w-4 h-4 text-red-500"}),t==="syncing"&&e.jsx(i,{className:"w-4 h-4 text-vercel-accent animate-spin"}),e.jsx("span",{className:"text-vercel-muted capitalize hidden sm:inline",children:t}),t==="connected"&&e.jsxs("span",{className:"text-xs text-vercel-muted hidden sm:inline",children:["(",e.jsx("span",{translate:"no",children:s}),"ms)"]})]})}h.__docgenInfo={description:"",methods:[],displayName:"ConnectionStatus"};export{h as C};
