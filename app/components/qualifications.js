import { useEffect, useState } from "react"

export default function Qualifications({ data, set }) {

    const [qualificationData, setQualificationData] = useState(null)
    const [nameBold, setNameBold] = useState([])

    const searchPlace = (ResultsTable, SID) => {
        return ResultsTable.find(el => el.SID === SID)['Place']
    }
    const searchRunTwo = (data, SID) => {
        try {
            return data.find(el => el.SID === SID)
        } catch (e) {
            return {}
        }
    }
    const searchRunTwoPosition = (data, SID) => {
        try {
            return data.find(el => el.skaterSID === SID)['startPosition']
        } catch (e) {
            return -1
        }
    }
    const prepareData = async (data, sort) => {
        let Run2 = {}
        let SortRun2 = {}
        let parsedData = {}
        let allRuns = {}
        if (Object.prototype.toString.call(data.StartList.Round) === '[object Array]') {
            Run2 = Object.values(data.StartList.Round[1].Run).map(el => el.Line)
            SortRun2 = Object.values(data.StartList.Round[1].Run).map(el => ({
                startPosition: el['@No'],
                skaterSID: el.Line.SID
            }))
            parsedData = data.StartList.Round[0].Run
        } else {
            parsedData = data.StartList.Round.Run
        }
        allRuns = parsedData.map(el => {
            return {
                Run1: el.Line,
                Run2: searchRunTwo(Run2, el.Line.SID),
                SortRun2: searchRunTwoPosition(SortRun2, el.Line.SID),
            }
        })
        if (sort) {
            allRuns.sort((a,b) => a.SortRun2 - b.SortRun2)
            setNameBold([])
        }

        setQualificationData(allRuns)
    }

    useEffect(() => {
        prepareData(data, false)
    }, [data]);

    return (
        <div>
            <h1 className="text-center text-xl uppercase font-extrabold mb-5">Qualifications</h1>
                
                <table className="w-full text-sm text-center text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="bg-sky-100 px-6 py-3" colSpan={3}>
                                Run 1
                            </th>
                            <th scope="col" className="bg-teal-100 px-6 py-3" colSpan={3}>
                                <span className="align-super">Run 2</span>
                                <button onClick={() => prepareData(data, true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 ml-3 bg-red-400 p-1 rounded-full text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                    </svg>
                                </button>
                            </th>
                        </tr>
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
                                Place
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
                                Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Penalties
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Result
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(data.StartList).length > 0 ? 
                        qualificationData ? qualificationData.map((el, i) => (
                            <tr className="bg-white border-b text-center" key={i}>
                                <td>
                                    <button
                                    className="bg-green-400 text-white p-1 rounded-lg"
                                    onClick={() => {
                                        set({
                                            name: el.Run1.Name,
                                            nationality: el.Run1.Country,
                                            ranking: el.Run1.WR,
                                            time_1: el.Run1.R,
                                            time_2: el.Run2.R,
                                            place: searchPlace(data.ResultsTable.Row, el.Run1.SID)
                                        })

                                        setNameBold([...nameBold, el.Run1.Name])
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </td>
                                <td>
                                    <span className={`${nameBold.includes(el.Run1.Name) ? 'font-bold': ''}`}>
                                        {el.Run1.Name}
                                    </span>
                                </td>
                                <td>{el.Run1.Country}</td>
                                <td>{el.Run1.WR}</td>
                                <td>{searchPlace(data.ResultsTable.Row, el.Run1.SID)}</td>
                                <td>{el.Run1.T}</td>
                                <td>{el.Run1.P}</td>
                                <td>{el.Run1.R}</td>
                                <td>{el.Run2.T}</td>
                                <td>{el.Run2.P}</td>
                                <td>{el.Run2.R}</td>
                            </tr>
                    )) : '' : ''}
                    </tbody>
                </table>
        </div>
    );
}