import React from 'react';
import SidebarNav from '../Dashboard/SidebarNav'; // Relative path to existing component

interface SidebarProps {
  className?: string; // To be passed to SidebarNav if specific styling overrides are needed
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  // SidebarNav handles its own fixed positioning, width, height, and background.
  // This component serves as a structural element in the layout system.
  return <SidebarNav className={className} />;
};

export default Sidebar;
