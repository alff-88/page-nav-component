import { usePagesOperations, usePagesState } from "@demo/state";
import { FC, Fragment, useCallback, useState } from "react";
import AddPageOption from "./options/add-page-option";
import { PageOption } from "./options/page-option";
import {
  DndContext,
  useSensors,
  DragEndEvent,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
} from "@dnd-kit/core";

import { Page } from "@demo/types/globals";
import {
  SortableContext,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import PageNameModal from "../modal/page-name.modal";
import Icon from "../utils/Icon";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

const PageNavigator: FC = () => {
  const { pages } = usePagesState();
  const [editPage, setPageEdit] = useState<Page | null>(null);
  const [addNewPage, setAddNewPage] = useState<boolean>(false);
  const { reorder, updatePage, add } = usePagesOperations();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onPageEdited = useCallback(
    (pageName: string) => {
      if ((!editPage && !addNewPage) || !pageName?.length) {
        return;
      }

      if (addNewPage) {
        add(pageName, (pages[pages.length - 1]?.order ?? 1) + 1);
      } else if (editPage) {
        updatePage(editPage.id, { title: pageName });
      }
      setPageEdit(null);
      setAddNewPage(false);
    },
    [editPage, updatePage, add, addNewPage, pages]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over?.id) return;
      if (active.id === over.id) {
        return;
      }
      const oldIndex = pages.findIndex((p) => p.id === active.id);
      const newIndex = pages.findIndex((p) => p.id === over.id);
      if (oldIndex >= 0 && newIndex >= 0) {
        reorder(oldIndex, newIndex);
      }
    },
    [pages, reorder]
  );

  return (
    <>
      <PageNameModal
        isOpen={!!editPage?.id || addNewPage === true}
        onSubmit={onPageEdited}
        defaultValue={editPage?.title || ""}
        isEdit={!addNewPage}
        onClose={() => {
          setPageEdit(null);
          setAddNewPage(false);
        }}
        key={`page-name-modal-context-menu-${editPage?.id}`}
      />
      <div className="flex w-full whitespace-nowrap overflow-x-scroll rounded-xl py-5 px-20 bg-navigator-fill ">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToHorizontalAxis]}
        >
          <SortableContext
            items={pages}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex flex-row grow justify-center justify-items-center items-center flex-nowrap">
              {pages.map((page, index) => {
                return (
                  <Fragment key={`page-navigator-add-opt-${page.id}`}>
                    <PageOption
                      page={page}
                      index={index}
                      editPageClick={setPageEdit}
                    />
                    <AddPageOption previousPage={page} />
                  </Fragment>
                );
              })}
              <div
                className={
                  "flex-shrink-0 flex-nowrap max-h-[32px] flex flex-row gap-x-[6px] items-center justify-items-center justify-center px-[10px] py-[4px] rounded-[8px] cursor-pointer border-1 border-stroke bg-white hover:bg-button-hover-fill/35"
                }
                onClick={() => {
                  setPageEdit(null);
                  setAddNewPage(true);
                }}
              >
                <Icon name={"Plus"} className={`text-[16px] font-medium`} />
                <span className={`flex-shrink-0 font-medium whitespace-nowrap`}>
                  {"Add page"}
                </span>
              </div>
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
};

export { PageNavigator };
