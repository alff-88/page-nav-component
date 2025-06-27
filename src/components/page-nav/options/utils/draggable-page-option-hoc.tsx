import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { FC } from "react";
import { PageOptionProps } from "../page-option";

function withDraggable<P extends PageOptionProps>(Target: FC<P>) {
  return function WithDragAndDropComponent(props: P) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: props.page.id, attributes: { role: "button" } });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <>
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <Target {...props} />
        </div>
      </>
    );
  };
}

export { withDraggable };
