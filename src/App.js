import React, { useState, useEffect } from "react";
import axios from "./api/httpLib";
import "./App.css";
import { useQuery } from "react-query";

function App() {
  const [title, setTitle] = useState('');
  const { data: tasks, refetch: refetchTasks } = useQuery('tasks', () => axios.get('/tasks').then(res => res.data), {
    refetchOnWindowFocus: false
  });

  useEffect(() => {}, []);

  const addTask = (e) => {
    e.preventDefault();
    axios.post('/tasks', {
      title,
    }).then(res => {
      setTitle('');
      refetchTasks()
    })
  }

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 col-xl-10">
            <div className="card rounded-3">
              <div className="card-body p-4">
                <h4 className="text-center my-3 pb-3">To Do App</h4>
                <form onSubmit={addTask} className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                  <div className="col-12">
                    <div className="form-outline">
                      <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-control" />
                    </div>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>

                  {/* <div className="col-12">
                    <button type="submit" className="btn btn-warning">
                      Get tasks
                    </button>
                  </div> */}
                </form>

                <table className="table mb-4 text-center">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Todo item</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks?.map((task, i) => (
                      <tr key={i}>
                      <th scope="row">{i+1}</th>
                      <td>{task.title}</td>
                      <td>{task.completed ? 'InProgress' : 'Completed'} </td>
                      <td>
                        <button type="submit" className="btn btn-success me-1">
                          Completed
                        </button>
                        <button type="submit" className="btn btn-danger">
                          Delete
                        </button>
                        <button
                          type="submit"
                          className="btn btn-secondary ms-1"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
