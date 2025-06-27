import { usePageDetailsState } from "@demo/state";
import { Page } from "@demo/types/globals";
import { FC } from "react";

const PageContent: FC<{ pageId: Page["id"] }> = ({ pageId }) => {
  const { page } = usePageDetailsState(pageId);

  return (
    <>
      <div className="flex w-full flex-col gap-y-2 ">
        <div className="flex text-2xl font-extrabold">
          {page?.content?.contentStr || "404 - page not found :("}
        </div>
        <div className=" flex text-lg text-secondary">
          {"Lorem ipsum dolor sit amet consectetur adipiscing elit."}
        </div>
        <p className="max-w-xl">
          {`
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
          pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
          tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
          Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
          hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
          per conubia nostra inceptos himenaeos.
          `}
        </p>
      </div>
    </>
  );
};

export default PageContent;
