import { Page } from "@demo/types/globals";
import { v4 as uuidv4 } from "uuid";

const generatePageId = () => uuidv4();

const buildPageConfig = (
  props: Pick<Page, "title"> & Partial<Pick<Page, "order">>
): Page => {
  return {
    title: props.title,
    order: props.order ?? 1,
    icon: "FileText",
    id: generatePageId(),
    content: { contentStr: `${props.title}` },
  };
};

export { buildPageConfig, generatePageId };
