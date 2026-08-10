import{c as w,r as h,j as r}from"./index-Bn04HAM7.js";import{S as $}from"./IconBox-B4CMkM80.js";import{P as V,T as q}from"./Testimonials-eQA-jqnY.js";import{W as K}from"./WhyTrustUs-sxr3sVnB.js";import{C as J}from"./CTA-DMHXikx0.js";import"./clock-D9ge4lz_.js";import"./VariableProximity-BwMh_RMF.js";import"./zap-BmcBiNVU.js";import"./briefcase-_4YnkIBd.js";import"./SectionHeading-Cw3iJGxx.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]],Z=w("Maximize",Q);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3",key:"hohbtr"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3",key:"5jw1f3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3",key:"198tvr"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3",key:"ph8mxp"}]],te=w("Minimize",ee);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=[["path",{d:"M12 2v20",key:"t6zp3m"}],["path",{d:"m15 19-3 3-3-3",key:"11eu04"}],["path",{d:"m19 9 3 3-3 3",key:"1mg7y2"}],["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"m5 9-3 3 3 3",key:"j64kie"}],["path",{d:"m9 5 3-3 3 3",key:"l8vdw6"}]],se=w("Move",ae),R=["/assets/WhatsApp Image 2026-08-06 at 2.59.53 PM.jpeg","/assets/WhatsApp Image 2026-08-06 at 3.00.40 PM.jpeg","/assets/WhatsApp Image 2026-08-06 at 3.00.49 PM.jpeg","/assets/WhatsApp Image 2026-08-06 at 3.00.57 PM.jpeg","/assets/WhatsApp Image 2026-08-06 at 3.01.18 PM.jpeg","/assets/WhatsApp Image 2026-08-06 at 3.02.05 PM.jpeg","/assets/WhatsApp Image 2026-08-06 at 3.02.11 PM.jpeg","/assets/WhatsApp Image 2026-08-06 at 3.02.18 PM.jpeg","/assets/WhatsApp Image 2026-08-06 at 3.02.56 PM.jpeg","/assets/WhatsApp Image 2026-08-06 at 3.03.38 PM.jpeg","/assets/WhatsApp Image 2026-08-06 at 3.04.15 PM.jpeg","/assets/WhatsApp Image 2026-08-06 at 3.04.21 PM.jpeg","/assets/WhatsApp Image 2026-08-06 at 3.04.52 PM.jpeg"];function re(){const f=h.useRef(null),E=h.useRef(null),[X,D]=h.useState(0),[U,b]=h.useState(!0),[C,y]=h.useState(!1);h.useEffect(()=>{const o=E.current;if(!o)return;const t=o.getContext("webgl",{alpha:!0,premultipliedAlpha:!1});if(!t){console.warn("WebGL not supported"),b(!1);return}let m=!0,x=null;const e={images:[],textures:[],imageWidth:window.innerWidth<640?130:180,imageHeight:window.innerWidth<640?130:180,gap:window.innerWidth<640?18:25,viewOffset:{x:0,y:0},drag:{isDragging:!1,lastX:0,lastY:0,velocityX:0,velocityY:0},inertia:.95,bulgeStrength:.4,bulgeRadius:1.5,adjustedBulgeRadius:1.5,program:null,positionBuffer:null,texCoordBuffer:null,indexBuffer:null,indexCount:0};function p(){if(!o||!f.current)return;const a=f.current.getBoundingClientRect();o.width=a.width||window.innerWidth,o.height=a.height||window.innerHeight,e.imageWidth=window.innerWidth<640?130:180,e.imageHeight=window.innerWidth<640?130:180,e.gap=window.innerWidth<640?18:25;const n=Math.sqrt(Math.pow(o.width/Math.min(o.width,o.height),2)+Math.pow(o.height/Math.min(o.width,o.height),2));e.adjustedBulgeRadius=Math.max(e.bulgeRadius,n*.6*1.2),t&&t.viewport(0,0,o.width,o.height)}p();const A=()=>p();window.addEventListener("resize",A);function T(a,n){const s=t.createShader(a);return t.shaderSource(s,n),t.compileShader(s),t.getShaderParameter(s,t.COMPILE_STATUS)?s:(console.error("Shader compile error:",t.getShaderInfoLog(s)),t.deleteShader(s),null)}function Y(a,n){const s=T(t.VERTEX_SHADER,a),c=T(t.FRAGMENT_SHADER,n),i=t.createProgram();return t.attachShader(i,s),t.attachShader(i,c),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)?i:(console.error("Program link error:",t.getProgramInfoLog(i)),null)}function k(){const a=`
        attribute vec2 aPosition;
        attribute vec2 aTexCoord;
        varying vec2 vTexCoord;
        uniform vec2 uResolution;
        uniform vec2 uOffset;
        uniform float uRotation;
        uniform vec2 uImagePosition;
        uniform float uBulgeStrength;
        uniform float uBulgeRadius;

        vec2 applyBulgeEffect(vec2 pos){
            vec2 normalizedPos = pos / uResolution;
            vec2 center = vec2(0.5, 0.5);
            vec2 delta = normalizedPos - center;

            float aspect = uResolution.x / uResolution.y;
            delta.x *= aspect;

            float dist = length(delta);

            if(dist < uBulgeRadius){
                float t = dist / uBulgeRadius;
                float z = sqrt(0.5 - t * t);
                delta *= 0.35 + uBulgeStrength / z;
                delta.x /= aspect;

                normalizedPos = center + delta;
                pos = normalizedPos * uResolution;
            }
            return pos;
        }

        void main(){
            vec2 pos = aPosition * vec2(${e.imageWidth}.0, ${e.imageHeight}.0);
            pos += uImagePosition;
            pos -= uOffset;

            vec2 center = uImagePosition + vec2(${e.imageWidth/2}, ${e.imageHeight/2}) - uOffset;
            pos -= center;
            float cosR = cos(uRotation);
            float sinR = sin(uRotation);
            pos = vec2(pos.x*cosR - pos.y*sinR, pos.x*sinR + pos.y*cosR);
            pos += center;

            pos = applyBulgeEffect(pos);

            vec2 clip = pos / uResolution * 2.0 - 1.0;
            gl_Position = vec4(clip, 0.0, 1.0);
            vTexCoord = aTexCoord;
        }
      `,n=`
        precision mediump float;
        varying vec2 vTexCoord;
        uniform sampler2D uSampler;
        void main(){
            vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
            vec4 color = texture2D(uSampler, uv);
            if(color.a < 0.01) discard;
            gl_FragColor = color;
        }
      `;if(e.program=Y(a,n),!e.program)return;const s=32,c=[],i=[],u=[];for(let g=0;g<=s;g++)for(let l=0;l<=s;l++)c.push(l/s,g/s),i.push(l/s,g/s);for(let g=0;g<s;g++)for(let l=0;l<s;l++){const d=g*(s+1)+l;u.push(d,d+1,d+s+1),u.push(d+1,d+s+2,d+s+1)}e.indexCount=u.length,e.positionBuffer=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,e.positionBuffer),t.bufferData(t.ARRAY_BUFFER,new Float32Array(c),t.STATIC_DRAW),e.texCoordBuffer=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,e.texCoordBuffer),t.bufferData(t.ARRAY_BUFFER,new Float32Array(i),t.STATIC_DRAW),e.indexBuffer=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(u),t.STATIC_DRAW),t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA)}function L(a){const n=t.createTexture();return t.bindTexture(t.TEXTURE_2D,n),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),n}async function O(){const a=R.length*2,n=[...R,...R];let s=0;for(let c=0;c<n.length;c++){if(!m)return;const i=new Image;i.crossOrigin="Anonymous",i.src=n[c],await new Promise(u=>{i.onload=()=>{e.images.push(i),e.textures.push(L(i)),u()},i.onerror=()=>{i.src=`https://picsum.photos/id/${c%50+10}/${e.imageWidth}/${e.imageHeight}`,i.onload=()=>{e.images.push(i),e.textures.push(L(i)),u()},i.onerror=u}}),s++,m&&D(Math.round(s/a*100))}m&&b(!1)}function z(){if(e.images.length===0)return[];const a=[],n=e.imageWidth+e.gap,s=e.imageHeight+e.gap,c=e.viewOffset.x-o.width,i=e.viewOffset.x+o.width*2,u=e.viewOffset.y-o.height,g=e.viewOffset.y+o.height*2;for(let l=Math.floor(u/s)-1;l<=Math.ceil(g/s)+1;l++)for(let d=Math.floor(c/n)-1;d<=Math.ceil(i/n)+1;d++){const v=(d*7919+l*7307)%e.images.length,H=Math.abs(v);a.push({x:d*n,y:l*s,imageIndex:H})}return a}function G(){if(!e.program||e.images.length===0||!t)return;t.viewport(0,0,o.width,o.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(e.program);const a=t.getAttribLocation(e.program,"aPosition");t.enableVertexAttribArray(a),t.bindBuffer(t.ARRAY_BUFFER,e.positionBuffer),t.vertexAttribPointer(a,2,t.FLOAT,!1,0,0);const n=t.getAttribLocation(e.program,"aTexCoord");t.enableVertexAttribArray(n),t.bindBuffer(t.ARRAY_BUFFER,e.texCoordBuffer),t.vertexAttribPointer(n,2,t.FLOAT,!1,0,0),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.indexBuffer);const s=t.getUniformLocation(e.program,"uResolution");t.uniform2f(s,o.width,o.height);const c=t.getUniformLocation(e.program,"uOffset"),i=t.getUniformLocation(e.program,"uImagePosition"),u=t.getUniformLocation(e.program,"uSampler"),g=t.getUniformLocation(e.program,"uBulgeStrength"),l=t.getUniformLocation(e.program,"uBulgeRadius");t.uniform1f(g,e.bulgeStrength),t.uniform1f(l,e.adjustedBulgeRadius);const d=z();for(const v of d)t.uniform2f(c,e.viewOffset.x,e.viewOffset.y),t.uniform2f(i,v.x,v.y),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,e.textures[v.imageIndex]),t.uniform1i(u,0),t.drawElements(t.TRIANGLES,e.indexCount,t.UNSIGNED_SHORT,0)}function M(){m&&(e.drag.isDragging||(e.viewOffset.x-=e.drag.velocityX,e.viewOffset.y-=e.drag.velocityY,e.drag.velocityX*=e.inertia,e.drag.velocityY*=e.inertia,Math.abs(e.drag.velocityX)<.01&&(e.drag.velocityX=0),Math.abs(e.drag.velocityY)<.01&&(e.drag.velocityY=0)),G(),x=requestAnimationFrame(M))}k(),O(),x=requestAnimationFrame(M);const S=a=>{a.preventDefault(),e.drag.isDragging=!0,e.drag.lastX=a.clientX,e.drag.lastY=a.clientY},_=a=>{if(!e.drag.isDragging)return;a.preventDefault();const n=a.clientX-e.drag.lastX,s=a.clientY-e.drag.lastY;e.drag.velocityX=n*.35+e.drag.velocityX*.65,e.drag.velocityY=s*.35+e.drag.velocityY*.65,e.viewOffset.x-=e.drag.velocityX,e.viewOffset.y-=e.drag.velocityY,e.drag.lastX=a.clientX,e.drag.lastY=a.clientY},P=()=>{e.drag.isDragging=!1},B=a=>{a.touches.length===1&&(e.drag.isDragging=!0,e.drag.lastX=a.touches[0].clientX,e.drag.lastY=a.touches[0].clientY)},I=a=>{if(!e.drag.isDragging||a.touches.length!==1)return;const n=a.touches[0].clientX-e.drag.lastX,s=a.touches[0].clientY-e.drag.lastY;e.drag.velocityX=n*.35+e.drag.velocityX*.65,e.drag.velocityY=s*.35+e.drag.velocityY*.65,e.viewOffset.x-=e.drag.velocityX,e.viewOffset.y-=e.drag.velocityY,e.drag.lastX=a.touches[0].clientX,e.drag.lastY=a.touches[0].clientY},j=()=>{e.drag.isDragging=!1},F=a=>{e.drag.velocityX+=a.deltaX*.3,e.drag.velocityY+=a.deltaY*.3},W=a=>{switch(a.key){case"+":case"=":e.bulgeStrength=Math.min(1.5,e.bulgeStrength+.05);break;case"-":case"_":e.bulgeStrength=Math.max(0,e.bulgeStrength-.05);break;case"[":e.bulgeRadius=Math.max(.5,e.bulgeRadius-.05),p();break;case"]":e.bulgeRadius=Math.min(3,e.bulgeRadius+.05),p();break;case"r":case"R":e.bulgeStrength=.4,e.bulgeRadius=1.5,p();break}};return o.addEventListener("mousedown",S),window.addEventListener("mousemove",_),window.addEventListener("mouseup",P),o.addEventListener("touchstart",B,{passive:!0}),window.addEventListener("touchmove",I,{passive:!0}),window.addEventListener("touchend",j),o.addEventListener("wheel",F,{passive:!0}),window.addEventListener("keydown",W),()=>{m=!1,x&&cancelAnimationFrame(x),window.removeEventListener("resize",A),o.removeEventListener("mousedown",S),window.removeEventListener("mousemove",_),window.removeEventListener("mouseup",P),o.removeEventListener("touchstart",B),window.removeEventListener("touchmove",I),window.removeEventListener("touchend",j),o.removeEventListener("wheel",F),window.removeEventListener("keydown",W)}},[]);const N=()=>{f.current&&(document.fullscreenElement?document.exitFullscreen().then(()=>y(!1)).catch(()=>{}):f.current.requestFullscreen().then(()=>y(!0)).catch(()=>{}))};return r.jsxs("section",{ref:f,className:"infinite-bulge-container",children:[r.jsx("div",{className:"bulge-grid-overlay"}),r.jsxs("div",{className:"bulge-header-overlay",children:[r.jsxs("div",{className:"bulge-badge",children:[r.jsx($,{className:"w-3.5 h-3.5"}),r.jsx("span",{children:"Interactive WebGL Lens Showcase"})]}),r.jsx("h1",{className:"bulge-title",children:"Infinite Work Canvas"}),r.jsx("p",{className:"bulge-subtitle",children:"Drag, scroll & explore our portfolio assets with real-time WebGL fisheye distortion."})]}),r.jsx("canvas",{ref:E,className:"infinite-bulge-canvas"}),U&&r.jsxs("div",{className:"bulge-loader",children:[r.jsx("div",{className:"w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"}),r.jsxs("span",{children:["Loading Assets... ",X,"%"]})]}),r.jsxs("div",{className:"bulge-controls-hint",children:[r.jsx(se,{className:"w-4 h-4 text-white/70 flex-shrink-0"}),r.jsxs("span",{className:"hidden sm:inline",children:["Drag / Scroll to explore || Use ",r.jsx("b",{children:"+"})," / ",r.jsx("b",{children:"-"})," to adjust lens bulge"]}),r.jsx("span",{className:"sm:hidden",children:"Swipe or drag to explore"})]}),r.jsx("button",{onClick:N,className:"bulge-fullscreen-btn","aria-label":"Toggle Fullscreen",children:C?r.jsx(te,{className:"w-5 h-5"}):r.jsx(Z,{className:"w-5 h-5"})})]})}function me(){return r.jsxs(r.Fragment,{children:[r.jsx(re,{}),r.jsx(V,{}),r.jsx(q,{}),r.jsx(K,{}),r.jsx(J,{})]})}export{me as default};
