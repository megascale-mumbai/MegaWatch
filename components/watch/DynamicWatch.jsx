// "use client";
// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable react-hooks/exhaustive-deps */

// import { useEffect, useRef, useState, useCallback } from "react";

// export default function DynamicWatch({ config }) {
//   const containerRef = useRef(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [scale, setScale] = useState(1);
//   const configRef = useRef(config);
//   const lastIdRef = useRef(config.id);
//   const subDialRefs = useRef({});
//   const mainHandRefs = useRef([]);
//   const requestRef = useRef();
//   const startupStartRef = useRef();
//   const dateWindowRef = useRef();

//   useEffect(() => {
//     if (!containerRef.current) return;
//     const observer = new ResizeObserver((entries) => {
//       if (entries[0]) {
//         setScale(entries[0].contentRect.width / 668);
//       }
//     });
//     observer.observe(containerRef.current);
//     return () => observer.disconnect();
//   }, []);

//   const animate = useCallback(() => {
//     const conf = configRef.current;
//     if (!conf) return;

//     const idHash = conf.id
//       ? conf.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
//       : 0;
//     const timeOffset = (idHash % 10) * 100;
//     const now = new Date(Date.now() + timeOffset);
//     const ms = now.getMilliseconds();
//     const seconds = now.getSeconds();
//     const minutes = now.getMinutes();
//     const hours = now.getHours();

//     // Base degree calculations
//     const secDeg = (seconds + ms / 1000) * 6;
//     const minDeg = (minutes + seconds / 60) * 6;
//     const hourDeg = ((hours % 12) + minutes / 60 + seconds / 3600) * 30;

//     // Startup Sweep Animation Logic
//     if (!startupStartRef.current) startupStartRef.current = performance.now();
//     const elapsed = performance.now() - startupStartRef.current;
//     const startupDuration = 1800; // Slightly longer for premium feel
//     let animationFactor = 1;
//     if (elapsed < startupDuration) {
//       const t = elapsed / startupDuration;
//       // Quintic ease-out for smoother entry
//       animationFactor = 1 - Math.pow(1 - t, 5);
//     }

//     // Apply rotations to Main Hands
//     let handsArray = [];
//     if (Array.isArray(conf.hands)) {
//       handsArray = conf.hands;
//     } else if (conf.hands && typeof conf.hands === "object") {
//       handsArray = [
//         { ...conf.hands.hour, type: "hour" },
//         { ...conf.hands.minute, type: "minute" },
//         { ...conf.hands.second, type: "second" },
//       ].filter((h) => h.width || h.height);
//     }

//     handsArray.forEach((hand, idx) => {
//       const el = mainHandRefs.current[idx];
//       if (!el) return;

//       let deg = 0;
//       if (hand.type === "hour") deg = hourDeg;
//       else if (hand.type === "minute") deg = minDeg;
//       else if (hand.type === "second") {
//         deg =
//           hand.timing === "steps(60)" ? seconds * 6 : (seconds + ms / 1000) * 6;
//       }

//       // Smooth sweep from -360 to target deg
//       const finalDeg = (deg + 360) * animationFactor - 360;

//       const px = hand.pivot?.x ?? 0.5;
//       const py = hand.pivot?.y ?? (hand.useImage ? 0.8 : hand.pivotCenter ? 0.5 : 1.0);

//       // Translate pivot to master-pivot origin, then rotate around it
//       el.style.transform = `translate3d(-${px * 100}%, -${py * 100}%, 0) rotateZ(${finalDeg}deg)`;
//     });

//     // Update Date Window Text & Scroll
//     if (dateWindowRef.current) {
//       const targetDate = now.getDate();
//       const dateWindowHeight = conf.dateWindow?.height || 20;
//       const radius = (31 * dateWindowHeight) / (2 * Math.PI);

//       // Spin 3 full revolutions before landing on the target date
//       const extraSpins = 3 * 31;
//       const currentScrollDate =
//         1 + (targetDate - 1 + extraSpins) * animationFactor;
//       const currentAngle = -(currentScrollDate - 1) * (360 / 31);

//       dateWindowRef.current.style.transform = `translateZ(-${radius}px) rotateX(${currentAngle}deg)`;
//     }

//     // Sub-dial Rotations
//     if (conf.subDials) {
//       conf.subDials.forEach((sd, idx) => {
//         const refKey = sd.id || `sd-${idx}`;
//         const ref = subDialRefs.current[refKey];
//         if (ref) {
//           let deg = 0;
//           const offset = sd.offset || 0;
//           switch (sd.type) {
//             case "day":
//               deg =
//                 (now.getDay() + (hours + minutes / 60) / 24) * (360 / 7) +
//                 offset;
//               break;
//             case "date":
//               deg =
//                 (now.getDate() - 1 + (hours + minutes / 60) / 24) * (360 / 31) +
//                 offset;
//               break;
//             case "24h":
//               deg = (hours + minutes / 60 + seconds / 3600) * 15 + offset;
//               break;
//             case "12h":
//               deg =
//                 ((hours % 12) + minutes / 60 + seconds / 3600) * 30 + offset;
//               break;
//             case "month":
//               deg = (now.getMonth() + (now.getDate() - 1) / 31) * 30 + offset;
//               break;
//             case "seconds":
//               deg = (seconds + ms / 1000) * 6 + offset;
//               break;
//           }
//           const handRefs = Array.isArray(ref) ? ref : [ref];
//           handRefs.forEach((handRef, hIdx) => {
//             if (!handRef) return;
//             const handConfig = sd.hands ? sd.hands[hIdx] : sd.hand;
//             const px = (handConfig?.pivot?.x ?? 0.5) * 100;
//             const py = (handConfig?.pivot?.y ?? 1.0) * 100;
//             handRef.style.transform = `translate3d(-${px}%, -${py}%, 0) rotateZ(${(deg + 360) * animationFactor - 360}deg)`;
//           });
//         }
//       });
//     }
//   }, []);

//   useEffect(() => {
//     configRef.current = config;
//     if (config.id !== lastIdRef.current) {
//       startupStartRef.current = null;
//       lastIdRef.current = config.id;
//     }
//   }, [config]);

//   useEffect(() => {
//     setIsMounted(true);

//     const loop = () => {
//       animate();
//       requestRef.current = requestAnimationFrame(loop);
//     };

//     requestRef.current = requestAnimationFrame(loop);
//     return () => cancelAnimationFrame(requestRef.current);
//   }, [animate]);

//   return (
//     <div
//       ref={containerRef}
//       className="watch-container relative w-full h-full flex items-center justify-center"
//     >
//       <div
//         style={{
//           position: "absolute",
//           width: "668px",
//           height: "668px",
//           transform: `scale(${scale})`,
//           transformOrigin: "center center",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         {/* Watch Dial Background */}
//         <img
//           src={config.dialImage}
//           alt="Watch Dial"
//           className="absolute inset-0 w-full h-full object-contain z-0 mix-blend-multiply"
//           style={{
//             transform: `scale(${config.dialScale / 100 || 1})`,
//             transition: "transform 0.3s",
//           }}
//         />

//         <div className="watch-dial-container absolute inset-0 w-full h-full z-10">
//           {/* Sub-dials Rendering */}
//           {config.subDials?.map((sd, sdIdx) => {
//             const sdX = (sd.fx ?? 0.5) * 100;
//             const sdY = (sd.fy ?? 0.7) * 100;
//             const hub = sd.hub || { size: 4, color: "#fff", useImage: false };
//             const hubSize = hub.size || 4;

//             return (
//               <div
//                 key={sd.id || sdIdx}
//                 className="sub-dial absolute"
//                 style={{
//                   left: `${sdX}%`,
//                   top: `${sdY}%`,
//                   width: 0,
//                   height: 0,
//                   zIndex: 5,
//                 }}
//               >
//                 {/* Shared Sub-dial Pivot (Hub Position) */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: `${hub.fy || 0}px`,
//                     left: `${hub.fx || 0}px`,
//                     width: 0,
//                     height: 0,
//                     zIndex: 10,
//                   }}
//                 >
//                   {/* Sub-dial Hands */}
//                   {sd.hands?.map((hand, hIdx) => {
//                     const spx = hand.pivot?.x ?? 0.5;
//                     const spy = hand.pivot?.y ?? 1.0;
//                     const sw = hand.width || 2;
//                     const sh = hand.height || 20;
//                     return (
//                     <div
//                       key={hIdx}
//                       ref={(el) => {
//                         if (!subDialRefs.current[sd.id || `sd-${sdIdx}`]) {
//                           subDialRefs.current[sd.id || `sd-${sdIdx}`] = [];
//                         }
//                         subDialRefs.current[sd.id || `sd-${sdIdx}`][hIdx] = el;
//                       }}
//                       className="hand-wrapper"
//                       style={{
//                         width: `${sw}px`,
//                         height: `${sh}px`,
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         transformOrigin: `${spx * 100}% ${spy * 100}%`,
//                         zIndex: 10 + hIdx,
//                       }}
//                     >
//                       <svg
//                         width="100%"
//                         height="100%"
//                         viewBox={`0 0 ${hand.width || 2} ${hand.height || 20}`}
//                         preserveAspectRatio="none"
//                       >
//                         {hand.useImage ? (
//                           hand.imagePath && (
//                             <image
//                               href={hand.imagePath}
//                               width="100%"
//                               height="100%"
//                               preserveAspectRatio="none"
//                             />
//                           )
//                         ) : (
//                           <rect
//                             width="100%"
//                             height="100%"
//                             fill={hand.color || "#EF4444"}
//                             rx="1"
//                           />
//                         )}
//                       </svg>
//                     </div>
//                     );
//                   })}

//                   {/* Sub-dial Center Hub */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       width: `${hubSize}px`,
//                       height: `${hubSize}px`,
//                       backgroundColor: hub.useImage
//                         ? "transparent"
//                         : hub.color || "#fff",
//                       borderRadius: "50%",
//                       transform: "translate(-50%, -50%)",
//                       zIndex: 30,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     {hub.useImage && hub.imagePath && (
//                       <img
//                         src={hub.imagePath}
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "contain",
//                         }}
//                         alt="SD Hub"
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {/* Date Window */}
//           {config.dateWindow?.show && (
//             <>
//               <div
//                 style={{
//                   position: "absolute",
//                   top: `${(config.dateWindow.fy ?? 0.5) * 100}%`,
//                   left: `${(config.dateWindow.fx ?? 0.5) * 100}%`,
//                   transform: `translate(-50%, -50%) rotate(${config.dateWindow.rotation || 0}deg)`,
//                   backgroundColor:
//                     config.dateWindow.backgroundColor || "#ffffff",
//                   color: config.dateWindow.textColor || "#000000",
//                   width: `${config.dateWindow.width || 30}px`,
//                   height: `${config.dateWindow.height || 20}px`,
//                   fontSize: `${(config.dateWindow.fontSize || 12) * (config.dateWindow.cyclops ? 1.6 : 1)}px`,
//                   border: config.dateWindow.border || "1px solid #ccc",
//                   borderRadius: `${config.dateWindow.borderRadius || 4}px`,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   zIndex: 8,
//                   fontFamily: "sans-serif",
//                   fontWeight: "bold",
//                   boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
//                   overflow: "hidden",
//                   perspective: "500px",
//                 }}
//               >
//                 <div
//                   ref={dateWindowRef}
//                   style={{
//                     position: "relative",
//                     width: "100%",
//                     height: `${config.dateWindow.height || 20}px`,
//                     transformStyle: "preserve-3d",
//                   }}
//                 >
//                   {[...Array(31)].map((_, i) => {
//                     const height = config.dateWindow.height || 20;
//                     const angle = i * (360 / 31);
//                     const radius = (31 * height) / (2 * Math.PI);
//                     return (
//                       <div
//                         key={i}
//                         style={{
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           right: 0,
//                           bottom: 0,
//                           height: `${height}px`,
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           backfaceVisibility: "hidden",
//                           transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
//                         }}
//                       >
//                         {i + 1}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {config.dateWindow.cyclops && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: `${(config.dateWindow.fy ?? 0.5) * 100}%`,
//                     left: `${(config.dateWindow.fx ?? 0.5) * 100}%`,
//                     transform: `translate(-50%, -50%) rotate(${config.dateWindow.rotation || 0}deg) scale(1.22)`,
//                     width: `${config.dateWindow.width || 30}px`,
//                     height: `${config.dateWindow.height || 20}px`,
//                     borderRadius: `${(config.dateWindow.borderRadius || 4) * 1.5}px`,
//                     background:
//                       "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.03) 100%)",
//                     boxShadow:
//                       "0 6px 16px rgba(0,0,0,0.35), inset 0 2.5px 4px rgba(255,255,255,0.95), inset 0 -2.5px 4px rgba(0,0,0,0.25), 0 0 0 1.5px rgba(255,255,255,0.65)",
//                     pointerEvents: "none",
//                     zIndex: 9,
//                   }}
//                 />
//               )}
//             </>
//           )}

//           <div
//             className="master-pivot"
//             style={{
//               position: "absolute",
//               top: `${(config.pivot?.fy ?? 0.5) * 100}%`,
//               left: `${(config.pivot?.fx ?? 0.5) * 100}%`,
//               width: 0,
//               height: 0,
//               zIndex: 100,
//             }}
//           >
//             {/* Main Hands — Supporting both Array and Object formats */}
//             {(() => {
//               let hands = [];
//               if (Array.isArray(config.hands)) {
//                 hands = config.hands;
//               } else if (config.hands && typeof config.hands === "object") {
//                 hands = [
//                   { ...config.hands.hour, type: "hour" },
//                   { ...config.hands.minute, type: "minute" },
//                   { ...config.hands.second, type: "second" },
//                 ].filter((h) => h.width || h.height);
//               }

//               return hands.map((hand, idx) => {
//                 const px = hand.pivot?.x ?? 0.5;
//                 const py =
//                   hand.pivot?.y ??
//                   (hand.useImage ? 0.8 : hand.pivotCenter ? 0.5 : 1.0);
//                 const w = hand.width || 0;
//                 const h = hand.height || 0;
//                 return (
//                   <div
//                     key={idx}
//                     ref={(el) => (mainHandRefs.current[idx] = el)}
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       width: `${w}px`,
//                       height: `${h}px`,
//                       /* Animation applies translate3d(-px%,-py%,0)+rotateZ to pivot at master-pivot origin */
//                       transformOrigin: `${px * 100}% ${py * 100}%`,
//                       zIndex: 20 + idx,
//                       willChange: "transform",
//                     }}
//                   >
//                     <svg
//                       width="100%"
//                       height="100%"
//                       viewBox={`0 0 ${hand.width} ${hand.height}`}
//                       preserveAspectRatio="none"
//                       style={{ overflow: "visible" }}
//                     >
//                       {hand.useImage ? (
//                         hand.imagePath && (
//                           <image
//                             href={hand.imagePath}
//                             width="100%"
//                             height="100%"
//                             preserveAspectRatio="none"
//                           />
//                         )
//                       ) : (
//                         <rect
//                           width="100%"
//                           height="100%"
//                           fill={hand.color || "#333"}
//                           rx={hand.width / 2}
//                         />
//                       )}
//                     </svg>
//                   </div>
//                 );
//               });
//             })()}

//             {/* Center Hub (Always on Top) */}
//             {(() => {
//               const hub = config.hub || {
//                 size: 10,
//                 color: "#1e293b",
//                 useImage: false,
//               };
//               const hubSize = hub.size || 10;
//               return (
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: `${hub.fy || 0}px`,
//                     left: `${hub.fx || 0}px`,
//                     width: `${hubSize}px`,
//                     height: `${hubSize}px`,
//                     backgroundColor: hub.useImage
//                       ? "transparent"
//                       : hub.color || "#1e293b",
//                     borderRadius: "50%",
//                     transform: "translate(-50%, -50%)",
//                     zIndex: 150,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     boxShadow: hub.useImage
//                       ? "none"
//                       : "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)",
//                     border: hub.useImage ? "none" : "1px solid rgba(0,0,0,0.1)",
//                   }}
//                 >
//                   {hub.useImage && hub.imagePath && (
//                     <img
//                       src={hub.imagePath}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "contain",
//                       }}
//                       alt="Hub"
//                     />
//                   )}
//                 </div>
//               );
//             })()}
//           </div>
//         </div>

//         {/* Glass reflection */}
//         <div className="absolute inset-0 pointer-events-none z-[101] rounded-full overflow-hidden opacity-10 mix-blend-multiply">
//           <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/80 via-transparent to-black/5 rotate-[35deg]" />
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState, useCallback } from "react";

export default function DynamicWatch({ config }) {
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const configRef = useRef(config);
  const lastIdRef = useRef(config.id);
  const subDialRefs = useRef({});
  const mainHandRefs = useRef([]);
  const requestRef = useRef();
  const startupStartRef = useRef();
  const dateWindowRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setScale(entries[0].contentRect.width / 668);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const animate = useCallback(() => {
    const conf = configRef.current;
    if (!conf) return;

    const idHash = conf.id
      ? conf.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      : 0;
    const timeOffset = (idHash % 10) * 100;
    const now = new Date(Date.now() + timeOffset);
    const ms = now.getMilliseconds();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // Base degree calculations
    const secDeg = (seconds + ms / 1000) * 6;
    const minDeg = (minutes + seconds / 60) * 6;
    const hourDeg = ((hours % 12) + minutes / 60 + seconds / 3600) * 30;

    // Startup Sweep Animation Logic
    if (!startupStartRef.current) startupStartRef.current = performance.now();
    const elapsed = performance.now() - startupStartRef.current;
    const startupDuration = 1800; // Slightly longer for premium feel
    let animationFactor = 1;
    if (elapsed < startupDuration) {
      const t = elapsed / startupDuration;
      // Quintic ease-out for smoother entry
      animationFactor = 1 - Math.pow(1 - t, 5);
    }

    // Apply rotations to Main Hands
    let handsArray = [];
    if (Array.isArray(conf.hands)) {
      handsArray = conf.hands;
    } else if (conf.hands && typeof conf.hands === "object") {
      handsArray = [
        { ...conf.hands.hour, type: "hour" },
        { ...conf.hands.minute, type: "minute" },
        { ...conf.hands.second, type: "second" },
      ].filter((h) => h.width || h.height);
    }

    handsArray.forEach((hand, idx) => {
      const el = mainHandRefs.current[idx];
      if (!el) return;

      let deg = 0;
      if (hand.type === "hour") deg = hourDeg;
      else if (hand.type === "minute") deg = minDeg;
      else if (hand.type === "second") {
        deg =
          hand.timing === "steps(60)" ? seconds * 6 : (seconds + ms / 1000) * 6;
      }

      // Smooth sweep from -360 to target deg
      const finalDeg = (deg + 360) * animationFactor - 360;

      const px = hand.pivot?.x ?? 0.5;
      const py = hand.pivot?.y ?? (hand.useImage ? 0.8 : hand.pivotCenter ? 0.5 : 1.0);

      // Translate pivot to master-pivot origin, then rotate around it
      el.style.transform = `translate3d(-${px * 100}%, -${py * 100}%, 0) rotateZ(${finalDeg}deg)`;
    });

    // Update Date Window Text & Scroll
    if (dateWindowRef.current) {
      const targetDate = now.getDate();
      const dateWindowHeight = conf.dateWindow?.height || 20;
      const radius = (31 * dateWindowHeight) / (2 * Math.PI);

      // Spin 3 full revolutions before landing on the target date
      const extraSpins = 3 * 31;
      const currentScrollDate =
        1 + (targetDate - 1 + extraSpins) * animationFactor;
      const currentAngle = -(currentScrollDate - 1) * (360 / 31);

      dateWindowRef.current.style.transform = `translateZ(-${radius}px) rotateX(${currentAngle}deg)`;
    }

    // Sub-dial Rotations
    if (conf.subDials) {
      conf.subDials.forEach((sd, idx) => {
        const refKey = sd.id || `sd-${idx}`;
        const ref = subDialRefs.current[refKey];
        if (ref) {
          let deg = 0;
          const offset = sd.offset || 0;
          switch (sd.type) {
            case "day":
              deg =
                (now.getDay() + (hours + minutes / 60) / 24) * (360 / 7) +
                offset;
              break;
            case "date":
              deg =
                (now.getDate() - 1 + (hours + minutes / 60) / 24) * (360 / 31) +
                offset;
              break;
            case "24h":
              deg = (hours + minutes / 60 + seconds / 3600) * 15 + offset;
              break;
            case "12h":
              deg =
                ((hours % 12) + minutes / 60 + seconds / 3600) * 30 + offset;
              break;
            case "month":
              deg = (now.getMonth() + (now.getDate() - 1) / 31) * 30 + offset;
              break;
            case "seconds":
              deg = (seconds + ms / 1000) * 6 + offset;
              break;
          }
          const handRefs = Array.isArray(ref) ? ref : [ref];
          handRefs.forEach((handRef, hIdx) => {
            if (!handRef) return;
            const handConfig = sd.hands ? sd.hands[hIdx] : sd.hand;
            const px = (handConfig?.pivot?.x ?? 0.5) * 100;
            const py = (handConfig?.pivot?.y ?? 1.0) * 100;
            handRef.style.transform = `translate3d(-${px}%, -${py}%, 0) rotateZ(${(deg + 360) * animationFactor - 360}deg)`;
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    configRef.current = config;
    if (config.id !== lastIdRef.current) {
      startupStartRef.current = null;
      lastIdRef.current = config.id;
    }
  }, [config]);

  useEffect(() => {
    setIsMounted(true);

    const loop = () => {
      animate();
      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className="watch-container relative w-full h-full flex items-center justify-center"
    >
      <div
        style={{
          position: "absolute",
          width: "668px",
          height: "668px",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Watch Dial Background */}
        <img
          src={config.dialImage}
          alt="Watch Dial"
          className="absolute inset-0 w-full h-full object-contain z-0 mix-blend-multiply"
          style={{
            transform: `scale(${config.dialScale / 100 || 1})`,
            transition: "transform 0.3s",
          }}
        />

        <div className="watch-dial-container absolute inset-0 w-full h-full z-10">
          {/* Sub-dials Rendering */}
          {config.subDials?.map((sd, sdIdx) => {
            const sdX = (sd.fx ?? 0.5) * 100;
            const sdY = (sd.fy ?? 0.7) * 100;
            const hub = sd.hub || { size: 4, color: "#fff", useImage: false };
            const hubSize = hub.size || 4;

            return (
              <div
                key={sd.id || sdIdx}
                className="sub-dial absolute"
                style={{
                  left: `${sdX}%`,
                  top: `${sdY}%`,
                  width: 0,
                  height: 0,
                  zIndex: 5,
                }}
              >
                {/* Shared Sub-dial Pivot (Hub Position) */}
                <div
                  style={{
                    position: "absolute",
                    top: `${hub.fy || 0}px`,
                    left: `${hub.fx || 0}px`,
                    width: 0,
                    height: 0,
                    zIndex: 10,
                  }}
                >
                  {/* Sub-dial Hands */}
                  {sd.hands?.map((hand, hIdx) => {
                    const spx = hand.pivot?.x ?? 0.5;
                    const spy = hand.pivot?.y ?? 1.0;
                    const sw = hand.width || 2;
                    const sh = hand.height || 20;
                    return (
                    <div
                      key={hIdx}
                      ref={(el) => {
                        if (!subDialRefs.current[sd.id || `sd-${sdIdx}`]) {
                          subDialRefs.current[sd.id || `sd-${sdIdx}`] = [];
                        }
                        subDialRefs.current[sd.id || `sd-${sdIdx}`][hIdx] = el;
                      }}
                      className="hand-wrapper"
                      style={{
                        width: `${sw}px`,
                        height: `${sh}px`,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        transformOrigin: `${spx * 100}% ${spy * 100}%`,
                        zIndex: 10 + hIdx,
                      }}
                    >
                      <svg
                        width="100%"
                        height="100%"
                        viewBox={`0 0 ${hand.width || 2} ${hand.height || 20}`}
                        preserveAspectRatio="none"
                      >
                        {hand.useImage ? (
                          hand.imagePath && (
                            <image
                              href={hand.imagePath}
                              width="100%"
                              height="100%"
                              preserveAspectRatio="none"
                            />
                          )
                        ) : (
                          <rect
                            width="100%"
                            height="100%"
                            fill={hand.color || "#EF4444"}
                            rx="1"
                          />
                        )}
                      </svg>
                    </div>
                    );
                  })}

                  {/* Sub-dial Center Hub */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: `${hubSize}px`,
                      height: `${hubSize}px`,
                      backgroundColor: hub.useImage
                        ? "transparent"
                        : hub.color || "#fff",
                      borderRadius: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {hub.useImage && hub.imagePath && (
                      <img
                        src={hub.imagePath}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        alt="SD Hub"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Date Window */}
          {config.dateWindow?.show && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: `${(config.dateWindow.fy ?? 0.5) * 100}%`,
                  left: `${(config.dateWindow.fx ?? 0.5) * 100}%`,
                  transform: `translate(-50%, -50%) rotate(${config.dateWindow.rotation || 0}deg)`,
                  backgroundColor:
                    config.dateWindow.backgroundColor || "#ffffff",
                  color: config.dateWindow.textColor || "#000000",
                  width: `${config.dateWindow.width || 30}px`,
                  height: `${config.dateWindow.height || 20}px`,
                  fontSize: `${(config.dateWindow.fontSize || 12) * (config.dateWindow.cyclops ? 1.6 : 1)}px`,
                  border: config.dateWindow.border || "1px solid #ccc",
                  borderRadius: `${config.dateWindow.borderRadius || 4}px`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 8,
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
                  overflow: "hidden",
                  perspective: "500px",
                }}
              >
                <div
                  ref={dateWindowRef}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: `${config.dateWindow.height || 20}px`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {[...Array(31)].map((_, i) => {
                    const height = config.dateWindow.height || 20;
                    const angle = i * (360 / 31);
                    const radius = (31 * height) / (2 * Math.PI);
                    return (
                      <div
                        key={i}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          height: `${height}px`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backfaceVisibility: "hidden",
                          transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
                        }}
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>
              </div>

              {config.dateWindow.cyclops && (
                <div
                  style={{
                    position: "absolute",
                    top: `${(config.dateWindow.fy ?? 0.5) * 100}%`,
                    left: `${(config.dateWindow.fx ?? 0.5) * 100}%`,
                    transform: `translate(-50%, -50%) rotate(${config.dateWindow.rotation || 0}deg) scale(1.22)`,
                    width: `${config.dateWindow.width || 30}px`,
                    height: `${config.dateWindow.height || 20}px`,
                    borderRadius: `${(config.dateWindow.borderRadius || 4) * 1.5}px`,
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.03) 100%)",
                    boxShadow:
                      "0 6px 16px rgba(0,0,0,0.35), inset 0 2.5px 4px rgba(255,255,255,0.95), inset 0 -2.5px 4px rgba(0,0,0,0.25), 0 0 0 1.5px rgba(255,255,255,0.65)",
                    pointerEvents: "none",
                    zIndex: 9,
                  }}
                />
              )}
            </>
          )}

          <div
            className="master-pivot"
            style={{
              position: "absolute",
              top: `${(config.pivot?.fy ?? 0.5) * 100}%`,
              left: `${(config.pivot?.fx ?? 0.5) * 100}%`,
              width: 0,
              height: 0,
              zIndex: 100,
            }}
          >
            {/* Main Hands — Supporting both Array and Object formats */}
            {(() => {
              let hands = [];
              if (Array.isArray(config.hands)) {
                hands = config.hands;
              } else if (config.hands && typeof config.hands === "object") {
                hands = [
                  { ...config.hands.hour, type: "hour" },
                  { ...config.hands.minute, type: "minute" },
                  { ...config.hands.second, type: "second" },
                ].filter((h) => h.width || h.height);
              }

              return hands.map((hand, idx) => {
                const px = hand.pivot?.x ?? 0.5;
                const py =
                  hand.pivot?.y ??
                  (hand.useImage ? 0.8 : hand.pivotCenter ? 0.5 : 1.0);
                const w = hand.width || 0;
                const h = hand.height || 0;
                return (
                  <div
                    key={idx}
                    ref={(el) => (mainHandRefs.current[idx] = el)}
                    style={{
                      position: "absolute",
                      top: `${config.hub?.fy || 0}px`,
                      left: `${config.hub?.fx || 0}px`,
                      width: `${w}px`,
                      height: `${h}px`,
                      /* Animation applies translate3d(-px%,-py%,0)+rotateZ to pivot at master-pivot origin */
                      transformOrigin: `${px * 100}% ${py * 100}%`,
                      zIndex: 20 + idx,
                      willChange: "transform",
                    }}
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox={`0 0 ${hand.width} ${hand.height}`}
                      preserveAspectRatio="none"
                      style={{ overflow: "visible" }}
                    >
                      {hand.useImage ? (
                        hand.imagePath && (
                          <image
                            href={hand.imagePath}
                            width="100%"
                            height="100%"
                            preserveAspectRatio="none"
                          />
                        )
                      ) : (
                        <rect
                          width="100%"
                          height="100%"
                          fill={hand.color || "#333"}
                          rx={hand.width / 2}
                        />
                      )}
                    </svg>
                  </div>
                );
              });
            })()}

            {/* Center Hub (Always on Top) */}
            {(() => {
              const hub = config.hub || {
                size: 10,
                color: "#1e293b",
                useImage: false,
              };
              const hubSize = hub.size || 10;
              return (
                <div
                  style={{
                    position: "absolute",
                    top: `${hub.fy || 0}px`,
                    left: `${hub.fx || 0}px`,
                    width: `${hubSize}px`,
                    height: `${hubSize}px`,
                    backgroundColor: hub.useImage
                      ? "transparent"
                      : hub.color || "#1e293b",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 150,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: hub.useImage
                      ? "none"
                      : "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)",
                    border: hub.useImage ? "none" : "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  {hub.useImage && hub.imagePath && (
                    <img
                      src={hub.imagePath}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      alt="Hub"
                    />
                  )}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Glass reflection */}
        <div className="absolute inset-0 pointer-events-none z-[101] rounded-full overflow-hidden opacity-10 mix-blend-multiply">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/80 via-transparent to-black/5 rotate-[35deg]" />
        </div>
      </div>
    </div>
  );
}
