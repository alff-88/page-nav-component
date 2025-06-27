import { ApplicationConfig, Page } from "@demo/types/globals";
import { buildPageConfig } from "@demo/utils/page.utils";

type ApplicationStoreState = ApplicationConfig & {
  selectedPageId: Page["id"] | null;
};

const updatePageIcons = (pages: Page[]) => {
  const lastIndex = pages.length - 1;
  return pages.map((p, index) => {
    if (index === 0) {
      return { ...p, icon: "Info" } as Page;
    } else if (index === lastIndex) {
      return { ...p, icon: "Done" } as Page;
    }
    return { ...p, icon: "FileText" } as Page;
  });
};

const defaultInitPages = [
  buildPageConfig({ title: "Info" }),
  buildPageConfig({ title: "Details" }),
  buildPageConfig({ title: "Other" }),
  buildPageConfig({ title: "Ending" }),
].map((p, index) => ({ ...p, order: index }));

const defaultState: ApplicationStoreState = {
  pages: updatePageIcons(defaultInitPages),
  selectedPageId: defaultInitPages[0].id,
};

let applicationState: ApplicationStoreState = {
  ...defaultState,
};

const getCurrentApplicationState = () => applicationState;

let listeners: (() => void)[] = [];

function subscribeState(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

const applicationStateStore = {
  addPage: (title: Page["title"], order: Page["order"] = 1) => {
    const newPage = buildPageConfig({ title, order });
    applicationState = {
      ...applicationState,
      pages: updatePageIcons(
        [...applicationState.pages, newPage]
          .map((p) => {
            if (p.order < order || p.id === newPage.id) return p;
            return { ...p, order: p.order + 1 };
          })
          .sort((a, b) => a.order - b.order)
      ),
      selectedPageId: newPage.id,
    };
    emitChange();
    return newPage;
  },
  selectPage: (id: Page["id"]) => {
    applicationState = {
      ...applicationState,
      selectedPageId: id,
    };
    emitChange();
  },
  removePage: (id: Page["id"]) => {
    const updatedPages = updatePageIcons(
      applicationState.pages.filter((p) => p.id !== id)
    );
    applicationState = {
      ...applicationState,
      pages: updatedPages,
      selectedPageId:
        id === applicationState.selectedPageId
          ? updatedPages?.[0]?.id ?? null
          : applicationState.selectedPageId,
    };
    emitChange();
  },
  reorderPages: (startIndex: number, endIndex: number) => {
    const result = Array.from(applicationState.pages);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    applicationState = {
      ...applicationState,
      pages: updatePageIcons(
        result.map((p, index) => {
          return { ...p, order: index };
        })
      ),
    };
    emitChange();
  },
  updatePage: (page: Pick<Page, "id"> & Partial<Omit<Page, "id">>) => {
    const pages = applicationState.pages;
    const index = pages.findIndex((p) => p.id === page.id);
    pages[index] = { ...pages[index], ...page };

    applicationState = {
      ...applicationState,
      pages: updatePageIcons(
        pages
          .map((p) => {
            if (p.order < pages[index].order || p.id === pages[index].id)
              return p;
            return { ...p, order: p.order + 1 };
          })
          .sort((a, b) => a.order - b.order)
      ),
    };
    emitChange();
  },
  getSnapshot: getCurrentApplicationState,
  subscribeState,
};

export { applicationStateStore };
