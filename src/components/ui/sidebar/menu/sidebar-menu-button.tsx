
import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useSidebar } from "../context"
import { SidebarMenuButtonProps } from "../types"
import { sidebarMenuButtonVariants } from "../variants"

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    { className, asChild = false, isActive, variant, size, tooltip, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { open } = useSidebar()

    // Base button without tooltip
    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-active={isActive ? "true" : undefined}
        className={cn(sidebarMenuButtonVariants({ variant, size, className }))}
        {...props}
      />
    )

    // Only show tooltip when sidebar is collapsed and tooltip is provided
    if (!open && tooltip) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent
              side="right"
              className="flex items-center gap-4 py-1"
            >
              {typeof tooltip === "string" ? tooltip : tooltip}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return button
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

export const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-2 top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity focus:opacity-100 group-hover/menu-item:opacity-100 group-data-[collapsible=icon]/sidebar:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"
