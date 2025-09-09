import React from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { GrDocumentUpdate } from 'react-icons/gr';
interface TodocardsProps {
    title: string;
    desc: string;
    id: any;
    delid: any;
    display: any;
    updateId: any
    toBeUpdate: any
}
const Todocards = ({title, desc, id, delid,display, updateId, toBeUpdate}:TodocardsProps) => {
  return (
    <>
      <div className='p-3 todo-card'>
        <div>
            <h4>{title}</h4>
            <p className='todo-car-p'>{desc.split("",77)}...</p>
        </div>
        <div className='d-flex justify-content-around '>
            <div className='d-flex justify-content-center align-items-center card-icon-head px-1 py-1 '
            onClick={() => {
                display("block");
                // console.log(updateId)
                toBeUpdate(updateId)
                }}>
                <GrDocumentUpdate className='card-icons'/>Update
            </div>
            <div className='d-flex justify-content-center align-items-center card-icon-head px-1 py-1 text-danger'
            onClick={()=>{
                delid(id)
                }}>
                <AiFillDelete className='card-icons del'/>Delete
            </div>
        </div>
      </div>
    </>
  )
}

export default Todocards
