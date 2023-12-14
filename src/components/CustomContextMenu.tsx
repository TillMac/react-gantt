// import { useAuth } from "@/context/AuthContext";
// import useProjectFetch from "@/hooks/useProjectFetch";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type Dispatch, type SetStateAction } from "react";
import { Button } from "./ui/button";

type CustomContextMenuProps = {
  top: number;
  left: number;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>,
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

const CustomContextMenu = ({ top, left, setIsEditModalOpen, setIsDeleteModalOpen }: CustomContextMenuProps ) => {
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

  return (
    <div className='border-2 border-gray w-32 p-2 flex flex-col gap-2 absolute contextMenu__background' style={{ borderRadius: '10px', top: `${top}px`, left: `${left}px`, zIndex: 9999 }}>
      {
        contextMenu.map((item, idx: number) => (
          <Button
            key={idx}
            onClick={(item.name === 'Delete') ? () => setIsDeleteModalOpen(true) : () => setIsEditModalOpen(true)}
            className='w-full grid grid-cols-4 gap-4 p-2 content-center hover:border-gray-200 hover:bg-gray-200 hover:text-text hover:cursor-pointer' style={{ borderRadius: '8px' }}
          >
            <FontAwesomeIcon icon={item.icon} className='text-lg col-span-1' />
            <p className='text-lg col-span-3 text-left'>{item.name}</p>
          </Button>
        ))
      }
    </div>
  )
}

export default CustomContextMenu;
 