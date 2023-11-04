import React from 'react'
import { faPenToSquare, faStar, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const projectNav: Record<string, ReactNode> = {
  star: <FontAwesomeIcon icon={faStar} className='text-2xl hover:text-yellow-300 hover:cursor-pointer' />,
  edit: <FontAwesomeIcon icon={faPenToSquare} className='text-2xl hover:cursor-pointer hover:text-theme' />,
  delete: <FontAwesomeIcon icon={faTrashCan} className='text-2xl hover:cursor-pointer hover:text-red-500' />
};

const ProjectArea = () => {
  return (
    <div>ProjectArea</div>
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
    </>
  )
}

export default ProjectArea;
