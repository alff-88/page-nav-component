import { usePagesOperations, usePagesState } from "@demo/state";
import { Page } from "@demo/types/globals";
import { FC, MouseEventHandler, useCallback, useMemo, useState } from "react";
import Icon from "@demo/components/utils/Icon";
import PageOptionContextMenu from "./page-option-context-menu";
import { withDraggable } from "./utils/draggable-page-option-hoc";

const buttonBaseStyle = `flex-shrink-0 flex-nowrap max-h-[32px] flex flex-row gap-x-[6px] items-center justify-items-center justify-center px-[10px] py-[4px] rounded-[8px] cursor-pointer border-1 border-stroke transition-all duration-300 ease-in-out`;

const constainerDefault = "bg-secondary/15 hover:bg-button-hover-fill/35";
const containerActive = "bg-white has-text-shadow ";
const containerFocus =
  "focus:border-button-border-focus focus:shadow-[0_0_0_2px_rgba(37,99,235,0.3)] focus:ring-4 focus:ring-button-border-focus/30 outline-none transition";

export type PageOptionProps = {
  page: Page;
  index: number;
  editPageClick: (page: Page) => void;
};

const PageOption: FC<PageOptionProps> = withDraggable(
  ({ page, index, editPageClick }) => {
    const { selectedPageId } = usePagesState();
    const [isContexMenuVisible, setIsContexMenuVisible] = useState(false);
    const isSelected = useMemo(() => {
      return page.id === selectedPageId;
    }, [page.id, selectedPageId]);

    const { select } = usePagesOperations();

    const closeContextMenu = useCallback(() => {
      setIsContexMenuVisible(false);
    }, []);

    const onClick = useCallback<MouseEventHandler>(
      (e) => {
        e.preventDefault();
        if (!isSelected) {
          select(page.id);
          return;
        }
        const isRightClick = e.button === 2;
        if (isRightClick) {
          setIsContexMenuVisible(true);
        }
      },
      [isSelected, select, page.id]
    );

    const onContextMenuClick = useCallback<MouseEventHandler>(
      (e) => {
        e.preventDefault();
        if (!isSelected) {
          return;
        }

        setIsContexMenuVisible(true);
      },
      [isSelected]
    );

    return (
      <PageOptionContextMenu
        page={page}
        onClose={closeContextMenu}
        visible={isContexMenuVisible}
        offsetY={10}
        editPageClick={editPageClick}
        index={index}
      >
        <button
          className={`${buttonBaseStyle} ${
            isSelected
              ? `${containerActive} ${containerFocus}`
              : constainerDefault
          } `}
          onClick={onClick}
          onContextMenu={onContextMenuClick}
        >
          <Icon
            name={page.icon}
            className={`text-[20px] font-medium  ${
              isSelected ? `text-primary ` : `text-button-icon-default`
            }`}
          />
          <span
            className={`flex-shrink-0 font-medium whitespace-nowrap ${
              isSelected ? "" : `text-button-default hover:text-button-hover`
            }`}
          >{`${page.title}`}</span>
          {isSelected ? (
            <Icon
              title="mouse right click to open context menu"
              name={"ThreeDotsVertical"}
              className="text-secondary"
            />
          ) : null}
        </button>
      </PageOptionContextMenu>
    );
  }
);

export { PageOption };
