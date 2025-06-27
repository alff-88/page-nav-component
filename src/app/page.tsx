"use client";

import PageContent from "@demo/components/page-content/page-content";
import { PageNavigator } from "@demo/components/page-nav/page-nav";
import { usePagesState } from "@demo/state";

export default function Home() {
  const { selectedPageId } = usePagesState();
  return (
    <div className="flex flex-col grow h-screen  py-5 max-w-[1140px]">
      <div className="flex grow bg-white p-10 mb-5 rounded-xl">
        {selectedPageId ? (
          <PageContent pageId={selectedPageId} />
        ) : (
          <div className="flex w-full flex-col gap-y-2 ">
            <div className="flex text-2xl font-extrabold">
              {"404 - pages not found :("}
            </div>
            <div className=" flex text-lg text-secondary">
              {"Please add your first page!"}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center ">
        <PageNavigator />
      </div>
    </div>
  );
}
