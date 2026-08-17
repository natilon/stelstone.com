// object-list değerleri dizi (bizim kayıtlar) ya da JSON metni (eski admin
// kayıtları) olarak gelebilir — admin'in kendisi gibi ikisine de tolerans göster.
export const asList = (v: unknown): any[] => {
  if (Array.isArray(v)) return v;
  if (typeof v === "string") {
    try { const p = JSON.parse(v); return Array.isArray(p) ? p : []; } catch { return []; }
  }
  return [];
};
