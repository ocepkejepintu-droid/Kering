/**
 * Areas kept in this browser (IndexedDB), so they load without the network after the first time.
 * IndexedDB works on plain-HTTP pages, unlike service workers and the Cache API, which need HTTPS.
 * Each record carries the data fingerprint of the build that stored it; after a data rebuild the
 * old records are ignored and replaced on the next load.
 */
export const DATA_VERSION: string = typeof __KERING_DATA__ === "string" ? __KERING_DATA__ : "dev";
const DB = "kering", STORE = "areas";

interface Rec { id: string; version: string; text: string }

let dbp: Promise<IDBDatabase | null> | null = null;
function db(): Promise<IDBDatabase | null> {
  if (dbp) return dbp;
  dbp = new Promise((res) => {
    try {
      if (typeof indexedDB === "undefined") return res(null);
      const r = indexedDB.open(DB, 1);
      r.onupgradeneeded = () => { r.result.createObjectStore(STORE, { keyPath: "id" }); };
      r.onsuccess = () => res(r.result);
      r.onerror = () => res(null);
      r.onblocked = () => res(null);
    } catch { res(null); } // private windows and some embeds refuse storage: run without it
  });
  return dbp;
}

function tx<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T | null> {
  return db().then((d) => new Promise((res) => {
    if (!d) return res(null);
    try {
      const r = fn(d.transaction(STORE, mode).objectStore(STORE));
      r.onsuccess = () => res(r.result);
      r.onerror = () => res(null);
    } catch { res(null); }
  }));
}

/** The area's JSON text if this browser holds it for the current data, else null. */
export async function getSaved(id: string): Promise<string | null> {
  const rec = (await tx<Rec | undefined>("readonly", (s) => s.get(id))) as Rec | null | undefined;
  return rec && rec.version === DATA_VERSION ? rec.text : null;
}

export async function putSaved(id: string, text: string): Promise<boolean> {
  return (await tx("readwrite", (s) => s.put({ id, version: DATA_VERSION, text } satisfies Rec))) !== null;
}

/** Areas saved for the current data, with their size in bytes. */
export async function listSaved(): Promise<{ id: string; bytes: number }[]> {
  const all = ((await tx<Rec[]>("readonly", (s) => s.getAll())) ?? []) as Rec[];
  return all.filter((r) => r.version === DATA_VERSION).map((r) => ({ id: r.id, bytes: r.text.length }));
}

export async function clearSaved(): Promise<void> { await tx("readwrite", (s) => s.clear()); }

export const storageAvailable = async () => (await db()) !== null;
