import { useState } from "react";

export default function Finals({ data, set }) {

    const [chooseRound, setRound] = useState(0)

    const checkEmpty = (data) => {
        return data != null ? 
        data :
        '-'
    }
    const checkWin = (data) => {
        return data != null ?
        data == -1 ? 'x' : 'o'
        : '-'
    }
    const showButton = (data, round) => (
        <button
            className="bg-green-400 text-white p-1 rounded-lg"
            onClick={() => set({
                line_one : {
                    name: data[0].Name,
                    nationality: data[0].Country,
                    time_nop: data[0].Result[round].T,
                    time: data[0].Result[round].R,
                    penalties: data[0].Result[round].P,

                    win_round1: data[0].Result[0].F,
                    win_round2: data[0].Result[1].F,
                    win_round3: data[0].Result[2].F
                },
                line_two: {
                    name: data[1].Name,
                    nationality: data[1].Country,
                    time_nop: data[1].Result[round].T,
                    time: data[1].Result[round].R,
                    penalties: data[1].Result[round].P,

                    win_round1: data[1].Result[0].F,
                    win_round2: data[1].Result[1].F,
                    win_round3: data[1].Result[2].F,
                }, 
                round: round+1
        })}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
            </svg>
        </button>
    )

    const showTable = (el, i) => (
        <table className="w-full text-sm text-center text-gray-500" key={i}>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 min-w-52">Name</th>
                    <th scope="col" className="px-6 py-3">Country</th>
                    <th scope="col" className="px-6 py-3">World Ranking</th>
                    <th scope="col" className="px-6 py-3 text-center bg-sky-100 border-l-2 border-gray-500">
                        {showButton(el.Finalist, 0)}
                        &nbsp;<span className="align-super ml-2 font-normal">Round 1</span>
                    </th>
                    <th scope="col" className="px-6 py-3 text-center bg-teal-100 border-l-2 border-gray-500">
                        {showButton(el.Finalist, 1)}
                        &nbsp;<span className="align-super ml-2 font-normal">Round 2</span>
                    </th>
                    <th scope="col" className="px-6 py-3 text-center bg-violet-100 border-l-2 border-gray-500">
                        {showButton(el.Finalist, 2)}
                        &nbsp;<span className="align-super ml-2 font-normal">Round 3</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {el.Finalist.map((val, i) => (
                    <tr key={i}>
                        <td>{val.Name}</td>
                        <td>{val.Country}</td>
                        <td>{val.WR}</td>
                        {[0,1,2].map(final_round => (
                            <td key={final_round}>
                                <table className="w-full">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                        <tr>
                                            <th scope="col" className="px-6 py-1 text-[9px]">Time</th>
                                            <th scope="col" className="px-6 py-1 text-[9px]">Penalties</th>
                                            <th scope="col" className="px-6 py-1 text-[9px]">Total</th>
                                            <th scope="col" className="px-6 py-1 text-[9px]">WIN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-xs">
                                            <td>{checkEmpty(val.Result[final_round].T)}</td>
                                            <td>{checkEmpty(val.Result[final_round].P)}</td>
                                            <td>{checkEmpty(val.Result[final_round].R)}</td>
                                            <td>{checkWin(val.Result[final_round].F)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )

    return (
        <div>
            <h1 className="text-center text-xl uppercase font-extrabold mb-5">Finals</h1>

            <div className="text-center mb-5">
                <div className="mr-1 text-center inline-block">
                    <button
                    onClick={() => setRound(0)}
                    className={`rounded-md text-white text-xs uppercase p-2 min-w-24 ${chooseRound == 0 ? 'bg-red-400' : 'bg-red-200' }`}>
                        Quarter Finals
                    </button>
                </div>
                <div className="ml-1 text-center inline-block">
                    <button
                    onClick={() => setRound(1)}
                    className={`rounded-md text-white text-xs uppercase p-2 min-w-24 ${chooseRound == 1 ? 'bg-red-400' : 'bg-red-200' }`}>
                        Semi Finals
                    </button>
                </div>
                <div className="ml-1 text-center inline-block">
                    <button
                    onClick={() => setRound(2)}
                    className={`rounded-md text-white text-xs uppercase p-2 min-w-24 ${chooseRound == 2 ? 'bg-red-400' : 'bg-red-200' }`}>
                        3rd Place
                    </button>
                </div>
                <div className="ml-1 text-center inline-block">
                    <button
                    onClick={() => setRound(3)}
                    className={`rounded-md text-white text-xs uppercase p-2 min-w-24 ${chooseRound == 3 ? 'bg-red-400' : 'bg-red-200' }`}>
                        Final
                    </button>
                </div>
            </div>

            {
                Object.keys(data).length > 0 ? 
                chooseRound <= 1 ? 
                data[chooseRound].Group.map((el, i) => showTable(el, i)) :  // Quarters - Semis
                showTable(data[chooseRound].Group)                          // 3d place - Final
                : ''
            }
        </div>
    );
}