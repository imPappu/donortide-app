
import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { SidebarMenuButton } from "./sidebar-menu-button"

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
