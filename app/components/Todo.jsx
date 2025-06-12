import React from 'react'

const Todo = ({id, title, description, mongoId, complete, deleteTodo, completeTodo}) => {
  return (
    <tr className="bg-white border-b  border-gray-200">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {id+1}
        </th>
        <td className={`px-6 py-4 ${complete?"line-through":""}`}>
            {title}
        </td>
        <td className={`px-6 py-4 ${complete?"line-through":""}`}>
           {description}
        </td>
        <td className="px-6 py-4">
            {complete? "Completed": "Pending"}
        </td>
        <td className="px-6 py-4">
            {complete? "": <button onClick={()=>completeTodo(mongoId)} className='py-2 px-4 bg-emerald-700 text-white rounded-sm mr-2 cursor-pointer'>Done</button>}
            <button onClick={()=>deleteTodo(mongoId)} className='py-2 px-4 bg-red-500 text-white rounded-sm cursor-pointer'>Delete</button>
        </td>
    </tr>

  )
}

export default Todo