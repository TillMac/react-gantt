import ViewModeSelector from '@/components/ViewModeSelector';
import { faPenToSquare, faStar, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode, useState } from 'react'

const projectNav: Record<string, ReactNode> = {
  star: <FontAwesomeIcon icon={faStar} className='text-2xl hover:text-yellow-300 hover:cursor-pointer' />,
  edit: <FontAwesomeIcon icon={faPenToSquare} className='text-2xl hover:cursor-pointer hover:text-theme' />,
  delete: <FontAwesomeIcon icon={faTrashCan} className='text-2xl hover:cursor-pointer hover:text-red-500' />
};

const ProjectArea = () => {
  const [viewMode, setViewMode] = useState<number>(1);

  return (
    <>
      <section className="w-full flex justify-between items-center">
        <h2 className='text-3xl'>Project_Name</h2>
        <div className="flex gap-3">
          {
            Object.keys(projectNav).map((item: string) => {
              return (
                <div key={item}>
                  {projectNav[item]}
                </div>
              )
            })
          }
        </div>
      </section>
      <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
    </>
  )
}

export default ProjectArea;
