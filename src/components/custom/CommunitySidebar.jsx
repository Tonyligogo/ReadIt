/* eslint-disable react/prop-types */
import { multiFormatDateString } from "@/lib/utils";
import { CalendarDays, Globe } from "lucide-react";

function CommunitySidebar({subInfo}) {
  return (
    <div className="h-fit sticky top-4 bg-dark-1 rounded-md mt-4 w-[316px] w-[316px]">
      <div className="space-y-2 px-4 py-3">
        <span className="font-bold text-base">{subInfo?.name}</span>
        <p className="text-text-custom-neutral text-sm">{subInfo?.description}</p>
        <span className="text-text-custom-neutral text-xs flex gap-1 items-center"><CalendarDays size={18}/>Created {multiFormatDateString(subInfo?.$createdAt)}</span>
        <span className="text-text-custom-neutral text-xs flex gap-1 items-center"><Globe size={18} />Public</span>
      </div>
      <div className="border-t-[1px] border-[#8BA2AD] px-4 py-3">
        <span className="text-text-custom-neutral font-semibold text-xs">RULES</span>
        <ol className="list-decimal list-inside space-y-3 mt-3 pl-4">
          <li className="text-sm text-text-custom-neutral">Only relevant material</li>
          <li className="text-sm text-text-custom-neutral">No unoriginal content</li>
          <li className="text-sm text-text-custom-neutral">No reposts</li>
          <li className="text-sm text-text-custom-neutral">No personal info, no hate speech, no harassment</li>
        </ol>
      </div>
    </div>
  )
}

export default CommunitySidebar