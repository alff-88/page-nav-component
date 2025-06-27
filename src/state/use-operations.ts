import { useCallback } from "react";
import { applicationStateStore } from "./store";
import { ApplicationError, Page } from "@demo/types/globals";

const usePagesOperations = () => {
  const add = useCallback((title: Page["id"], order: Page["order"] = 1) => {
    const sanitizedTitle = `${title}`.trim();
    if (!sanitizedTitle?.length) {
      return { error: { msg: "invalid title" } as ApplicationError };
    }
    return applicationStateStore.addPage(title, order);
  }, []);

  const remove = useCallback((id: Page["id"]) => {
    const notFound = !applicationStateStore
      .getSnapshot()
      .pages.some((p) => p.id === id);
    if (notFound) {
      return { error: { msg: "page not found" } as ApplicationError };
    }
    applicationStateStore.removePage(id);
    return true;
  }, []);

  const setAsFirstPage = useCallback((id: Page["id"]) => {
    const notFound = !applicationStateStore
      .getSnapshot()
      .pages.some((p) => p.id === id);
    if (notFound) {
      return { error: { msg: "page not found" } as ApplicationError };
    }
    applicationStateStore.updatePage({ id, order: 0 });
    return true;
  }, []);

  const updatePage = useCallback(
    (id: Page["id"], changes: Partial<Omit<Page, "id">>) => {
      const notFound = !applicationStateStore
        .getSnapshot()
        .pages.some((p) => p.id === id);
      if (notFound) {
        return { error: { msg: "page not found" } as ApplicationError };
      }
      applicationStateStore.updatePage({ id, ...changes });
      return true;
    },
    []
  );

  const select = useCallback((id: Page["id"]) => {
    const notFound = !applicationStateStore
      .getSnapshot()
      .pages.some((p) => p.id === id);
    if (notFound) {
      return { error: { msg: "page not found" } as ApplicationError };
    }
    applicationStateStore.selectPage(id);
    return true;
  }, []);

  return {
    add,
    remove,
    select,
    reorder: applicationStateStore.reorderPages,
    updatePage,
    setAsFirstPage,
  };
};

export { usePagesOperations };
