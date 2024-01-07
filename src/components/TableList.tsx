import useContextMenu from "@/hooks/useContextMenu";
import { ITask } from "@/models/common";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from "react";
import CustomContextMenu from "./CustomContextMenu";
import { Task } from "gantt-task-react";

type Props = {
  taskData: ITask[] | null,
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>,
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>,
  setModalTask: Dispatch<SetStateAction<ITask | Task | null>>,
}

const TableList = ({ taskData, setIsDeleteModalOpen, setIsEditModalOpen, setModalTask }: Props) => {
  const tableData = { nodes: taskData };
  const { isClicked, setIsClicked, points, setPoints } = useContextMenu();

  const handleDoubleClick = (task: ITask) => {
    setIsClicked(true);
    setModalTask(task)
  }

  return (
    <>
      <div
        style={{ maxHeight: '80vh', overflowY: 'auto'}}
        onDoubleClick={(e) => setPoints({
        x: e.pageX,
        y: e.pageY,
        })}
      >
        <Table data={tableData}>
          {(tableList: ITask[]) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell className='h-16 !py-4 !pl-4 rounded-tl-xl'>Task</HeaderCell>
                  <HeaderCell className='h-16 !pl-4  border-l-2 border-gray-300'>Start</HeaderCell>
                  <HeaderCell className='h-16 !pl-4  border-l-2 border-gray-300'>Due</HeaderCell>
                  <HeaderCell className='h-16 !pl-4  border-l-2 border-gray-300'>Status</HeaderCell>
                  <HeaderCell className='h-16 !pl-4 rounded-tr-xl  border-l-2 border-gray-300'>Progress</HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {tableList.map((task: ITask) => (
                  <Row key={task.id} item={task} onDoubleClick={(task) => handleDoubleClick(task)}>
                    <Cell className="min-h-[4rem] h-auto text-left !py-4 !pl-4 border-l-2 border-b-2 border-gray-300 table__taskname">{task.name}</Cell>
                    <Cell className="min-h-[4rem] h-auto text-left !pl-4  border-l-2 border-b-2 border-gray-300">{dayjs(task.start).format('YYYY/MM/DD')}</Cell>
                    <Cell className="min-h-[4rem] h-auto text-left !pl-4  border-l-2 border-b-2 border-gray-300">{dayjs(task.end).format('YYYY/MM/DD')}</Cell>
                    <Cell className="min-h-[4rem] h-auto text-left !pl-4  border-l-2 border-b-2 border-gray-300">{task.status}</Cell>
                    <Cell className="min-h-[4rem] h-auto text-left !pl-4  border-l-2 border-r-2 border-b-2 border-gray-300">{`${task.progress}%`}</Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </div>
      {
        isClicked && (
          <CustomContextMenu top={points.y} left={points.x} setIsEditModalOpen={setIsEditModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} />
        )
      }
    </>
  )
}

export default TableList;
