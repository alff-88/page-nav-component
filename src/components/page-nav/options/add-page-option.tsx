import PageNameModal from "@demo/components/modal/page-name.modal";
import Icon from "@demo/components/utils/Icon";
import { usePagesOperations } from "@demo/state";
import { Page } from "@demo/types/globals";
import { FC, useCallback, useState } from "react";

const Separator = () => {
  return (
    <div className="group-hover:w-[20px] w-[10px] border-b-[1.5px] h-0 border-dashed border-navigator-separator transition-all duration-300 ease-in-out" />
  );
};

const AddButton: FC<{ onclick: () => void }> = ({ onclick }) => {
  return (
    <button onClick={onclick}>
      <div className="cursor-pointer active:opacity-50 group-hover:opacity-100 group-hover:visible  opacity-0 not-group-hover:hidden  w-[16px] h-[16px] overflow-hidden transition-all  duration-300 ease-in-out ">
        <Icon name="PlusRounded" className="bg-white text-button-default " />
      </div>
    </button>
  );
};

const AddPageOption: FC<{ previousPage: Page }> = ({ previousPage }) => {
  const { add } = usePagesOperations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onSubmit = useCallback(
    (pageName: string) => {
      setIsModalOpen(false);
      add(pageName, previousPage.order + 1);
    },
    [add, previousPage]
  );
  return (
    <>
      <div className="flex h-[32px] flex-row  justify-center items-center group ">
        <Separator />
        <AddButton onclick={() => setIsModalOpen(true)} />
        <Separator />
      </div>
      <PageNameModal
        isOpen={isModalOpen}
        onSubmit={onSubmit}
        onClose={() => setIsModalOpen(false)}
        key={`page-name-modal-add-opt-${previousPage.id}`}
      />
    </>
  );
};

export default AddPageOption;
