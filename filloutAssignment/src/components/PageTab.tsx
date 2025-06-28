// import { forwardRef } from "react";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import type { Page } from "../types";

// interface PageTabProps {
//   page: Page;
//   isActive: boolean;
//   onClick: () => void;
//   onContextMenuClick: () => void;
// }

// // `forwardRef` allows the parent to assign a ref to this component's root div
// const PageTab = forwardRef<HTMLDivElement, PageTabProps>(
//   ({ page, isActive, onClick, onContextMenuClick }, ref) => {
//     const {
//       attributes,
//       listeners,
//       setNodeRef,
//       transform,
//       transition,
//       isDragging,
//     } = useSortable({ id: page.id });

//     const style = {
//       transform: CSS.Transform.toString(transform),
//       transition,
//       opacity: isDragging ? 0.5 : 1,
//     };
//     const Icon = page.icon;
//     return (
//       <div
//         ref={(node) => {
//           setNodeRef(node);
//           if (typeof ref === "function") ref(node);
//           else if (ref) ref.current = node;
//         }}
//         {...attributes}
//         {...listeners}
//         onClick={onClick}
//         style={style}
//         className={`group flex items-center gap-2 min-w-[100px] px-4 py-2 rounded-md shadow-sm border text-sm font-medium cursor-pointer transition select-none ${
//           isActive
//             ? "bg-blue-50 text-blue-700 border-blue-300"
//             : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
//         }`}
//       >
//         {Icon && (
//           <div className="w-5 h-5 mr-2 flex items-center justify-center">
//             <Icon className="w-5 h-5 text-gray-500" />
//           </div>
//         )}
//         <span>{page.title}</span>
//         <button
//           onClick={(e) => {
//             e.stopPropagation(); // don’t trigger tab click
//             onContextMenuClick();
//           }}
//           className="text-gray-400 hover:text-gray-700 transition"
//           title="Open menu"
//         >
//           ⋮
//         </button>
//       </div>
//     );
//   }
// );

// export default PageTab;
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
