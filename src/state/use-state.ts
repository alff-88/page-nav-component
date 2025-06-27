import { useMemo, useSyncExternalStore } from "react";

import { applicationStateStore } from "./store";
import { Page } from "@demo/types/globals";

const usePagesState = () => {
  const { pages, selectedPageId } = useSyncExternalStore(
    applicationStateStore.subscribeState,
    applicationStateStore.getSnapshot,
    applicationStateStore.getSnapshot
  );

  return { pages, selectedPageId };
};

const usePageDetailsState = (id: Page["id"]) => {
  const { pages } = usePagesState();

  const page = useMemo(() => {
    return pages.find((p) => p.id === id);
  }, [id, pages]);

  return { page };
};

export { usePageDetailsState, usePagesState };
