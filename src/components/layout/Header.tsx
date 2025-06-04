import React from 'react';
import TopHeader from '../Dashboard/TopHeader'; // Relative path to existing component

interface HeaderProps {
  className?: string; // To be passed to TopHeader if specific styling overrides are needed
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  // TopHeader handles its own fixed positioning, height, background, and responsive left offset.
  // This component serves as a structural element in the layout system.
  return <TopHeader className={className} />;
};

export default Header;
