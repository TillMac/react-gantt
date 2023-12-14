import { ViewMode } from 'gantt-task-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type GanttViewSelectorProps = {
  onViewModeChange: (viewMode: ViewMode) => void;
}

const GanttViewSelector = ({ onViewModeChange }: GanttViewSelectorProps) => {
  return (
    <div className='w-48 ml-auto mr-0 pb-6'>
      <Select
        defaultValue={ViewMode.Day}
        onValueChange={(value: ViewMode) => onViewModeChange(value)}
      >
        <SelectTrigger className='hover:border-gray'>
          <SelectValue placeholder='Select a View' />
        </SelectTrigger>
        <SelectContent className='pointer-events-auto opacity-100 menu__select--background text-text'>
          <SelectGroup>
            <SelectItem className='cursor-pointer hover:text-white hover:bg-gray-500' value={ViewMode.Day}>Day</SelectItem>
            <SelectItem className='cursor-pointer' value={ViewMode.Week}>Week</SelectItem>
            <SelectItem className='cursor-pointer' value={ViewMode.Month}>Month</SelectItem>
            <SelectItem className='cursor-pointer' value={ViewMode.Year}>Year</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default GanttViewSelector