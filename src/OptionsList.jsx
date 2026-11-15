import React from 'react'
import { useNavigate } from 'react-router-dom'


const OptionsList = ({ name, bgcolor, link,fontColor,shadowColor}) => {
    const navigate = useNavigate();
  return (
      
          <div className='w-40 h-10 rounded-full text-center cursor-pointer hover:brightness-125' style={{ backgroundColor: bgcolor,boxShadow:`0px 0px 10px ${shadowColor}` }} onClick={()=>navigate(link)}>
          <h1 style={{color:fontColor}} className='text-2xl pt-0.5 p-2 font-semibold'>{name}</h1>
    </div>
      
  )
}

export default OptionsList