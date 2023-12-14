import { viewModes } from "@/models/common";
import { IconDefinition, faChartGantt, faTableColumns, faTableList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "./ui/button";

type Props = {
  viewMode: number,
  setViewMode: Dispatch<SetStateAction<number>>,
  setReloadProjectDataCount: Dispatch<SetStateAction<number>>,
}

const viewModeIcons: Record<string, IconDefinition> = {
  list: faTableList,
  gantt: faChartGantt,
  kanban: faTableColumns,
};

const ViewModeSelector = ({ viewMode = 1, setViewMode, setReloadProjectDataCount }: Props) => {
  useEffect(() => {
    setReloadProjectDataCount((number) => number += 1);
  }, [viewMode]);
  
  return (
    <section className='w-full flex py-4 gap-2'>
    {
      Object.keys(viewModeIcons).map((mode: string) => {
        if (mode !== viewModes[viewMode]) {
          return (
            <Button key={mode} className='flex px-2 gap-2 rounded-xl hover:bg-gray hover:border-none' onClick={() => setViewMode(viewModes[mode as keyof typeof viewModes])}>
              <FontAwesomeIcon icon={viewModeIcons[mode]} className='order-first text-lg' />
              <h3 className='text-xl order-last'>{mode}</h3>
            </Button>
          )
        }
        return (
          <Button key={mode} className='flex px-2 gap-2 rounded-xl bg-theme text-white hover:bg-theme hover:border-none'>
            <FontAwesomeIcon icon={viewModeIcons[mode]} className='order-first text-lg' />
            <h3 className='text-xl order-last'>{mode}</h3>
          </Button>
        )
      })
    }
  </section>
  )
}

export default ViewModeSelector;
