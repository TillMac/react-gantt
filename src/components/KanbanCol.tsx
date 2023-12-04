import { ITask } from '@/models/common';
import { Draggable } from 'react-beautiful-dnd';
import dayjs from 'dayjs';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { StrictModeDroppable } from './StrictModeDroppable';

type KanbanColProps = {
  title: string;
  id: 'TODO' | 'IN PROGRESS' | 'DONE' | 'WAIVED';
  taskData: ITask[];
}

const KanbanCol = ({ id, title, taskData }: KanbanColProps) => {
  return (
    <StrictModeDroppable
      droppableId={id}
      key={id}
    >
    {(provided, snapshot) => (
      <div key={id} className='w-2/5 rounded-2xl kanban__col overflow-x-hidden py-4' 
        {...provided.droppableProps}
        ref={provided.innerRef}
        style={{
          borderWidth: snapshot.isDraggingOver ? '2px' : '1px',
          borderStyle: snapshot.isDraggingOver ? 'dashed' : 'solid',
          borderColor: snapshot.isDraggingOver ? '#81B8EF' : '#D1D5DB',
          backgroundColor: '',
        }}
        >
        <h3 className='text-xl font-semibold pb-4'>{title}</h3>
        {(taskData.length !== 0) ? (
          <>
            {taskData.map((task: ITask, idx: number) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={idx}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      backgroundColor: snapshot.isDragging ? '#81B8EF' : '',
                      borderRadius: '12px',
                      borderWidth: '1px',
                      borderColor: snapshot.isDragging ? '#1A76D2' : '#D1D5DB',
                      animation: snapshot.dropAnimation ? 'green-glow 1s linear 4' : 'none',
                    }}
                    className='w-4/5 mx-auto mb-4 kanban__card'
                  >
                    <Card className='rounded-xl text-left'>
                      <CardHeader>
                        <CardTitle className='text-xl'>{task.name}</CardTitle>
                        <CardDescription>
                          <p>{`${dayjs(task.start).format('YYYY/MM/DD')} - ${dayjs(task.end).format('YYYY/MM/DD')}`}</p>
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
          </>
        ) : <i>No Data.</i>}
        {provided.placeholder}
        </div>
    )}
    </StrictModeDroppable>
  )
}

export default KanbanCol;
