(this["webpackJsonp@minimal/minimal-kit-react"]=this["webpackJsonp@minimal/minimal-kit-react"]||[]).push([[1],{1341:function(e,t,n){"use strict";n.d(t,"a",(function(){return X}));var r=n(1),o=n.n(r),i=n(10),a=n.n(i),c=n(5),u=new Map([["avi","video/avi"],["gif","image/gif"],["ico","image/x-icon"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["mkv","video/x-matroska"],["mov","video/quicktime"],["mp4","video/mp4"],["pdf","application/pdf"],["png","image/png"],["zip","application/zip"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]]);function l(e,t){var n=function(e){var t=e.name;if(t&&-1!==t.lastIndexOf(".")&&!e.type){var n=t.split(".").pop().toLowerCase(),r=u.get(n);r&&Object.defineProperty(e,"type",{value:r,writable:!1,configurable:!1,enumerable:!0})}return e}(e);if("string"!==typeof n.path){var r=e.webkitRelativePath;Object.defineProperty(n,"path",{value:"string"===typeof t?t:"string"===typeof r&&r.length>0?r:e.name,writable:!1,configurable:!1,enumerable:!0})}return n}var s=[".DS_Store","Thumbs.db"];function f(e){return(null!==e.target&&e.target.files?g(e.target.files):[]).map((function(e){return l(e)}))}function p(e,t){return Object(c.b)(this,void 0,void 0,(function(){var n;return Object(c.d)(this,(function(r){switch(r.label){case 0:return e.items?(n=g(e.items).filter((function(e){return"file"===e.kind})),"drop"!==t?[2,n]:[4,Promise.all(n.map(v))]):[3,2];case 1:return[2,d(b(r.sent()))];case 2:return[2,d(g(e.files).map((function(e){return l(e)})))]}}))}))}function d(e){return e.filter((function(e){return-1===s.indexOf(e.name)}))}function g(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];t.push(r)}return t}function v(e){if("function"!==typeof e.webkitGetAsEntry)return m(e);var t=e.webkitGetAsEntry();return t&&t.isDirectory?h(t):m(e)}function b(e){return e.reduce((function(e,t){return Object(c.g)(e,Array.isArray(t)?b(t):[t])}),[])}function m(e){var t=e.getAsFile();if(!t)return Promise.reject(e+" is not a File");var n=l(t);return Promise.resolve(n)}function y(e){return Object(c.b)(this,void 0,void 0,(function(){return Object(c.d)(this,(function(t){return[2,e.isDirectory?h(e):O(e)]}))}))}function h(e){var t=e.createReader();return new Promise((function(e,n){var r=[];!function o(){var i=this;t.readEntries((function(t){return Object(c.b)(i,void 0,void 0,(function(){var i,a,u;return Object(c.d)(this,(function(c){switch(c.label){case 0:if(t.length)return[3,5];c.label=1;case 1:return c.trys.push([1,3,,4]),[4,Promise.all(r)];case 2:return i=c.sent(),e(i),[3,4];case 3:return a=c.sent(),n(a),[3,4];case 4:return[3,6];case 5:u=Promise.all(t.map(y)),r.push(u),o(),c.label=6;case 6:return[2]}}))}))}),(function(e){n(e)}))}()}))}function O(e){return Object(c.b)(this,void 0,void 0,(function(){return Object(c.d)(this,(function(t){return[2,new Promise((function(t,n){e.file((function(n){var r=l(n,e.fullPath);t(r)}),(function(e){n(e)}))}))]}))}))}var D=n(1904),j=n.n(D);function w(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(u){o=!0,i=u}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return F(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return F(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var A=function(e){e=Array.isArray(e)&&1===e.length?e[0]:e;var t=Array.isArray(e)?"one of ".concat(e.join(", ")):e;return{code:"file-invalid-type",message:"File type must be ".concat(t)}},k=function(e){return{code:"file-too-large",message:"File is larger than ".concat(e," bytes")}},E=function(e){return{code:"file-too-small",message:"File is smaller than ".concat(e," bytes")}},S={code:"too-many-files",message:"Too many files"};function C(e,t){var n="application/x-moz-file"===e.type||j()(e,t);return[n,n?null:A(t)]}function P(e,t,n){if(x(e.size))if(x(t)&&x(n)){if(e.size>n)return[!1,k(n)];if(e.size<t)return[!1,E(t)]}else{if(x(t)&&e.size<t)return[!1,E(t)];if(x(n)&&e.size>n)return[!1,k(n)]}return[!0,null]}function x(e){return void 0!==e&&null!==e}function z(e){var t=e.files,n=e.accept,r=e.minSize,o=e.maxSize,i=e.multiple,a=e.maxFiles;return!(!i&&t.length>1||i&&a>=1&&t.length>a)&&t.every((function(e){var t=w(C(e,n),1)[0],i=w(P(e,r,o),1)[0];return t&&i}))}function R(e){return"function"===typeof e.isPropagationStopped?e.isPropagationStopped():"undefined"!==typeof e.cancelBubble&&e.cancelBubble}function T(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,(function(e){return"Files"===e||"application/x-moz-file"===e})):!!e.target&&!!e.target.files}function I(e){e.preventDefault()}function L(e){return-1!==e.indexOf("MSIE")||-1!==e.indexOf("Trident/")}function K(e){return-1!==e.indexOf("Edge/")}function B(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.navigator.userAgent;return L(e)||K(e)}function M(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.some((function(t){return!R(e)&&t&&t.apply(void 0,[e].concat(r)),R(e)}))}}function $(e){return function(e){if(Array.isArray(e))return G(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||q(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(u){o=!0,i=u}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n}(e,t)||q(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function q(e,t){if(e){if("string"===typeof e)return G(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?G(e,t):void 0}}function G(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function J(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?J(Object(n),!0).forEach((function(t){U(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):J(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function U(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function W(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var H=Object(r.forwardRef)((function(e,t){var n=e.children,i=X(W(e,["children"])),a=i.open,c=W(i,["open"]);return Object(r.useImperativeHandle)(t,(function(){return{open:a}}),[a]),o.a.createElement(r.Fragment,null,n(N(N({},c),{},{open:a})))}));H.displayName="Dropzone";var Q={disabled:!1,getFilesFromEvent:function(e){return Object(c.b)(this,void 0,void 0,(function(){return Object(c.d)(this,(function(t){return[2,(n=e,n.dataTransfer&&e.dataTransfer?p(e.dataTransfer,e.type):f(e))];var n}))}))},maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null};H.defaultProps=Q,H.propTypes={children:a.a.func,accept:a.a.oneOfType([a.a.string,a.a.arrayOf(a.a.string)]),multiple:a.a.bool,preventDropOnDocument:a.a.bool,noClick:a.a.bool,noKeyboard:a.a.bool,noDrag:a.a.bool,noDragEventsBubbling:a.a.bool,minSize:a.a.number,maxSize:a.a.number,maxFiles:a.a.number,disabled:a.a.bool,getFilesFromEvent:a.a.func,onFileDialogCancel:a.a.func,onDragEnter:a.a.func,onDragLeave:a.a.func,onDragOver:a.a.func,onDrop:a.a.func,onDropAccepted:a.a.func,onDropRejected:a.a.func,validator:a.a.func};var V={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,draggedFiles:[],acceptedFiles:[],fileRejections:[]};function X(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=N(N({},Q),e),n=t.accept,o=t.disabled,i=t.getFilesFromEvent,a=t.maxSize,c=t.minSize,u=t.multiple,l=t.maxFiles,s=t.onDragEnter,f=t.onDragLeave,p=t.onDragOver,d=t.onDrop,g=t.onDropAccepted,v=t.onDropRejected,b=t.onFileDialogCancel,m=t.preventDropOnDocument,y=t.noClick,h=t.noKeyboard,O=t.noDrag,D=t.noDragEventsBubbling,j=t.validator,w=Object(r.useRef)(null),F=Object(r.useRef)(null),A=Object(r.useReducer)(Y,V),k=_(A,2),E=k[0],x=k[1],L=E.isFocused,K=E.isFileDialogActive,q=E.draggedFiles,G=Object(r.useCallback)((function(){F.current&&(x({type:"openDialog"}),F.current.value=null,F.current.click())}),[x]),J=function(){K&&setTimeout((function(){F.current&&(F.current.files.length||(x({type:"closeDialog"}),"function"===typeof b&&b()))}),300)};Object(r.useEffect)((function(){return window.addEventListener("focus",J,!1),function(){window.removeEventListener("focus",J,!1)}}),[F,K,b]);var H=Object(r.useCallback)((function(e){w.current&&w.current.isEqualNode(e.target)&&(32!==e.keyCode&&13!==e.keyCode||(e.preventDefault(),G()))}),[w,F]),X=Object(r.useCallback)((function(){x({type:"focus"})}),[]),Z=Object(r.useCallback)((function(){x({type:"blur"})}),[]),ee=Object(r.useCallback)((function(){y||(B()?setTimeout(G,0):G())}),[F,y]),te=Object(r.useRef)([]),ne=function(e){w.current&&w.current.contains(e.target)||(e.preventDefault(),te.current=[])};Object(r.useEffect)((function(){return m&&(document.addEventListener("dragover",I,!1),document.addEventListener("drop",ne,!1)),function(){m&&(document.removeEventListener("dragover",I),document.removeEventListener("drop",ne))}}),[w,m]);var re=Object(r.useCallback)((function(e){e.preventDefault(),e.persist(),se(e),te.current=[].concat($(te.current),[e.target]),T(e)&&Promise.resolve(i(e)).then((function(t){R(e)&&!D||(x({draggedFiles:t,isDragActive:!0,type:"setDraggedFiles"}),s&&s(e))}))}),[i,s,D]),oe=Object(r.useCallback)((function(e){e.preventDefault(),e.persist(),se(e);var t=T(e);if(t&&e.dataTransfer)try{e.dataTransfer.dropEffect="copy"}catch(n){}return t&&p&&p(e),!1}),[p,D]),ie=Object(r.useCallback)((function(e){e.preventDefault(),e.persist(),se(e);var t=te.current.filter((function(e){return w.current&&w.current.contains(e)})),n=t.indexOf(e.target);-1!==n&&t.splice(n,1),te.current=t,t.length>0||(x({isDragActive:!1,type:"setDraggedFiles",draggedFiles:[]}),T(e)&&f&&f(e))}),[w,f,D]),ae=Object(r.useCallback)((function(e){e.preventDefault(),e.persist(),se(e),te.current=[],T(e)&&Promise.resolve(i(e)).then((function(t){if(!R(e)||D){var r=[],o=[];t.forEach((function(e){var t=_(C(e,n),2),i=t[0],u=t[1],l=_(P(e,c,a),2),s=l[0],f=l[1],p=j?j(e):null;if(i&&s&&!p)r.push(e);else{var d=[u,f];p&&(d=d.concat(p)),o.push({file:e,errors:d.filter((function(e){return e}))})}})),(!u&&r.length>1||u&&l>=1&&r.length>l)&&(r.forEach((function(e){o.push({file:e,errors:[S]})})),r.splice(0)),x({acceptedFiles:r,fileRejections:o,type:"setFiles"}),d&&d(r,o,e),o.length>0&&v&&v(o,e),r.length>0&&g&&g(r,e)}})),x({type:"reset"})}),[u,n,c,a,l,i,d,g,v,D,j]),ce=function(e){return o?null:e},ue=function(e){return h?null:ce(e)},le=function(e){return O?null:ce(e)},se=function(e){D&&e.stopPropagation()},fe=Object(r.useMemo)((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.refKey,n=void 0===t?"ref":t,r=e.onKeyDown,i=e.onFocus,a=e.onBlur,c=e.onClick,u=e.onDragEnter,l=e.onDragOver,s=e.onDragLeave,f=e.onDrop,p=W(e,["refKey","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"]);return N(N(U({onKeyDown:ue(M(r,H)),onFocus:ue(M(i,X)),onBlur:ue(M(a,Z)),onClick:ce(M(c,ee)),onDragEnter:le(M(u,re)),onDragOver:le(M(l,oe)),onDragLeave:le(M(s,ie)),onDrop:le(M(f,ae))},n,w),o||h?{}:{tabIndex:0}),p)}}),[w,H,X,Z,ee,re,oe,ie,ae,h,O,o]),pe=Object(r.useCallback)((function(e){e.stopPropagation()}),[]),de=Object(r.useMemo)((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.refKey,r=void 0===t?"ref":t,o=e.onChange,i=e.onClick,a=W(e,["refKey","onChange","onClick"]),c=U({accept:n,multiple:u,type:"file",style:{display:"none"},onChange:ce(M(o,ae)),onClick:ce(M(i,pe)),autoComplete:"off",tabIndex:-1},r,F);return N(N({},c),a)}}),[F,n,u,ae,o]),ge=q.length,ve=ge>0&&z({files:q,accept:n,minSize:c,maxSize:a,multiple:u,maxFiles:l}),be=ge>0&&!ve;return N(N({},E),{},{isDragAccept:ve,isDragReject:be,isFocused:L&&!o,getRootProps:fe,getInputProps:de,rootRef:w,inputRef:F,open:ce(G)})}function Y(e,t){switch(t.type){case"focus":return N(N({},e),{},{isFocused:!0});case"blur":return N(N({},e),{},{isFocused:!1});case"openDialog":return N(N({},e),{},{isFileDialogActive:!0});case"closeDialog":return N(N({},e),{},{isFileDialogActive:!1});case"setDraggedFiles":var n=t.isDragActive,r=t.draggedFiles;return N(N({},e),{},{draggedFiles:r,isDragActive:n});case"setFiles":return N(N({},e),{},{acceptedFiles:t.acceptedFiles,fileRejections:t.fileRejections});case"reset":return N({},V);default:return e}}},1904:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(e&&t){var n=Array.isArray(t)?t:t.split(","),r=e.name||"",o=(e.type||"").toLowerCase(),i=o.replace(/\/.*$/,"");return n.some((function(e){var t=e.trim().toLowerCase();return"."===t.charAt(0)?r.toLowerCase().endsWith(t):t.endsWith("/*")?i===t.replace(/\/.*$/,""):o===t}))}return!0}}}]);
//# sourceMappingURL=1.867b5a6e.chunk.js.map