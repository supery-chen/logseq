import{s as h}from"./vendor.838c88d3.js";const y=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}};y();const w="logseq-plugin-image-uploader",q="0.0.7",b="dist/index.html",j={dev:"vite",build:"tsc && vite build"},k={"@logseq/libs":"^0.0.1-alpha.33",react:"^17.0.2","react-dom":"^17.0.2",semver:"^7.3.5"},v={"@types/react":"^17.0.33","@types/react-dom":"^17.0.10","@types/semver":"^7.3.9","@vitejs/plugin-react":"1.1.3",typescript:"4.5.4",vite:"2.7.10"},E={id:"_jjaychen-logseq-image-uploader",title:"Image Uploader",icon:"./icon.png"};var I={name:w,version:q,main:b,scripts:j,dependencies:k,devDependencies:v,logseq:E};const U=I.version;async function P(){await fetch("https://api.github.com/repos/jjaychen1e/logseq-plugin-image-uploader/releases/latest").then(t=>t.json()).then(t=>{const e=t.tag_name.replace("v","");h.gt(e,U)&&logseq.App.showMsg(`New version ${e} is available(logseq-plugin-image-uploader).`,"warning")})}const g="Uploaded image file record(created by logseq-plugin-image-uploader)",u="Uploaded image file record - interactive(created by logseq-plugin-image-uploader)";async function c(t){const e=await logseq.Editor.getPageBlocksTree(t.name);return e.length===0?null:e[e.length-1]}async function d(t,e){t.content?await logseq.Editor.insertBlock(t.uuid,e):await logseq.Editor.updateBlock(t.uuid,e)}async function B(){await logseq.Editor.deletePage(g),await logseq.Editor.deletePage(u)}async function p(t){let e=await logseq.Editor.createPage(t,{},{createFirstBlock:!0,redirect:!1});if(e){let i=await c(e);i&&(d(i,"Here I've listed all the not uploaded images."),d(i,`#+BEGIN_QUERY
{:title "Not uploaded images"
  :query [:find (pull ?b [*])
        :where
        [?b :block/page ?p]
        [?p :block/name ?page_name]
        (not [(clojure.string/includes? ?page_name "created by logseq-plugin-image-uploader")])
        [?b :block/content ?content]
        (not [(clojure.string/includes? ?content "{:title \\"Not uploaded images\\"")])
        [(clojure.string/includes? ?content "](../assets")]
        [(clojure.string/includes? ?content "![")]
        (or [(clojure.string/includes? ?content ".png)")]
            [(clojure.string/includes? ?content ".jpg)")]
            [(clojure.string/includes? ?content ".jpeg)")]
            [(clojure.string/includes? ?content ".gif)")]
            [(clojure.string/includes? ?content ".tiff)")]
            [(clojure.string/includes? ?content ".tif)")]
            [(clojure.string/includes? ?content ".bmp)")]
            [(clojure.string/includes? ?content ".svg)")]
            [(clojure.string/includes? ?content ".webp)")]
            [(clojure.string/includes? ?content ".PNG)")]
            [(clojure.string/includes? ?content ".JPG)")]
            [(clojure.string/includes? ?content ".JPEG)")]
            [(clojure.string/includes? ?content ".GIF)")]
            [(clojure.string/includes? ?content ".TIGG)")]
            [(clojure.string/includes? ?content ".TIF)")]
            [(clojure.string/includes? ?content ".VMP)")]
            [(clojure.string/includes? ?content ".SVG)")]
            [(clojure.string/includes? ?content ".WEBP)")])
      ]}
#+END_QUERY`))}return e}async function f(t){let e=await logseq.Editor.getPage(t);return e?await c(e)||(await B(),e=await p(t)):e=await p(t),e}async function R(t){let e=await f(g),i=await f(u);if(e&&i){let n=await c(e),o=await c(i);if(n&&o)d(n,t),d(o,`![Uploaded by Image Uploder](${t})`);else{const r=`Failed to save uploaded image name: ${t}.`;console.error("Error:",r),logseq.App.showMsg(r,"error")}}else{const n="Failed to create uploaded image record page.";console.error("Error:",n),logseq.App.showMsg(n,"error")}}async function F(t){return await fetch("http://localhost:36677/upload",{method:"POST",body:JSON.stringify({list:[t]})}).then(e=>e.json()).then(e=>{if(e.success)return e.result[0];throw new Error("Upload failed.")}).catch(e=>{console.error("Error:",e),logseq.App.showMsg("Please check if PicGo is running. And this plugin can only be run in manually loaded mode due to CORS restriction, please download it from GitHub release page.","error")})}const L=[".png",".jpg",".jpeg",".gif",".tiff",".tif",".bmp",".svg",".webp"];async function m(t,e){let i=t.content,n;for(;n=/\!\[.*?\]\((.*?)\)/g.exec(i);){i=i.replace(n[0],"");const o=n[1];if(n[0].startsWith("![Replaced by Image Uploder]")||!L.some(l=>o.toLowerCase().endsWith(l)))continue;let r=logseq.settings?.uploadNetworkImage??!1;if(o.startsWith("../")||r){const l=o.startsWith("../")?e+n[1].replace("../","/"):n[1],s=await F(l);if(s!=""&&s!=null&&s!=null){const a=await logseq.Editor.getBlock(t.uuid);a&&a.content&&(await logseq.Editor.updateBlock(a.uuid,a.content.replace(n[0],`![Replaced by Image Uploder](${s})`)),await R(n[1]))}}}}async function G(){setTimeout(()=>{P()},5e3);const e=(await logseq.App.getCurrentGraph())?.path;if(e)logseq.Editor.registerBlockContextMenuItem("Upload image",async i=>{const n=await logseq.Editor.getBlock(i.uuid);n&&n.content&&m(n,e)}),parent.document.addEventListener("keydown",async i=>{if(!!(logseq.settings?.autoUploading??!0)&&(i.ctrlKey||i.metaKey)&&i.code==="KeyV"){let o=await logseq.Editor.getCurrentBlock();if(o){let r=o.uuid,l=function(){setTimeout(async()=>{let s=await logseq.Editor.checkEditing();if(typeof s=="string"&&s===r)l();else{let a=await logseq.Editor.getBlock(r);a&&a.content&&m(a,e)}},1e3)};l()}}});else{const i="Failed to get graph root path.";console.error("Error:",i),logseq.App.showMsg(i,"error");return}}logseq.ready(G).catch(console.error);
