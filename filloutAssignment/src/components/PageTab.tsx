import { forwardRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Page } from "../types";
import IconWrapper from "./IconWrapper";

interface PageTabProps {
  page: Page;
  isActive: boolean;
  onClick: () => void;
  onContextMenuClick: () => void;
}

const PageTab = forwardRef<HTMLDivElement, PageTabProps>(function PageTab(
  { page, isActive, onClick, onContextMenuClick },
  ref
) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const Icon = page.icon;

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      {...attributes}
      onClick={() => {
        console.log("Clicked:", page.id);
        onClick();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onContextMenuClick();
      }}
      style={style}
      className={`group flex items-center gap-2 px-4 py-2 mt-2 mb-2 min-w-[100px] rounded-md shadow-sm text-sm font-medium cursor-pointer select-none 
        transition-colors duration-200
        ${
          isActive
            ? "bg-blue-100 border-2 border-blue-500 text-blue-800"
            : "bg-white text-gray-800 hover:bg-blue-50 hover:border-blue-300 border border-gray-300"
        }`}
    >
      {Icon && <IconWrapper icon={Icon} className="text-gray-500" />}
      <span className="mr-[5px] ml-[5px]">{page.title}</span>

      {/* Drag Handle */}
      <div
        {...listeners}
        className="cursor-grab px-1 alig-items-end text-align-end text-gray-400 hover:text-gray-600 select-none"
        title="Drag to reorder"
      >
        ⠿
      </div>
    </div>
  );
});

export default PageTab;
