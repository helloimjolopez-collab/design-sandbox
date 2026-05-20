import svgPaths from "./svg-dqhmg9h8h5";

export default function PwButton() {
  return (
    <div className="content-stretch cursor-pointer flex items-center justify-center p-[6px] relative rounded-[8px] size-full" data-name="PW_Button">
      <div className="bg-[#3555a0] content-stretch flex items-center justify-center px-[8px] py-[6px] relative rounded-[8px] shrink-0" data-name="Content">
        <div className="flex flex-row items-center self-stretch">
          <div className="content-stretch flex h-full items-center justify-center px-[4px] relative shrink-0">
            <div className="flex flex-col font-['Red_Hat_Text:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#fbfbfb] text-[14px] text-center tracking-[0.02px] whitespace-nowrap">
              <p className="leading-[20px]">Start Order</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center justify-center relative shrink-0 size-[18px]">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="arrow_forward">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g id="Vector" />
            </svg>
            <div className="absolute inset-[18.36%_18.41%_18.36%_16.67%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.79125 7.5925">
                <path d={svgPaths.p3f3ab100} fill="var(--fill-0, white)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}