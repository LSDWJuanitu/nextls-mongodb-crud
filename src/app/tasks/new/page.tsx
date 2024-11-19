"use client";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function FormPage() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const router = useRouter();
  const params = useParams();

  const getTask = async ( ) => {
    const res = await fetch(`/api/task/${params.id}`)
    const data = await res.json();
    setNewTask({
      title: data.title,
      description: data.description
    })

  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setNewTask({ ...newTask, [e.target.name]: e.target.value });

  useEffect(() => {
    
    if (params.id) {
      getTask()
    }
  }, []);

  const createTask = async () => {
    try {
      const res = await fetch("/api/task", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "COntent-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status == 200) {
        router.push("/");
        router.refresh();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(!params.id){
      await createTask();
    }else{
      updateTask()
    }

  };

  const updateTask = async () => {
    const res = await fetch(`/api/task/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await res.json();
    router.push("/")
    router.refresh()

  }

  const handleDelete = async () => {
   if(window.confirm("Estas seguro de querer borar la tarea?")){
      const res = await fetch(`/api/task/${params.id}`,{
        method: "DELETE",
      })
      router.push('/')
      router.refresh()
   }

  };

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <header className="flex justify-between">
          <h1 className="font-bold text-3xl">
            {!params.id ? "Agregar Tarea" : "Actualizar Tarea"}
          </h1>
          <button type="button"
            className="bg-red-500 px-3 py-1 rounded-md text-white"
            onClick={handleDelete}
          >
            Borrar
          </button>
        </header>

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4 text-white"
          onChange={handleChange}
          value={newTask.title}
        />
        <textarea
          name="description"
          rows={3}
          placeholder="Description"
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4 text-white"
          onChange={handleChange}
          value={newTask.description}
        ></textarea>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg">
          {
            !params.id ? "Crear" : "Actualizar"
        }
        </button>
      </form>
    </div>
  );
}

export default FormPage;
