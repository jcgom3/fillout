import {
  ClipboardDocumentIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  PencilSquareIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";
import IconWrapper from "./IconWrapper";
import { useState, useEffect, useRef } from "react";
import {
  InformationCircleIcon,
  DocumentTextIcon,
  FolderIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

import type { Page } from "../types";

type ContextMenuProps = {
  page: Page;
  onRename: (id: string, newName: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onSetFirst: (id: string) => void;
  onCopy: (id: string) => void;
};

export default function ContextMenu({
  page,
  onRename,
  onDuplicate,
  onDelete,
  onSetFirst,
  onCopy,
}: ContextMenuProps) {
  const { id: pageId, title: currentTitle, icon: PageIcon } = page;

  const [editedTitle, setEditedTitle] = useState(currentTitle);
  const [isRenaming, setIsRenaming] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedTitle(currentTitle);
  }, [currentTitle]);

  useEffect(() => {
    if (isRenaming) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isRenaming]);

  const handleRename = () => {
    const trimmed = editedTitle.trim();
    if (trimmed && trimmed !== currentTitle) {
      onRename(pageId, trimmed);
    }
    setIsRenaming(false);
  };

  // Basic icon mapping as fallback (optional enhancement)
  const fallbackIcons = {
    Info: InformationCircleIcon,
    Details: DocumentTextIcon,
    Other: FolderIcon,
    Ending: CheckCircleIcon,
  };

  const Icon =
    fallbackIcons[currentTitle as keyof typeof fallbackIcons] || FolderIcon;

  return (
    <div className="relative z-50 top-full left-0 mt-2 w-120 bg-white rounded-lg shadow-xl border border-gray-200 p-3 text-sm">
      <div className="font-semibold mb-2 text-[#1A1A1A]">Settings</div>

      <button
        className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
        onClick={() => onSetFirst(pageId)}
      >
        <IconWrapper icon={FlagIcon} className="text-[#2F72E2]" />
        Set as first page
      </button>

      <button
        className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
        onClick={() => setIsRenaming(true)}
      >
        <IconWrapper icon={PencilSquareIcon} className="text-gray-500" />
        Rename
      </button>

      <button
        className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
        onClick={() => onCopy(pageId)}
      >
        <IconWrapper icon={ClipboardDocumentIcon} className="text-pink-500" />
        Copy
      </button>

      <button
        className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
        onClick={() => onDuplicate(pageId)}
      >
        <IconWrapper icon={DocumentDuplicateIcon} className="text-gray-500" />
        Duplicate
      </button>

      <button
        className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-100 flex items-center gap-2"
        onClick={() => onDelete(pageId)}
      >
        <IconWrapper icon={TrashIcon} className="text-[#EF494F]" />
        Delete
      </button>

      {/* Styled Page Tab with Rename Inline */}
      <div className="mt-4 pt-3 border-t">
        <div className="flex items-center gap-2 px-4 py-2 rounded-md shadow-sm border text-sm font-medium bg-blue-50 text-blue-700 border-blue-300">
          {Icon && <IconWrapper icon={Icon} className="text-gray-500" />}
          {isRenaming ? (
            <input
              ref={inputRef}
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleRename();
                }
                if (e.key === "Escape") {
                  setIsRenaming(false);
                  setEditedTitle(currentTitle); // reset
                }
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
            />
          ) : (
            <span>{currentTitle}</span>
          )}
        </div>
      </div>
    </div>
  );
}
