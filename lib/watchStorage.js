"use client";

// IndexedDB configuration
const DB_NAME = "MegaWatchDB";
const STORE_NAME = "configs";
const DB_VERSION = 1;

// Helper to open the database
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
};

export const getWatchConfig = async (id, defaultConfig) => {
  if (typeof window === "undefined") return defaultConfig;
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || defaultConfig);
      request.onerror = () => resolve(defaultConfig);
    });
  } catch (err) {
    console.warn("IndexedDB not available, falling back to default", err);
    return defaultConfig;
  }
};

export const saveWatchConfig = async (id, config) => {
  if (typeof window === "undefined") return;
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(config, id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error("Failed to save to IndexedDB", err);
    alert("Database Error: Could not save the configuration. Your browser might be in private mode or out of space.");
  }
};

export const resetWatchConfig = async (id) => {
  if (typeof window === "undefined") return;
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.delete(id);
  } catch (err) {
    console.error("Failed to reset in IndexedDB", err);
  }
};

// Migration from localStorage (one-time)
if (typeof window !== "undefined") {
  const migrate = async () => {
    const OLD_PREFIX = "mega_watch_config_";
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      if (key.startsWith(OLD_PREFIX)) {
        const id = key.replace(OLD_PREFIX, "");
        const data = JSON.parse(localStorage.getItem(key));
        await saveWatchConfig(id, data);
        localStorage.removeItem(key);
        console.log(`Migrated ${id} to IndexedDB`);
      }
    }
  };
  migrate();
}
