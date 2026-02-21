import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r}from"./index-JhL3uwfD.js";import{u as e}from"./yjsSetup-T-58e8ju.js";import{c}from"./createLucideIcon-BYi1qcPJ.js";/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"m15 14 5-5-5-5",key:"12vg1m"}],["path",{d:"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13",key:"6uklza"}]],i=c("redo-2",l);/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M9 14 4 9l5-5",key:"102s5s"}],["path",{d:"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",key:"f3b9sd"}]],m=c("undo-2",u),p=()=>{const[d,s]=r.useState(!1),[a,n]=r.useState(!1);return r.useEffect(()=>{const o=()=>{s(e.undoStack.length>0),n(e.redoStack.length>0)};return o(),e.on("stack-item-added",o),e.on("stack-item-popped",o),()=>{e.off("stack-item-added",o),e.off("stack-item-popped",o)}},[]),{canUndo:d,canRedo:a,undo:()=>{d&&e.undo()},redo:()=>{a&&e.redo()}}};function h(){const{canUndo:d,canRedo:s,undo:a,redo:n}=p();return t.jsxs("div",{className:"flex items-center gap-1",children:[t.jsx("button",{onClick:a,disabled:!d,"aria-label":"Undo",className:"p-1.5 rounded-md text-vercel-muted hover:text-vercel-text hover:bg-vercel-gray-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors",children:t.jsx(m,{className:"w-4 h-4"})}),t.jsx("button",{onClick:n,disabled:!s,"aria-label":"Redo",className:"p-1.5 rounded-md text-vercel-muted hover:text-vercel-text hover:bg-vercel-gray-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors",children:t.jsx(i,{className:"w-4 h-4"})})]})}h.__docgenInfo={description:"",methods:[],displayName:"UndoRedo"};export{h as U};
