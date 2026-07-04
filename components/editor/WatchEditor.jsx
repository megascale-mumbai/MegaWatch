"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DynamicWatch from "@/components/watch/DynamicWatch";
import { watchConfigs } from "@/components/watch/watchConfigs";
import {
  Sliders,
  Compass,
  Calendar,
  Activity,
  Plus,
  Trash2,
  Save,
  Upload,
  Sparkles,
  Info,
  Eye,
  EyeOff,
  RotateCcw,
  LogOut,
} from "lucide-react";

// REUSABLE HAND CONFIGURATOR
const HandConfigPanel = ({
  data,
  path,
  label,
  updateConfig,
  handleImageUpload,
  isUploading,
}) => {
  if (!data) return null;
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.4)] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-600">
            {label} Asset
          </span>
        </div>
        <div className="flex items-center gap-3 bg-stone-100/80 p-1.5 rounded-xl border border-stone-200 shadow-inner">
          <span className="text-[8px] font-black uppercase tracking-[0.2em] pl-2 text-stone-500">
            Use Image
          </span>
          <button
            onClick={() => updateConfig(`${path}.useImage`, !data.useImage)}
            className={`w-10 h-5 rounded-full transition-all duration-300 relative cursor-pointer ${data.useImage ? "bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.3)]" : "bg-stone-300"}`}
          >
            <div
              className={`absolute top-1 w-3 h-3 rounded-full transition-all duration-300 ${data.useImage ? "left-6 bg-white" : "left-1 bg-stone-500"}`}
            />
          </button>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white border border-stone-200/80 flex gap-4 items-center shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center overflow-hidden shrink-0">
          {data.imagePath ? (
            <img
              src={data.imagePath}
              className="max-w-[85%] max-h-[85%] object-contain"
              alt="Hand"
            />
          ) : (
            <div className="text-stone-400">
              <svg
                className="w-8 h-8 opacity-50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <input
            type="file"
            id={`upload-${path}`}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageUpload(`${path}.imagePath`, e)}
          />
          <label
            htmlFor={`upload-${path}`}
            className={`w-full py-2 bg-stone-100 text-stone-800 text-[10px] font-black rounded-xl text-center transition-all uppercase tracking-[0.2em] border border-stone-200 shadow-sm flex items-center justify-center gap-2 ${
              isUploading ? "opacity-60 cursor-not-allowed" : "hover:bg-stone-200 cursor-pointer"
            }`}
          >
            {isUploading ? (
              <>
                <div className="w-3 h-3 border-2 border-stone-400 border-t-indigo-600 rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                {data.imagePath ? "Change Image" : "Upload Image"}
              </>
            )}
          </label>
          {data.imagePath && (
            <button
              onClick={() => updateConfig(`${path}.imagePath`, "")}
              className="text-[9px] font-bold text-stone-500 hover:text-red-600 transition-all uppercase tracking-[0.1em] text-left cursor-pointer"
            >
              Remove Image
            </button>
          )}
        </div>
      </div>

      {/* Sliders Stacked */}
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500">
              Hand Width
            </label>
            <input
              type="number"
              value={parseFloat(data.width || 2).toFixed(1)}
              onChange={(e) =>
                updateConfig(`${path}.width`, parseFloat(e.target.value))
              }
              className="w-16 text-right text-[11px] font-black tabular-nums text-indigo-600 bg-white border border-stone-200 rounded-lg py-1 px-2 focus:border-indigo-500 outline-none"
              step="0.1"
            />
          </div>
          <input
            type="range"
            min="0.5"
            max="200"
            step="0.1"
            value={data.width || 2}
            onChange={(e) =>
              updateConfig(`${path}.width`, parseFloat(e.target.value))
            }
            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500">
              Hand Length
            </label>
            <input
              type="number"
              value={data.height || 100}
              onChange={(e) =>
                updateConfig(`${path}.height`, parseFloat(e.target.value))
              }
              className="w-16 text-right text-[11px] font-black tabular-nums text-indigo-600 bg-white border border-stone-200 rounded-lg py-1 px-2 focus:border-indigo-500 outline-none"
            />
          </div>
          <input
            type="range"
            min="5"
            max="800"
            step="1"
            value={data.height || 100}
            onChange={(e) =>
              updateConfig(`${path}.height`, parseFloat(e.target.value))
            }
            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Pivot Controls */}
        <div className="grid grid-cols-2 gap-6 pt-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[8px] font-black uppercase tracking-[0.2em] text-stone-500">
                Pivot X
              </label>
              <input
                type="number"
                value={data.pivot?.x ?? 0.5}
                onChange={(e) =>
                  updateConfig(`${path}.pivot.x`, parseFloat(e.target.value))
                }
                className="w-16 text-right text-[10px] font-black text-indigo-600 bg-white border border-stone-200 rounded-lg py-0.5 px-1 focus:border-indigo-500 outline-none"
                step="0.001"
                min="0"
                max="1"
              />
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={data.pivot?.x ?? 0.5}
              onChange={(e) =>
                updateConfig(`${path}.pivot.x`, parseFloat(e.target.value))
              }
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[8px] font-black uppercase tracking-[0.2em] text-stone-500">
                Pivot Y
              </label>
              <input
                type="number"
                value={data.pivot?.y ?? (data.useImage ? 0.8 : 1.0)}
                onChange={(e) =>
                  updateConfig(`${path}.pivot.y`, parseFloat(e.target.value))
                }
                className="w-16 text-right text-[10px] font-black text-indigo-600 bg-white border border-stone-200 rounded-lg py-0.5 px-1 focus:border-indigo-500 outline-none"
                step="0.001"
                min="0"
                max="1"
              />
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={data.pivot?.y ?? (data.useImage ? 0.8 : 1.0)}
              onChange={(e) =>
                updateConfig(`${path}.pivot.y`, parseFloat(e.target.value))
              }
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        {!data.useImage && (
          <div className="space-y-3 pt-3 border-t border-stone-200">
            <div className="flex justify-between items-center">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500">
                Hand Color
              </label>
              <span className="text-[10px] font-mono text-stone-600">
                {data.color || "#333333"}
              </span>
            </div>
            <div className="flex gap-4">
              <div className="p-1 bg-white rounded-lg border border-stone-200 shadow-inner">
                <input
                  type="color"
                  value={data.color || "#333333"}
                  onChange={(e) =>
                    updateConfig(`${path}.color`, e.target.value)
                  }
                  className="w-10 h-8 rounded cursor-pointer bg-transparent border-none"
                />
              </div>
              <div className="flex-1 flex gap-2 flex-wrap items-center">
                {[
                  "#333333",
                  "#FFFFFF",
                  "#EF4444",
                  "#3B82F6",
                  "#F59E0B",
                  "#10B981",
                ].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => updateConfig(`${path}.color`, preset)}
                    className="w-6 h-6 rounded-full border border-stone-200 shadow-sm transition-transform hover:scale-125 cursor-pointer"
                    style={{ backgroundColor: preset }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// REUSABLE HUB CONFIGURATOR
const HubConfigPanel = ({
  data,
  path,
  label,
  updateConfig,
  handleImageUpload,
  isUploading,
}) => {
  return (
    <div className="space-y-6 p-6 rounded-[2rem] bg-stone-50/50 border border-stone-200/80 shadow-inner animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-700">
            {label} Center Dot
          </span>
        </div>
        <div className="flex items-center gap-3 bg-stone-100/80 p-1.5 rounded-xl border border-stone-200 shadow-inner">
          <span className="text-[8px] font-black uppercase tracking-[0.2em] pl-2 text-stone-500">
            Use Image
          </span>
          <button
            onClick={() => updateConfig(`${path}.useImage`, !data?.useImage)}
            className={`w-10 h-5 rounded-full transition-all duration-300 relative cursor-pointer ${data?.useImage ? "bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.3)]" : "bg-stone-300"}`}
          >
            <div
              className={`absolute top-1 w-3 h-3 rounded-full transition-all duration-300 ${data?.useImage ? "left-6 bg-white" : "left-1 bg-stone-500"}`}
            />
          </button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center overflow-hidden shrink-0">
          {data?.imagePath ? (
            <img
              src={data.imagePath}
              className="max-w-[85%] max-h-[85%] object-contain"
              alt="Hub"
            />
          ) : (
            <div className="text-stone-400">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="opacity-50"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <input
            type="file"
            id={`upload-hub-${path}`}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageUpload(`${path}.imagePath`, e)}
          />
          <label
            htmlFor={`upload-hub-${path}`}
            className={`w-full py-2 bg-stone-100 text-stone-800 text-[10px] font-black rounded-xl border border-stone-200 text-center transition-all uppercase tracking-[0.2em] shadow-sm flex items-center justify-center gap-2 ${
              isUploading ? "opacity-60 cursor-not-allowed" : "hover:bg-stone-200 cursor-pointer"
            }`}
          >
            {isUploading ? (
              <>
                <div className="w-3 h-3 border-2 border-stone-400 border-t-indigo-600 rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5" />
                {data?.imagePath ? "Change Hub" : "Upload Hub"}
              </>
            )}
          </label>
          {data?.imagePath && (
            <button
              onClick={() => updateConfig(`${path}.imagePath`, "")}
              className="text-[9px] font-bold text-stone-500 hover:text-red-400 transition-all uppercase tracking-[0.1em] text-left cursor-pointer"
            >
              Remove Image
            </button>
          )}
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500">
              Hub Size
            </label>
            <input
              type="number"
              value={data?.size || 10}
              onChange={(e) =>
                updateConfig(`${path}.size`, parseInt(e.target.value))
              }
              className="w-16 text-right text-[11px] font-black text-indigo-600 bg-white border border-stone-200 rounded-lg py-1 px-2 focus:border-indigo-500 outline-none"
            />
          </div>
          <input
            type="range"
            min="2"
            max="200"
            step="1"
            value={data?.size || 10}
            onChange={(e) =>
              updateConfig(`${path}.size`, parseInt(e.target.value))
            }
            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Hub Position Fine-tuning */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500">
                X Position Offset
              </label>
              <input
                type="number"
                value={(data?.fx || 0).toFixed(1)}
                onChange={(e) =>
                  updateConfig(`${path}.fx`, parseFloat(e.target.value))
                }
                className="w-16 text-right text-[11px] font-bold text-stone-700 bg-white border border-stone-200 rounded-lg py-1 px-2 focus:border-indigo-500 outline-none"
                step="0.5"
              />
            </div>
            <input
              type="range"
              min="-200"
              max="200"
              step="0.5"
              value={data?.fx || 0}
              onChange={(e) =>
                updateConfig(`${path}.fx`, parseFloat(e.target.value))
              }
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500">
                Y Position Offset
              </label>
              <input
                type="number"
                value={(data?.fy || 0).toFixed(1)}
                onChange={(e) =>
                  updateConfig(`${path}.fy`, parseFloat(e.target.value))
                }
                className="w-16 text-right text-[11px] font-bold text-stone-700 bg-white border border-stone-200 rounded-lg py-1 px-2 focus:border-indigo-500 outline-none"
                step="0.5"
              />
            </div>
            <input
              type="range"
              min="-200"
              max="200"
              step="0.5"
              value={data?.fy || 0}
              onChange={(e) =>
                updateConfig(`${path}.fy`, parseFloat(e.target.value))
              }
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        {!data?.useImage && (
          <div className="space-y-3 pt-3 border-t border-stone-200">
            <div className="flex justify-between items-center">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500">
                Dot Color
              </label>
              <span className="text-[10px] font-mono text-stone-600 uppercase">
                {data?.color || "#ffffff"}
              </span>
            </div>
            <div className="flex items-center gap-2 p-1 bg-white rounded-lg border border-stone-200">
              <input
                type="color"
                value={data?.color || "#ffffff"}
                onChange={(e) => updateConfig(`${path}.color`, e.target.value)}
                className="w-full h-8 rounded cursor-pointer border-none bg-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function WatchEditor() {
  const router = useRouter();
  const [selectedWatchId, setSelectedWatchId] = useState("");
  const [config, setConfig] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [draggingId, setDraggingId] = useState(null);
  const [backendId, setBackendId] = useState(null); // MongoDB _id
  const [isSyncing, setIsSyncing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newModelId, setNewModelId] = useState("");
  const [models, setModels] = useState([]);

  // Toggle helper for overlays
  const [showGuides, setShowGuides] = useState(true);
  const [viewportZoom, setViewportZoom] = useState(100);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [clickStart, setClickStart] = useState({ x: 0, y: 0 });

  // Editor Panels tabs: 'dial', 'hands', 'date', 'subdials'
  const [activeTab, setActiveTab] = useState("dial");

  // API Fetch State for E-Commerce Integration
  const [externalProducts, setExternalProducts] = useState([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);

  const fetchExternalProducts = async () => {
    setIsFetchingProducts(true);
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Expected JSON response from server");
      }
      const result = await res.json();
      if (result.success) {
        const mappedProducts = result.data.map((p) => ({
          id: p.id.toString(),
          name: p.title,
        }));
        setExternalProducts(mappedProducts);
      }
    } catch (err) {
      console.error("Network error fetching products", err);
    } finally {
      setIsFetchingProducts(false);
    }
  };

  useEffect(() => {
    if (isAddModalOpen && externalProducts.length === 0) {
      fetchExternalProducts();
    }
  }, [isAddModalOpen, externalProducts.length]);

  // Load saved models from DB on mount
  useEffect(() => {
    const fetchDbModels = async () => {
      try {
        const res = await fetch("/api/watches");
        if (res.ok) {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const result = await res.json();
            if (result.success && Array.isArray(result.data)) {
              const names = result.data.map((w) => w.name).filter(Boolean);
              setModels(names);
              if (names.length > 0) {
                const saved = localStorage.getItem("selectedWatchId");
                if (saved && names.includes(saved)) {
                  setSelectedWatchId(saved);
                } else {
                  setSelectedWatchId(names[0]);
                }
              } else {
                setSelectedWatchId("");
              }
            }
          }
        }
      } catch (err) {
        console.error("Failed to load db watches:", err);
      }
    };
    fetchDbModels();
  }, []);

  // UI State
  const [activeMainHand, setActiveMainHand] = useState(0); // Index in config.hands array
  const [activeSubHands, setActiveSubHands] = useState({}); // { subDialIdx: handIdx }

  // Initialize config from storage or defaults
  useEffect(() => {
    if (!selectedWatchId) {
      setConfig(null);
      setIsSyncing(false);
      return;
    }
    const loadConfig = async () => {
      setIsSyncing(true);
      setBackendId(null);

      const defaultConfig = watchConfigs["watch1"];
      let activeConfig = JSON.parse(JSON.stringify(defaultConfig));

      try {
        const res = await fetch(`/api/watches/${selectedWatchId}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Expected JSON response from server");
        }
        const result = await res.json();

        if (result.success && result.data) {
          const dbConfig = { ...(result.data.config || {}), ...result.data };
          delete dbConfig.config;
          activeConfig = dbConfig; // Database overrides default data
          setBackendId(result.data.id);
        }

        const mergedConfig = JSON.parse(JSON.stringify(activeConfig));
        if (!mergedConfig.hub && defaultConfig.hub) {
          mergedConfig.hub = JSON.parse(JSON.stringify(defaultConfig.hub));
        }

        if (mergedConfig.hands && !Array.isArray(mergedConfig.hands)) {
          const oldHands = mergedConfig.hands;
          mergedConfig.hands = [
            { ...oldHands.hour, type: "hour", label: "Hour Hand" },
            { ...oldHands.minute, type: "minute", label: "Minute Hand" },
            { ...oldHands.second, type: "second", label: "Second Hand" },
          ];
        }

        if (mergedConfig.subDials) {
          mergedConfig.subDials = mergedConfig.subDials.map((sd) => {
            if (!sd.hands && sd.hand) return { ...sd, hands: [sd.hand] };
            if (!sd.hands)
              return {
                ...sd,
                hands: [
                  { width: 2, height: 20, color: "#EF4444", useImage: false },
                ],
              };
            return sd;
          });
        }

        setConfig(mergedConfig);
      } catch (err) {
        console.error("Failed to load config:", err);
        setConfig(activeConfig);
      } finally {
        setIsSyncing(false);
      }
    };

    loadConfig();

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedWatchId", selectedWatchId);
    }
  }, [selectedWatchId]);

  if (isSyncing && !config)
    return (
      <div className="h-screen bg-stone-50 flex flex-col gap-4 items-center justify-center text-stone-600 tracking-widest">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-600/20 border-t-indigo-600 animate-spin" />
        <span className="text-xs uppercase font-black tracking-[0.3em]">
          Initializing Engine...
        </span>
      </div>
    );

  const updateConfig = (path, value) => {
    const newConfig = JSON.parse(JSON.stringify(config));
    const parts = path.split(".");
    let current = newConfig;
    for (let i = 0; i < parts.length - 1; i++) {
      if (current[parts[i]] === undefined) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
    setConfig(newConfig);
    setIsSaved(false);
  };

  const handleSave = async () => {
    setIsSyncing(true);
    try {
      const method = backendId ? "PUT" : "POST";
      const url = backendId ? `/api/watches/${backendId}` : "/api/watches";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...config, name: selectedWatchId }),
      });

      if (!res.ok) {
        let errorText = await res.text().catch(() => "Unknown");
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Expected JSON response from server");
      }

      const result = await res.json();
      if (result.success) {
        setBackendId(result.data.id);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      } else {
        alert("Backend Sync Error: " + result.error);
      }
    } catch (err) {
      console.error("Save failed:", err);
      alert("Database/Backend Error: " + err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleReset = async () => {
    if (confirm("Are you sure you want to reset to default settings?")) {
      setConfig(JSON.parse(JSON.stringify(watchConfigs[selectedWatchId])));
    }
  };

  const handleImageUpload = async (path, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        updateConfig(path, data.url);
      } else {
        console.error("Upload failed:", data.error);
        alert(`Image upload failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      // Reset the file input so the same file can be re-selected if needed
      e.target.value = "";
    }
  };

  const addSubDial = () => {
    const newConfig = JSON.parse(JSON.stringify(config));
    if (!newConfig.subDials) newConfig.subDials = [];
    const newId = `sd-${Date.now()}`;
    newConfig.subDials.push({
      id: newId,
      type: "seconds",
      fx: 0.5,
      fy: 0.7,
      hands: [{ width: 2, height: 20, color: "#EF4444", useImage: false }],
      hub: { size: 6, color: "#ffffff", useImage: false },
    });
    setConfig(newConfig);
    setIsSaved(false);
    setActiveTab("subdials");
  };

  const addMainHand = () => {
    const newConfig = JSON.parse(JSON.stringify(config));
    if (!Array.isArray(newConfig.hands)) newConfig.hands = [];
    newConfig.hands.push({
      type: "second",
      label: `Hand ${newConfig.hands.length + 1}`,
      width: 2,
      height: 100,
      color: "#EF4444",
      useImage: false,
      pivot: { x: 0.5, y: 0.8 },
    });
    setConfig(newConfig);
    setIsSaved(false);
    setActiveMainHand(newConfig.hands.length - 1);
    setActiveTab("hands");
  };

  const addHandToSubDial = (sdIdx) => {
    const newConfig = JSON.parse(JSON.stringify(config));
    newConfig.subDials[sdIdx].hands.push({
      width: 1.5,
      height: 15,
      color: "#3B82F6",
      useImage: false,
      label: "",
    });
    setConfig(newConfig);
    setIsSaved(false);
    setActiveSubHands((prev) => ({
      ...prev,
      [sdIdx]: newConfig.subDials[sdIdx].hands.length - 1,
    }));
  };

  const removeSubDial = (idx) => {
    if (confirm("Delete this sub-dial?")) {
      const newConfig = JSON.parse(JSON.stringify(config));
      newConfig.subDials.splice(idx, 1);
      setConfig(newConfig);
      setIsSaved(false);
    }
  };

  const autoCenterPivot = () => {
    if (!config.dialImage) {
      const newConfig = JSON.parse(JSON.stringify(config));
      newConfig.pivot = { fx: 0.5, fy: 0.5 };
      if (newConfig.hub) {
        newConfig.hub.fx = 0;
        newConfig.hub.fy = 0;
      }
      setConfig(newConfig);
      setIsSaved(false);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = config.dialImage;
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        let minX = canvas.width;
        let maxX = 0;
        let minY = canvas.height;
        let maxY = 0;
        let hasAlpha = false;

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const alpha = data[(y * canvas.width + x) * 4 + 3];
            if (alpha > 10) {
              hasAlpha = true;
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        const newConfig = JSON.parse(JSON.stringify(config));
        if (!newConfig.pivot) newConfig.pivot = {};

        if (hasAlpha) {
          const imageCenterX = (minX + maxX) / 2;
          const imageCenterY = (minY + maxY) / 2;
          newConfig.pivot.fx = imageCenterX / canvas.width;
          newConfig.pivot.fy = imageCenterY / canvas.height;
        } else {
          newConfig.pivot.fx = 0.5;
          newConfig.pivot.fy = 0.5;
        }

        if (newConfig.hub) {
          newConfig.hub.fx = 0;
          newConfig.hub.fy = 0;
        }

        setConfig(newConfig);
        setIsSaved(false);
      } catch (err) {
        console.error("Auto-center alpha detection failed:", err);
        const newConfig = JSON.parse(JSON.stringify(config));
        newConfig.pivot = { fx: 0.5, fy: 0.5 };
        if (newConfig.hub) {
          newConfig.hub.fx = 0;
          newConfig.hub.fy = 0;
        }
        setConfig(newConfig);
        setIsSaved(false);
      }
    };
    img.onerror = () => {
      const newConfig = JSON.parse(JSON.stringify(config));
      newConfig.pivot = { fx: 0.5, fy: 0.5 };
      if (newConfig.hub) {
        newConfig.hub.fx = 0;
        newConfig.hub.fy = 0;
      }
      setConfig(newConfig);
      setIsSaved(false);
    };
  };

  const handleDrag = (e) => {
    if (!draggingId) return;
    const container =
      e.currentTarget.querySelector(".scaled-preview-container") ||
      e.currentTarget;
    const rect = container.getBoundingClientRect();
    let fx = (e.clientX - rect.left) / rect.width;
    let fy = (e.clientY - rect.top) / rect.height;
    fx = Math.max(0, Math.min(1, fx));
    fy = Math.max(0, Math.min(1, fy));

    const newConfig = JSON.parse(JSON.stringify(config));
    if (draggingId === "main-pivot") {
      newConfig.pivot.fx = fx;
      newConfig.pivot.fy = fy;
    } else if (draggingId === "date-window") {
      if (newConfig.dateWindow) {
        newConfig.dateWindow.fx = fx;
        newConfig.dateWindow.fy = fy;
      }
    } else if (draggingId.startsWith("sd-")) {
      const index = parseInt(draggingId.split("-")[1]);
      if (newConfig.subDials[index]) {
        newConfig.subDials[index].fx = fx;
        newConfig.subDials[index].fy = fy;
      }
    }
    setConfig(newConfig);
    setIsSaved(false);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      router.push("/editor/login");
    }
  };

  const handleAddModel = async () => {
    if (!newModelId) return;
    const newId = newModelId;
    if (models.includes(newId)) {
      alert("Model already exists!");
      return;
    }
    const newConfig = JSON.parse(JSON.stringify(watchConfigs["watch1"]));
    const selectedProduct = externalProducts.find((p) => p.id === newId);
    newConfig.name = selectedProduct ? selectedProduct.name : newId;

    watchConfigs[newId] = newConfig;

    setModels((prev) => [...prev, newId]);
    setSelectedWatchId(newId);
    setIsAddModalOpen(false);
    setNewModelId("");

    setIsSyncing(true);
    try {
      const res = await fetch("/api/watches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newConfig, name: newId }),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Expected JSON response from server");
      }
      const result = await res.json();
      if (result.success) {
        setBackendId(result.data.id);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }
    } catch (err) {
      console.error("Failed to save draft model:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#f8fafc] text-stone-800 font-sans overflow-hidden relative">
      {/* Clean elegant light background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-50/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-50/20 rounded-full blur-[100px]" />
      </div>

      {/* Editor Sidebar */}
      <div className="relative z-10 w-full lg:w-[480px] bg-white/95 border-b lg:border-b-0 lg:border-r border-stone-200/80 shadow-2xl p-6 md:p-8 flex flex-col gap-6 h-[50vh] lg:h-full overflow-y-auto custom-scrollbar">
        <header className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h1 className="text-base font-black tracking-[0.25em] text-stone-900">
              MEGAWATCH
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={isSyncing}
              className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 shadow-sm border flex items-center gap-2 cursor-pointer ${
                isSyncing
                  ? "opacity-50 cursor-not-allowed bg-stone-100 border-stone-200 text-stone-400"
                  : isSaved
                    ? "bg-emerald-550/10 text-emerald-600 border-emerald-550/30 shadow-[0_0_15px_rgba(16,185,129,0.15)] bg-emerald-50"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-105"
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              {isSyncing ? "SYNCING..." : isSaved ? "SAVED ✓" : "SAVE CONFIG"}
            </button>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 rounded-xl text-stone-400 border border-stone-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Watch Model Selector */}
        <section className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-inner shrink-0">
          <div className="space-y-1 flex-1">
            <label className="text-[8px] uppercase tracking-[0.3em] text-stone-500 font-black">
              Active Model
            </label>
            <div className="relative">
              <select
                value={selectedWatchId}
                onChange={(e) => setSelectedWatchId(e.target.value)}
                className="w-full bg-transparent text-[12px] text-stone-900 font-black uppercase tracking-widest focus:outline-none appearance-none cursor-pointer pr-8"
                disabled={models.length === 0}
              >
                {models.length === 0 ? (
                  <option value="" className="bg-white text-stone-500">
                    -- NO MODELS ADDED --
                  </option>
                ) : (
                  models.map((id) => (
                    <option
                      key={id}
                      value={id}
                      className="bg-white text-stone-850"
                    >
                      {id.toUpperCase()}
                    </option>
                  ))
                )}
              </select>
              {models.length > 0 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500 text-xs">
                  ▼
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex-1 sm:flex-none px-3.5 py-2 bg-indigo-550/10 hover:bg-indigo-550/20 text-indigo-650 text-[9px] font-black rounded-xl border border-indigo-500/10 transition-all uppercase tracking-[0.2em] cursor-pointer"
            >
              Add Model
            </button>
            {models.length > 0 && (
              <button
                onClick={handleReset}
                className="flex-1 sm:flex-none px-3.5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 text-[9px] font-black rounded-xl border border-red-500/10 transition-all uppercase tracking-[0.2em] cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </section>

        {!config ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border border-dashed border-stone-200 rounded-2xl bg-stone-50/50">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-stone-400 mb-4 animate-bounce"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="12" cy="12" r="8"></circle>
              <path d="M12 8v8M8 12h8"></path>
            </svg>
            <h3 className="text-stone-800 font-bold uppercase tracking-wider text-sm mb-2">
              No Active Watch Model
            </h3>
            <p className="text-stone-500 text-xs leading-relaxed max-w-xs">
              Please click the <strong>Add Model</strong> button above to import
              an e-commerce product and create a customized watch configuration.
            </p>
          </div>
        ) : (
          <>
            {/* Navigation Tabs */}
            <div className="flex bg-[#f1f5f9] p-1 rounded-xl border border-[#e2e8f0] shrink-0 select-none">
              {[
                { id: "dial", label: "Dial", icon: Sliders },
                { id: "hands", label: "Hands", icon: Compass },
                { id: "date", label: "Date", icon: Calendar },
                { id: "subdials", label: "Sub-Dials", icon: Activity },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-[0.15em] transition-all cursor-pointer ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-stone-500 hover:text-stone-800 hover:bg-white/60"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENTS */}
            <div className="flex-1 space-y-6">
              {/* DIAL & HUB TAB */}
              {activeTab === "dial" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-800">
                        Watch Dial Image
                      </h2>
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.4)] animate-pulse" />
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="w-20 h-20 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center overflow-hidden shrink-0">
                        {config.dialImage ? (
                          <img
                            src={config.dialImage}
                            className="w-full h-full object-contain drop-shadow-sm"
                            alt="Dial"
                          />
                        ) : (
                          <div className="text-stone-400">
                            <svg
                              className="w-8 h-8 opacity-50"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M12 8v8M8 12h8"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col gap-3">
                        <input
                          type="file"
                          id="upload-dial"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("dialImage", e)}
                        />
                        <label
                          htmlFor="upload-dial"
                          className={`w-full py-2 bg-stone-100 text-stone-800 text-[10px] font-black rounded-xl border border-stone-200 text-center transition-all uppercase tracking-[0.2em] shadow-sm flex items-center justify-center gap-2 ${
                            isUploading ? "opacity-60 cursor-not-allowed" : "hover:bg-stone-200 cursor-pointer"
                          }`}
                        >
                          {isUploading ? (
                            <>
                              <div className="w-3 h-3 border-2 border-stone-400 border-t-indigo-600 rounded-full animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-3.5 h-3.5" />
                              {config.dialImage ? "Change Dial" : "Upload Dial"}
                            </>
                          )}
                        </label>
                        {config.dialImage && (
                          <button
                            onClick={() => updateConfig("dialImage", "")}
                            className="text-[9px] font-bold text-stone-500 hover:text-red-600 transition-all uppercase tracking-widest text-left cursor-pointer"
                          >
                            Reset to Empty
                          </button>
                        )}
                      </div>
                    </div>

                    {config.dialImage && (
                      <div className="space-y-4 pt-4 border-t border-stone-200 mt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500">
                              Dial Scale (Zoom)
                            </label>
                            <input
                              type="number"
                              value={config.dialScale || 100}
                              onChange={(e) =>
                                updateConfig(
                                  "dialScale",
                                  parseInt(e.target.value),
                                )
                              }
                              className="w-16 text-right text-[11px] font-black text-indigo-650 bg-white border border-stone-200 rounded-lg py-1 px-2 focus:border-indigo-550 outline-none"
                            />
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="300"
                            step="1"
                            value={config.dialScale || 100}
                            onChange={(e) =>
                              updateConfig(
                                "dialScale",
                                parseInt(e.target.value),
                              )
                            }
                            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Master Pivot Alignment Panel */}
                  <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-700">
                        Dial Center Pivot
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-black text-stone-500 uppercase tracking-[0.1em]">
                          <span>Pivot X</span>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={parseFloat(
                                (config.pivot?.fx ?? 0.5) * 100,
                              ).toFixed(1)}
                              onChange={(e) =>
                                updateConfig(
                                  "pivot.fx",
                                  parseFloat(e.target.value) / 100,
                                )
                              }
                              className="w-14 text-right text-[10px] font-black text-indigo-600 bg-white border border-stone-200 rounded-lg py-0.5 px-1.5 focus:border-indigo-550 outline-none"
                              step="0.1"
                            />
                            <span className="text-stone-400 font-bold">%</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="0.1"
                          value={(config.pivot?.fx ?? 0.5) * 100}
                          onChange={(e) =>
                            updateConfig(
                              "pivot.fx",
                              parseFloat(e.target.value) / 100,
                            )
                          }
                          className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-black text-stone-500 uppercase tracking-[0.1em]">
                          <span>Pivot Y</span>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={parseFloat(
                                (config.pivot?.fy ?? 0.5) * 100,
                              ).toFixed(1)}
                              onChange={(e) =>
                                updateConfig(
                                  "pivot.fy",
                                  parseFloat(e.target.value) / 100,
                                )
                              }
                              className="w-14 text-right text-[10px] font-black text-indigo-600 bg-white border border-stone-200 rounded-lg py-0.5 px-1.5 focus:border-indigo-550 outline-none"
                              step="0.1"
                            />
                            <span className="text-stone-400 font-bold">%</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="0.1"
                          value={(config.pivot?.fy ?? 0.5) * 100}
                          onChange={(e) =>
                            updateConfig(
                              "pivot.fy",
                              parseFloat(e.target.value) / 100,
                            )
                          }
                          className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                      </div>
                    </div>
                  </div>

                  <HubConfigPanel
                    updateConfig={updateConfig}
                    handleImageUpload={handleImageUpload}
                    isUploading={isUploading}
                    data={config.hub}
                    path="hub"
                    label="Main Dial"
                  />

                  {/* Calibrate Tips */}
                  <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex gap-3 text-stone-600">
                    <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div className="text-[10px] leading-relaxed">
                      <span className="font-bold text-indigo-900 block mb-0.5">
                        Quick Calibration Tip:
                      </span>
                      Drag the blue dot directly on the watch dial to align the
                      master dial pivot center accurately!
                    </div>
                  </div>
                </div>
              )}

              {/* HANDS TAB */}
              {activeTab === "hands" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
                      <label className="text-[10px] font-black text-stone-700 uppercase tracking-[0.2em]">
                        Active Hand Selection
                      </label>
                      <button
                        onClick={addMainHand}
                        className="text-[9px] font-black px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 rounded-lg transition-all uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Hand
                      </button>
                    </div>

                    <div className="relative">
                      <select
                        value={activeMainHand}
                        onChange={(e) =>
                          setActiveMainHand(parseInt(e.target.value))
                        }
                        className="w-full py-2.5 px-4 rounded-xl bg-white border border-stone-200 text-stone-800 text-[11px] font-black uppercase tracking-[0.2em] focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer shadow-inner"
                      >
                        {Array.isArray(config.hands) &&
                          config.hands.map((h, i) => (
                            <option
                              key={i}
                              value={i}
                              className="bg-white text-stone-800"
                            >
                              {h.label || `Hand ${i + 1}`}
                            </option>
                          ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-60 text-stone-500">
                        ▼
                      </div>
                    </div>

                    {Array.isArray(config.hands) &&
                      config.hands[activeMainHand] && (
                        <div className="space-y-6 pt-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[9px] font-black text-stone-500 uppercase tracking-[0.2em]">
                                Hand Label
                              </label>
                              <input
                                type="text"
                                value={config.hands[activeMainHand].label || ""}
                                onChange={(e) =>
                                  updateConfig(
                                    `hands.${activeMainHand}.label`,
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-white border border-stone-200 rounded-xl py-2 px-3 text-[11px] font-bold text-stone-800 focus:border-indigo-500 transition-all focus:outline-none shadow-inner"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] font-black text-stone-500 uppercase tracking-[0.2em]">
                                Hand Type
                              </label>
                              <select
                                value={
                                  config.hands[activeMainHand].type || "second"
                                }
                                onChange={(e) =>
                                  updateConfig(
                                    `hands.${activeMainHand}.type`,
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-white border border-stone-200 rounded-xl py-2 px-3 text-[11px] font-bold text-stone-800 appearance-none cursor-pointer"
                              >
                                <option value="hour">Hour Hand</option>
                                <option value="minute">Minute Hand</option>
                                <option value="second">Second Hand</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-stone-500 uppercase tracking-[0.2em]">
                              Movement Style
                            </label>
                            <select
                              value={
                                config.hands[activeMainHand].timing || "linear"
                              }
                              onChange={(e) =>
                                updateConfig(
                                  `hands.${activeMainHand}.timing`,
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-stone-200 rounded-xl py-2 px-3 text-[11px] font-bold text-stone-800 appearance-none cursor-pointer"
                            >
                              <option value="linear">
                                Smooth Sweep (Automatic)
                              </option>
                              <option value="steps(60)">
                                Quartz Ticking (Quartz)
                              </option>
                            </select>
                          </div>

                          <div className="p-5 rounded-2xl bg-stone-50/50 border border-stone-200/80 shadow-inner">
                            <HandConfigPanel
                              updateConfig={updateConfig}
                              handleImageUpload={handleImageUpload}
                              isUploading={isUploading}
                              label={(
                                config.hands[activeMainHand].label ||
                                `Hand ${activeMainHand + 1}`
                              ).toUpperCase()}
                              data={config.hands[activeMainHand]}
                              path={`hands.${activeMainHand}`}
                            />
                            {config.hands.length > 1 && (
                              <button
                                onClick={() => {
                                  if (confirm("Delete this hand?")) {
                                    const newConfig = JSON.parse(
                                      JSON.stringify(config),
                                    );
                                    newConfig.hands.splice(activeMainHand, 1);
                                    setConfig(newConfig);
                                    setActiveMainHand(0);
                                  }
                                }}
                                className="w-full mt-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-650 text-[9px] font-black rounded-xl border border-red-200 transition-all uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Delete Active
                                Hand
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* DATE WINDOW TAB */}
              {activeTab === "date" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
                      <h2 className="text-[10px] uppercase tracking-[0.25em] text-stone-800 font-black">
                        Date Window Configuration
                      </h2>
                      <button
                        onClick={() => {
                          const newConfig = JSON.parse(JSON.stringify(config));
                          if (!newConfig.dateWindow) {
                            newConfig.dateWindow = {
                              show: true,
                              fx: 0.5,
                              fy: 0.8,
                              backgroundColor: "#ffffff",
                              textColor: "#000000",
                              width: 25,
                              height: 18,
                              fontSize: 10,
                              borderRadius: 3,
                              border: "1px solid #ccc",
                            };
                          } else {
                            newConfig.dateWindow.show =
                              !newConfig.dateWindow.show;
                          }
                          setConfig(newConfig);
                        }}
                        className={`text-[9px] font-black px-3.5 py-1.5 border rounded-lg transition-all uppercase tracking-widest cursor-pointer flex items-center gap-1 ${config.dateWindow?.show ? "bg-red-50 hover:bg-red-100 text-red-600 border-red-200" : "bg-indigo-50 hover:bg-indigo-100 text-indigo-650 border-indigo-200"}`}
                      >
                        {config.dateWindow?.show
                          ? "Hide Window"
                          : "Enable Window"}
                      </button>
                    </div>

                    {config.dateWindow?.show ? (
                      <div className="space-y-6 group">
                        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 flex gap-3 text-stone-600">
                          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <div className="text-[10px] leading-relaxed">
                            <span className="font-bold text-amber-850 block mb-0.5">
                              Interactive Position Control:
                            </span>
                            Drag the amber dot directly on the watch dial to
                            position the date window exactly where you need it!
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-[9px] font-black text-stone-500 uppercase tracking-[0.1em]">
                              <span>X Position</span>
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={parseFloat(
                                    (config.dateWindow.fx ?? 0.5) * 100,
                                  ).toFixed(1)}
                                  onChange={(e) =>
                                    updateConfig(
                                      "dateWindow.fx",
                                      parseFloat(e.target.value) / 100,
                                    )
                                  }
                                  className="w-14 text-right text-[10px] font-black text-indigo-600 bg-white border border-stone-200 rounded-lg py-0.5 px-1.5 focus:border-indigo-550 outline-none"
                                  step="0.1"
                                />
                                <span className="text-stone-400 font-bold">
                                  %
                                </span>
                              </div>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              step="0.1"
                              value={(config.dateWindow.fx ?? 0.5) * 100}
                              onChange={(e) =>
                                updateConfig(
                                  "dateWindow.fx",
                                  parseFloat(e.target.value) / 100,
                                )
                              }
                              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-[9px] font-black text-stone-500 uppercase tracking-[0.1em]">
                              <span>Y Position</span>
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={parseFloat(
                                    (config.dateWindow.fy ?? 0.8) * 100,
                                  ).toFixed(1)}
                                  onChange={(e) =>
                                    updateConfig(
                                      "dateWindow.fy",
                                      parseFloat(e.target.value) / 100,
                                    )
                                  }
                                  className="w-14 text-right text-[10px] font-black text-indigo-600 bg-white border border-stone-200 rounded-lg py-0.5 px-1.5 focus:border-indigo-550 outline-none"
                                  step="0.1"
                                />
                                <span className="text-stone-400 font-bold">
                                  %
                                </span>
                              </div>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              step="0.1"
                              value={(config.dateWindow.fy ?? 0.8) * 100}
                              onChange={(e) =>
                                updateConfig(
                                  "dateWindow.fy",
                                  parseFloat(e.target.value) / 100,
                                )
                              }
                              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-stone-500 uppercase tracking-[0.2em]">
                              Background
                            </label>
                            <div className="flex items-center gap-2 p-1 bg-white rounded-lg border border-stone-200">
                              <input
                                type="color"
                                value={
                                  config.dateWindow.backgroundColor || "#ffffff"
                                }
                                onChange={(e) =>
                                  updateConfig(
                                    "dateWindow.backgroundColor",
                                    e.target.value,
                                  )
                                }
                                className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                              />
                              <span className="text-[10px] font-mono text-stone-600 uppercase">
                                {config.dateWindow.backgroundColor || "#ffffff"}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-stone-500 uppercase tracking-[0.2em]">
                              Text Color
                            </label>
                            <div className="flex items-center gap-2 p-1 bg-white rounded-lg border border-stone-200">
                              <input
                                type="color"
                                value={config.dateWindow.textColor || "#000000"}
                                onChange={(e) =>
                                  updateConfig(
                                    "dateWindow.textColor",
                                    e.target.value,
                                  )
                                }
                                className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                              />
                              <span className="text-[10px] font-mono text-stone-600 uppercase">
                                {config.dateWindow.textColor || "#000000"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                          <div className="space-y-2">
                            <label className="text-[8px] font-black text-stone-500 uppercase tracking-[0.15em] block text-center">
                              Width
                            </label>
                            <input
                              type="number"
                              value={config.dateWindow.width || 25}
                              onChange={(e) =>
                                updateConfig(
                                  "dateWindow.width",
                                  parseInt(e.target.value),
                                )
                              }
                              className="w-full bg-white border border-stone-200 rounded-xl py-1.5 text-[11px] font-bold text-stone-855 outline-none focus:border-indigo-500 text-center"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[8px] font-black text-stone-500 uppercase tracking-[0.15em] block text-center">
                              Height
                            </label>
                            <input
                              type="number"
                              value={config.dateWindow.height || 18}
                              onChange={(e) =>
                                updateConfig(
                                  "dateWindow.height",
                                  parseInt(e.target.value),
                                )
                              }
                              className="w-full bg-white border border-stone-200 rounded-xl py-1.5 text-[11px] font-bold text-stone-855 outline-none focus:border-indigo-500 text-center"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[8px] font-black text-stone-500 uppercase tracking-[0.15em] block text-center">
                              Font Size
                            </label>
                            <input
                              type="number"
                              value={config.dateWindow.fontSize || 10}
                              onChange={(e) =>
                                updateConfig(
                                  "dateWindow.fontSize",
                                  parseInt(e.target.value),
                                )
                              }
                              className="w-full bg-white border border-stone-200 rounded-xl py-1.5 text-[11px] font-bold text-stone-855 outline-none focus:border-indigo-500 text-center"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[8px] font-black text-stone-500 uppercase tracking-[0.15em] block text-center">
                              Radius
                            </label>
                            <input
                              type="number"
                              value={config.dateWindow.borderRadius ?? 3}
                              onChange={(e) =>
                                updateConfig(
                                  "dateWindow.borderRadius",
                                  parseInt(e.target.value),
                                )
                              }
                              className="w-full bg-white border border-stone-200 rounded-xl py-1.5 text-[11px] font-bold text-stone-855 outline-none focus:border-indigo-500 text-center"
                            />
                          </div>
                        </div>
                        <div className="space-y-2 pt-3 border-t border-stone-200">
                          <div className="flex justify-between items-center">
                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-500">
                              Rotation (Degrees)
                            </label>
                            <span className="text-[10px] font-bold text-indigo-600">
                              {config.dateWindow.rotation || 0}°
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={config.dateWindow.rotation || 0}
                            onChange={(e) =>
                              updateConfig(
                                "dateWindow.rotation",
                                parseInt(e.target.value),
                              )
                            }
                            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          />
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                          <span className="text-[9px] font-black text-stone-500 uppercase tracking-[0.2em]">
                            Glass Magnifier (Cyclops)
                          </span>
                          <button
                            onClick={() =>
                              updateConfig(
                                "dateWindow.cyclops",
                                !config.dateWindow.cyclops,
                              )
                            }
                            className={`w-10 h-5 rounded-full transition-all duration-300 relative cursor-pointer ${config.dateWindow.cyclops ? "bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.3)]" : "bg-stone-300"}`}
                          >
                            <div
                              className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 ${config.dateWindow.cyclops ? "left-5.5 bg-white" : "left-0.5 bg-stone-500"}`}
                            />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 text-center text-stone-400 text-xs">
                        Date Window is currently hidden. Click &quot;Enable
                        Window&quot; to position it.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SUBDIALS TAB */}
              {activeTab === "subdials" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
                    <h2 className="text-[10px] uppercase tracking-[0.25em] text-stone-850 font-black">
                      Multi-Function Sub-Dials
                    </h2>
                    <button
                      onClick={addSubDial}
                      className="text-[9px] font-black px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 rounded-lg transition-all uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Sub-dial
                    </button>
                  </div>

                  {config.subDials && config.subDials.length > 0 ? (
                    config.subDials.map((sd, sdIdx) => {
                      const handIdx = activeSubHands[sdIdx] || 0;
                      return (
                        <div
                          key={sd.id || sdIdx}
                          className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-6"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-stone-800 uppercase tracking-[0.2em]">
                              Sub-dial {sdIdx + 1}
                            </span>
                            <button
                              onClick={() => removeSubDial(sdIdx)}
                              className="text-stone-500 hover:text-red-600 transition-all bg-stone-50 p-1.5 rounded-lg border border-stone-200 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 flex gap-3 text-stone-600">
                            <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            <div className="text-[10px] leading-relaxed">
                              <span className="font-bold text-emerald-850 block mb-0.5">
                                Visual Pivot Tuning:
                              </span>
                              Drag the emerald dot directly on the watch dial to
                              position the Sub-dial {sdIdx + 1} center.
                            </div>
                          </div>

                          <HubConfigPanel
                            updateConfig={updateConfig}
                            handleImageUpload={handleImageUpload}
                            isUploading={isUploading}
                            data={sd.hub}
                            path={`subDials.${sdIdx}.hub`}
                            label={`Sub ${sdIdx + 1}`}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[9px] font-black text-stone-500 uppercase tracking-[0.2em]">
                                Dial Function
                              </label>
                              <select
                                value={sd.type}
                                onChange={(e) =>
                                  updateConfig(
                                    `subDials.${sdIdx}.type`,
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-white border border-stone-200 rounded-xl py-2 px-3 text-[11px] font-bold text-stone-800 appearance-none cursor-pointer"
                              >
                                <option value="seconds">Seconds</option>
                                <option value="12h">12-Hour</option>
                                <option value="24h">24-Hour</option>
                                <option value="day">Day</option>
                                <option value="date">Date</option>
                                <option value="month">Month</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] font-black text-stone-500 uppercase tracking-[0.2em]">
                                Target Hand
                              </label>
                              <div className="flex gap-2">
                                <select
                                  value={handIdx}
                                  onChange={(e) =>
                                    setActiveSubHands((prev) => ({
                                      ...prev,
                                      [sdIdx]: parseInt(e.target.value),
                                    }))
                                  }
                                  className="flex-1 bg-white border border-stone-200 rounded-xl py-2 px-3 text-[11px] font-bold text-stone-800 appearance-none cursor-pointer"
                                >
                                  {sd.hands?.map((h, i) => (
                                    <option
                                      key={i}
                                      value={i}
                                      className="text-stone-800 bg-white"
                                    >
                                      {h.label || `Hand ${i + 1}`}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  onClick={() => addHandToSubDial(sdIdx)}
                                  className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-650 rounded-xl border border-indigo-205 transition-all shadow-sm cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-stone-500 uppercase tracking-[0.2em]">
                              Hand Label
                            </label>
                            <input
                              type="text"
                              placeholder="Enter hand name..."
                              value={sd.hands?.[handIdx]?.label || ""}
                              onChange={(e) =>
                                updateConfig(
                                  `subDials.${sdIdx}.hands.${handIdx}.label`,
                                  e.target.value,
                                )
                              }
                              className="w-full bg-white border border-stone-200 rounded-xl py-2 px-4 text-[11px] font-bold text-stone-800 focus:border-indigo-500 transition-all focus:outline-none shadow-inner"
                            />
                          </div>

                          <div className="h-px bg-stone-200" />

                          <div className="p-5 rounded-2xl bg-stone-50/50 border border-stone-200/80 shadow-inner">
                            <HandConfigPanel
                              updateConfig={updateConfig}
                              handleImageUpload={handleImageUpload}
                              isUploading={isUploading}
                              label={(
                                sd.hands?.[handIdx]?.label ||
                                `Hand ${handIdx + 1}`
                              ).toUpperCase()}
                              data={sd.hands?.[handIdx]}
                              path={`subDials.${sdIdx}.hands.${handIdx}`}
                            />
                            {sd.hands?.length > 1 && (
                              <button
                                onClick={() => {
                                  const newConfig = JSON.parse(
                                    JSON.stringify(config),
                                  );
                                  newConfig.subDials[sdIdx].hands.splice(
                                    handIdx,
                                    1,
                                  );
                                  setConfig(newConfig);
                                  setActiveSubHands((prev) => ({
                                    ...prev,
                                    [sdIdx]: 0,
                                  }));
                                }}
                                className="w-full mt-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-black rounded-xl border border-red-200 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Delete Active
                                Hand
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-8 text-center text-stone-400 text-xs">
                      No sub-dials added yet. Click &quot;+ Add Sub-dial&quot;
                      to include multi-function mechanics.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="h-10 shrink-0" />
          </>
        )}
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 bg-[#f8fafc] flex items-center justify-center relative p-6 md:p-8 h-[50vh] lg:h-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.04),transparent_70%)] pointer-events-none" />

        {/* Global Guide Handles & Zoom Toolbar */}
        {config && (
          <div className="absolute top-4 right-4 left-4 z-40 flex justify-between items-center pointer-events-none">
            {/* Zoom Controls */}
            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-200/80 shadow-md flex items-center gap-2 select-none pointer-events-auto">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-stone-500 mr-1">
                Editor Zoom
              </span>
              <button
                onClick={() =>
                  setViewportZoom((prev) => Math.max(100, prev - 25))
                }
                className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold flex items-center justify-center transition-all cursor-pointer text-sm animate-pulse-on-hover"
                title="Zoom Out"
              >
                -
              </button>
              <span className="text-[10px] font-mono font-bold text-indigo-650 w-12 text-center">
                {viewportZoom}%
              </span>
              <button
                onClick={() =>
                  setViewportZoom((prev) => Math.min(400, prev + 25))
                }
                className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold flex items-center justify-center transition-all cursor-pointer text-sm animate-pulse-on-hover"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={() => {
                  setViewportZoom(100);
                  setPanOffset({ x: 0, y: 0 });
                }}
                className="text-[8px] font-extrabold text-stone-500 hover:text-stone-800 uppercase tracking-widest pl-1.5 cursor-pointer transition-all"
                title="Reset Zoom to 100%"
              >
                Reset
              </button>
            </div>

            {/* Guides Toggle */}
            <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-200/80 shadow-md flex items-center gap-2.5 select-none pointer-events-auto">
              {showGuides ? (
                <Eye className="w-3.5 h-3.5 text-indigo-650 animate-pulse" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-stone-400" />
              )}
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-stone-600">
                Guides & Handles
              </span>
              <button
                onClick={() => setShowGuides(!showGuides)}
                className={`w-9 h-5 rounded-full transition-all duration-300 relative cursor-pointer ${showGuides ? "bg-indigo-600" : "bg-stone-200"}`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 ${showGuides ? "left-4.5 bg-white shadow-sm" : "left-0.5 bg-stone-400"}`}
                />
              </button>
            </div>
          </div>
        )}

        <div className="relative w-full max-w-[650px] xl:max-w-[750px] 2xl:max-w-[850px] aspect-square rounded-none shadow-[0_20px_60px_rgba(0,0,0,0.05)] bg-white p-0 cursor-crosshair border border-stone-250 ring-1 ring-stone-200/30 z-10 overflow-hidden flex items-center justify-center">
          {config ? (
            <div
              className={`relative w-full h-full ${viewportZoom > 100 ? (isPanning ? "cursor-grabbing" : "cursor-grab") : ""}`}
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${viewportZoom / 100})`,
                transformOrigin: "center center",
                transition: isPanning ? "none" : "transform 0.1s ease-out",
              }}
              onMouseDown={(e) => {
                if (viewportZoom > 100) {
                  setIsPanning(true);
                  setPanStart({
                    x: e.clientX - panOffset.x,
                    y: e.clientY - panOffset.y,
                  });
                  setClickStart({ x: e.clientX, y: e.clientY });
                }
              }}
              onMouseMove={(e) => {
                if (isPanning) {
                  setPanOffset({
                    x: e.clientX - panStart.x,
                    y: e.clientY - panStart.y,
                  });
                } else {
                  handleDrag(e);
                }
              }}
              onMouseUp={() => {
                setIsPanning(false);
                setDraggingId(null);
              }}
              onMouseLeave={() => {
                setIsPanning(false);
                setDraggingId(null);
              }}
            >
              {/* Scaled wrapper matching the dialScale */}
              <div
                className="scaled-preview-container absolute inset-0 pointer-events-none"
                style={{
                  transform: `scale(${config.dialScale / 100 || 1})`,
                  transformOrigin: `${(config.pivot?.fx ?? 0.5) * 100}% ${(config.pivot?.fy ?? 0.5) * 100}%`,
                  transition: "transform 0.3s",
                }}
              >
                {/* Clickable Overlay to auto-select tabs */}
                <div
                  className="absolute inset-0 z-20 pointer-events-auto cursor-default"
                  onClick={(e) => {
                    const distMoved = Math.hypot(
                      e.clientX - clickStart.x,
                      e.clientY - clickStart.y,
                    );
                    if (distMoved > 5) return; // Ignore click selection during pan drags

                    const rect = e.currentTarget.getBoundingClientRect();
                    const fx = (e.clientX - rect.left) / rect.width;
                    const fy = (e.clientY - rect.top) / rect.height;

                    // 1. Check proximity to sub-dials
                    if (config.subDials) {
                      for (let i = 0; i < config.subDials.length; i++) {
                        const sd = config.subDials[i];
                        const dist = Math.hypot(
                          (sd.fx ?? 0.5) - fx,
                          (sd.fy ?? 0.7) - fy,
                        );
                        if (dist < 0.12) {
                          setActiveTab("subdials");
                          setActiveSubHands((prev) => ({ ...prev, [i]: 0 }));
                          return;
                        }
                      }
                    }

                    // 2. Check proximity to Date Window
                    if (config.dateWindow?.show) {
                      const dist = Math.hypot(
                        (config.dateWindow.fx ?? 0.5) - fx,
                        (config.dateWindow.fy ?? 0.8) - fy,
                      );
                      if (dist < 0.1) {
                        setActiveTab("date");
                        return;
                      }
                    }

                    // 3. Check proximity to Center Pivot (Main Hands)
                    const distPivot = Math.hypot(
                      (config.pivot?.fx ?? 0.5) - fx,
                      (config.pivot?.fy ?? 0.5) - fy,
                    );
                    if (distPivot < 0.15) {
                      setActiveTab("hands");
                      return;
                    }
                  }}
                >
                  <DynamicWatch config={config} />
                </div>

                {/* Pivot & Alignment Drag Handles (Visible selectively based on Active Tab) */}
                <div className="absolute inset-0 pointer-events-none rounded-none overflow-hidden z-30">
                  {/* Dashed X & Y Alignment Guidelines */}
                  {showGuides && (
                    <>
                      {/* Main Pivot Guidelines */}
                      {(activeTab === "dial" || activeTab === "hands") && (
                        <>
                          <div 
                            className="absolute h-full border-l border-dashed border-indigo-500/40 w-0"
                            style={{
                              left: `${(config.pivot?.fx ?? 0.5) * 100}%`,
                              top: 0,
                            }}
                          />
                          <div 
                            className="absolute w-full border-t border-dashed border-indigo-500/40 h-0"
                            style={{
                              top: `${(config.pivot?.fy ?? 0.5) * 100}%`,
                              left: 0,
                            }}
                          />
                        </>
                      )}

                      {/* Date Window Guidelines */}
                      {activeTab === "date" && config.dateWindow?.show && (
                        <>
                          <div 
                            className="absolute h-full border-l border-dashed border-amber-500/45 w-0"
                            style={{
                              left: `${(config.dateWindow.fx ?? 0.5) * 100}%`,
                              top: 0,
                            }}
                          />
                          <div 
                            className="absolute w-full border-t border-dashed border-amber-500/45 h-0"
                            style={{
                              top: `${(config.dateWindow.fy ?? 0.8) * 100}%`,
                              left: 0,
                            }}
                          />
                        </>
                      )}

                      {/* Sub-dials Guidelines */}
                      {activeTab === "subdials" &&
                        config.subDials?.map((sub, i) => (
                          <div key={`sd-guideline-${i}`}>
                            <div 
                              className="absolute h-full border-l border-dashed border-emerald-500/40 w-0"
                              style={{
                                left: `${(sub.fx ?? 0.5) * 100}%`,
                                top: 0,
                              }}
                            />
                            <div 
                              className="absolute w-full border-t border-dashed border-emerald-500/40 h-0"
                              style={{
                                top: `${(sub.fy ?? 0.7) * 100}%`,
                                left: 0,
                              }}
                            />
                          </div>
                        ))}
                    </>
                  )}

                  {/* Main Pivot Drag Indicator (Only visible in 'dial' or 'hands' tab) */}
                  {showGuides &&
                    (activeTab === "dial" || activeTab === "hands") && (
                      <>
                        <div
                          className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-2 border-dashed border-indigo-500/40 flex items-center justify-center transition-all ${draggingId === "main-pivot" ? "scale-125 bg-indigo-500/10" : "scale-100"}`}
                          style={{
                            left: `${(config.pivot?.fx ?? 0.5) * 100}%`,
                            top: `${(config.pivot?.fy ?? 0.5) * 100}%`,
                          }}
                        />
                        <div
                          className={`absolute w-4 h-4 -ml-2 -mt-2 bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)] cursor-crosshair pointer-events-auto transition-transform hover:scale-150 ${draggingId === "main-pivot" ? "scale-150 bg-indigo-500" : ""}`}
                          style={{
                            left: `${(config.pivot?.fx ?? 0.5) * 100}%`,
                            top: `${(config.pivot?.fy ?? 0.5) * 100}%`,
                          }}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            setDraggingId("main-pivot");
                          }}
                          title="Drag to adjust Main Pivot center"
                        />
                      </>
                    )}
 
                  {/* Date Window Drag Indicator (Only visible in 'date' tab) */}
                  {showGuides &&
                    activeTab === "date" &&
                    config.dateWindow?.show && (
                      <>
                        <div
                          className={`absolute w-12 h-8 -ml-6 -mt-4 rounded border border-dashed border-amber-500/40 flex items-center justify-center transition-all ${draggingId === "date-window" ? "scale-110 bg-amber-550/10 shadow-[0_0_15px_rgba(245,158,11,0.25)]" : ""}`}
                          style={{
                            left: `${(config.dateWindow.fx ?? 0.5) * 100}%`,
                            top: `${(config.dateWindow.fy ?? 0.8) * 100}%`,
                            transform: `rotate(${config.dateWindow.rotation || 0}deg)`,
                          }}
                        />
                        <div
                          className={`absolute w-3.5 h-3.5 -ml-1.75 -mt-1.75 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] cursor-crosshair pointer-events-auto transition-transform hover:scale-150 ${draggingId === "date-window" ? "scale-150 bg-amber-400" : ""}`}
                          style={{
                            left: `${(config.dateWindow.fx ?? 0.5) * 100}%`,
                            top: `${(config.dateWindow.fy ?? 0.8) * 100}%`,
                          }}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            setDraggingId("date-window");
                          }}
                          title="Drag to position Date Window"
                        />
                      </>
                    )}
 
                  {/* Sub-dials Drag Indicators (Only visible in 'subdials' tab) */}
                  {showGuides &&
                    activeTab === "subdials" &&
                    config.subDials?.map((sub, i) => (
                      <div key={sub.id || i}>
                        <div
                          className={`absolute w-10 h-10 -ml-5 -mt-5 rounded-full border border-dashed border-emerald-500/40 flex items-center justify-center transition-all ${draggingId === `sd-${i}` ? "scale-125 bg-emerald-500/10" : ""}`}
                          style={{
                            left: `${(sub.fx ?? 0.5) * 100}%`,
                            top: `${(sub.fy ?? 0.7) * 100}%`,
                          }}
                        />
                        <div
                          className={`absolute w-3.5 h-3.5 -ml-1.75 -mt-1.75 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] cursor-crosshair pointer-events-auto transition-transform hover:scale-150 ${draggingId === `sd-${i}` ? "scale-150 bg-emerald-400" : ""}`}
                          style={{
                            left: `${(sub.fx ?? 0.5) * 100}%`,
                            top: `${(sub.fy ?? 0.7) * 100}%`,
                          }}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            setDraggingId(`sd-${i}`);
                          }}
                          title={`Drag to position Sub-dial ${i + 1}`}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8">
              <div className="relative w-40 h-40 mx-auto mb-8 bg-stone-100 rounded-full border-2 border-dashed border-stone-300 flex items-center justify-center">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-stone-400 animate-spin-slow"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-stone-850 font-extrabold uppercase tracking-[0.2em] text-sm mb-2">
                Watch Configurator
              </h3>
              <p className="text-stone-500 text-[10px] font-semibold uppercase tracking-widest">
                Select or Add a Model to Begin Design
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Model Modal */}
      {isAddModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-lg font-black text-stone-900 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-650" />
              Select E-Commerce Product
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">
                  Available Products from API
                </label>
                {isFetchingProducts ? (
                  <div className="w-full px-4 py-3 bg-stone-50 border border-stone-250 rounded-xl text-stone-500 font-bold text-center animate-pulse text-xs">
                    Fetching products...
                  </div>
                ) : (
                  <div className="relative">
                    <select
                      value={newModelId}
                      onChange={(e) => setNewModelId(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-stone-855 font-bold appearance-none cursor-pointer text-xs"
                    >
                      <option
                        value=""
                        disabled
                        className="bg-white text-stone-500"
                      >
                        -- Select a product --
                      </option>
                      {externalProducts.map((product) => (
                        <option
                          key={product.id}
                          value={product.id}
                          className="text-stone-800 bg-white"
                        >
                          {product.name} ({product.id})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-60 text-stone-900">
                      ▼
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-stone-105 hover:bg-stone-200 text-stone-700 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer border border-stone-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddModel}
                  disabled={!newModelId || isFetchingProducts}
                  className="flex-1 py-3 px-4 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Create Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
