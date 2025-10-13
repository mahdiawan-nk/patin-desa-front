// /app/types/reka-ui-override.d.ts
import "reka-ui"

declare module "reka-ui" {
  // Override langsung biar Vue compiler skip extend
  interface TooltipContentProps extends /* @vue-ignore */ Record<string, any> {}
}
