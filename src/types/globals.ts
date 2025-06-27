import { IconName } from "@demo/components/utils/Icon";

type PageContent = {
  contentStr: string;
};

type Page = {
  id: string;
  order: number;
  title: string;
  content: PageContent;
  icon: IconName;
};

type ApplicationConfig = {
  pages: Page[];
};

type ApplicationError = { msg: string };

export type { ApplicationError, ApplicationConfig, Page, PageContent };
