import './Modal.css';
import {usePokemonState} from "@/store/store.ts";

export const Modal = () => {
  const {items, clearItems, downloadSelected} = usePokemonState();

  return (
    <div className='popup-bottom-sheet' onClick={(e) => e.stopPropagation()}>
      <div className='popup-content'>
        <h4>{`${items.length} item(s) selected`}</h4>
        <div className="flex gap-16 row-centered">
          <button onClick={clearItems}>UnselectAll</button>
          <button onClick={downloadSelected}>Download</button>
        </div>
      </div>
    </div>
  );
};
