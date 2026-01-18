import { useEffect, useState } from "react";

// type TProps = {
//     value:number;
// }
// const LifecycleComponent = ({value}:TProps) => {

const LifecycleComponent = () => {
  useEffect(() => {
    console.log("Component has mounted");

    return () => {
      console.log("Component has unmounted");
    };
  }, []);
  return <div>Hello world</div>;
};

export default function Lifecycle() {
  const [shouldRender, setShouldRender] = useState(false);
  //   const [number, setNumber] = useState(0)
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black ">
      <div>
        <button onClick={() => setShouldRender((prev) => !prev)}>
          Click to mount
        </button>
        {shouldRender && <LifecycleComponent />}
      </div>
    </div>
  );
}
//Question: why on the first render there is 3 logs in console
