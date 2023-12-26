import { Link } from "react-router-dom";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type ProjectCardProps = {
  link: string;
  progress: number;
  projectName: string;
  undoneNum: number;
  className?: string;
};

const ProjectCard = ({ link, progress, projectName, undoneNum, className }: ProjectCardProps) => {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <Link
          to={link}
          className={`${className} flex flex-row gap-2 items-center pl-2 pr-4 py-4 border-gray text-text hover:border-theme hover:text-theme`}
          style={{
            borderWidth: 1,
          }}
        >
          <div className='w-[48px] h-[48px] mx-2'>
            <CircularProgressbar
              value={progress}
              strokeWidth={50}
              styles={buildStyles({
                strokeLinecap: "butt",
                textColor: 'white',
                textSize: '28px',
                pathColor: '#1A76D2',
                trailColor: '#545454',
              })}
              text={`${progress}%`}
            />
          </div>
          <h4>{projectName}</h4>
          <p className='mr-0 ml-auto'>{undoneNum.toString()}</p>
        </Link>
      </TooltipTrigger>
      <TooltipContent className='rounded-xl menu__tooltip--background' side="right">
        <p>{undoneNum} 項任務未完成</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default ProjectCard;
