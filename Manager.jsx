import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordarray, setpasswordarray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordarray(JSON.parse(passwords))
        }
    }, [])

    const savepassword = () => {
        if (form.site.length >3 && form.username.length >3 && form.password.length > 3) {

            setpasswordarray([...passwordarray, { ...form, id: uuidv4() }])
            localStorage.setItem("password", JSON.stringify([...passwordarray, { ...form, id: uuidv4() }]))
            console.log([...passwordarray, form])
            setform({ site: "", username: "", password: "" })

        } else {
            toast('error :Password not Saved!');
        }

    }
    const deletepassword = (id) => {
        let c = confirm("Do you really want to delete")
        if (c) {
            console.log("deleting password with id", id)
            setpasswordarray(passwordarray.filter(item => item.id !== id))
            localStorage.setItem("password", JSON.stringify(passwordarray.filter(item.id !== id)))
        }

    }
    const editpassword = (id) => {
        console.log("editing password with id", id)
        setform(passwordarray.filter(i => i.id === id)[0])
        setpasswordarray(passwordarray.filter(item => item.id !== id))

    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copytext = (text) => {
        navigator.clipboard.writeText(text)
        toast('Copy to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }




    const showPassword = () => {
        passwordref.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons - Copy/icons8-hide-30.png")) {
            ref.current.src = "icons/eye.png"

            passwordref.current.type = "password"

        }
        else {
            ref.current.src = "icons - Copy/icons8-hide-30.png"

            passwordref.current.type = "text"

        }

    }

    return (

        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
                limit={1}
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute top-0 z-[-2] h-screen w-full rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
            <div className="md:container p-3 md:p-0 mx-auto ">
                <h1 className='text-4xl font-bold text-blue-950 p-3 text-center mx-auto '>Password Manager</h1>
                <p className='text-xl text-green-700 font-bold p-1 text-center'>Your Own Paaword Manager</p>
                <div className=' flex col md:flex row text-black flex-col p-3 gap-8 '>
                    <input value={form.site} onChange={handlechange} placeholder='Enter Website Url' className='rounded-2xl border border-green-800 w-full p-1' type="text" name="site" id="site" />
                    <div className='flex text-black gap-3 w-full '>
                        <input value={form.username} onChange={handlechange} placeholder='Enter Username' className=' rounded-2xl border border-green-800 p-4 py-1 w-full' type="text " name='username' id='username' />
                        <div className="relative">
                            <input ref={passwordref} value={form.password} onChange={handlechange} placeholder='Enter Password' className='rounded-2xl border border-green-800 w-full py-1 p-4' type="password" name='password' id='password' />
                            <span className='absolute right-0 top-0 cursor-pointer' onClick={showPassword} >
                                <img ref={ref} className='p-1 m-auto' width={32} src="/icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savepassword} className=' flex justify-center items-center text-2xl px-4 py-2 mx-auto gap-2 w-fit bg-green-700 rounded-full hover:font-bold border-2 border-blue-950 '>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>Add Password</button>
                </div>
                </div>
            <div className="password , text-center ">
                <h2 className='font-bold text-xl '>yours password</h2>
                {passwordarray.length === 0 && <div>No Passwords To Show</div>}
                {passwordarray.length != 0 &&
    
                    <table className="table-auto w-11/12 p-12 m-6 rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-700 text-white'>
                            <tr>
                                <th className='p-2'>Site</th>
                                <th className='p-2'>Username</th>
                                <th className='p-2'>Password</th>
                                <th className='p-2'>Actions</th>


                            </tr>
                        </thead>
                        <tbody className='bg-green-200  '>
                            {passwordarray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' relative items-center justify-center text-center w-32  border border-white '><a href={item.site} target='_blank'> {item.site}</a>
                                        <div className=' absolute  w-5 cursor-pointer right-10 top-0 my-3' onClick={() => { copytext(item.site) }}><img className='' src="/icons/copy.png" alt="copy" /></div></td>
                                    <td className=' relative items-center justify-center text-center w-32 py-2 border border-white  ' >{item.username}
                                        <div className=' absolute  w-5 cursor-pointer right-10 top-0 my-3' onClick={() => { copytext(item.username) }}><img className='' src="/icons/copy.png" alt="copy" /></div></td>
                                    <td className=' relative items-center justify-center text-center w-32 py-2 border border-white '>{item.password}
                                        <div className=' absolute  w-5 cursor-pointer right-10 top-0 my-3 ' onClick={() => { copytext(item.password) }}><img className='' src="/icons/copy.png" alt="copy" /></div>
                                    </td>
                                    <td className=' w-32 py-2 border border-white'>
                                        <div className='flex justify-center gap-5' >
                                            <span className='cursor-pointer w-4 ' onClick={() => { deletepassword(item.id) }} >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "2px5", "height": "25px" }}>

                                                </lord-icon>
                                            </span>
                                            <span onClick={() => { editpassword(item.id) }}>
                                                <img className='w-6 cursor-pointer' src="icons/Edit V2.gif" alt="edit" />
                                            </span>
                                        </div>
                                    </td>

                                </tr>

                            })}
                        </tbody>
                    </table>}
            </div>
        </div>



    )
}

export default Manager
