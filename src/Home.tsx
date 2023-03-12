import { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import Fields from "./Fields";
function Home() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [money, setMoney] = useState(currentUser.stats.money);
  const [day, setDay] = useState(currentUser.stats.day);
  const [inventory, setInventory] = useState({});
  const [plots, setPlots] = useState(currentUser.stats.plots);
  console.log("user at home: ", currentUser);

  // useEffect(() => {
  //   setMoney(currentUser.stats.money);
  //   setDay(currentUser.stats.day);
  // }, []);

  useEffect(() => {
    currentUser.stats.money = money;
    currentUser.stats.day = day;
    currentUser.stats.plots = plots;
  }, [money, day]);

  const buyPlot = () => {
    setMoney(currentUser.stats.money - 100);
    plots.push(1);
  };
  const sellPlot = () => {
    setMoney(currentUser.stats.money + 50);
    plots.pop();
  };
  const endDay = () => {
    setDay(currentUser.stats.day + 1);
  };

  return (
    <>
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">
          Welcome {currentUser.username}
        </p>
        <div>
          <pre className="relative left-1 font-bold">Day: {day}</pre>
          <button
            onClick={endDay}
            className="bg-yellow-700 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            end day
          </button>
        </div>
      </div>
      <div className="font-bold">Money: ${money}</div>
      <div>
        <button
          onClick={buyPlot}
          className="bg-green-900 text-white active:bg-yellow-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          buy plot ($100)
        </button>
        <button
          onClick={sellPlot}
          className="bg-yellow-600 text-white active:bg-yellow-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          sell plot ($50)
        </button>
      </div>
      <div id="field">{plots?.length > 0 ? <Fields fields={plots} /> : ""}</div>
    </>
  );
}

export default Home;
