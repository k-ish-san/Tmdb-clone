import React from 'react';

function Pagination({pageNo, handlePrev, handleNext}) {
  return (
    <div className="bg-gray-400 p-4 mt-8 flex justify-center">
      <div onClick={handlePrev} className="px-8">
        <i className="fa-solid fa-circle-arrow-left"></i>
      </div>
      <div className="font-bold"> {pageNo} </div>
      <div onClick={handleNext} className="px-8">
        <i className="fa-solid fa-circle-arrow-right"></i>
      </div>
    </div>
  )
}

export default Pagination