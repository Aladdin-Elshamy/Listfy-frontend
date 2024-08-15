import { ChangeEvent, useState } from "react"
import TodoSkeleton from "../components/TodoSkeleton"
import Paginator from "../components/ui/Paginator"
import useCustomQuery from "../hooks/useCustomQuery"
import Button from "../components/ui/Button"
import axiosInstance from "../config/axios.config"
import { faker } from "@faker-js/faker"

export default function Todo() {
    /* --------------------------- Variables --------------------------- */
    const storageKey = "loggedInUser"
    const userDataString = localStorage.getItem(storageKey)
    const userData = userDataString ? JSON.parse(userDataString) : null
    /* --------------------------------- States --------------------------------- */
    const [page,setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10);
    const [queryVersion, setQueryVersion] = useState(1);
    const [sortBy, setSortBy] = useState<string>("DESC");
    /* ------------------------------- API Request ------------------------------ */
    const {isLoading, data, isFetching} = useCustomQuery({queryKey: [`todo-page-${page}-size-${pageSize}-sortBy-${sortBy}-version-${queryVersion}-sortBy-${sortBy}`], url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`, config: {
        headers: {
          Authorization: `Bearer ${userData.jwt}`
        }
      },
    })
    if (isLoading) return (
        <>
          <TodoSkeleton from="TodosPage" />
        </>
      )
    /* -------------------------------- Handlers -------------------------------- */
    function onClickPrev(){
      setPage(prev => prev - 1)
    }
    function onClickNext(){
      setPage(prev => prev + 1)
    } 
    function onChangePageSize(e: ChangeEvent<HTMLSelectElement>){
      setPageSize(+e.target.value)
    }
    const onChangeSortBy = (e: ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value);
    };
    async function onGenerateTodos(){
      for (let i = 0; i < 10; i++) {
        try {
          const {status} = await axiosInstance.post(`/todos`,{data: {title: faker.word.words(5), description: faker.lorem.paragraph(2), user: userData.user.id}}, {
            headers: {
              Authorization: `Bearer ${userData.jwt}`
            }
          })
          if (status === 200) {
            setQueryVersion(prev => prev+1)
          }
        } catch (e) {
          console.error(e)
        }
      }
      
    }
    return (
      <>
      <div className="flex items-center justify-between space-x-2 mb-4">
        <Button
          size="sm"
          onClick={onGenerateTodos}
          title="Generate 100 records"
        >
          Generate todos
        </Button>
        <div className="flex items-center justify-between space-x-2 text-md">
          <select
            className="border-2 border-indigo-600 rounded-md p-2"
            value={sortBy}
            onChange={onChangeSortBy}
          >
            <option disabled>Sort by</option>
            <option value={"ASC"}>Oldest</option>
            <option value={"DESC"}>Latest</option>
          </select>
          <select
            className="border-2 border-indigo-600 rounded-md py-2"
            value={pageSize}
            onChange={onChangePageSize}
          >
            <option disabled>Page Size</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>      
      {data.data.length ? (
        data.data.map((todo : {id:number, attributes: {title: string}},index : number) => 
          {
            const pageIndex = page * pageSize - pageSize + index
            return (
              <div key={todo.id} className="flex items-center jsutify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
                <p className="w-full font-semibold">{pageIndex + 1} - {todo.attributes.title}</p>
              </div>
            )
          }
        )
      ) : (
        <p>No todos</p>
      )}
      <Paginator page={page} pageCount={data.meta.pagination.pageCount} total={data.meta.pagination.total} isLoading={isLoading || isFetching} onClickPrev={onClickPrev} onClickNext={onClickNext} />
    </>
    )

}