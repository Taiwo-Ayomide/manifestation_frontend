import React from 'react'

const Pre_exam = () => {
  return (
    <fieldset className="flex justify-center items-center min-h-screen bg-gray-100">
        <section className="bg-blue-300 p-8 rounded-lg shadow-lg w-full max-w-md mt-12">
            <div>
                <div className='flex justify-center text-center'>
                    <img src="logonew.png" className='w-20 rounded-lg' alt="manifestation_logo" />
                </div>
                <div className='flex justify-center pt-2'>
                    <h1 className='uppercase font-bold'>Welcome Taiwo Ayomide</h1>
                </div>
                <div className='flex justify-center pt-2'>
                    <p className='uppercase font-bold'>Manifestation</p>
                </div>
            </div>
            <form action="">
                <div className='pt-5'>
                    <h1 className='uppercase font-serif font-bold'>Select programme</h1>
                    <select className='rounded-lg w-full h-10 outline-none' name="" id="">
                        <option value="none">Please select</option>
                        <option value="none">MBA, Financial Management</option>
                        <option value="none">MBA, Human Resources Management</option>
                        <option value="none">MBA, Procurement and Supply Chain</option>
                        <option value="none">MBA, Marketing</option>
                        <option value="none">MBA, Information System</option>
                        <option value="none">MBA, Oil and Gas</option>
                        <option value="none">Master in Public Administration (MPA)</option>
                        <option value="none">Postgraduate Studies in Management (PGDM)</option>
                        <option value="none">MSCSW</option>
                        <option value="none">MCSS</option>
                    </select>
                </div>
                <div className='pt-5'>
                    <h1 className='uppercase font-serif font-bold'>Semester</h1>
                    <select className='rounded-lg w-full h-10 outline-none' name="" id="">
                        <option value="none">Please select</option>
                        <option value="none">First</option>
                        <option value="none">Second</option>
                        <option value="none">Third</option>
                        <option value="none">Fourth</option>
                    </select>
                </div>
                <div className='pt-5'>
                    <h1 className='uppercase font-serif font-bold'>Session:</h1>
                    <select className='rounded-lg w-full h-10 outline-none' name="" id="">
                        <option value="none">Please select</option>
                        <option value="none">2020/2021</option>
                        <option value="none">2021/2022</option>
                        <option value="none">2022/2023</option>
                        <option value="none">2023/2024</option>
                    </select>
                </div>
                <div className='pt-5'>
                    <input className='rounded-lg w-full h-10 outline-none bg-blue-800 text-white uppercase font-bold font-sans cursor-pointer' type="button" value="Start quiz" />
                </div>
            </form>
        </section>
        {/* <section className='bg-white w-8/12 ms-12 mt-12 h-5/6 rounded-lg'></section> */}
    </fieldset>
  )
}

export default Pre_exam