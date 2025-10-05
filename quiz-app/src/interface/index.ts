
export interface SidebarProps{
  className?: string;
}

export interface TrackingColumnProps {
  questions: { id: number }[];
  answered: { [key: number]: string };
  current: number;
  onNavigate: (index: number) => void;
}