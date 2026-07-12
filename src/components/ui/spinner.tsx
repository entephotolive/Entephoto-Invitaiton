import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.ComponentProps<typeof Loader2> {}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Loader2
      className={cn("h-4 w-4 animate-spin", className)}
      {...props}
    />
  )
}

export function GlobalLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  )
}
