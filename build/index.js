(()=>{"use strict";var e={373:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const s={time:60};t.App=class{constructor(e,t){this.storageService=t,this.wasActivity=!1,this.options={...s,...e},this.stepsAmount=this.options.time/10,this.currentStep=this.storageService.hasItem()?Number(this.storageService.getItem()):1,this.onMouseMove=this.onMouseMove.bind(this),this.start()}start(){this.setListener(),this.intervalId=setInterval((()=>{this.wasActivity&&(this.currentStep++,this.storageService.setItem(this.currentStep),this.wasActivity=!1,this.currentStep===this.stepsAmount&&this.onSuccess())}),1e3)}onSuccess(){this.clear(),this.options.onSuccess()}clear(){this.removeListener(),this.intervalId&&clearInterval(this.intervalId),this.storageService.clear()}removeListener(){document.removeEventListener("mousemove",this.onMouseMove)}setListener(){document.addEventListener("mousemove",this.onMouseMove)}onMouseMove(){this.wasActivity=!0}}},287:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StorageService=void 0;const s="activityStep";t.StorageService=class{getItem(){return Number(localStorage.getItem(s))}setItem(e){return localStorage.setItem(s,JSON.stringify(e))}hasItem(){return Boolean(localStorage.getItem(s))}clear(){localStorage.removeItem(s)}}}},t={};function s(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,s),i.exports}(()=>{const e=s(373),t=s(287);document.addEventListener("DOMContentLoaded",(()=>{new e.App({onSuccess:()=>console.log("Goal")},new t.StorageService)}))})()})();