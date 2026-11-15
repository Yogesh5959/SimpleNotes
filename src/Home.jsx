
import React from 'react'
import ItemsOptions from './ItemsOptions'

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: "url('https://t4.ftcdn.net/jpg/08/72/42/53/360_F_872425375_ZAeFb6fjOzJTbGcFzZMUVQAB5GA75d2a.jpg')"
      }}
      className='min-h-screen w-full bg-cover bg-center flex flex-col items-center px-4 sm:px-6 lg:px-10'
    >

      <div className="w-full text-center pt-14 sm:pt-16 lg:pt-20">
        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-100 text-shadow-2xs text-shadow-amber-100'>
          Simple <span className='text-purple-600'>Notes</span>
        </h1>
      </div>

      <div className='w-full max-w-[1440px] mx-auto mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 justify-items-center'>

        <ItemsOptions
          bgcolorforimage={"#F0E7FF"}
          image={"https://cdn-icons-png.flaticon.com/512/8643/8643898.png"}
          head={"Add Note"}
          content={"Create a new note with your ideas and thoughts"}
          button={"Add Note"}
          firstButtonColor={"#4F00D5"}
          secondButtonColor={"#8B3DFF"}
          navigateLink={"/addNotes"}
        />

        <ItemsOptions
          bgcolorforimage={"#E3F0FF"}
          image={"https://cdn-icons-png.flaticon.com/512/4630/4630794.png"}
          head={"View Note"}
          content={"Browse all you saved notes in one place"}
          button={"View Notes"}
          firstButtonColor={"#0752C4"}
          secondButtonColor={"#318BFF"}
          navigateLink={"/Notes"}
        />

        <ItemsOptions
          bgcolorforimage={"#E0F7F4"}
          image={"https://cdn-icons-png.flaticon.com/512/2370/2370671.png"}
          head={"Track Activites"}
          content={"Track your activites and history"}
          button={"Track History"}
          firstButtonColor={"#009E91"}
          secondButtonColor={"#20C9B8"}
          navigateLink={"/User"}
        />

      </div>

      <p className='mt-12 sm:mt-16 mb-8 italic text-white text-2xl sm:text-3xl lg:text-4xl text-center font-extralight font-["Caveat"] [text-shadow:0_0_5px_#ffffff,0_0_12px_#c4b5fd,0_0_20px_#a78bfa]'>
        Keep your Notes organized
      </p>

    </div>
  )
}

export default Home
