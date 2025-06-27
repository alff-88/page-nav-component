import { FC } from "react";
import { IconBaseProps } from "react-icons";
import {
  PiFileText,
  PiPlusCircle,
  PiFlag,
  PiFlagFill,
  PiPencilSimpleLineLight,
  PiClipboard,
  PiInfo,
  PiCheckCircle,
  PiDotsThreeVerticalBold,
  PiPlus,
} from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { HiOutlineDuplicate } from "react-icons/hi";

export type IconName =
  | "FileText"
  | "Info"
  | "Remove"
  | "Flag"
  | "FlagFill"
  | "Edit"
  | "Duplicate"
  | "Copy"
  | "Done"
  | "Plus"
  | "PlusRounded"
  | "ThreeDotsVertical";

const Icon: FC<{ name: IconName } & IconBaseProps> = ({
  name,
  ...iconProps
}) => {
  switch (name) {
    case "FileText":
      return <PiFileText {...iconProps} />;
    case "PlusRounded":
      return <PiPlusCircle {...iconProps} />;
    case "Plus":
      return <PiPlus {...iconProps} />;
    case "Remove":
      return <RiDeleteBinLine {...iconProps} />;
    case "Flag":
      return <PiFlag {...iconProps} />;
    case "FlagFill":
      return <PiFlagFill {...iconProps} />;
    case "Edit":
      return <PiPencilSimpleLineLight {...iconProps} />;
    case "Copy":
      return <PiClipboard {...iconProps} />;
    case "Duplicate":
      return <HiOutlineDuplicate {...iconProps} />;
    case "Info":
      return <PiInfo {...iconProps} />;
    case "Done":
      return <PiCheckCircle {...iconProps} />;
    case "ThreeDotsVertical":
      return <PiDotsThreeVerticalBold {...iconProps} />;
    default:
      return null;
  }
};

export default Icon;
