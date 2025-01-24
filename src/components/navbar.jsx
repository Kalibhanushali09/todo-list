import React from 'react'

const navbar = () => {
    return (
        <nav className='flex bg-violet-500 justify-between text-white py-2'>
            <div className="logo">
                <span className='font-bold text-xl mx-8'>Itask</span>
            </div>
            <ul className='flex gap-8 mx-9'>
                <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all'>Your tasks</li>
            </ul>
        </nav>
    )
}

export default navbar
