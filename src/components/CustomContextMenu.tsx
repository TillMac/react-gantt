// import { ITask } from "@/models/common";

import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// type CustomContextMenuProps = {
//   top: number;
//   left: number;
//   taskData: ITask;
// };

const contextMenu = [
  {
    name: 'Edit',
    icon: faPenToSquare,
  },
  {
    name: 'Delete',
    icon: faTrash,
  }
];

const CustomContextMenu = () => {
  return (
    <div className='border-2 border-gray w-32 p-2 flex flex-col gap-2' style={{ borderRadius: '10px' }}>
      {
        contextMenu.map((item, idx: number) => (
          <div key={idx} className='w-full grid grid-cols-4 gap-4 p-2 items-center hover:border-gray-200 hover:bg-gray-200 hover:text-text hover:cursor-pointer' style={{ borderRadius: '8px' }}>
            <FontAwesomeIcon icon={item.icon} className='text-lg col-span-1' />
            <p className='text-lg col-span-3 text-left'>{item.name}</p>
          </div>
        ))
      }
    </div>
  )
}

export default CustomContextMenu;
