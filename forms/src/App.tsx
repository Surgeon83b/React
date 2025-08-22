import './App.css'
import {useState} from "react";
import {Modal} from "./Modal/Modal.tsx";

function App() {
const [isModal, setIsModal] = useState(false);
const showControlledForm = ()=>{
setIsModal(true);
}
  return (
    <main>

      <h1>Forms & Portals</h1>
      <div className="card">
        <button onClick={showControlledForm}>
          Show controlled form
        </button>
        <button /*onClick={showUncontrolledForm}*/>
          Show uncontrolled form
        </button>
      </div>
      <Modal isOpen={isModal} onClose={()=>setIsModal(false)}>
        Modal
      </Modal>
    </main>
  )
}

export default App
