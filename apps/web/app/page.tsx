export default function Page() {
  return (
    <div className="min-h-svh flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="flex flex-col justify-center text-2xl font-bold">
          Hello World
        </h1>
        {/* <Button size="sm">Button</Button> */}
        <div className="flex items-center bg-blue-500 p-4 hover:bg-blue-700">
          Test
        </div>
      </div>
    </div>
  );
}
