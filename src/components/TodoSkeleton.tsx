interface IProps {
  from: "TodoList" | "TodosPage";
}

export default function TodoSkeleton({ from }: IProps) {
  return from === "TodoList" ? (
    <div
      role="status"
      className="p-4 space-y-6 sm:space-y-4 rounded animate-pulse container"
    >
      <div className="flex-cols sm:flex items-center justify-between sm:gap-8">
        <div className="sm:w-8/12 w-full">
          <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-400 mb-2.5"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 sm:h-12 bg-gray-300 rounded-md dark:bg-gray-400 w-full sm:w-20"></div>
          <div className="h-10 sm:h-12 bg-gray-300 rounded-md dark:bg-gray-400 w-full sm:w-20"></div>
        </div>
      </div>
      <div className="flex-cols sm:flex items-center justify-between sm:gap-8">
        <div className="sm:w-8/12 w-full">
          <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-400 mb-2.5"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 sm:h-12 bg-gray-300 rounded-md dark:bg-gray-400 w-full sm:w-20"></div>
          <div className="h-10 sm:h-12 bg-gray-300 rounded-md dark:bg-gray-400 w-full sm:w-20"></div>
        </div>
      </div>
      <div className="flex-cols sm:flex items-center justify-between sm:gap-8">
        <div className="sm:w-8/12 w-full">
          <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-400 mb-2.5"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 sm:h-12 bg-gray-300 rounded-md dark:bg-gray-400 w-full sm:w-20"></div>
          <div className="h-10 sm:h-12 bg-gray-300 rounded-md dark:bg-gray-400 w-full sm:w-20"></div>
        </div>
      </div>
      <div className="flex-cols sm:flex items-center justify-between sm:gap-8">
        <div className="sm:w-8/12 w-full">
          <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-400 mb-2.5"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 sm:h-12 bg-gray-300 rounded-md dark:bg-gray-400 w-full sm:w-20"></div>
          <div className="h-10 sm:h-12 bg-gray-300 rounded-md dark:bg-gray-400 w-full sm:w-20"></div>
        </div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <div
      role="status"
      className="p-4 space-y-8 rounded animate-pulse container"
    >
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-400 w- mb-2.5"></div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-400 w- mb-2.5"></div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-400 w- mb-2.5"></div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-400 w- mb-2.5"></div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-400 w- mb-2.5"></div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-400 w- mb-2.5"></div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-400 w- mb-2.5"></div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-400 w- mb-2.5"></div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-400 w- mb-2.5"></div>
      <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-400 w- mb-2.5"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
