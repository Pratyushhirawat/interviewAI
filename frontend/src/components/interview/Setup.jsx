import React, { useState } from 'react'
import {motion} from 'motion/react'
import { FiArrowLeft, FiBriefcase, FiCheck } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Setup({ user, setUser }) {
    const navigate = useNavigate()
    const [role, setRole] = useState("")
    const [type, setType]  = useState('technical')
    const {resume} = useSelector((state)=>state.resume)
    const [useResume, setUseResume] = useState(!!resume)
  return (
    <div className='min-h-screen bg-white flex items-center justify-center p-3 sm:p-5'>
        <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0}}
        transition={{ duration: 0.45 }}
        className='w-full max-w-4xl bg-[#0E1016] border border-white/10 rounded-2xl sm:rounded-[24px] overflow-hidden grid lg:grid-cols-[40%_60%] shadow-[0_0_60px_rgba(255,255,255,0.03)]'>

            {/* Left */}
            <div className='p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-start gap-4'>

            <div>
                <div onClick={()=>navigate('/dashboard')} className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 cursor-pointer'>
                <FiArrowLeft size={12} />
                <span className='text-xs text-zinc-300'>Back</span>
                </div>
                <h2 className='mt-4 text-xl sm:text-2xl font-bold text-white leading-snug'>

                    Welcome back,<br/>
                    {user?.name}
                </h2>
                <p className='mt-2 text-xs sm:text-sm leading-6 text-zinc-400'>Practice realistic AI interviews, receive instant feedback, and improve before your next job interview.</p>
            </div>

            <div className='space-y-2 sm:space-y-3'>
                {
                    [
                        "Personalized AI Questions",
                        "Resume Based Interview",
                        "Detailed Performance Report",
                        "Real Interview Experience"
                    ].map((item,index)=>(
                        <motion.div key={index} whileHover={{x: 4}} className='flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3'>
                            <div className='w-7 h-7 shrink-0 rounded-lg bg-white flex items-center justify-center'>
                                <FiCheck className='text-black' size={13} />
                            </div>
                            <span className='text-xs sm:text-sm text-zinc-300'>{item}</span>
                        </motion.div>
                    ))
                }
            </div>

            </div>


            {/* Right */}
            <div className='p-5 sm:p-7 flex flex-col'>
                <div>
                    <h2 className='text-lg sm:text-xl font-semibold text-white'>Start Interview</h2>
                    <p className='mt-1 text-xs text-zinc-500'>Configure your interview preferences.</p>
                </div>

                <div className='mt-5 flex-1 space-y-4 overflow-y-auto'>

                    {/* role */}
                    <div>
                        <label className="text-xs font-medium text-zinc-400">Target Role</label>
                        <div className='mt-1.5 relative'>
                            <FiBriefcase className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500' size={14} />
                            <input type="text"
                            onChange={(e)=>setRole(e.target.value)}
                            value={role}
                            placeholder='AI Engineer' className='w-full h-11 rounded-xl bg-[#17181E] border border-white/10 pl-10 pr-4 text-sm text-white outline-none focus:border-white/30 transition' />
                        </div>
                    </div>

                    {/* TYPE */}

                    <div>
                        <label className="text-xs font-medium text-zinc-400">Interview Type</label>
                        <div className='mt-1.5 flex rounded-xl bg-[#17181E] p-1 border border-white/10'>
                        {
                            ["technical","hr"].map((item)=>(
                                <button key={item}
                                 onClick={()=>setType(item)}
                                 className={`flex-1 h-9 rounded-lg text-xs sm:text-sm font-medium capitalize transiton-all ${type === item ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}>
                                    {item}
                                </button>
                            ))
                        }
                        </div>
                    </div>

                    {/* Resume Toggle */}
                    <div className='rounded-xl border border-white/10 bg-[#17181E] p-4'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h2 className='text-sm font-medium text-white'>Use Resume</h2>
                                <p className='mt-0.5 text-xs text-zinc-500'>AI will personalize questions using your resume.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
        
    </div>
  )
}

export default Setup