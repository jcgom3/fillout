import { useRef } from "react";
import PageList from "./components/PageList";
import { usePages } from "./hooks/usePages";
import "./index.css";

export default function App() {
  const {
    pages,
    activePageId,
    setActivePageId,
    addPage,
    reorderPages,
    openContextMenuForPageId,
    setOpenContextMenuForPageId,
    setAsFirstPage,
    renamePage,
    copyPage,
    duplicatePage,
    deletePage,
  } = usePages();

  const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  return (
    <div className="w-screen h-screen flex items-start justify-center ">
      <div className="relative  border border-black rounded-xl bg-dark-gray mt-10 ">
        <PageList
          pages={pages}
          activePageId={activePageId}
          setActivePageId={setActivePageId}
          addPage={addPage}
          reorderPages={reorderPages}
          openContextMenuForPageId={openContextMenuForPageId}
          setOpenContextMenuForPageId={setOpenContextMenuForPageId}
          tabRefs={tabRefs}
          onSetFirst={setAsFirstPage}
          onRename={renamePage}
          onCopy={copyPage}
          onDuplicate={duplicatePage}
          onDelete={deletePage}
        />
      </div>
    </div>
  );
}
