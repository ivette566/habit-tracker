import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Form.scss';
import { useTaskStore } from '../../store/taskStore';
import { useGoalStore } from '../../store/goalStore';
import { useMenuStore } from '../../store/menuStore';
import { useRef } from 'react';

type FormTaskAndGoalProps = {
    onAdd?: () => void;
  }

  function FormTaskAndGoal( { onAdd }: FormTaskAndGoalProps) {

    const inputRefName = useRef<HTMLInputElement>(null);
    const inputRefDescription = useRef<HTMLTextAreaElement>(null);
    const inputRefDueDate = useRef<HTMLInputElement>(null);
    const isActiveMenu = useMenuStore((state) => state.menu.active);
    const addTask = useTaskStore((state) => state.addTask);
    const addGoal = useGoalStore((state) => state.addGoal);

    const handleSubmit = (e: React.SubmitEvent) => {
      e.preventDefault();
      const name = inputRefName.current?.value;
      const description = inputRefDescription.current?.value;
      const duedate = inputRefDueDate.current?.value;
            if (name && description && duedate) {
              if (isActiveMenu === 'tasks') {
                addTask({ _id: Date.now().toString(), name, description, duedate });
              } else {
                addGoal({ _id: Date.now().toString(), name, description, duedate });
              }

              if (onAdd) {
                  onAdd();
          }
          }

    }

  return (
    <div className='space form-margin'> 
    <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={inputRefName} />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} ref={inputRefDescription} />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>  
            <Form.Control type="date" ref={inputRefDueDate} />
        </Form.Group>

        <Button type="submit" variant="info">
            Add {isActiveMenu === 'tasks' ? 'Task' : 'Goal'}
        </Button>
        
    </Form>
    </div>
  );
}

export default FormTaskAndGoal;