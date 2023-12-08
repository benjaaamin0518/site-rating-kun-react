(function(){"use strict";var D=function(e,t){return D=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,n){r.__proto__=n}||function(r,n){for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(r[i]=n[i])},D(e,t)};function K(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");D(e,t);function r(){this.constructor=e}e.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)}function Te(e,t,r,n){function i(o){return o instanceof r?o:new r(function(u){u(o)})}return new(r||(r=Promise))(function(o,u){function c(h){try{s(n.next(h))}catch(g){u(g)}}function a(h){try{s(n.throw(h))}catch(g){u(g)}}function s(h){h.done?o(h.value):i(h.value).then(c,a)}s((n=n.apply(e,t||[])).next())})}function te(e,t){var r={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},n,i,o,u;return u={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(u[Symbol.iterator]=function(){return this}),u;function c(s){return function(h){return a([s,h])}}function a(s){if(n)throw new TypeError("Generator is already executing.");for(;u&&(u=0,s[0]&&(r=0)),r;)try{if(n=1,i&&(o=s[0]&2?i.return:s[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,s[1])).done)return o;switch(i=0,o&&(s=[s[0]&2,o.value]),s[0]){case 0:case 1:o=s;break;case 4:return r.label++,{value:s[1],done:!1};case 5:r.label++,i=s[1],s=[0];continue;case 7:s=r.ops.pop(),r.trys.pop();continue;default:if(o=r.trys,!(o=o.length>0&&o[o.length-1])&&(s[0]===6||s[0]===2)){r=0;continue}if(s[0]===3&&(!o||s[1]>o[0]&&s[1]<o[3])){r.label=s[1];break}if(s[0]===6&&r.label<o[1]){r.label=o[1],o=s;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(s);break}o[2]&&r.ops.pop(),r.trys.pop();continue}s=t.call(e,r)}catch(h){s=[6,h],i=0}finally{n=o=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}}function j(e){var t=typeof Symbol=="function"&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function _(e,t){var r=typeof Symbol=="function"&&e[Symbol.iterator];if(!r)return e;var n=r.call(e),i,o=[],u;try{for(;(t===void 0||t-- >0)&&!(i=n.next()).done;)o.push(i.value)}catch(c){u={error:c}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(u)throw u.error}}return o}function k(e,t,r){if(r||arguments.length===2)for(var n=0,i=t.length,o;n<i;n++)(o||!(n in t))&&(o||(o=Array.prototype.slice.call(t,0,n)),o[n]=t[n]);return e.concat(o||Array.prototype.slice.call(t))}function I(e){return this instanceof I?(this.v=e,this):new I(e)}function je(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=r.apply(e,t||[]),i,o=[];return i={},u("next"),u("throw"),u("return"),i[Symbol.asyncIterator]=function(){return this},i;function u(y){n[y]&&(i[y]=function(w){return new Promise(function(d,l){o.push([y,w,d,l])>1||c(y,w)})})}function c(y,w){try{a(n[y](w))}catch(d){g(o[0][3],d)}}function a(y){y.value instanceof I?Promise.resolve(y.value.v).then(s,h):g(o[0][2],y)}function s(y){c("next",y)}function h(y){c("throw",y)}function g(y,w){y(w),o.shift(),o.length&&c(o[0][0],o[0][1])}}function _e(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],r;return t?t.call(e):(e=typeof j=="function"?j(e):e[Symbol.iterator](),r={},n("next"),n("throw"),n("return"),r[Symbol.asyncIterator]=function(){return this},r);function n(o){r[o]=e[o]&&function(u){return new Promise(function(c,a){u=e[o](u),i(c,a,u.done,u.value)})}}function i(o,u,c,a){Promise.resolve(a).then(function(s){o({value:s,done:c})},u)}}typeof SuppressedError=="function"&&SuppressedError;function b(e){return typeof e=="function"}function ke(e){var t=function(n){Error.call(n),n.stack=new Error().stack},r=e(t);return r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r}var V=ke(function(e){return function(r){e(this),this.message=r?r.length+` errors occurred during unsubscription:
`+r.map(function(n,i){return i+1+") "+n.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=r}});function re(e,t){if(e){var r=e.indexOf(t);0<=r&&e.splice(r,1)}}var Y=function(){function e(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}return e.prototype.unsubscribe=function(){var t,r,n,i,o;if(!this.closed){this.closed=!0;var u=this._parentage;if(u)if(this._parentage=null,Array.isArray(u))try{for(var c=j(u),a=c.next();!a.done;a=c.next()){var s=a.value;s.remove(this)}}catch(l){t={error:l}}finally{try{a&&!a.done&&(r=c.return)&&r.call(c)}finally{if(t)throw t.error}}else u.remove(this);var h=this.initialTeardown;if(b(h))try{h()}catch(l){o=l instanceof V?l.errors:[l]}var g=this._finalizers;if(g){this._finalizers=null;try{for(var y=j(g),w=y.next();!w.done;w=y.next()){var d=w.value;try{oe(d)}catch(l){o=o??[],l instanceof V?o=k(k([],_(o)),_(l.errors)):o.push(l)}}}catch(l){n={error:l}}finally{try{w&&!w.done&&(i=y.return)&&i.call(y)}finally{if(n)throw n.error}}}if(o)throw new V(o)}},e.prototype.add=function(t){var r;if(t&&t!==this)if(this.closed)oe(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(r=this._finalizers)!==null&&r!==void 0?r:[]).push(t)}},e.prototype._hasParent=function(t){var r=this._parentage;return r===t||Array.isArray(r)&&r.includes(t)},e.prototype._addParent=function(t){var r=this._parentage;this._parentage=Array.isArray(r)?(r.push(t),r):r?[r,t]:t},e.prototype._removeParent=function(t){var r=this._parentage;r===t?this._parentage=null:Array.isArray(r)&&re(r,t)},e.prototype.remove=function(t){var r=this._finalizers;r&&re(r,t),t instanceof e&&t._removeParent(this)},e.EMPTY=function(){var t=new e;return t.closed=!0,t}(),e}();Y.EMPTY;function ne(e){return e instanceof Y||e&&"closed"in e&&b(e.remove)&&b(e.add)&&b(e.unsubscribe)}function oe(e){b(e)?e():e.unsubscribe()}var ie={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},W={setTimeout:function(e,t){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];var i=W.delegate;return i!=null&&i.setTimeout?i.setTimeout.apply(i,k([e,t],_(r))):setTimeout.apply(void 0,k([e,t],_(r)))},clearTimeout:function(e){var t=W.delegate;return((t==null?void 0:t.clearTimeout)||clearTimeout)(e)},delegate:void 0};function ue(e){W.setTimeout(function(){throw e})}function ce(){}function Le(e){e()}var B=function(e){K(t,e);function t(r){var n=e.call(this)||this;return n.isStopped=!1,r?(n.destination=r,ne(r)&&r.add(n)):n.destination=$e,n}return t.create=function(r,n,i){return new Q(r,n,i)},t.prototype.next=function(r){this.isStopped||this._next(r)},t.prototype.error=function(r){this.isStopped||(this.isStopped=!0,this._error(r))},t.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(r){this.destination.next(r)},t.prototype._error=function(r){try{this.destination.error(r)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t}(Y),Ce=Function.prototype.bind;function J(e,t){return Ce.call(e,t)}var Me=function(){function e(t){this.partialObserver=t}return e.prototype.next=function(t){var r=this.partialObserver;if(r.next)try{r.next(t)}catch(n){R(n)}},e.prototype.error=function(t){var r=this.partialObserver;if(r.error)try{r.error(t)}catch(n){R(n)}else R(t)},e.prototype.complete=function(){var t=this.partialObserver;if(t.complete)try{t.complete()}catch(r){R(r)}},e}(),Q=function(e){K(t,e);function t(r,n,i){var o=e.call(this)||this,u;if(b(r)||!r)u={next:r??void 0,error:n??void 0,complete:i??void 0};else{var c;o&&ie.useDeprecatedNextContext?(c=Object.create(r),c.unsubscribe=function(){return o.unsubscribe()},u={next:r.next&&J(r.next,c),error:r.error&&J(r.error,c),complete:r.complete&&J(r.complete,c)}):u=r}return o.destination=new Me(u),o}return t}(B);function R(e){ue(e)}function Ue(e){throw e}var $e={closed:!0,next:ce,error:Ue,complete:ce},X=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}();function se(e){return e}function Re(e){return e.length===0?se:e.length===1?e[0]:function(r){return e.reduce(function(n,i){return i(n)},r)}}var E=function(){function e(t){t&&(this._subscribe=t)}return e.prototype.lift=function(t){var r=new e;return r.source=this,r.operator=t,r},e.prototype.subscribe=function(t,r,n){var i=this,o=qe(t)?t:new Q(t,r,n);return Le(function(){var u=i,c=u.operator,a=u.source;o.add(c?c.call(o,a):a?i._subscribe(o):i._trySubscribe(o))}),o},e.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(r){t.error(r)}},e.prototype.forEach=function(t,r){var n=this;return r=ae(r),new r(function(i,o){var u=new Q({next:function(c){try{t(c)}catch(a){o(a),u.unsubscribe()}},error:o,complete:i});n.subscribe(u)})},e.prototype._subscribe=function(t){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(t)},e.prototype[X]=function(){return this},e.prototype.pipe=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return Re(t)(this)},e.prototype.toPromise=function(t){var r=this;return t=ae(t),new t(function(n,i){var o;r.subscribe(function(u){return o=u},function(u){return i(u)},function(){return n(o)})})},e.create=function(t){return new e(t)},e}();function ae(e){var t;return(t=e??ie.Promise)!==null&&t!==void 0?t:Promise}function Fe(e){return e&&b(e.next)&&b(e.error)&&b(e.complete)}function qe(e){return e&&e instanceof B||Fe(e)&&ne(e)}function Ge(e){return b(e==null?void 0:e.lift)}function L(e){return function(t){if(Ge(t))return t.lift(function(r){try{return e(r,this)}catch(n){this.error(n)}});throw new TypeError("Unable to lift unknown Observable type")}}function C(e,t,r,n,i){return new De(e,t,r,n,i)}var De=function(e){K(t,e);function t(r,n,i,o,u,c){var a=e.call(this,r)||this;return a.onFinalize=u,a.shouldUnsubscribe=c,a._next=n?function(s){try{n(s)}catch(h){r.error(h)}}:e.prototype._next,a._error=o?function(s){try{o(s)}catch(h){r.error(h)}finally{this.unsubscribe()}}:e.prototype._error,a._complete=i?function(){try{i()}catch(s){r.error(s)}finally{this.unsubscribe()}}:e.prototype._complete,a}return t.prototype.unsubscribe=function(){var r;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var n=this.closed;e.prototype.unsubscribe.call(this),!n&&((r=this.onFinalize)===null||r===void 0||r.call(this))}},t}(B);function Ke(e){return e&&b(e.schedule)}function Ve(e){return e[e.length-1]}function Ye(e){return Ke(Ve(e))?e.pop():void 0}var fe=function(e){return e&&typeof e.length=="number"&&typeof e!="function"};function le(e){return b(e==null?void 0:e.then)}function he(e){return b(e[X])}function ye(e){return Symbol.asyncIterator&&b(e==null?void 0:e[Symbol.asyncIterator])}function de(e){return new TypeError("You provided "+(e!==null&&typeof e=="object"?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function We(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var pe=We();function ve(e){return b(e==null?void 0:e[pe])}function me(e){return je(this,arguments,function(){var r,n,i,o;return te(this,function(u){switch(u.label){case 0:r=e.getReader(),u.label=1;case 1:u.trys.push([1,,9,10]),u.label=2;case 2:return[4,I(r.read())];case 3:return n=u.sent(),i=n.value,o=n.done,o?[4,I(void 0)]:[3,5];case 4:return[2,u.sent()];case 5:return[4,I(i)];case 6:return[4,u.sent()];case 7:return u.sent(),[3,2];case 8:return[3,10];case 9:return r.releaseLock(),[7];case 10:return[2]}})})}function be(e){return b(e==null?void 0:e.getReader)}function M(e){if(e instanceof E)return e;if(e!=null){if(he(e))return Be(e);if(fe(e))return Je(e);if(le(e))return Qe(e);if(ye(e))return ge(e);if(ve(e))return Xe(e);if(be(e))return Ze(e)}throw de(e)}function Be(e){return new E(function(t){var r=e[X]();if(b(r.subscribe))return r.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Je(e){return new E(function(t){for(var r=0;r<e.length&&!t.closed;r++)t.next(e[r]);t.complete()})}function Qe(e){return new E(function(t){e.then(function(r){t.closed||(t.next(r),t.complete())},function(r){return t.error(r)}).then(null,ue)})}function Xe(e){return new E(function(t){var r,n;try{for(var i=j(e),o=i.next();!o.done;o=i.next()){var u=o.value;if(t.next(u),t.closed)return}}catch(c){r={error:c}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(r)throw r.error}}t.complete()})}function ge(e){return new E(function(t){He(e,t).catch(function(r){return t.error(r)})})}function Ze(e){return ge(me(e))}function He(e,t){var r,n,i,o;return Te(this,void 0,void 0,function(){var u,c;return te(this,function(a){switch(a.label){case 0:a.trys.push([0,5,6,11]),r=_e(e),a.label=1;case 1:return[4,r.next()];case 2:if(n=a.sent(),!!n.done)return[3,4];if(u=n.value,t.next(u),t.closed)return[2];a.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return c=a.sent(),i={error:c},[3,11];case 6:return a.trys.push([6,,9,10]),n&&!n.done&&(o=r.return)?[4,o.call(r)]:[3,8];case 7:a.sent(),a.label=8;case 8:return[3,10];case 9:if(i)throw i.error;return[7];case 10:return[7];case 11:return t.complete(),[2]}})})}function A(e,t,r,n,i){n===void 0&&(n=0),i===void 0&&(i=!1);var o=t.schedule(function(){r(),i?e.add(this.schedule(null,n)):this.unsubscribe()},n);if(e.add(o),!i)return o}function we(e,t){return t===void 0&&(t=0),L(function(r,n){r.subscribe(C(n,function(i){return A(n,e,function(){return n.next(i)},t)},function(){return A(n,e,function(){return n.complete()},t)},function(i){return A(n,e,function(){return n.error(i)},t)}))})}function Se(e,t){return t===void 0&&(t=0),L(function(r,n){n.add(e.schedule(function(){return r.subscribe(n)},t))})}function ze(e,t){return M(e).pipe(Se(t),we(t))}function Ne(e,t){return M(e).pipe(Se(t),we(t))}function et(e,t){return new E(function(r){var n=0;return t.schedule(function(){n===e.length?r.complete():(r.next(e[n++]),r.closed||this.schedule())})})}function tt(e,t){return new E(function(r){var n;return A(r,t,function(){n=e[pe](),A(r,t,function(){var i,o,u;try{i=n.next(),o=i.value,u=i.done}catch(c){r.error(c);return}u?r.complete():r.next(o)},0,!0)}),function(){return b(n==null?void 0:n.return)&&n.return()}})}function xe(e,t){if(!e)throw new Error("Iterable cannot be null");return new E(function(r){A(r,t,function(){var n=e[Symbol.asyncIterator]();A(r,t,function(){n.next().then(function(i){i.done?r.complete():r.next(i.value)})},0,!0)})})}function rt(e,t){return xe(me(e),t)}function nt(e,t){if(e!=null){if(he(e))return ze(e,t);if(fe(e))return et(e,t);if(le(e))return Ne(e,t);if(ye(e))return xe(e,t);if(ve(e))return tt(e,t);if(be(e))return rt(e,t)}throw de(e)}function Oe(e,t){return t?nt(e,t):M(e)}function Z(e,t){return L(function(r,n){var i=0;r.subscribe(C(n,function(o){n.next(e.call(t,o,i++))}))})}var ot=Array.isArray;function it(e,t){return ot(t)?e.apply(void 0,k([],_(t))):e(t)}function ut(e){return Z(function(t){return it(e,t)})}function ct(e,t,r,n,i,o,u,c){var a=[],s=0,h=0,g=!1,y=function(){g&&!a.length&&!s&&t.complete()},w=function(l){return s<n?d(l):a.push(l)},d=function(l){o&&t.next(l),s++;var S=!1;M(r(l,h++)).subscribe(C(t,function(v){i==null||i(v),o?w(v):t.next(v)},function(){S=!0},void 0,function(){if(S)try{s--;for(var v=function(){var O=a.shift();u?A(t,u,function(){return d(O)}):d(O)};a.length&&s<n;)v();y()}catch(O){t.error(O)}}))};return e.subscribe(C(t,w,function(){g=!0,y()})),function(){c==null||c()}}function H(e,t,r){return r===void 0&&(r=1/0),b(t)?H(function(n,i){return Z(function(o,u){return t(n,o,i,u)})(M(e(n,i)))},r):(typeof t=="number"&&(r=t),L(function(n,i){return ct(n,i,e,r)}))}function st(e){return e===void 0&&(e=1/0),H(se,e)}function at(){return st(1)}function ft(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return at()(Oe(e,Ye(e)))}function Ee(e,t,r){return r?Ee(e,t).pipe(ut(r)):new E(function(n){var i=function(){for(var u=[],c=0;c<arguments.length;c++)u[c]=arguments[c];return n.next(u.length===1?u[0]:u)},o=e(i);return b(t)?function(){return t(i,o)}:void 0})}function Pe(e,t){return L(function(r,n){var i=0;r.subscribe(C(n,function(o){return e.call(t,o,i++)&&n.next(o)}))})}var lt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ht(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ae={exports:{}};/*!
 * chrome-promise
 * https://github.com/tfoxy/chrome-promise
 *
 * Copyright 2015 Tomás Fox
 * Released under the MIT license
 */(function(e,t){(function(r,n){e.exports=n(this||r)})(typeof self<"u"?self:lt,function(r){var n=Array.prototype.slice,i=Object.prototype.hasOwnProperty;return o.default=o,o;function o(u){u=u||{};var c=u.chrome||r.chrome,a=u.Promise||r.Promise,s=c.runtime,h=this;if(!h)throw new Error("ChromePromise must be called with new keyword");y(c,h),c.permissions&&c.permissions.onAdded.addListener(w);function g(d,l){return function(){var S=n.call(arguments);return new a(function(v,O){S.push(U),d.apply(l,S);function U(){var q=s.lastError,G=n.call(arguments);if(q)O(q);else switch(G.length){case 0:v();break;case 1:v(G[0]);break;default:v(G)}}})}}function y(d,l){for(var S in d)if(i.call(d,S)){var v;try{v=d[S]}catch{continue}var O=typeof v;O==="object"&&!(v instanceof o)?(l[S]={},y(v,l[S])):O==="function"?l[S]=g(v,d):l[S]=v}}function w(d){if(d.permissions&&d.permissions.length){var l={};d.permissions.forEach(function(S){var v=/^[^.]+/.exec(S);v in c&&(l[v]=c[v])}),y(l,h)}}}})})(Ae);var yt=Ae.exports,dt=yt,z=new dt;z.default=z;var pt=z;const N=ht(pt),vt=e=>{if(Array.isArray(e))return"Unexpected setter result value: Array";switch(typeof e){case"object":case"undefined":return;default:return`Unexpected setter return value: ${typeof e}`}};function mt(e){return e!=null}const bt=e=>{switch(e){case"local":return N.storage.local;case"sync":return N.storage.sync;case"managed":return N.storage.managed;default:throw new TypeError('area must be "local" | "sync" | "managed"')}};function F(e,t){t||(t="local");const n=bt(t),i=`extend-chrome/storage__${e}`,o=`${i}_keys`,u=f=>`${i}--${f}`,c=f=>f.replace(`${i}--`,""),a=f=>p=>Object.keys(p).reduce((m,x)=>Object.assign(Object.assign({},m),{[f(x)]:p[x]}),{}),s=f=>f.map(u),h=a(u),g=a(c),y=async()=>(await n.get(o))[o]||[],w=f=>n.set({[o]:f});let d=null;async function l(f){if(d)return d;if(typeof f>"u"||f===null){const p=await y();if(p.length){const m=s(p),x=await n.get(m);return g(x)}else return{}}else if(typeof f=="string"){const p=u(f),m=await n.get(p);return g(m)}else if(Array.isArray(f)){const p=s(f),m=await n.get(p);return g(m)}else{const p=h(f),m=await n.get(p);return g(m)}}function S(f){if(f==null)return l();if(typeof f=="string"||typeof f=="object")return l(f);if(typeof f=="function")return l().then(f);throw new TypeError(`Unexpected argument type: ${typeof f}`)}const v=f=>f;let O=v;function U(f){return new Promise((p,m)=>{let x;typeof f=="function"?x=P=>{const T=f(P),$=vt(T);return $?(m(new TypeError($)),P):Object.assign(Object.assign({},P),T)}:x=P=>Object.assign(Object.assign({},P),f);const ee=O;O=P=>Object.assign(Object.assign({},P),x(ee(P))),d===null&&(d=l().then(P=>{try{const T=O(P),$=h(T);return $[o]=Object.keys(T),n.set($).then(()=>T)}finally{O=v,d=null}})),d.then(p).catch(m)})}const q=f=>{const p=[].concat(f);p.forEach(x=>{if(typeof x!="string")throw new TypeError(`Unexpected argument type: ${typeof x}`)});const m=x=>w(x.filter(ee=>!p.includes(ee)));return n.remove(s(p)).then(y).then(m)},Ie=Ee(f=>{chrome.storage.onChanged.addListener(f)},f=>{chrome.storage.onChanged.removeListener(f)}).pipe(Pe(([f,p])=>p===t&&Object.keys(f).some(m=>m.startsWith(i))),Z(([f])=>{const p=Object.keys(f).filter(m=>m.startsWith(i)&&m!==o);return p.length?p.reduce((m,x)=>Object.assign(Object.assign({},m),{[c(x)]:f[x]}),{}):void 0}),Pe(mt));return{set:U,get:S,remove:q,async clear(){const f=await y(),p=[o,...s(f)];return n.remove(p)},async update(f){const p=await S(),m=await f(p);return U(m)},async getKeys(){return y()},get changeStream(){return Ie},get valueStream(){return ft(Oe(S()),Ie.pipe(H(()=>S())))}}}F("local","local"),F("sync","sync"),F("managed","managed");const gt=()=>{const e=F("site-rating-bucket"),t=u=>{e.set(u)},r=async()=>await e.get()||{storage:[],isVisible:!0},n=(u,c)=>{chrome.tabs.query(u,a=>{c(a)})};return{setStorage:t,getStorage:r,sendMessage:(u,c)=>new Promise(a=>{switch(u){case"runtime":chrome.runtime.sendMessage({value:c},s=>{a(s)});break;case"tabs":n({active:!0,currentWindow:!0},s=>{chrome.tabs.sendMessage(s[0].id,{value:c},h=>{a(h)})});break}}),addListener:(u,c)=>{switch(u){case"onMessage":chrome.runtime.onMessage.addListener((a,s,h)=>c(a,s,h));break}},query:n}},wt={4:{name:"とてもいい"},3:{name:"いい"},2:{name:"わっるい"},1:{name:"とてもわっるい"},0:{name:"評価なし"}},St=e=>wt[e].name,xt={getCurrentPage:{message:"getCurrentUrl"}},{addListener:Ot,query:Et}=gt();Ot("onMessage",({value:e},t,r)=>{if(e==xt.getCurrentPage.message){let n={active:!0,currentWindow:!0};console.log(St("0")),Et(n,i=>{const{url:o,title:u}=i[0],c={url:o||"",title:u||""};console.log(c),r(c)})}return!0})})();
