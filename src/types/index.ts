export interface List {
  id: number;
  text: string;
  isComplete: boolean;
}

export interface ListItemProps {
  id: number;
  text: string;
  deleteItem: (id: number) => void;
}