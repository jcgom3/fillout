// src/hooks/usePages.ts
import { useState } from "react";
import type { Page } from "../types";
import {
  InformationCircleIcon,
  DocumentTextIcon,
  FolderIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export function usePages() {
  const [pages, setPages] = useState<Page[]>([
    { id: "1", title: "Info", icon: InformationCircleIcon },
    { id: "2", title: "Details", icon: DocumentTextIcon },
    { id: "3", title: "Other", icon: FolderIcon },
    { id: "4", title: "Ending", icon: CheckCircleIcon },
  ]);

  const [activePageId, setActivePageId] = useState("1");
  const [openContextMenuForPageId, setOpenContextMenuForPageId] = useState<
    string | null
  >(null);

  const renamePage = (id: string, newTitle: string) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, title: newTitle } : p))
    );
  };

  const duplicatePage = (id: string) => {
    const page = pages.find((p) => p.id === id);
    if (page) {
      const newPage = {
        ...page,
        id: Date.now().toString(),
        title: `${page.title} Copy`,
      };
      const index = pages.findIndex((p) => p.id === id);
      const updatedPages = [...pages];
      updatedPages.splice(index + 1, 0, newPage);
      setPages(updatedPages);
    }
  };

  const deletePage = (id: string) => {
    setPages((prev) => {
      const updated = prev.filter((p) => p.id !== id);

      // If deleted tab was active, set another tab as active
      if (activePageId === id && updated.length > 0) {
        setActivePageId(updated[0].id);
      }

      return updated;
    });

    // Close the context menu
    setOpenContextMenuForPageId(null);
  };

  const setAsFirstPage = (id: string) => {
    const index = pages.findIndex((p) => p.id === id);
    if (index > -1) {
      const updated = [...pages];
      const [target] = updated.splice(index, 1);
      updated.unshift(target);
      setPages(updated);
    }
  };

  const [copiedPage, setCopiedPage] = useState<Page | null>(null);

  const copyPage = (id: string) => {
    const page = pages.find((p) => p.id === id);
    if (page) {
      setCopiedPage({ ...page });
      console.log("Copied:", page); // Simulated clipboard log
    }
  };

  const addPage = (index: number) => {
    const fallbackIcon = DocumentTextIcon; // or any default icon you prefer
    const icon = pages[index]?.icon || fallbackIcon;

    const newPage = {
      id: Date.now().toString(),
      title: `New Page`,
      icon,
    };
    const updated = [...pages];
    updated.splice(index, 0, newPage);
    setPages(updated);
  };

  const reorderPages = (oldIndex: number, newIndex: number) => {
    const updatedPages = [...pages];
    const [moved] = updatedPages.splice(oldIndex, 1);
    updatedPages.splice(newIndex, 0, moved);
    setPages(updatedPages);
  };

  return {
    pages,
    setPages,
    activePageId,
    setActivePageId,
    openContextMenuForPageId,
    setOpenContextMenuForPageId,
    renamePage,
    duplicatePage,
    deletePage,
    setAsFirstPage,
    copyPage,
    copiedPage,
    addPage,
    reorderPages,
  };
}
