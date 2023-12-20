import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faStar as farStar, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { IProject } from '@/models/common';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useProjectListFetch from '@/hooks/useProjectListFetch';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useAuth } from '@/context/AuthContext';
import { DialogClose } from '@radix-ui/react-dialog';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

type Props = {
  project: IProject,
  setReloadProjectListData: Dispatch<SetStateAction<boolean>>
};

const ProjectSetting = ({ project, setReloadProjectListData }: Props) => {
  const [newProjectName, setNewProjectName] = useState<string>('');
  const [isStar, setIsStar] = useState<boolean>();
  const [deleteProjectName, setDeleteProjectName] = useState<string>('');
  const { setRequest } = useProjectListFetch();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (project) {
      setNewProjectName(project.name);
      setIsStar(project.isStar)
    }
  }, [project]);

  const handleProjectStarUpdate = () => {
    setRequest({
      uId: currentUser.uid,
      method: 'PUT',
      accessToken: currentUser.accessToken,
      body: {
        type: "project",
        name: newProjectName,
        id: project!.id,
        isStar: !isStar,
        description: 'none',
        createTime: project?.createTime,
        updateTime: new Date(),
      }
    });
    setReloadProjectListData(true);
  }

  const handleProjectUpdate = () => {
    setRequest({
      uId: currentUser.uid,
      method: 'PUT',
      accessToken: currentUser.accessToken,
      body: {
        type: "project",
        name: newProjectName,
        id: project!.id,
        isStar: project!.isStar,
        description: 'none',
        createTime: project?.createTime,
        updateTime: new Date(),
      }
    })
    setReloadProjectListData(true);
  };

  const handleProjectDelete = () => {
    if (deleteProjectName !== newProjectName) {
      return;
    }
    setRequest({
      uId: currentUser.uid,
      method: 'DELETE',
      projectId: project?.id,
      accessToken: currentUser.accessToken,
    });
    setTimeout(() => {
      setReloadProjectListData(true);
      navigate('/dashboard');
    }, 2000)
  }

  return (
    <div className="flex gap-3">
      {
        (!isStar) ? ( 
          <FontAwesomeIcon icon={farStar} className='text-2xl hover:text-yellow-300 hover:cursor-pointer' onClick={() => {
            setIsStar(!isStar);
            handleProjectStarUpdate();
          }} />
        ) : (
          <FontAwesomeIcon icon={fasStar} className='text-2xl text-yellow-300 hover:cursor-pointer' onClick={() => {
            setIsStar(!isStar);
            handleProjectStarUpdate();
          }} />
        )
      }
      <Dialog>
        <DialogTrigger asChild>
          <FontAwesomeIcon icon={faPenToSquare} className='text-2xl hover:cursor-pointer hover:text-theme' />
        </DialogTrigger>
        <DialogContent className='sm:max-w-md dialog__background'>
          <DialogHeader>
            <DialogTitle>編輯 Project 名稱</DialogTitle>
            <DialogDescription>查看與編輯專案基本資料</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Project Name
              </Label>
              <Input
                className='focus:border-theme'
                placeholder={newProjectName}
                onChange={(e) => {setNewProjectName(e.target.value)}}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  size="sm"
                  className="px-3 rounded-lg border-gray"
                  onClick={handleProjectUpdate}
                  disabled={(newProjectName === newProjectName || newProjectName === '') ? true : false}
                >
                  <span className="text-xl">Update</span>
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog onOpenChange={(open) => {
        if (!open) {
          setDeleteProjectName('');
        }
      }}>
        <DialogTrigger asChild>
          <FontAwesomeIcon icon={faTrashCan} className='text-2xl hover:cursor-pointer hover:text-red-500' />
        </DialogTrigger>
        <DialogContent className='sm:max-w-md dialog__background'>
          <DialogHeader>
            <DialogTitle>刪除 Project</DialogTitle>
            <DialogDescription>輸入專案名稱以刪除專案</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                type='text'
                className='focus:border-red-900'
                placeholder={newProjectName}
                onChange={(e) => {setDeleteProjectName(e.target.value)}}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  size="sm"
                  variant='destructive'
                  className="px-3 rounded-lg border-red-500 text-red-500"
                  disabled={(deleteProjectName !== newProjectName ? true : false)}
                  onClick={() => handleProjectDelete()}>
                  <span className="text-xl">Delete</span>
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProjectSetting;
