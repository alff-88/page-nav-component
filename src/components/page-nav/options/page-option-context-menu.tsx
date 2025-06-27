import Icon, { IconName } from "@demo/components/utils/Icon";
import { usePagesOperations } from "@demo/state";
import { Page } from "@demo/types/globals";
import React, {
  useRef,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

interface MenuOption {
  iconName: IconName;
  label: string;
  onClick?: () => void;
  isDisabled?: boolean;
  iconColor?: string;
}

interface ContextMenuProps {
  children: ReactNode;
  page: Page;
  visible: boolean;
  onClose: () => void;
  editPageClick: (page: Page) => void;
  index: number;
  offsetY?: number;
}

const optionStyle =
  "px-[12px]  w-full flex flex-row justify-start items-center gap-[6px] py-[7px]";

const PageOptionContextMenu: React.FC<ContextMenuProps> = ({
  children,
  page,
  offsetY = 8,
  visible,
  editPageClick,
  onClose,
  index,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: -1000, left: -1000 });
  const { remove, setAsFirstPage } = usePagesOperations();

  const showMenu = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTimeout(() => {
        const menuHeight = menuRef.current?.offsetHeight || 0;
        setPosition({
          top: rect.top + window.scrollY - menuHeight - offsetY,
          left: rect.left + window.scrollX,
        });
      }, 0);
    }
  }, [offsetY]);

  const contextMenuStyle = useMemo(() => {
    const baseStyle =
      "absolute bg-white border border-stroke rounded-md shadow-lg w-[240px] overflow-hidden transform transition duration-200 ease-out";
    return `${baseStyle} ${
      visible
        ? "opacity-100 scale-100 pointer-events-auto z-50"
        : "opacity-0 scale-95 pointer-events-none z-[-1]"
    }}`;
  }, [visible]);

  const options = useMemo<MenuOption[]>(() => {
    return [
      {
        label: !index ? "this is the first page" : "Set as first page",
        iconName: !index ? "FlagFill" : "Flag",
        iconColor: !index ? "text-flagged" : undefined,
        onClick: index
          ? () => {
              setAsFirstPage(page.id);
              onClose();
            }
          : undefined,
      },
      {
        label: "Rename",
        iconName: "Edit",
        onClick: () => {
          editPageClick(page);
          onClose();
        },
      },
      {
        label: "Copy",
        iconName: "Copy",
        isDisabled: true,
      },
      {
        label: "Duplicate",
        iconName: "Duplicate",
        isDisabled: true,
      },
    ];
  }, [page, setAsFirstPage, onClose, editPageClick, index]);

  useEffect(() => {
    if (!visible) {
      return;
    }
    showMenu();
  }, [visible, showMenu]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!triggerRef.current?.contains(e.target as Node)) {
        onClose();
      }
    };
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible, onClose]);

  const removeOnClick = useCallback(() => {
    remove(page.id);
    onClose();
  }, [remove, onClose, page.id]);

  return (
    <div className="inline-block" ref={triggerRef}>
      {children}

      {
        <div
          ref={menuRef}
          className={contextMenuStyle}
          style={{
            top: visible ? position.top : -9999,
            left: visible ? position.left : -9999,
          }}
        >
          {/* Header */}
          <div className="p-[12px] text-lg font-semibold  bg-header-background border-t border-stroke">
            {"Settings"}
          </div>
          <div className="flex flex-col pt-[12px] ">
            {options.map((option, optIndex) => {
              const baseClasses = optionStyle;
              const disabled = option.isDisabled;
              const textClass = disabled
                ? "text-disable cursor-not-allowed"
                : "hover:bg-button-default-fill/15 hover:text-hover";

              return (
                <div
                  key={`context-menu-opt-${page.id}-${optIndex}`}
                  onClick={option.onClick}
                  className={`${baseClasses} ${textClass} ${
                    !!option.onClick ? "cursor-pointer" : ""
                  }`}
                >
                  <Icon
                    name={option.iconName}
                    className={`${textClass} ${
                      option?.iconColor || "text-secondary"
                    }`}
                  />
                  {option.label}
                </div>
              );
            })}
            <div className="border-t border-stroke mx-[12px] mt-[7px] " />
            <div
              onClick={removeOnClick}
              className={`${optionStyle} py-[14px] cursor-pointer hover:bg-gray-100`}
            >
              <Icon name={"Remove"} className="text-error" />
              <span className="text-error">{"Delete"}</span>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default PageOptionContextMenu;
