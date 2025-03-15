
import * as React from "react"
import { cn } from "@/lib/utils"
import { useSidebar } from "./context"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { open, state, openMobile, setOpenMobile, isMobile } = useSidebar()

  return (
    <>
      {/* Desktop sidebar */}
      <div
        ref={ref}
        data-sidebar="root"
        data-state={state}
        data-collapsible={open ? "expanded" : "icon"}
        className={cn(
          "group/sidebar relative z-20 hidden h-full flex-col gap-1 overflow-hidden border-r bg-sidebar p-2 transition-[width] duration-300 ease-in-out data-[collapsible=expanded]:w-[var(--sidebar-width)] data-[collapsible=icon]:w-[var(--sidebar-width-icon)] md:flex",
          className
        )}
        {...props}
      />

      {/* Mobile sidebar dialog */}
      <Dialog open={openMobile} onOpenChange={setOpenMobile}>
        <DialogContent
          className="w-[var(--sidebar-width)] max-w-[85vw] rounded-r-none p-0 sm:max-w-[var(--sidebar-width-mobile)] data-[state=open]:slide-in-from-left"
          hideClose
        >
          <div
            data-sidebar="root-mobile"
            className="flex h-[100dvh] flex-col gap-1 overflow-hidden bg-sidebar p-2"
          >
            {props.children}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
})
Sidebar.displayName = "Sidebar"

export const SidebarRail = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="rail"
      className={cn(
        "absolute left-0 top-0 z-20 h-full w-[var(--sidebar-width-icon)] flex-col items-center p-2",
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="inset"
      className={cn("-mx-2 border-y bg-sidebar-muted py-2", className)}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"
