
import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export const SidebarMenuBadge = ({
  className,
  ...props
}: React.ComponentProps<typeof Badge>) => {
  return (
    <Badge
      variant="secondary"
      data-sidebar="menu-badge"
      className={cn(
        "ml-auto pl-[0.625rem] group-data-[collapsible=icon]/sidebar:hidden",
        className
      )}
      {...props}
    />
  )
}
SidebarMenuBadge.displayName = "SidebarMenuBadge"
