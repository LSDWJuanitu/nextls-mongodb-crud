import React from 'react'
import { connectDB } from '@/utils/mongoose'
import Task from '@/models/Task'
import TaskCard from '@/component/TaskCard';

async function loadTask(){
  connectDB();
  const tasks = await Task.find();
  return tasks;
}

async function HomePage() {
  const tasks = await loadTask();
  return (
    <div className='grid grid-cols-3 gap-2'>
      {tasks.map(task => (
      <TaskCard task={task} key={task._id} />
      )) }
  </div>
  )
}

export default HomePage