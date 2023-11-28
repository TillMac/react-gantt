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

type Props = {
  taskData: ITask[] | null,
  setReloadProjectData: Dispatch<SetStateAction<boolean>>,
}

const TableList = ({ taskData }: Props) => {
  const tableData = { nodes: taskData };

  return (
    <div style={{ maxHeight: '80vh', overflowY: 'auto'}}>
      <Table data={tableData}>
        {(tableList: ITask[]) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell className='h-16 !py-4 !pl-4 rounded-tl-xl'>Task</HeaderCell>
                <HeaderCell className='h-16 !pl-4  border-l-2 border-gray-300'>Start</HeaderCell>
                <HeaderCell className='h-16 !pl-4  border-l-2 border-gray-300'>Due</HeaderCell>
                <HeaderCell className='h-16 !pl-4 rounded-tr-xl  border-l-2 border-gray-300'>Progress</HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((task: ITask) => (
                <Row key={task.id} item={task}>
                  <Cell className="h-16 text-left !py-4 !pl-4 border-l-2 border-b-2 border-gray-300">{task.name}</Cell>
                  <Cell className="h-16 text-left !pl-4  border-l-2 border-b-2 border-gray-300">{dayjs(task.start).format('YYYY/MM/DD')}</Cell>
                  <Cell className="h-16 text-left !pl-4  border-l-2 border-b-2 border-gray-300">{dayjs(task.end).format('YYYY/MM/DD')}</Cell>
                  <Cell className="h-16 text-left !pl-4  border-l-2 border-r-2 border-b-2 border-gray-300">{`${task.progress}%`}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  )
}

export default TableList;
