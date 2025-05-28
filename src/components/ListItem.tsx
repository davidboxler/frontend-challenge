import { memo } from "react";
import delete_icon from "../assets/delete.png";
import tick from "../assets/tick.png";
import withLogger from "../hoc/withLogger";
import type { ListItemProps } from "../types";

function ListItem({ text, id, deleteItem }: ListItemProps) {
  return (
    <div className="flex items-center my-3 gap-2">
      <div className="flex flex-1 items-center cursor-pointer">
        <img src={tick} alt="" className="w-7" />
        <p className="text-slate-700 ml-4 text-[17px]">{text}</p>
      </div>

      <img
        onClick={() => deleteItem(id)}
        src={delete_icon}
        alt="boton eliminar frase"
        aria-label="Eliminar"
        className="w-3.5 cursor-pointer"
      />
    </div>
  );
}

const LoggedListItem = withLogger<ListItemProps>(ListItem);

export default memo(LoggedListItem);
