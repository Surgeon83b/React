import './App.css'
import {useState} from "react";
import {Modal} from "./Modal/Modal.tsx";
import type {FormType} from "./types.ts";
import UncontrolledForm from "./Forms/UncontrolledForm.tsx";
import SubmittedData from "./SubmittedData/SubmittedData.tsx";
import {type RootState, useAppSelector} from "./store";

function App() {
  const [formType, setFormType] = useState<FormType | null>(null);
  const { formData } = useAppSelector((state: RootState) => state.form);

  const showControlledForm = () => {
    setFormType('controlled');
  };
  const showUncontrolledForm = () => {
    setFormType('uncontrolled');
  }

  return (
    <main>

      <h1>Forms & Portals</h1>
      <div className="buttons">
        <button onClick={showControlledForm}>
          Show controlled form
        </button>
        <button onClick={showUncontrolledForm}>
          Show uncontrolled form
        </button>
      </div>
      <Modal isOpen={!!formType} onClose={() => setFormType(null)}>
        {formType === 'uncontrolled' ? <UncontrolledForm onClose={()=>setFormType(null)}/> : null}
      </Modal>
      {formData && <SubmittedData/>}
    </main>
  )
}

export default App
