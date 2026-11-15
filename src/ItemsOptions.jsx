import React from 'react'
import { useNavigate } from 'react-router-dom'

const ItemsOptions = ({ bgcolorforimage, image, head, content, button, firstButtonColor, secondButtonColor,navigateLink }) => {
    const navigate = useNavigate();
  return (
      <div className='text-2xl bg-slate-200 w-[400px] h-80 rounded-2xl hover:shadow-[0_0_40px] hover:shadow-amber-400'>
          <div className=' w-full flex justify-center mt-4'>
              <div style={{ backgroundColor: bgcolorforimage }} align="center" className='  rounded-full w-20 h-20'>
              <img className=' pt-2 p-2 text-center ' src={image}/>
          </div>
          </div>
          <div><h1 className='text-center text-3xl font-bold mt-4 font-bold text-shadow-2xs text-shadow-red-900'>{head}</h1></div>
          <div><p className='px-9 py-2 text-center font-serif italic font-light text-shadow-2xs text-shadow-amber-100'>{content}</p></div>
          <div onClick={()=>navigate(navigateLink)} className='flex justify-center mt-4'><button style={{ background: `linear-gradient(to right, ${ firstButtonColor }, ${ secondButtonColor }`}} className='text-center font-bold border-2 bg-blue px-8 rounded-full text-white py-1 hover:brightness-90 hover:shadow-[0_0_10px] hover:shadow-slate-400/50 cursor-pointer '>{button +"  "}→</button></div>
    </div>
  )
}

export default ItemsOptions