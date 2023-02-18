import React, { useEffect, useState } from "react";
import axios from "./api/httpLib";
import "./App.css";
import { useQuery } from "react-query";
import CPagination from "./components/Pagination/pagination";

function App() {
  const [title, setTitle] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");

  const { data, refetch: refetchTasks } = useQuery(
    ["tasks", page, status],
    () => axios.get(`/tasks?page=${page}&${status !== 'all' && `finished=${status}`}`).then((res) => res.data),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => setPage(1), [status]);

  const editTaskStatus = (id, completed) => {
    axios
      .patch(`/tasks/${id}`, {
        completed: !completed,
      })
      .then((res) => refetchTasks())
      .catch((err) => console.log(err));
  };

  const editTask = (id) => {
    axios
      .patch(`/tasks/${id}`, {
        title,
        completed: selectedTask.completed,
      })
      .then((res) => refetchTasks())
      .catch((err) => console.log(err));
  };

  const addTask = (e) => {
    e.preventDefault();
    if(isEdited) {
      editTask(selectedTask.id);
      setIsEdited(false);
      setTitle('');
      return;
    }
    axios
      .post("/tasks", {
        title,
      })
      .then((res) => {
        setTitle("");
        refetchTasks();
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  const deleteTask = (id) => {
    axios.delete(`/tasks/${id}`)
    .then(res => refetchTasks())
    .catch((err) => console.log(err));
  }

  const editTaskHandler = (task) => {
    setTitle(task.title);
    setIsEdited(true);
    setSelectedTask(task)
  }

  const pageHandler = (num) => {
    setPage(num);
  }

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 col-xl-10">
            <div className="card rounded-3">
              <div className="card-body p-4">
                <h4 className="text-center my-3 pb-3">To Do App</h4>
                <form
                  onSubmit={addTask}
                  className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                >
                  <div className="col-12">
                    <div className="form-outline">
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      {isEdited ? 'Edit' : 'Save'}
                    </button>
                  </div>

                  {/* <div className="col-12">
                    <button type="submit" className="btn btn-warning">
                      Get tasks
                    </button>
                  </div> */}
                </form>
                <div>
                  <label>salam</label>{" "}
                  <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="all">All</option>
                    <option value="true">Completed</option>
                    <option value="false">In progress</option>
                  </select>
                </div>
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
                    {data?.tasks?.map((task, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{task.title}</td>
                        <td>{!task.completed ? "InProgress" : "Completed"} </td>
                        <td>
                          <button
                            onClick={() => editTaskStatus(task.id, task.completed)}
                            type="submit"
                            className={`btn ${
                              task.completed ? "btn-success" : "btn-warning"
                            } me-1`}
                          >
                            Completed
                          </button>
                          <button onClick={() => deleteTask(task.id)} type="submit" className="btn btn-danger">
                            Delete
                          </button>
                          <button
                            type="submit"
                            className="btn btn-secondary ms-1"
                            onClick={() => editTaskHandler(task)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <CPagination totalPages={data?.totalPage} currentPage={page} callBack={pageHandler} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
