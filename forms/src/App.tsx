import './App.css';
import { useEffect, useState } from 'react';
import { Modal } from './Modal/Modal.tsx';
import type { FormType } from './types.ts';
import UncontrolledForm from './Forms/UncontrolledForm.tsx';
import SubmittedData from './SubmittedData/SubmittedData.tsx';
import { type RootState, useAppDispatch, useAppSelector } from './store';
import { ControlledForm } from './Forms/ControlledForm.tsx';
import { fetchCountries } from './store/countriesSlice.ts';

function App() {
  const [formType, setFormType] = useState<FormType | null>(null);
  const { formData } = useAppSelector((state: RootState) => state.form);
  const dispatch = useAppDispatch();

  const showControlledForm = () => {
    setFormType('controlled');
  };
  const showUncontrolledForm = () => {
    setFormType('uncontrolled');
  };
  const handleCloseForm = () => setFormType(null);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <main>
      <h1>Forms & Portals</h1>
      <div className="buttons">
        <button onClick={showControlledForm}>Show controlled form</button>
        <button onClick={showUncontrolledForm}>Show uncontrolled form</button>
      </div>
      <Modal isOpen={!!formType} onClose={handleCloseForm}>
        {formType === 'uncontrolled' ? (
          <UncontrolledForm onClose={handleCloseForm} />
        ) : null}
        {formType === 'controlled' ? (
          <ControlledForm onClose={handleCloseForm} />
        ) : null}
      </Modal>
      {formData && <SubmittedData />}
    </main>
  );
}

export default App;
