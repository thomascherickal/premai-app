import LeftArrowIcon from "shared/components/LeftArrowIcon";
import RangeSlider from "shared/components/RangeSlider";
import usePremChatStore from "shared/store/prem-chat";
import { RightSidebarProps } from "shared/types";
import { shallow } from "zustand/shallow";

const PremImageRightSidebar = ({ setRightSidebar }: RightSidebarProps) => {
  const { n, setN } = usePremChatStore(
    (state) => ({
      n: state.n,
      setN: state.setN,
    }),
    shallow
  );

  return (
    <div className="prem-chat-right-sidebar prem-image--right-sidebar">
      <div className="sidebar-toggle__btn !mt-5 !ml-0">
        <button
          onClick={() => setRightSidebar(false)}
          className="bg-Onyx px-[8.4px] mr-3 py-[10px] rounded-md"
        >
          <LeftArrowIcon className="rotate-180" />
        </button>
        <span>Close Sidebar</span>
      </div>
      <div className="-mx-4 opacity-30" />
      <ul className="mb-[18px] mt-[42px] right-sidebar__list overflow-y-auto scrollbar-none">
        <li>
          <p>
            <span>Image Count</span>
            <span>{n}</span>
          </p>
          <RangeSlider
            className="range-slider__bar"
            value={[0, n]}
            thumbsDisabled={[true, false]}
            rangeSlideDisabled={true}
            min={1}
            max={4}
            step={1}
            onInput={(value: number[]) => setN(value[1])}
          />
        </li>
      </ul>
    </div>
  );
};

export default PremImageRightSidebar;
