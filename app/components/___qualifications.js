import { useState } from "react";

export default function Qualifications({ data, set }) {

    const [chooseRound, setRound] = useState(0)

    const searchPlace = (ResultsTable, SID) => {
        return ResultsTable.find(el => el.SID === SID)['Place']
    }

    const checkRound = (data, round) => {
        return Object.prototype.toString.call(data.StartList.Round) === '[object Array]' ? 
        data.StartList.Round[round].Run : 
        data.StartList.Round.Run
    }

    return (
        <div>
            <h1 className="text-center text-xl uppercase font-extrabold mb-5">Qualifications</h1>

                <div className="text-center mb-5">
                    <div className="mr-1 text-center inline-block">
                        <button
                        onClick={() => setRound(0)}
                        class={`rounded-md text-white text-xs uppercase p-2 min-w-24 ${chooseRound == 0 ? 'bg-red-400' : 'bg-red-200' }`}>
                            Round 1
                        </button>
                    </div>
                    <div className="ml-1 text-center inline-block">
                        <button
                        onClick={() => setRound(1)}
                        class={`rounded-md text-white text-xs uppercase p-2 min-w-24 ${chooseRound == 1 ? 'bg-red-400' : 'bg-red-200' }`}>
                            Round 2
                        </button>
                    </div>
                </div>

                <table className="w-full text-sm text-center text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                SHOW
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3">
                                World Ranking
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Penalties
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Result
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Place
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(data.StartList).length > 0 ? 
                        checkRound(data, chooseRound).map(el => (
                            <tr className="bg-white border-b text-center">
                                <td>
                                    <button
                                    className="bg-green-400 text-white p-1 rounded-lg"
                                    onClick={() => set({
                                        name: el.Line.Name,
                                        nationality: el.Line.Country,
                                        ranking: el.Line.WR,
                                        time: el.Line.R,
                                        penalties: el.Line.P,
                                        place: searchPlace(data.ResultsTable.Row, el.Line.SID)
                                    })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </td>
                                <td>{el.Line.Name}</td>
                                <td>{el.Line.Country}</td>
                                <td>{el.Line.WR}</td>
                                <td>{el.Line.T}</td>
                                <td>{el.Line.P}</td>
                                <td>{el.Line.R}</td>
                                <td>{searchPlace(data.ResultsTable.Row, el.Line.SID)}</td>
                            </tr>
                    )) : ''}
                    </tbody>
                </table>
        </div>
    );
}