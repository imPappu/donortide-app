
// Re-export everything from the sub-files
export { useSidebar, SidebarProvider } from './context'
export { Sidebar, SidebarRail, SidebarInset } from './sidebar-base'
export {
  SidebarTrigger,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent
} from './sidebar-elements'

// Import and re-export all menu components from the new location
export {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from './menu'
