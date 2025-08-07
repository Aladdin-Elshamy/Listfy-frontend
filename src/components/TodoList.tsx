import Button from "./ui/Button";
import useCustomQuery from "../hooks/useCustomQuery";
import { ChangeEvent, FormEvent, useState } from "react";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import { ITodo } from "../interfaces";
import Textarea from "./ui/Textarea";
import { validateTodo } from "../validation";
import axiosInstance from "../config/axios.config";
import TodoSkeleton from "./TodoSkeleton";
import { faker } from "@faker-js/faker";
export default function TodoList() {
  /* --------------------------- Variables --------------------------- */
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  /* --------------------------------- States --------------------------------- */
  const [queryVersion, setQueryVersion] = useState(1);
  const [isEditOpen, setIsOpen] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDelete] = useState(false);
  const [EditableTodo, setEditableTodo] = useState<ITodo>({
    title: "",
    description: "",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [todo, setTodo] = useState<ITodo>({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  /* ------------------------------- API Request ------------------------------ */
  const { isLoading, data } = useCustomQuery({
    queryKey: ["todoList", String(queryVersion)],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  /* -------------------------------- Handlers -------------------------------- */
  function openAddModal() {
    setIsAddModalOpen(true);
  }

  function closeAddModal() {
    setIsAddModalOpen(false);
    setTodo({ title: "", description: "" });
    setErrors({ title: "" });
  }
  function openEditModal(todo: ITodo) {
    setEditableTodo(todo);
    setIsOpen(true);
  }

  function closeEditModal() {
    setIsOpen(false);
    setEditableTodo({ title: "", description: "" });
    setErrors({ title: "" });
  }
  function openConfirmDeleteModal(todo: ITodo) {
    setEditableTodo(todo);
    setConfirmDelete(true);
  }

  function closeConfirmDeleteModal() {
    setConfirmDelete(false);
    setEditableTodo({ title: "", description: "" });
  }

  function onEditChangeHandler(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setEditableTodo((prev) => ({ ...prev, [name]: value }));
  }
  function onAddChangeHandler(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  }
  async function onSubmitAddHandler(e: FormEvent<HTMLFormElement>) {
    setIsUpdating(true);
    e.preventDefault();
    const { title } = todo;
    const error = validateTodo({ title });
    const hasErrorMsg = Object.values(error).some((value) => value !== "");
    if (hasErrorMsg) {
      setIsUpdating(false);
      setErrors(error);
      return;
    }
    try {
      const { status } = await axiosInstance.post(
        `/todos`,
        {
          data: {
            title: todo.title,
            description: todo.description,
            user: userData.user.id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      if (status === 200) {
        closeAddModal();
        setQueryVersion((prev) => prev + 1);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  }
  async function onSubmitEditHandler(e: FormEvent<HTMLFormElement>) {
    setIsUpdating(true);
    e.preventDefault();
    const { title } = EditableTodo;
    const error = validateTodo({ title });
    const hasErrorMsg = Object.values(error).some((value) => value !== "");
    if (hasErrorMsg) {
      setIsUpdating(false);
      setErrors(error);
      return;
    }
    try {
      const { status } = await axiosInstance.put(
        `/todos/${EditableTodo.id}`,
        { data: EditableTodo },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      if (status === 200) {
        closeEditModal();
        setQueryVersion((prev) => prev + 1);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  }
  async function onGenerateTodos() {
    for (let i = 0; i < 10; i++) {
      try {
        const { status } = await axiosInstance.post(
          `/todos`,
          {
            data: {
              title: faker.word.words(5),
              description: faker.lorem.paragraph(2),
              user: userData.user.id,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${userData.jwt}`,
            },
          }
        );
        if (status === 200) {
          setQueryVersion((prev) => prev + 1);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  async function onRemoveHandler() {
    try {
      const { status } = await axiosInstance.delete(
        `/todos/${EditableTodo.id}`,
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      if (status === 200) {
        closeConfirmDeleteModal();
        setQueryVersion((prev) => prev + 1);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (isLoading) return <TodoSkeleton from="TodoList" />;
  return (
    <div className="mb-10">
      <div className="mb-10 flex justify-center gap-4">
        <Button className="w-fit p-3" onClick={openAddModal}>
          Add Todo
        </Button>
        <Button
          className="w-fit p-3"
          variant={"outline"}
          size={"sm"}
          onClick={onGenerateTodos}
        >
          Generate Todos
        </Button>
      </div>
      {data.todos.length ? (
        data.todos.map((todo: ITodo, index: number) => (
          <div
            key={todo.id}
            className="flex-cols sm:flex items-center jsutify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold mb-3 sm:mb-0">
              {index + 1} - {todo.title}
            </p>
            <div className="flex space-x-3">
              <Button
                size={"sm"}
                className="w-full sm:w-fit sm:py-3 sm:px-4"
                onClick={() => openEditModal(todo)}
              >
                Edit
              </Button>
              <Button
                variant={"danger"}
                className="w-full sm:w-fit sm:p-3"
                onClick={() => openConfirmDeleteModal(todo)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p>No todos</p>
      )}

      {/* ------------------------------- Add Modal ------------------------------- */}
      <Modal
        isOpen={isAddModalOpen}
        title={"Add a new todo"}
        close={closeAddModal}
      >
        <form className="space-y-3" onSubmit={onSubmitAddHandler}>
          <div>
            <Input
              name="title"
              placeholder="Title"
              value={todo.title}
              onChange={onAddChangeHandler}
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>
          <div>
            <Textarea
              name="description"
              placeholder="Description"
              value={todo.description}
              onChange={onAddChangeHandler}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800"
              isLoading={isUpdating}
            >
              Save
            </Button>
            <Button variant={"cancel"} onClick={closeAddModal} type="button">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* ------------------------------- Edit Modal ------------------------------- */}
      <Modal isOpen={isEditOpen} title={"Edit todo"} close={closeEditModal}>
        <form className="space-y-3" onSubmit={onSubmitEditHandler}>
          <div>
            <Input
              name="title"
              placeholder="Title"
              value={EditableTodo.title}
              onChange={onEditChangeHandler}
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>
          <div>
            <Textarea
              name="description"
              placeholder="Description"
              value={EditableTodo.description}
              onChange={onEditChangeHandler}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800"
              isLoading={isUpdating}
            >
              Save
            </Button>
            <Button variant={"cancel"} onClick={closeEditModal} type="button">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* ------------------------------- Remove Modal ------------------------------- */}
      <Modal
        isOpen={isConfirmDeleteOpen}
        title={"Delete todo"}
        close={closeConfirmDeleteModal}
        description="Are you sure you want to delete this todo? This action cannot be undone."
      >
        <div className="flex gap-4 mt-4">
          <Button
            variant={"danger"}
            className="w-full"
            onClick={onRemoveHandler}
            isLoading={isUpdating}
          >
            Yes, Delete
          </Button>
          <Button
            variant={"cancel"}
            className="w-full"
            onClick={closeConfirmDeleteModal}
            type="button"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
