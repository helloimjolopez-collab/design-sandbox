import imgScreenshot20260304At1102292 from "figma:asset/58179d6125756d0f55975dec85457688e9c5349a.png";
import imgScreenshot20260304At1120502 from "figma:asset/48c540b565915627321dd3c45ca2b50a94803ec3.png";

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[685px] left-[6px] top-0 w-[1226px]" data-name="Screenshot 2026-03-04 at 11.02.29 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScreenshot20260304At1102292} />
      </div>
      <div className="absolute h-[463px] left-0 top-[463px] w-[1239px]" data-name="Screenshot 2026-03-04 at 11.20.50 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[144.49%] left-0 max-w-none top-[-44.49%] w-full" src={imgScreenshot20260304At1120502} />
        </div>
      </div>
    </div>
  );
}