import { Progress, ProgressIndicator } from "@radix-ui/react-progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

type CustomProgressProps = {
  progressValue: number;
  finishedCount: number;
  undoneCount: number;
  rootClassName?: string;
  indicatorClassName?: string;
}

const CustomProgress = ({ progressValue, rootClassName, indicatorClassName, finishedCount, undoneCount }: CustomProgressProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Progress
            value={progressValue}
            className={`${rootClassName} relative overflow-hidden`}
            style={{
              transform: 'translateZ(0)',
            }}
          >
            <ProgressIndicator
              className={`${indicatorClassName} w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]`}
              style={{
                transform: `translateX(-${100 - progressValue}%)`,
                borderTopRightRadius: (progressValue !== 100) ? '8px' : 0,
                borderBottomRightRadius: (progressValue !== 100) ? '8px' : 0,
              }}
            />
          </Progress>
        </TooltipTrigger>
        <TooltipContent className='rounded-xl'>
          <p>目前已完成 {finishedCount} 件事項，佔全部的 {(progressValue === 1 && finishedCount === 0) ? 0 : progressValue}%</p>
          <p>尚有 {undoneCount} 件事項未完成</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CustomProgress;
