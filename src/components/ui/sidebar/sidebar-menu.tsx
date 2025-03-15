
import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { useSidebar } from "./context"
import { ChevronRight } from "lucide-react"
import { SidebarMenuButtonProps } from "./types"
import { sidebarMenuButtonVariants } from "./variants"

export const SidebarMenu = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="menu"
      className={cn("flex w-full flex-col gap-1", className)}
      {...props}
    />
  )
})
SidebarMenu.displayName = "SidebarMenu"

export const SidebarMenuItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="menu-item"
      className={cn("group/menu-item relative w-full", className)}
      {...props}
    />
  )
})
SidebarMenuItem.displayName = "SidebarMenuItem"

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

export const SidebarMenuBadge = React.forwardRef<
  React.ElementRef<typeof Badge>,
  React.ComponentProps<typeof Badge>
>(({ className, ...props }, ref) => {
  return (
    <Badge
      ref={ref}
      data-sidebar="menu-badge"
      variant="secondary"
      className={cn(
        "ml-auto pl-[0.625rem] group-data-[collapsible=icon]/sidebar:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuBadge.displayName = "SidebarMenuBadge"

export const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    itemCount?: number
    hasLabel?: boolean
  }
>(({ className, itemCount = 3, hasLabel = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex w-full flex-col gap-1", className)}
      {...props}
    >
      {hasLabel && <Skeleton className="h-5 w-20" />}
      {Array.from({ length: itemCount }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-full" />
      ))}
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

// ------------------------------------------
// Sub Menu Components
// ------------------------------------------

export const SidebarMenuSub = React.forwardRef<
  React.ElementRef<typeof Collapsible>,
  React.ComponentProps<typeof Collapsible>
>(({ className, ...props }, ref) => {
  return (
    <Collapsible
      ref={ref}
      data-sidebar="menu-sub"
      className={cn("w-full", className)}
      {...props}
    />
  )
})
SidebarMenuSub.displayName = "SidebarMenuSub"

export const SidebarMenuSubButton = React.forwardRef<
  React.ElementRef<typeof CollapsibleTrigger>,
  React.ComponentProps<typeof SidebarMenuButton>
>(({ className, children, ...props }, ref) => {
  return (
    <SidebarMenuButton
      ref={ref}
      data-sidebar="menu-sub-button"
      className={cn("justify-between", className)}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/menu-sub:rotate-90" />
    </SidebarMenuButton>
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export const SidebarMenuSubItem = React.forwardRef<
  React.ElementRef<typeof CollapsibleContent>,
  React.ComponentProps<typeof CollapsibleContent>
>(({ className, ...props }, ref) => {
  return (
    <CollapsibleContent
      ref={ref}
      data-sidebar="menu-sub-item"
      className={cn("overflow-hidden px-1 py-0", className)}
      {...props}
    />
  )
})
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"
