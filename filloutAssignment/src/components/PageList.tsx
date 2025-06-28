import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext as RawSortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { RefObject, useRef, type ReactNode } from "react";
import PageTab from "./PageTab";
import ContextMenu from "./ContextMenu";
import type { Page } from "../types";

type SortableContextProps = {
  items: string[];
  strategy: typeof verticalListSortingStrategy;
  children: ReactNode;
};

const SortableContext = RawSortableContext as React.ComponentType<SortableContextProps>;


type PageListProps = {
  pages: Page[];
  activePageId: string;
  setActivePageId: React.Dispatch<React.SetStateAction<string>>;
  addPage: (index: number) => void;
  reorderPages: (oldIndex: number, newIndex: number) => void;
  openContextMenuForPageId: string | null;
  setOpenContextMenuForPageId: React.Dispatch<React.SetStateAction<string | null>>;
  tabRefs: RefObject<{ [key: string]: HTMLDivElement | null }>;
  onSetFirst: (id: string) => void;
  onRename: (id: string, newName: string) => void;
  onCopy: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function PageList({
  pages,
  activePageId,
  setActivePageId,
  addPage,
  reorderPages,
  openContextMenuForPageId,
  setOpenContextMenuForPageId,
  tabRefs,
  onSetFirst,
  onRename,
  onCopy,
  onDuplicate,
  onDelete,
}: PageListProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: { active: any; over: any }) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = pages.findIndex((p) => p.id === active.id);
    const newIndex = pages.findIndex((p) => p.id === over.id);
    reorderPages(oldIndex, newIndex);
  }

  return (
    <div className="relative bg-white">
      {/* Tabs Container */}
      <div >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={pages.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex items-center justify-start ml-[5px] mr-[5px]">
              {pages.map((page, index) => {

                console.log("Rendering tab:", page.title, "isActive:", page.id === activePageId);
                return (

                  <div key={page.id} className="flex items-start justify-center relative group mt-[5px] mb-[5px]">
                    {/* Inline + Button between tabs */}
                    {index > 0 && (
                      <div className="relative group mx-2 flex items-center justify-center">
                        <div className="relative flex items-center justify-center">
                          <span className="text-gray-300 text-xs select-none">
                            - - - - - - -
                          </span>
                          <button
                            className="
        absolute left-1/2 top-1/2
        -translate-x-1/2 -translate-y-1/2
        w-5 h-5 rounded-full
        flex items-center justify-center
        text-gray-400 bg-white
        opacity-0 group-hover:opacity-100
        hover:text-blue-500 transition
      "
                            onClick={() => addPage(index)}
                            title="Add page here"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col items-center">
                      <PageTab
                        ref={(el) => {
                          tabRefs.current[page.id] = el;
                        }}
                        page={page}
                        isActive={page.id === activePageId}
                        onClick={() => {
                          console.log("Tab clicked", page.id);
                          setActivePageId(page.id);
                        }}
                        onContextMenuClick={() => {
                          console.log("Context menu triggered for:", page.id);
                          setOpenContextMenuForPageId(
                            openContextMenuForPageId === page.id ? null : page.id
                          );
                        }}
                      />
                    </div>
                  </div>
                )
              })}

              {/* "+ Add Page" at end */}
              <div className="flex flex-row items-center ml-4 group relative">
                <span className="text-gray-300 text-xs select-none">
                  - - - - - - -
                </span>
                <button
                  className="
      ml-2 px-4 py-2
      rounded-full text-gray-600 text-sm
      border border-gray-300
      hover:bg-blue-50 hover:text-blue-600
      transition
    "
                  onClick={(e) => {
                    e.stopPropagation();
                    addPage(pages.length);
                  }}
                >
                  + Add Page
                </button>
              </div>
            </div>

          </SortableContext>
        </DndContext>
      </div>

      {/* Context Menu outside tabs, below */}
      {openContextMenuForPageId && (
        <div className="absolute z-[9999] top-20 left-0" >


          <ContextMenu
            page={pages.find((p) => p.id === openContextMenuForPageId)!}
            onRename={onRename}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
            onSetFirst={onSetFirst}
            onCopy={onCopy}
          />


        </div>
      )}
    </div>
  );
}
