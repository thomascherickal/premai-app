import regenerate from "assets/images/regenerate.svg";

import type { RegenerateButtonProps } from "../types";

const RegenerateButton = ({ onRgenerateClick }: RegenerateButtonProps) => {
  return (
    <button
      className="border mx-auto font-proximaNova-regular flex items-center border-white rounded-md text-white py-[9px] px-[13px]"
      onClick={onRgenerateClick}
    >
      <img width={16} height={16} src={regenerate} alt="regenerate-logo" className="mr-3" />
      Regenerate Response
    </button>
  );
};

export default RegenerateButton;
