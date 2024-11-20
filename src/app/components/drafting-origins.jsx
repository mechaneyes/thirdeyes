import DraftingLede from "./drafting-lede";

const DraftingOrigin = () => {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between p-3 gap-4"
      style={{ height: "calc(100% - 33px)" }}
    >
      <div className="drafting-scrollable w-full h-full flex flex-col items-center justify-between gap-2 pr-3 overflow-y-scroll">
          <div className="space-y-2">
            <DraftingLede />
            <DraftingLede />
            <DraftingLede />
            <DraftingLede />
            <DraftingLede />
            <DraftingLede />
          </div>
      </div>
    </div>
  );
};

export default DraftingOrigin;
