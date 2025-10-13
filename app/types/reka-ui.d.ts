// /app/types/reka-ui.d.ts

// Shim untuk memperbaiki error Vue SFC "Failed to resolve extends base type"
// pada package reka-ui saat digunakan di shadcn-vue

// declare module "reka-ui" {
  // Fallback untuk props/emit yang gagal di-extend
//   interface TooltipContentImplProps {}
//   interface TooltipContentImplEmits {}

  // Bisa tambahkan fallback lain jika ada error serupa di komponen berbeda:
  // interface DialogContentImplProps {}
  // interface DialogContentImplEmits {}
// }
