"use client"
import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'dotenv/config'


export default function Home() {

  const [formData, setFormData] = useState({
    title:"",
    description:"",
  })

  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () =>{
    const response = await axios('/api');
    setTodoData(response.data.todos)
  }

  const deleteTodo = async (id)=>{
      const response = await axios.delete('/api', {
        params:{
          mongoId: id
        }
      })

      toast.success(response.data.msg);
      await fetchTodos();

  }

  const completeTodo = async (id) =>{
      const response = await axios.put('/api', {},{
        params:{
          mongoId: id
        }
      })

      toast.success(response.data.msg)
      fetchTodos();
  }


  useEffect(() => {
    fetchTodos();
  }, [])
  

  const onChageHandler = (e)=>{
      const name = e.target.name;
      const value = e.target.value;
      setFormData(form => ({...form,[name]:value}));
      // console.log(formData);
  }

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {
      // Api code
      const response = await axios.post('/api', formData)
      toast.success(response.data.msg);
      setFormData({
        title:"",
        description:"",
      })
      await fetchTodos();
    } catch (error) {
        toast.error("Error")
    }
  }

  return (
    <>
      <ToastContainer theme="dark"/>
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-16 px-2 mx-auto">
          <input value={formData.title} onChange={onChageHandler} type="text" name="title" placeholder="Enter Title" className="px-3 py-2 border-2 w-full outline-0" />
          <textarea value={formData.description} onChange={onChageHandler} name="description" placeholder="Enter Description" className="px-3 py-2 border-2 w-full outline-0"></textarea>
          <button  type="submit" className="bg-orange-600 py-3 px-11 text-white cursor-pointer">Add TODO</button>
      </form>

      

      <div className="relative overflow-x-auto mt-16 w-[60%] mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                {todoData.map((item,index)=>{
                  return <Todo key={index} id={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} completeTodo={completeTodo} />
                })}
              </tbody>
          </table>
      </div>

    </>
  );
}
