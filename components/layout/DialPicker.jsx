// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const DIALS = [
//   {
//     id: "stick-dial",
//     name: "Stick dial",
//     type: "Minimalist Stick",
//     render: (time, hourAngle, minuteAngle, secondAngle) => (
//       <svg
//         viewBox="0 0 100 100"
//         className="w-full h-full bg-black rounded-full overflow-hidden select-none"
//       >
//         <circle
//           cx="50"
//           cy="50"
//           r="45"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.5"
//           className="opacity-20"
//         />
//         {[...Array(12)].map((_, i) => {
//           const angle = (i * 30 * Math.PI) / 180;
//           return (
//             <line
//               key={i}
//               x1={(50 + Math.sin(angle) * 38).toFixed(3)}
//               y1={(50 - Math.cos(angle) * 38).toFixed(3)}
//               x2={(50 + Math.sin(angle) * 43).toFixed(3)}
//               y2={(50 - Math.cos(angle) * 43).toFixed(3)}
//               stroke="white"
//               strokeWidth="0.8"
//             />
//           );
//         })}
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="26"
//           stroke="white"
//           strokeWidth="1.8"
//           strokeLinecap="round"
//           transform={`rotate(${hourAngle}, 50, 50)`}
//         />
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="16"
//           stroke="white"
//           strokeWidth="1.2"
//           strokeLinecap="round"
//           transform={`rotate(${minuteAngle}, 50, 50)`}
//         />
//         <circle cx="50" cy="50" r="2.5" fill="white" />
//       </svg>
//     ),
//   },
//   {
//     id: "analog",
//     name: "Analog Dial",
//     type: "Classic Sport",
//     render: (time, hourAngle, minuteAngle, secondAngle) => {
//       const day = time ? time.getDate() : 1;
//       return (
//         <svg
//           viewBox="0 0 100 100"
//           className="w-full h-full bg-black rounded-full overflow-hidden select-none"
//         >
//           <circle
//             cx="50"
//             cy="50"
//             r="45"
//             fill="none"
//             stroke="white"
//             strokeWidth="0.75"
//             className="opacity-30"
//           />
//           {[...Array(12)].map((_, i) => {
//             const angle = (i * 30 * Math.PI) / 180;
//             return (
//               <line
//                 key={i}
//                 x1={(50 + Math.sin(angle) * 37).toFixed(3)}
//                 y1={(50 - Math.cos(angle) * 37).toFixed(3)}
//                 x2={(50 + Math.sin(angle) * 43).toFixed(3)}
//                 y2={(50 - Math.cos(angle) * 43).toFixed(3)}
//                 stroke="white"
//                 strokeWidth={i % 3 === 0 ? "1.5" : "0.5"}
//               />
//             );
//           })}
//           {/* Date Window */}
//           <rect
//             x="68"
//             y="44"
//             width="10"
//             height="12"
//             rx="1"
//             fill="none"
//             stroke="white"
//             strokeWidth="0.5"
//             className="opacity-40"
//           />
//           <text
//             x="73"
//             y="52"
//             fill="white"
//             fontSize="6.5"
//             fontFamily="sans-serif"
//             textAnchor="middle"
//             fontWeight="bold"
//           >
//             {day}
//           </text>

//           <line
//             x1="50"
//             y1="50"
//             x2="50"
//             y2="28"
//             stroke="white"
//             strokeWidth="2"
//             strokeLinecap="round"
//             transform={`rotate(${hourAngle}, 50, 50)`}
//           />
//           <line
//             x1="50"
//             y1="50"
//             x2="50"
//             y2="18"
//             stroke="white"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             transform={`rotate(${minuteAngle}, 50, 50)`}
//           />
//           <line
//             x1="50"
//             y1="50"
//             x2="50"
//             y2="12"
//             stroke="white"
//             strokeWidth="0.6"
//             strokeLinecap="round"
//             transform={`rotate(${secondAngle}, 50, 50)`}
//           />
//           <circle cx="50" cy="50" r="2.5" fill="white" />
//         </svg>
//       );
//     },
//   },
//   {
//     id: "analog-digital",
//     name: "Analog Digital Dial",
//     type: "Sport Hybrid",
//     render: (time, hourAngle, minuteAngle, secondAngle) => {
//       const timeStr = time
//         ? `${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}`
//         : "00:00";
//       const secStr = time ? String(time.getSeconds()).padStart(2, "0") : "00";

//       return (
//         <svg
//           viewBox="0 0 100 100"
//           className="w-full h-full bg-black rounded-full overflow-hidden select-none text-white"
//         >
//           <circle
//             cx="50"
//             cy="50"
//             r="45"
//             fill="none"
//             stroke="white"
//             strokeWidth="1"
//             className="opacity-40"
//           />
//           <circle
//             cx="50"
//             cy="50"
//             r="42"
//             fill="none"
//             stroke="white"
//             strokeWidth="0.5"
//             className="opacity-20"
//           />
//           {/* LCD Window */}
//           <rect
//             x="28"
//             y="58"
//             width="44"
//             height="15"
//             rx="2"
//             fill="none"
//             stroke="white"
//             strokeWidth="0.75"
//             className="opacity-50"
//           />
//           <text
//             x="50"
//             y="68"
//             fill="white"
//             fontSize="6.5"
//             fontFamily="monospace"
//             textAnchor="middle"
//             letterSpacing="0.5"
//             fontWeight="bold"
//           >
//             {timeStr} <tspan fill="#b8860b">{secStr}</tspan>
//           </text>
//           {/* Hands */}
//           <line
//             x1="50"
//             y1="50"
//             x2="50"
//             y2="26"
//             stroke="white"
//             strokeWidth="2.2"
//             strokeLinecap="round"
//             transform={`rotate(${hourAngle}, 50, 50)`}
//           />
//           <line
//             x1="50"
//             y1="50"
//             x2="50"
//             y2="18"
//             stroke="white"
//             strokeWidth="1.6"
//             strokeLinecap="round"
//             transform={`rotate(${minuteAngle}, 50, 50)`}
//           />
//           <circle cx="50" cy="50" r="3" fill="#b8860b" />
//         </svg>
//       );
//     },
//   },
//   {
//     id: "roman-dial-round",
//     name: "Roman Dial",
//     type: "Classic Roman",
//     render: (time, hourAngle, minuteAngle, secondAngle) => (
//       <svg
//         viewBox="0 0 100 100"
//         className="w-full h-full bg-black rounded-full overflow-hidden select-none"
//       >
//         <circle
//           cx="50"
//           cy="50"
//           r="45"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.8"
//           className="opacity-40"
//         />
//         <circle
//           cx="50"
//           cy="50"
//           r="42"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.4"
//           className="opacity-20"
//         />

//         {/* Roman Hours */}
//         <text
//           x="50"
//           y="21"
//           fill="white"
//           fontSize="9"
//           fontFamily="'Cinzel', 'Times New Roman', serif"
//           fontWeight="bold"
//           textAnchor="middle"
//         >
//           XII
//         </text>
//         <text
//           x="81"
//           y="53"
//           fill="white"
//           fontSize="9"
//           fontFamily="'Cinzel', 'Times New Roman', serif"
//           fontWeight="bold"
//           textAnchor="middle"
//         >
//           III
//         </text>
//         <text
//           x="50"
//           y="85"
//           fill="white"
//           fontSize="9"
//           fontFamily="'Cinzel', 'Times New Roman', serif"
//           fontWeight="bold"
//           textAnchor="middle"
//         >
//           VI
//         </text>
//         <text
//           x="19"
//           y="53"
//           fill="white"
//           fontSize="9"
//           fontFamily="'Cinzel', 'Times New Roman', serif"
//           fontWeight="bold"
//           textAnchor="middle"
//         >
//           IX
//         </text>

//         {/* Simple ticks for other hours */}
//         {[...Array(12)].map((_, i) => {
//           if (i % 3 === 0) return null;
//           const angle = (i * 30 * Math.PI) / 180;
//           return (
//             <line
//               key={i}
//               x1={(50 + Math.sin(angle) * 38).toFixed(3)}
//               y1={(50 - Math.cos(angle) * 38).toFixed(3)}
//               x2={(50 + Math.sin(angle) * 43).toFixed(3)}
//               y2={(50 - Math.cos(angle) * 43).toFixed(3)}
//               stroke="white"
//               strokeWidth="0.6"
//               className="opacity-60"
//             />
//           );
//         })}

//         {/* Brand name */}
//         <text
//           x="50"
//           y="34"
//           fill="white"
//           fontSize="4.5"
//           fontFamily="'Inter', sans-serif"
//           fontWeight="bold"
//           letterSpacing="2"
//           textAnchor="middle"
//           className="opacity-80"
//         ></text>

//         {/* Hands */}
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="28"
//           stroke="white"
//           strokeWidth="2.2"
//           strokeLinecap="round"
//           transform={`rotate(${hourAngle}, 50, 50)`}
//         />
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="18"
//           stroke="white"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           transform={`rotate(${minuteAngle}, 50, 50)`}
//         />
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="12"
//           stroke="#b8860b"
//           strokeWidth="0.8"
//           strokeLinecap="round"
//           transform={`rotate(${secondAngle}, 50, 50)`}
//         />
//         <circle cx="50" cy="50" r="2.5" fill="#b8860b" />
//       </svg>
//     ),
//   },
//   {
//     id: "chronograph",
//     name: "Chronograph Dial",
//     type: "Chassis Design",
//     render: (time, hourAngle, minuteAngle, secondAngle) => (
//       <svg
//         viewBox="0 0 100 100"
//         className="w-full h-full bg-black rounded-full overflow-hidden select-none"
//       >
//         <circle
//           cx="50"
//           cy="50"
//           r="45"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.8"
//           className="opacity-30"
//         />
//         {/* Steel Watch casing outline background */}
//         <circle
//           cx="50"
//           cy="50"
//           r="41"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.4"
//           className="opacity-20"
//         />
//         <circle
//           cx="50"
//           cy="36"
//           r="9"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.4"
//           className="opacity-35"
//         />
//         <circle
//           cx="36"
//           cy="50"
//           r="9"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.4"
//           className="opacity-35"
//         />
//         <circle
//           cx="64"
//           cy="50"
//           r="9"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.4"
//           className="opacity-35"
//         />

//         {/* Hands */}
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="26"
//           stroke="white"
//           strokeWidth="2.2"
//           strokeLinecap="round"
//           transform={`rotate(${hourAngle}, 50, 50)`}
//         />
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="16"
//           stroke="white"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           transform={`rotate(${minuteAngle}, 50, 50)`}
//         />
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="12"
//           stroke="#b8860b"
//           strokeWidth="0.8"
//           strokeLinecap="round"
//           transform={`rotate(${secondAngle}, 50, 50)`}
//         />
//         <circle cx="50" cy="50" r="2.5" fill="#b8860b" />
//       </svg>
//     ),
//   },
//   {
//     id: "automatic",
//     name: "Automatic Dial",
//     type: "Mechanical Heart",
//     render: (time, hourAngle, minuteAngle, secondAngle) => (
//       <svg
//         viewBox="0 0 100 100"
//         className="w-full h-full bg-black rounded-full overflow-hidden select-none"
//       >
//         <circle
//           cx="50"
//           cy="50"
//           r="45"
//           fill="none"
//           stroke="white"
//           strokeWidth="1"
//           className="opacity-20"
//         />
//         {/* Concentric Gears outline in background (slowly turning) */}
//         <g
//           className="opacity-25 origin-center"
//           transform={`rotate(${secondAngle * 0.2}, 50, 50)`}
//         >
//           <circle
//             cx="50"
//             cy="50"
//             r="20"
//             fill="none"
//             stroke="white"
//             strokeWidth="0.5"
//             strokeDasharray="2,2"
//           />
//           <circle
//             cx="50"
//             cy="50"
//             r="12"
//             fill="none"
//             stroke="white"
//             strokeWidth="0.5"
//             strokeDasharray="3,1"
//           />
//           <line
//             x1="38"
//             y1="50"
//             x2="62"
//             y2="50"
//             stroke="white"
//             strokeWidth="0.5"
//           />
//           <line
//             x1="50"
//             y1="38"
//             x2="50"
//             y2="62"
//             stroke="white"
//             strokeWidth="0.5"
//           />
//         </g>
//         {/* Hands */}
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="24"
//           stroke="white"
//           strokeWidth="2.2"
//           strokeLinecap="round"
//           transform={`rotate(${hourAngle}, 50, 50)`}
//         />
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="17"
//           stroke="white"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           transform={`rotate(${minuteAngle}, 50, 50)`}
//         />
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="12"
//           stroke="#b8860b"
//           strokeWidth="0.8"
//           strokeLinecap="round"
//           transform={`rotate(${secondAngle}, 50, 50)`}
//         />
//         <circle cx="50" cy="50" r="2.5" fill="#b8860b" />
//       </svg>
//     ),
//   },
//   {
//     id: "classic",
//     name: "Classic dial",
//     type: "Concentric Roman",
//     render: (time, hourAngle, minuteAngle, secondAngle) => (
//       <svg
//         viewBox="0 0 100 100"
//         className="w-full h-full bg-black rounded-full overflow-hidden select-none"
//       >
//         <circle
//           cx="50"
//           cy="50"
//           r="47"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.6"
//         />
//         <circle
//           cx="50"
//           cy="50"
//           r="45"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.4"
//           className="opacity-80"
//         />
//         <circle
//           cx="50"
//           cy="50"
//           r="40"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.4"
//           className="opacity-80"
//         />

//         {[...Array(12)].map((_, i) => {
//           if (i === 0 || i === 6) return null;
//           const angle = (i * 30 * Math.PI) / 180;
//           const x1 = (50 + Math.sin(angle) * 33).toFixed(3);
//           const y1 = (50 - Math.cos(angle) * 33).toFixed(3);
//           const x2 = (50 + Math.sin(angle) * 38).toFixed(3);
//           const y2 = (50 - Math.cos(angle) * 38).toFixed(3);
//           return (
//             <line
//               key={i}
//               x1={x1}
//               y1={y1}
//               x2={x2}
//               y2={y2}
//               stroke="white"
//               strokeWidth={i % 3 === 0 ? "1.2" : "0.6"}
//             />
//           );
//         })}
//         <text
//           x="50"
//           y="22"
//           fill="white"
//           fontSize="9.5"
//           fontFamily="'Cinzel', 'Times New Roman', serif"
//           fontWeight="bold"
//           textAnchor="middle"
//         >
//           XII
//         </text>
//         <text
//           x="50"
//           y="85"
//           fill="white"
//           fontSize="9.5"
//           fontFamily="'Cinzel', 'Times New Roman', serif"
//           fontWeight="bold"
//           textAnchor="middle"
//         >
//           VI
//         </text>
//         <path
//           d="M49 28.5 C48.5 28.5 48 28 48.2 27.2 C48.4 26.4 49 25.8 49.5 25.8 L50 25 L50.5 25.8 C51 25.8 51.6 26.4 51.8 27.2 C52 28 51.5 28.5 51 28.5 Z"
//           fill="white"
//           className="opacity-90"
//         />
//         <text
//           x="50"
//           y="38"
//           fill="white"
//           fontSize="4.5"
//           fontFamily="'Inter', sans-serif"
//           fontWeight="bold"
//           letterSpacing="2.5"
//           textAnchor="middle"
//           className="opacity-90"
//         ></text>

//         {/* Hands */}
//         <g transform={`rotate(${hourAngle}, 50, 50)`}>
//           <polygon
//             points="48,50 48.5,36 46,36 50,26 54,36 51.5,36 52,50"
//             fill="white"
//             stroke="rgba(255,255,255,0.2)"
//             strokeWidth="0.5"
//           />
//           <line
//             x1="50"
//             y1="50"
//             x2="50"
//             y2="34"
//             stroke="black"
//             strokeWidth="0.8"
//           />
//         </g>
//         <g transform={`rotate(${minuteAngle}, 50, 50)`}>
//           <polygon
//             points="48.5,50 49,24 47.5,24 50,14 52.5,24 51,24 51.5,50"
//             fill="white"
//             stroke="rgba(255,255,255,0.2)"
//             strokeWidth="0.5"
//           />
//           <line
//             x1="50"
//             y1="50"
//             x2="50"
//             y2="22"
//             stroke="black"
//             strokeWidth="0.8"
//           />
//         </g>
//         <g transform={`rotate(${secondAngle}, 50, 50)`}>
//           <line
//             x1="50"
//             y1="56"
//             x2="50"
//             y2="12"
//             stroke="white"
//             strokeWidth="0.5"
//           />
//           <circle cx="50" cy="54" r="1.2" fill="white" />
//         </g>
//         <circle
//           cx="50"
//           cy="50"
//           r="2.8"
//           fill="white"
//           stroke="stone-600"
//           strokeWidth="0.4"
//         />
//         <circle cx="50" cy="50" r="0.8" fill="stone-800" />
//       </svg>
//     ),
//   },
//   {
//     id: "no-stick-dial",
//     name: "No Stick Dial",
//     type: "Absolute Clean",
//     render: (time, hourAngle, minuteAngle, secondAngle) => (
//       <svg
//         viewBox="0 0 100 100"
//         className="w-full h-full bg-black rounded-full overflow-hidden select-none"
//       >
//         <circle
//           cx="50"
//           cy="50"
//           r="45"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.5"
//           className="opacity-15"
//         />
//         <text
//           x="50"
//           y="32"
//           fill="white"
//           fontSize="4.5"
//           fontFamily="'Inter', sans-serif"
//           fontWeight="bold"
//           letterSpacing="3"
//           textAnchor="middle"
//           className="opacity-90"
//         ></text>
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="25"
//           stroke="white"
//           strokeWidth="2.5"
//           strokeLinecap="round"
//           transform={`rotate(${hourAngle}, 50, 50)`}
//         />
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="15"
//           stroke="white"
//           strokeWidth="1.8"
//           strokeLinecap="round"
//           transform={`rotate(${minuteAngle}, 50, 50)`}
//         />
//         <circle cx="50" cy="50" r="2.5" fill="white" />
//       </svg>
//     ),
//   },
//   {
//     id: "moonphase",
//     name: "Moon Phase Dial",
//     type: "Astronomy Cushion",
//     isSquare: true,
//     render: (time, hourAngle, minuteAngle, secondAngle) => {
//       const day = time ? time.getDate() : 1;
//       return (
//         <div className="relative w-full h-full p-2.5 bg-black rounded-[24px]">
//           <svg viewBox="0 0 100 100" className="w-full h-full text-white">
//             {/* Cushion Case Outline */}
//             <rect
//               x="5"
//               y="5"
//               width="90"
//               height="90"
//               rx="20"
//               fill="none"
//               stroke="white"
//               strokeWidth="0.8"
//               className="opacity-30"
//             />
//             <circle
//               cx="50"
//               cy="50"
//               r="38"
//               fill="none"
//               stroke="white"
//               strokeWidth="0.5"
//               className="opacity-20"
//             />

//             {/* Moonphase Indicator Cutout */}
//             <path
//               d="M35 70 C35 58, 65 58, 65 70 C65 78, 35 78, 35 70 Z"
//               fill="#1c1917"
//               stroke="white"
//               strokeWidth="0.4"
//             />
//             <circle
//               cx="50"
//               cy="67"
//               r="4"
//               fill="#facc15"
//               className="opacity-95"
//             />

//             {/* Date Indicator */}
//             <rect
//               x="70"
//               y="44"
//               width="8"
//               height="10"
//               rx="0.5"
//               fill="none"
//               stroke="white"
//               strokeWidth="0.4"
//               className="opacity-40"
//             />
//             <text
//               x="74"
//               y="51"
//               fill="white"
//               fontSize="5.5"
//               fontFamily="sans-serif"
//               textAnchor="middle"
//             >
//               {day}
//             </text>

//             <line
//               x1="50"
//               y1="50"
//               x2="50"
//               y2="28"
//               stroke="white"
//               strokeWidth="2"
//               transform={`rotate(${hourAngle}, 50, 50)`}
//             />
//             <line
//               x1="50"
//               y1="50"
//               x2="50"
//               y2="18"
//               stroke="white"
//               strokeWidth="1.5"
//               transform={`rotate(${minuteAngle}, 50, 50)`}
//             />
//             <circle cx="50" cy="50" r="2.5" fill="white" />
//           </svg>
//         </div>
//       );
//     },
//   },
//   {
//     id: "roman-dial",
//     name: "Roman Dial",
//     type: "Square Luxury",
//     isSquare: true,
//     render: (time, hourAngle, minuteAngle, secondAngle) => (
//       <div className="relative w-full h-full p-2.5 bg-black rounded-lg">
//         <svg viewBox="0 0 100 100" className="w-full h-full text-white">
//           <rect
//             x="6"
//             y="6"
//             width="88"
//             height="88"
//             rx="4"
//             fill="none"
//             stroke="white"
//             strokeWidth="0.8"
//           />
//           <rect
//             x="11"
//             y="11"
//             width="78"
//             height="78"
//             rx="2"
//             fill="none"
//             stroke="white"
//             strokeWidth="0.4"
//             className="opacity-50"
//           />

//           {/* Roman Hours */}
//           <text
//             x="50"
//             y="21"
//             fill="white"
//             fontSize="8"
//             fontFamily="serif"
//             textAnchor="middle"
//             fontWeight="bold"
//           >
//             XII
//           </text>
//           <text
//             x="83"
//             y="53"
//             fill="white"
//             fontSize="8"
//             fontFamily="serif"
//             textAnchor="middle"
//             fontWeight="bold"
//           >
//             III
//           </text>
//           <text
//             x="50"
//             y="85"
//             fill="white"
//             fontSize="8"
//             fontFamily="serif"
//             textAnchor="middle"
//             fontWeight="bold"
//           >
//             VI
//           </text>
//           <text
//             x="17"
//             y="53"
//             fill="white"
//             fontSize="8"
//             fontFamily="serif"
//             textAnchor="middle"
//             fontWeight="bold"
//           >
//             IX
//           </text>

//           <line
//             x1="50"
//             y1="50"
//             x2="50"
//             y2="30"
//             stroke="white"
//             strokeWidth="2.2"
//             transform={`rotate(${hourAngle}, 50, 50)`}
//           />
//           <line
//             x1="50"
//             y1="50"
//             x2="50"
//             y2="20"
//             stroke="white"
//             strokeWidth="1.6"
//             transform={`rotate(${minuteAngle}, 50, 50)`}
//           />
//           <circle cx="50" cy="50" r="2" fill="white" />
//         </svg>
//       </div>
//     ),
//   },
//   {
//     id: "worldtime",
//     name: "World Time Dial",
//     type: "Global Voyager",
//     render: (time, hourAngle, minuteAngle, secondAngle) => (
//       <svg
//         viewBox="0 0 100 100"
//         className="w-full h-full bg-black rounded-full overflow-hidden select-none"
//       >
//         <circle
//           cx="50"
//           cy="50"
//           r="45"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.8"
//           className="opacity-30"
//         />
//         {/* World map grid projection lines */}
//         <path
//           d="M50 5 A45 45 0 0 0 50 95"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.4"
//           className="opacity-20"
//         />
//         <path
//           d="M50 5 A25 45 0 0 0 50 95"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.4"
//           className="opacity-20"
//         />
//         <path
//           d="M50 5 A25 45 0 0 1 50 95"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.4"
//           className="opacity-20"
//         />
//         <path
//           d="M50 5 A45 45 0 0 1 50 95"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.4"
//           className="opacity-20"
//         />
//         <line
//           x1="5"
//           y1="50"
//           x2="95"
//           y2="50"
//           stroke="white"
//           strokeWidth="0.4"
//           className="opacity-20"
//         />
//         <line
//           x1="10"
//           y1="30"
//           x2="90"
//           y2="30"
//           stroke="white"
//           strokeWidth="0.4"
//           className="opacity-15"
//         />
//         <line
//           x1="10"
//           y1="70"
//           x2="90"
//           y2="70"
//           stroke="white"
//           strokeWidth="0.4"
//           className="opacity-15"
//         />

//         {/* Ticks & Hands */}
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="26"
//           stroke="white"
//           strokeWidth="2.2"
//           transform={`rotate(${hourAngle}, 50, 50)`}
//         />
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="16"
//           stroke="white"
//           strokeWidth="1.6"
//           transform={`rotate(${minuteAngle}, 50, 50)`}
//         />
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="12"
//           stroke="white"
//           strokeWidth="0.6"
//           transform={`rotate(${secondAngle}, 50, 50)`}
//         />
//         <circle cx="50" cy="50" r="2.5" fill="white" />
//       </svg>
//     ),
//   },
//   {
//     id: "tourbillon",
//     name: "Tourbillon Skeleton",
//     type: "Haute Horlogerie",
//     render: (time, hourAngle, minuteAngle, secondAngle) => (
//       <svg
//         viewBox="0 0 100 100"
//         className="w-full h-full bg-black rounded-full overflow-hidden select-none"
//       >
//         <circle
//           cx="50"
//           cy="50"
//           r="45"
//           fill="none"
//           stroke="white"
//           strokeWidth="1"
//           className="opacity-30"
//         />
//         {/* Skeleton details */}
//         <path
//           d="M25 40 L75 40 M25 40 A25 25 0 0 0 75 40"
//           fill="none"
//           stroke="white"
//           strokeWidth="0.6"
//           className="opacity-25"
//         />

//         {/* Rotating Tourbillon Cage at 6 o'clock */}
//         <g
//           transform={`rotate(${secondAngle * 6}, 50, 70)`}
//           className="origin-center"
//         >
//           <circle
//             cx="50"
//             cy="70"
//             r="14"
//             fill="none"
//             stroke="#b8860b"
//             strokeWidth="0.8"
//             className="opacity-80"
//           />
//           <line
//             x1="36"
//             y1="70"
//             x2="64"
//             y2="70"
//             stroke="#b8860b"
//             strokeWidth="0.6"
//           />
//           <line
//             x1="50"
//             y1="56"
//             x2="50"
//             y2="84"
//             stroke="#b8860b"
//             strokeWidth="0.6"
//           />
//           <circle cx="50" cy="70" r="3" fill="white" />
//         </g>

//         {/* Hands */}
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="28"
//           stroke="white"
//           strokeWidth="2.2"
//           strokeLinecap="round"
//           transform={`rotate(${hourAngle}, 50, 50)`}
//         />
//         <line
//           x1="50"
//           y1="50"
//           x2="50"
//           y2="18"
//           stroke="white"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           transform={`rotate(${minuteAngle}, 50, 50)`}
//         />
//         <circle cx="50" cy="50" r="3" fill="white" />
//       </svg>
//     ),
//   },
// ];

// export default function DialPicker() {
//   const [activeIndex, setActiveIndex] = useState(3); // Start with 'Digital' centered
//   const [mounted, setMounted] = useState(false);
//   const [currentTime, setCurrentTime] = useState(null);
//   const [windowWidth, setWindowWidth] = useState(1200);

//   const handleNext = () => {
//     setActiveIndex((prev) => (prev + 1) % DIALS.length);
//   };

//   const handlePrev = () => {
//     setActiveIndex((prev) => (prev - 1 + DIALS.length) % DIALS.length);
//   };

//   // Slider Autoplay Loop
//   useEffect(() => {
//     const timer = setInterval(() => {
//       handleNext();
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   // Time ticker updates
//   useEffect(() => {
//     setMounted(true);
//     setCurrentTime(new Date());
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Window Width tracking for sliding offsets
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setWindowWidth(window.innerWidth);
//       const resize = () => setWindowWidth(window.innerWidth);
//       window.addEventListener("resize", resize);
//       return () => window.removeEventListener("resize", resize);
//     }
//   }, []);

//   // Use a default static time during SSR and hydration, then dynamic system time post-mount
//   const timeToUse =
//     mounted && currentTime ? currentTime : new Date(2026, 0, 1, 10, 10, 0);

//   const secondAngle = timeToUse.getSeconds() * 6;
//   const minuteAngle = timeToUse.getMinutes() * 6 + timeToUse.getSeconds() * 0.1;
//   const hourAngle =
//     (timeToUse.getHours() % 12) * 30 + timeToUse.getMinutes() * 0.5;

//   return (
//     <section className="py-10 md:py-14 relative overflow-hidden bg-black text-white">
//       {/* Glow Backdrops */}
//       <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/15 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
//       <div className="absolute top-1/2 right-0 w-72 h-72 bg-accent/15 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

//       {/* Grid Overlay */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

//       <div className="w-full px-6 md:px-12 relative z-10">
//         {/* Header */}
//         <div className="flex flex-col items-center text-center mb-8 md:mb-10">
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-8 h-[1px] bg-accent/40" />
//             <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[9px] md:text-[10px]">
//               Pick Perfect Dial
//             </span>
//             <div className="w-8 h-[1px] bg-accent/40" />
//           </div>
//           <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
//             DEDICATED TO <span className="text-accent italic">STYLE.</span>
//           </h2>
//         </div>

//         {/* Carousel Slider */}
//         <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center">
//           <div className="w-full flex items-center justify-between gap-4 md:gap-8 min-h-[220px] md:min-h-[280px]">
//             {/* Prev Trigger */}
//             <button
//               onClick={handlePrev}
//               className="hidden sm:flex w-10 h-10 rounded-full border border-white/10 flex-shrink-0 items-center justify-center text-stone-400 hover:text-white hover:border-white transition-all active:scale-95 z-20"
//             >
//               &lt;
//             </button>

//             {/* Slider Track viewport */}
//             <div className="flex-grow overflow-hidden relative py-6 w-full h-[180px] sm:h-[260px] flex items-center justify-center">
//               {DIALS.map((dial, index) => {
//                 const N = DIALS.length;
//                 let diff = index - activeIndex;

//                 // Mathematics for circular loop positioning
//                 if (diff > N / 2) diff -= N;
//                 if (diff < -N / 2) diff += N;

//                 const isActive = diff === 0;
//                 const isMobileOrTablet = windowWidth < 1024;
//                 const isVisible = isMobileOrTablet
//                   ? isActive
//                   : Math.abs(diff) <= 2;

//                 // Spacing translation steps
//                 const step = windowWidth < 640 ? 96 : 240;
//                 const translateX = diff * step;

//                 return (
//                   <motion.div
//                     key={dial.id}
//                     onClick={() => setActiveIndex(index)}
//                     style={{
//                       position: "absolute",
//                     }}
//                     animate={{
//                       x: translateX,
//                       scale: isActive ? 1.15 : 0.8 - Math.abs(diff) * 0.1,
//                       opacity: isActive
//                         ? 1
//                         : isMobileOrTablet
//                           ? 0
//                           : isVisible
//                             ? 0.35 / Math.abs(diff)
//                             : 0,
//                       pointerEvents: isVisible ? "auto" : "none",
//                       zIndex: 30 - Math.abs(diff),
//                     }}
//                     transition={{ type: "spring", stiffness: 100, damping: 18 }}
//                     className={`cursor-pointer flex flex-col items-center flex-shrink-0 ${
//                       isActive
//                         ? "w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] filter drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
//                         : "w-[80px] h-[80px] sm:w-[120px] sm:h-[120px]"
//                     }`}
//                   >
//                     <div
//                       className={`w-full h-full flex items-center justify-center p-2.5 transition-all duration-500 ${
//                         dial.isSquare
//                           ? "rounded-[24px] sm:rounded-[36px]"
//                           : "rounded-full"
//                       } ${
//                         isActive
//                           ? "border-2 border-accent shadow-[0_0_30px_rgba(184,134,11,0.35)] bg-black"
//                           : "border border-transparent bg-transparent"
//                       }`}
//                     >
//                       {dial.render(
//                         currentTime,
//                         hourAngle,
//                         minuteAngle,
//                         secondAngle,
//                       )}
//                     </div>

//                     {/* Title display under non-active items */}
//                     {!isActive && isVisible && (
//                       <span className="hidden sm:block text-[8px] text-stone-500 font-bold uppercase tracking-widest mt-3 absolute -bottom-6 whitespace-nowrap">
//                         {dial.name}
//                       </span>
//                     )}
//                   </motion.div>
//                 );
//               })}
//             </div>

//             {/* Next Trigger */}
//             <button
//               onClick={handleNext}
//               className="hidden sm:flex w-10 h-10 rounded-full border border-white/10 flex-shrink-0 items-center justify-center text-stone-400 hover:text-white hover:border-white transition-all active:scale-95 z-20"
//             >
//               &gt;
//             </button>
//           </div>

//           {/* Active selection Pill */}
//           <div className="mt-4 md:mt-6 flex flex-col items-center gap-3">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={DIALS[activeIndex].id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//                 className="flex flex-col items-center"
//               >
//                 <div className="bg-white text-black px-6 py-2.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg select-none">
//                   {DIALS[activeIndex].name}
//                 </div>
//                 <span className="text-[8px] text-accent uppercase tracking-widest mt-2 font-bold">
//                   {DIALS[activeIndex].type}
//                 </span>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DIALS = [
  {
    id: "stick-dial",
    name: "Stick dial",
    type: "Minimalist Stick",
    render: (time, hourAngle, minuteAngle, secondAngle) => (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full bg-black rounded-full overflow-hidden select-none"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          className="opacity-45"
        />
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={(50 + Math.sin(angle) * 38).toFixed(3)}
              y1={(50 - Math.cos(angle) * 38).toFixed(3)}
              x2={(50 + Math.sin(angle) * 43).toFixed(3)}
              y2={(50 - Math.cos(angle) * 43).toFixed(3)}
              stroke="white"
              strokeWidth="0.8"
            />
          );
        })}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="26"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          transform={`rotate(${hourAngle}, 50, 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="16"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle}, 50, 50)`}
        />
        <circle cx="50" cy="50" r="2.5" fill="white" />
      </svg>
    ),
  },
  {
    id: "analog",
    name: "Analog Dial",
    type: "Classic Sport",
    render: (time, hourAngle, minuteAngle, secondAngle) => {
      const day = time ? time.getDate() : 1;
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full bg-black rounded-full overflow-hidden select-none"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="white"
            strokeWidth="0.75"
            className="opacity-55"
          />
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={(50 + Math.sin(angle) * 37).toFixed(3)}
                y1={(50 - Math.cos(angle) * 37).toFixed(3)}
                x2={(50 + Math.sin(angle) * 43).toFixed(3)}
                y2={(50 - Math.cos(angle) * 43).toFixed(3)}
                stroke="white"
                strokeWidth={i % 3 === 0 ? "1.5" : "0.5"}
              />
            );
          })}
          {/* Date Window */}
          <rect
            x="68"
            y="44"
            width="10"
            height="12"
            rx="1"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            className="opacity-40"
          />
          <text
            x="73"
            y="52"
            fill="white"
            fontSize="6.5"
            fontFamily="sans-serif"
            textAnchor="middle"
            fontWeight="bold"
          >
            {day}
          </text>

          <line
            x1="50"
            y1="50"
            x2="50"
            y2="28"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${hourAngle}, 50, 50)`}
          />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="18"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            transform={`rotate(${minuteAngle}, 50, 50)`}
          />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="12"
            stroke="white"
            strokeWidth="0.6"
            strokeLinecap="round"
            transform={`rotate(${secondAngle}, 50, 50)`}
          />
          <circle cx="50" cy="50" r="2.5" fill="white" />
        </svg>
      );
    },
  },
  {
    id: "analog-digital",
    name: "Analog Digital Dial",
    type: "Sport Hybrid",
    isSquare: true,
    render: (time, hourAngle, minuteAngle, secondAngle) => {
      const hourStr = time ? String(time.getHours()).padStart(2, "0") : "16";
      const minStr = time ? String(time.getMinutes()).padStart(2, "0") : "12";
      const secStr = time ? String(time.getSeconds()).padStart(2, "0") : "23";

      const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
      const dayStr = time ? days[time.getDay()] : "WE";

      const dateStr = time
        ? `${String(time.getMonth() + 1).padStart(2, "0")}-${String(time.getDate()).padStart(2, "0")}`
        : "07-01";

      const isPm = time ? time.getHours() >= 12 : false;
      const amPmStr = isPm ? "PM" : "AM";

      return (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full bg-black overflow-hidden select-none text-white"
        >
          {/* Outer Octagon Bezel */}
          <polygon
            points="26,6 74,6 94,26 94,74 74,94 26,94 6,74 6,26"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
          />
          {/* Inner Octagon Bezel Ring */}
          <polygon
            points="29,10 71,10 90,29 90,71 71,90 29,90 10,71 10,29"
            fill="none"
            stroke="white"
            strokeWidth="0.4"
            className="opacity-60"
          />

          {/* Bezel Labels (shifted outward to x=15 and x=85 to prevent overlap) */}
          {/* Top Left: LIGHT */}
          <g transform="translate(14, 36) rotate(-90)">
            <text
              fill="white"
              fontSize="4.2"
              fontFamily="sans-serif"
              textAnchor="middle"
              letterSpacing="0.5"
              className="opacity-95"
            >
              LIGHT
            </text>
          </g>
          <circle cx="14" cy="42" r="0.8" fill="white" />

          {/* Bottom Left: MODE */}
          <g transform="translate(14, 66) rotate(-90)">
            <text
              fill="white"
              fontSize="4.2"
              fontFamily="sans-serif"
              textAnchor="middle"
              letterSpacing="0.5"
              className="opacity-95"
            >
              MODE
            </text>
          </g>
          <circle cx="14" cy="60" r="0.8" fill="white" />

          {/* Top Right: START */}
          <g transform="translate(86, 36) rotate(90)">
            <text
              fill="white"
              fontSize="4.2"
              fontFamily="sans-serif"
              textAnchor="middle"
              letterSpacing="0.5"
              className="opacity-95"
            >
              START
            </text>
          </g>
          <circle cx="86" cy="42" r="0.8" fill="white" />

          {/* Bottom Right: RESET */}
          <g transform="translate(86, 66) rotate(90)">
            <text
              fill="white"
              fontSize="4.2"
              fontFamily="sans-serif"
              textAnchor="middle"
              letterSpacing="0.5"
              className="opacity-95"
            >
              RESET
            </text>
          </g>
          <circle cx="86" cy="60" r="0.8" fill="white" />

          {/* Rectangular LCD Screen */}
          <rect
            x="26"
            y="23"
            width="48"
            height="36"
            rx="3"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
            className="opacity-95"
          />

          {/* LCD Contents */}
          {/* Battery / Signal Bars (Top Left) */}
          <line
            x1="31"
            y1="33"
            x2="31"
            y2="29"
            stroke="white"
            strokeWidth="0.8"
          />
          <line
            x1="33"
            y1="33"
            x2="33"
            y2="30"
            stroke="white"
            strokeWidth="0.8"
          />
          <line
            x1="35"
            y1="33"
            x2="35"
            y2="31"
            stroke="white"
            strokeWidth="0.8"
          />
          <line
            x1="37"
            y1="33"
            x2="37"
            y2="32"
            stroke="white"
            strokeWidth="0.8"
          />
          {/* Signal Indicator Top Hat */}
          <path d="M29.5 33 L38.5 33" stroke="white" strokeWidth="0.5" />

          {/* AM / PM indicator */}
          <text
            x="34"
            y="39"
            fill="white"
            fontSize="3"
            fontFamily="sans-serif"
            fontWeight="bold"
            textAnchor="middle"
          >
            {amPmStr}
          </text>

          {/* Day of Week (Top Center) */}
          <text
            x="47"
            y="34"
            fill="white"
            fontSize="5.5"
            fontFamily="monospace"
            fontWeight="bold"
            textAnchor="middle"
          >
            {dayStr}
          </text>

          {/* Date Window (Top Right) */}
          <rect
            x="54"
            y="28"
            width="16"
            height="8"
            rx="0.5"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
          <text
            x="62"
            y="34"
            fill="#b8860b"
            fontSize="5"
            fontFamily="monospace"
            fontWeight="bold"
            textAnchor="middle"
          >
            {dateStr}
          </text>

          {/* Digital Time: Hours and Minutes (reduced font size and shifted left) */}
          <text
            x="43"
            y="52"
            fill="white"
            fontSize="10.5"
            fontFamily="monospace"
            fontWeight="bold"
            textAnchor="middle"
          >
            {hourStr}:{minStr}
          </text>

          {/* Seconds (reduced font size and shifted right) */}
          <text
            x="62"
            y="52"
            fill="#b8860b"
            fontSize="7"
            fontFamily="monospace"
            fontWeight="bold"
            textAnchor="middle"
          >
            {secStr}
          </text>

          {/* Alarm / Chime icon */}
          <circle
            cx="62"
            cy="42"
            r="1"
            fill="none"
            stroke="white"
            strokeWidth="0.4"
          />
          <path d="M60.5 43.2 L63.5 43.2" stroke="white" strokeWidth="0.4" />

          {/* Brand Logo printed below LCD screen (shifted down and tracking adjusted) */}
          <text
            x="50"
            y="80"
            fill="white"
            fontSize="5"
            fontFamily="sans-serif"
            textAnchor="middle"
            letterSpacing="3"
            fontWeight="light"
          >
            MEGAWATCH
          </text>
        </svg>
      );
    },
  },
  {
    id: "roman-dial-round",
    name: "Roman Dial",
    type: "Classic Roman",
    render: (time, hourAngle, minuteAngle, secondAngle) => (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full bg-black rounded-full overflow-hidden select-none"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          className="opacity-60"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="white"
          strokeWidth="0.4"
          className="opacity-40"
        />

        {/* Roman Hours */}
        <text
          x="50"
          y="21"
          fill="white"
          fontSize="9"
          fontFamily="'Cinzel', 'Times New Roman', serif"
          fontWeight="bold"
          textAnchor="middle"
        >
          XII
        </text>
        <text
          x="81"
          y="53"
          fill="white"
          fontSize="9"
          fontFamily="'Cinzel', 'Times New Roman', serif"
          fontWeight="bold"
          textAnchor="middle"
        >
          III
        </text>
        <text
          x="50"
          y="85"
          fill="white"
          fontSize="9"
          fontFamily="'Cinzel', 'Times New Roman', serif"
          fontWeight="bold"
          textAnchor="middle"
        >
          VI
        </text>
        <text
          x="19"
          y="53"
          fill="white"
          fontSize="9"
          fontFamily="'Cinzel', 'Times New Roman', serif"
          fontWeight="bold"
          textAnchor="middle"
        >
          IX
        </text>

        {/* Simple ticks for other hours */}
        {[...Array(12)].map((_, i) => {
          if (i % 3 === 0) return null;
          const angle = (i * 30 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={(50 + Math.sin(angle) * 38).toFixed(3)}
              y1={(50 - Math.cos(angle) * 38).toFixed(3)}
              x2={(50 + Math.sin(angle) * 43).toFixed(3)}
              y2={(50 - Math.cos(angle) * 43).toFixed(3)}
              stroke="white"
              strokeWidth="0.6"
              className="opacity-60"
            />
          );
        })}

        {/* Brand name */}
        <text
          x="50"
          y="34"
          fill="white"
          fontSize="4.5"
          fontFamily="'Inter', sans-serif"
          fontWeight="bold"
          letterSpacing="2"
          textAnchor="middle"
          className="opacity-80"
        ></text>

        {/* Hands */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="28"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          transform={`rotate(${hourAngle}, 50, 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="18"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle}, 50, 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="12"
          stroke="#b8860b"
          strokeWidth="0.8"
          strokeLinecap="round"
          transform={`rotate(${secondAngle}, 50, 50)`}
        />
        <circle cx="50" cy="50" r="2.5" fill="#b8860b" />
      </svg>
    ),
  },
  {
    id: "chronograph",
    name: "Chronograph Dial",
    type: "Chassis Design",
    render: (time, hourAngle, minuteAngle, secondAngle) => (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full bg-black rounded-full overflow-hidden select-none"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          className="opacity-55"
        />
        {/* Steel Watch casing outline background */}
        <circle
          cx="50"
          cy="50"
          r="41"
          fill="none"
          stroke="white"
          strokeWidth="0.4"
          className="opacity-40"
        />
        <circle
          cx="50"
          cy="36"
          r="9"
          fill="none"
          stroke="white"
          strokeWidth="0.4"
          className="opacity-55"
        />
        <circle
          cx="36"
          cy="50"
          r="9"
          fill="none"
          stroke="white"
          strokeWidth="0.4"
          className="opacity-55"
        />
        <circle
          cx="64"
          cy="50"
          r="9"
          fill="none"
          stroke="white"
          strokeWidth="0.4"
          className="opacity-55"
        />

        {/* Hands */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="26"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          transform={`rotate(${hourAngle}, 50, 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="16"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle}, 50, 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="12"
          stroke="#b8860b"
          strokeWidth="0.8"
          strokeLinecap="round"
          transform={`rotate(${secondAngle}, 50, 50)`}
        />
        <circle cx="50" cy="50" r="2.5" fill="#b8860b" />
      </svg>
    ),
  },
  {
    id: "automatic",
    name: "Automatic Dial",
    type: "Mechanical Heart",
    render: (time, hourAngle, minuteAngle, secondAngle) => (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full bg-black rounded-full overflow-hidden select-none"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="white"
          strokeWidth="1"
          className="opacity-40"
        />
        {/* Concentric Gears outline in background (slowly turning) */}
        <g
          className="opacity-40 origin-center"
          transform={`rotate(${secondAngle * 0.2}, 50, 50)`}
        >
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
          <circle
            cx="50"
            cy="50"
            r="12"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeDasharray="3,1"
          />
          <line
            x1="38"
            y1="50"
            x2="62"
            y2="50"
            stroke="white"
            strokeWidth="0.5"
          />
          <line
            x1="50"
            y1="38"
            x2="50"
            y2="62"
            stroke="white"
            strokeWidth="0.5"
          />
        </g>
        {/* Hands */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="24"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          transform={`rotate(${hourAngle}, 50, 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="17"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle}, 50, 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="12"
          stroke="#b8860b"
          strokeWidth="0.8"
          strokeLinecap="round"
          transform={`rotate(${secondAngle}, 50, 50)`}
        />
        <circle cx="50" cy="50" r="2.5" fill="#b8860b" />
      </svg>
    ),
  },
  {
    id: "classic",
    name: "Classic dial",
    type: "Concentric Roman",
    render: (time, hourAngle, minuteAngle, secondAngle) => (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full bg-black rounded-full overflow-hidden select-none"
      >
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="white"
          strokeWidth="0.6"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="white"
          strokeWidth="0.4"
          className="opacity-80"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="white"
          strokeWidth="0.4"
          className="opacity-80"
        />

        {[...Array(12)].map((_, i) => {
          if (i === 0 || i === 6) return null;
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = (50 + Math.sin(angle) * 33).toFixed(3);
          const y1 = (50 - Math.cos(angle) * 33).toFixed(3);
          const x2 = (50 + Math.sin(angle) * 38).toFixed(3);
          const y2 = (50 - Math.cos(angle) * 38).toFixed(3);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeWidth={i % 3 === 0 ? "1.2" : "0.6"}
            />
          );
        })}
        <text
          x="50"
          y="22"
          fill="white"
          fontSize="9.5"
          fontFamily="'Cinzel', 'Times New Roman', serif"
          fontWeight="bold"
          textAnchor="middle"
        >
          XII
        </text>
        <text
          x="50"
          y="85"
          fill="white"
          fontSize="9.5"
          fontFamily="'Cinzel', 'Times New Roman', serif"
          fontWeight="bold"
          textAnchor="middle"
        >
          VI
        </text>
        <path
          d="M49 28.5 C48.5 28.5 48 28 48.2 27.2 C48.4 26.4 49 25.8 49.5 25.8 L50 25 L50.5 25.8 C51 25.8 51.6 26.4 51.8 27.2 C52 28 51.5 28.5 51 28.5 Z"
          fill="white"
          className="opacity-90"
        />
        <text
          x="50"
          y="38"
          fill="white"
          fontSize="4.5"
          fontFamily="'Inter', sans-serif"
          fontWeight="bold"
          letterSpacing="2.5"
          textAnchor="middle"
          className="opacity-90"
        ></text>

        {/* Hands */}
        <g transform={`rotate(${hourAngle}, 50, 50)`}>
          <polygon
            points="48,50 48.5,36 46,36 50,26 54,36 51.5,36 52,50"
            fill="white"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
          />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="34"
            stroke="black"
            strokeWidth="0.8"
          />
        </g>
        <g transform={`rotate(${minuteAngle}, 50, 50)`}>
          <polygon
            points="48.5,50 49,24 47.5,24 50,14 52.5,24 51,24 51.5,50"
            fill="white"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
          />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="22"
            stroke="black"
            strokeWidth="0.8"
          />
        </g>
        <g transform={`rotate(${secondAngle}, 50, 50)`}>
          <line
            x1="50"
            y1="56"
            x2="50"
            y2="12"
            stroke="white"
            strokeWidth="0.5"
          />
          <circle cx="50" cy="54" r="1.2" fill="white" />
        </g>
        <circle
          cx="50"
          cy="50"
          r="2.8"
          fill="white"
          stroke="stone-600"
          strokeWidth="0.4"
        />
        <circle cx="50" cy="50" r="0.8" fill="stone-800" />
      </svg>
    ),
  },
  {
    id: "no-stick-dial",
    name: "No Stick Dial",
    type: "Absolute Clean",
    render: (time, hourAngle, minuteAngle, secondAngle) => (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full bg-black rounded-full overflow-hidden select-none"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          className="opacity-15"
        />
        <text
          x="50"
          y="32"
          fill="white"
          fontSize="4.5"
          fontFamily="'Inter', sans-serif"
          fontWeight="bold"
          letterSpacing="3"
          textAnchor="middle"
          className="opacity-90"
        ></text>
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="25"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${hourAngle}, 50, 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle}, 50, 50)`}
        />
        <circle cx="50" cy="50" r="2.5" fill="white" />
      </svg>
    ),
  },
  {
    id: "moonphase",
    name: "Moon Phase Dial",
    type: "Astronomy Cushion",
    isSquare: true,
    render: (time, hourAngle, minuteAngle, secondAngle) => {
      const day = time ? time.getDate() : 1;
      return (
        <div className="relative w-full h-full p-2.5 bg-black rounded-[24px]">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white">
            {/* Cushion Case Outline */}
            <rect
              x="5"
              y="5"
              width="90"
              height="90"
              rx="20"
              fill="none"
              stroke="white"
              strokeWidth="0.8"
              className="opacity-30"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              className="opacity-20"
            />

            {/* Moonphase Indicator Cutout */}
            <path
              d="M35 70 C35 58, 65 58, 65 70 C65 78, 35 78, 35 70 Z"
              fill="#1c1917"
              stroke="white"
              strokeWidth="0.4"
            />
            <circle
              cx="50"
              cy="67"
              r="4"
              fill="#facc15"
              className="opacity-95"
            />

            {/* Date Indicator */}
            <rect
              x="70"
              y="44"
              width="8"
              height="10"
              rx="0.5"
              fill="none"
              stroke="white"
              strokeWidth="0.4"
              className="opacity-40"
            />
            <text
              x="74"
              y="51"
              fill="white"
              fontSize="5.5"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              {day}
            </text>

            <line
              x1="50"
              y1="50"
              x2="50"
              y2="28"
              stroke="white"
              strokeWidth="2"
              transform={`rotate(${hourAngle}, 50, 50)`}
            />
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="18"
              stroke="white"
              strokeWidth="1.5"
              transform={`rotate(${minuteAngle}, 50, 50)`}
            />
            <circle cx="50" cy="50" r="2.5" fill="white" />
          </svg>
        </div>
      );
    },
  },
  {
    id: "roman-dial",
    name: "Roman Dial",
    type: "Square Luxury",
    isSquare: true,
    render: (time, hourAngle, minuteAngle, secondAngle) => (
      <div className="relative w-full h-full p-2.5 bg-black rounded-lg">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white">
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="4"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
          />
          <rect
            x="11"
            y="11"
            width="78"
            height="78"
            rx="2"
            fill="none"
            stroke="white"
            strokeWidth="0.4"
            className="opacity-50"
          />

          {/* Roman Hours */}
          <text
            x="50"
            y="21"
            fill="white"
            fontSize="8"
            fontFamily="serif"
            textAnchor="middle"
            fontWeight="bold"
          >
            XII
          </text>
          <text
            x="83"
            y="53"
            fill="white"
            fontSize="8"
            fontFamily="serif"
            textAnchor="middle"
            fontWeight="bold"
          >
            III
          </text>
          <text
            x="50"
            y="85"
            fill="white"
            fontSize="8"
            fontFamily="serif"
            textAnchor="middle"
            fontWeight="bold"
          >
            VI
          </text>
          <text
            x="17"
            y="53"
            fill="white"
            fontSize="8"
            fontFamily="serif"
            textAnchor="middle"
            fontWeight="bold"
          >
            IX
          </text>

          <line
            x1="50"
            y1="50"
            x2="50"
            y2="30"
            stroke="white"
            strokeWidth="2.2"
            transform={`rotate(${hourAngle}, 50, 50)`}
          />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="20"
            stroke="white"
            strokeWidth="1.6"
            transform={`rotate(${minuteAngle}, 50, 50)`}
          />
          <circle cx="50" cy="50" r="2" fill="white" />
        </svg>
      </div>
    ),
  },
  {
    id: "worldtime",
    name: "World Time Dial",
    type: "Global Voyager",
    render: (time, hourAngle, minuteAngle, secondAngle) => (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full bg-black rounded-full overflow-hidden select-none"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          className="opacity-30"
        />
        {/* World map grid projection lines */}
        <path
          d="M50 5 A45 45 0 0 0 50 95"
          fill="none"
          stroke="white"
          strokeWidth="0.4"
          className="opacity-20"
        />
        <path
          d="M50 5 A25 45 0 0 0 50 95"
          fill="none"
          stroke="white"
          strokeWidth="0.4"
          className="opacity-20"
        />
        <path
          d="M50 5 A25 45 0 0 1 50 95"
          fill="none"
          stroke="white"
          strokeWidth="0.4"
          className="opacity-20"
        />
        <path
          d="M50 5 A45 45 0 0 1 50 95"
          fill="none"
          stroke="white"
          strokeWidth="0.4"
          className="opacity-20"
        />
        <line
          x1="5"
          y1="50"
          x2="95"
          y2="50"
          stroke="white"
          strokeWidth="0.4"
          className="opacity-20"
        />
        <line
          x1="10"
          y1="30"
          x2="90"
          y2="30"
          stroke="white"
          strokeWidth="0.4"
          className="opacity-15"
        />
        <line
          x1="10"
          y1="70"
          x2="90"
          y2="70"
          stroke="white"
          strokeWidth="0.4"
          className="opacity-15"
        />

        {/* Ticks & Hands */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="26"
          stroke="white"
          strokeWidth="2.2"
          transform={`rotate(${hourAngle}, 50, 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="16"
          stroke="white"
          strokeWidth="1.6"
          transform={`rotate(${minuteAngle}, 50, 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="12"
          stroke="white"
          strokeWidth="0.6"
          transform={`rotate(${secondAngle}, 50, 50)`}
        />
        <circle cx="50" cy="50" r="2.5" fill="white" />
      </svg>
    ),
  },
  {
    id: "tourbillon",
    name: "Tourbillon Skeleton",
    type: "Haute Horlogerie",
    render: (time, hourAngle, minuteAngle, secondAngle) => (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full bg-black rounded-full overflow-hidden select-none"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="white"
          strokeWidth="1"
          className="opacity-30"
        />
        {/* Skeleton details */}
        <path
          d="M25 40 L75 40 M25 40 A25 25 0 0 0 75 40"
          fill="none"
          stroke="white"
          strokeWidth="0.6"
          className="opacity-25"
        />

        {/* Rotating Tourbillon Cage at 6 o'clock */}
        <g
          transform={`rotate(${secondAngle * 6}, 50, 70)`}
          className="origin-center"
        >
          <circle
            cx="50"
            cy="70"
            r="14"
            fill="none"
            stroke="#b8860b"
            strokeWidth="0.8"
            className="opacity-80"
          />
          <line
            x1="36"
            y1="70"
            x2="64"
            y2="70"
            stroke="#b8860b"
            strokeWidth="0.6"
          />
          <line
            x1="50"
            y1="56"
            x2="50"
            y2="84"
            stroke="#b8860b"
            strokeWidth="0.6"
          />
          <circle cx="50" cy="70" r="3" fill="white" />
        </g>

        {/* Hands */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="28"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          transform={`rotate(${hourAngle}, 50, 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="18"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle}, 50, 50)`}
        />
        <circle cx="50" cy="50" r="3" fill="white" />
      </svg>
    ),
  },
];

export default function DialPicker() {
  const [activeIndex, setActiveIndex] = useState(2); // Start with 'Digital' centered
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);
  const [windowWidth, setWindowWidth] = useState(1200);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % DIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + DIALS.length) % DIALS.length);
  };

  // Slider Autoplay Loop
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Time ticker updates
  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Window Width tracking for sliding offsets
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const resize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }
  }, []);

  // Use a default static time during SSR and hydration, then dynamic system time post-mount
  const timeToUse =
    mounted && currentTime ? currentTime : new Date(2026, 0, 1, 10, 10, 0);

  const secondAngle = timeToUse.getSeconds() * 6;
  const minuteAngle = timeToUse.getMinutes() * 6 + timeToUse.getSeconds() * 0.1;
  const hourAngle =
    (timeToUse.getHours() % 12) * 30 + timeToUse.getMinutes() * 0.5;

  return (
    <section className="py-10 md:py-14 relative overflow-hidden bg-black text-white">
      {/* Glow Backdrops */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/15 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-accent/15 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="w-full px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-accent/40" />
            <span className="text-accent font-display font-bold tracking-[0.4em] uppercase text-[9px] md:text-[10px]">
              Pick Perfect Dial
            </span>
            <div className="w-8 h-[1px] bg-accent/40" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
            DEDICATED TO <span className="text-accent italic">STYLE.</span>
          </h2>
        </div>

        {/* Carousel Slider */}
        <div className="relative w-full max-w-6xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto flex flex-col items-center">
          {/* Prev Trigger (Absolute layout to prevent shrinking the swiper track) */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute -left-4 lg:-left-12 top-[42%] -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 items-center justify-center text-stone-400 hover:text-white hover:border-white transition-all active:scale-95 z-40 bg-black/60 backdrop-blur-sm"
          >
            &lt;
          </button>

          {/* Next Trigger (Absolute layout to prevent shrinking the swiper track) */}
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute -right-4 lg:-right-12 top-[42%] -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 items-center justify-center text-stone-400 hover:text-white hover:border-white transition-all active:scale-95 z-40 bg-black/60 backdrop-blur-sm"
          >
            &gt;
          </button>

          <div className="w-full flex items-center justify-center min-h-[220px] md:min-h-[280px]">
            {/* Slider Track viewport (Occupies 100% of container width, support drag swiping) */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(e, info) => {
                const swipeThreshold = 50; // threshold in pixels to register a swipe
                if (info.offset.x < -swipeThreshold) {
                  handleNext();
                } else if (info.offset.x > swipeThreshold) {
                  handlePrev();
                }
              }}
              className="w-full overflow-hidden relative py-6 h-[180px] sm:h-[260px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            >
              {DIALS.map((dial, index) => {
                const N = DIALS.length;
                let diff = index - activeIndex;

                // Mathematics for circular loop positioning
                if (diff > N / 2) diff -= N;
                if (diff < -N / 2) diff += N;

                const isActive = diff === 0;
                const isMobileOrTablet = windowWidth < 1024;
                const isVisible = isMobileOrTablet
                  ? isActive
                  : Math.abs(diff) <= 2;

                // Spacing translation steps dynamically scaled for perfect responsive layout
                const step =
                  windowWidth >= 1536
                    ? 320
                    : windowWidth >= 1280
                      ? 260
                      : windowWidth >= 1024
                        ? 220
                        : windowWidth >= 768
                          ? 160
                          : 110;
                const translateX = diff * step;

                return (
                  <motion.div
                    key={dial.id}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      position: "absolute",
                    }}
                    animate={{
                      x: translateX,
                      scale: isActive ? 1.1 : 0.95 - Math.abs(diff) * 0.15,
                      opacity: isActive
                        ? 1
                        : isMobileOrTablet
                          ? 0
                          : isVisible
                            ? Math.abs(diff) === 1
                              ? 0.55
                              : 0.35
                            : 0,
                      pointerEvents: isVisible ? "auto" : "none",
                      zIndex: 30 - Math.abs(diff),
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 18 }}
                    className={`cursor-pointer flex flex-col items-center flex-shrink-0 w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] ${
                      isActive
                        ? "filter drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-full h-full flex items-center justify-center p-2.5 transition-all duration-500 ${
                        dial.isSquare
                          ? "rounded-[24px] sm:rounded-[36px]"
                          : "rounded-full"
                      } ${
                        isActive
                          ? "border-2 border-accent shadow-[0_0_30px_rgba(184,134,11,0.35)] bg-black"
                          : "border border-transparent bg-transparent"
                      }`}
                    >
                      {dial.render(
                        currentTime,
                        hourAngle,
                        minuteAngle,
                        secondAngle,
                      )}
                    </div>

                    {/* Title display under non-active items */}
                    {!isActive && isVisible && (
                      <span className="hidden sm:block text-[8px] text-stone-500 font-bold uppercase tracking-widest mt-3 absolute -bottom-6 whitespace-nowrap">
                        {dial.name}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Active selection Pill */}
          <div className="mt-4 md:mt-6 flex flex-col items-center gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={DIALS[activeIndex].id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="bg-white text-black px-6 py-2.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg select-none">
                  {DIALS[activeIndex].name}
                </div>
                <span className="text-[8px] text-accent uppercase tracking-widest mt-2 font-bold">
                  {DIALS[activeIndex].type}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
