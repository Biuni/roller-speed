'use client';

import useSWR, { useSWRConfig } from "swr";
import { useState } from "react";

import Qualifications from "./components/qualifications";
import Finals from "./components/finals";
import ShowQualifications from "./components/show_qualifications";
import ShowFinals from "./components/show_finals";
import Image from "next/image";

export default function Home() {

  const URL = "https://api.jsonbin.io/v3/b/66a39436ad19ca34f88d1bdd"

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { mutate } = useSWRConfig()
  const { data, error, isLoading, isValidating } = useSWR(URL, fetcher, { refreshInterval: 1500 })

  const [type, setType] = useState('qualifications')
  const [competition, setCompetition] = useState({
    category: '-',
    sex: '-'
  })
  const [toShowQuali, setToShowQuali] = useState({
    name: '-',
    nationality: '-',
    ranking: '-',
    time_1: '-',
    time_2: '-',
    place: '-'
  })
  const [toShowFinals, setToShowFinals] = useState({
    line_one : {
        name: '-',
        nationality: '-',
        time_nop: '-',
        time: '-',
        penalties: '-',

        win_round1: '-',
        win_round2: '-',
        win_round3: '-',
    },
    line_two: {
        name: '-',
        nationality: '-',
        time_nop: '-',
        time: '-',
        penalties: '-',

        win_round1: '-',
        win_round2: '-',
        win_round3: '-',
    }, 
    round: '-',
  })

  if (error) return <div className="text-red-500 font-bold mt-24 text-center">ERROR!</div>
  if (isLoading) return <div className="text-red-500 font-bold mt-24 text-center">LOADING...</div>

  return (
    <main className="flex max-h-screen min-h-screen flex-col justify-between p-12">
      {/* ------ DASHBOARD  ------ */}
      <div className="min-h-[75%] max-h-[75%] overflow-auto z-10 w-full border border-gray-500 p-5">

        <header className="text-center mb-5 border-b pb-5">
          <div className="grid grid-cols-3">
            <div>
              <Image src="/logo-skate.png" width={200} height={50} alt="World Skate Logo" className="inline" />
            </div>
            <div>
              <form className="max-w-sm mx-auto">
                <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">Category:</label>
                <select id="age"
                  onChange={(e) => setCompetition({...competition, category: e.target.value})}
                  defaultValue={'DEFAULT'}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="DEFAULT" disabled>Choose...</option>
                  <option value="SENIOR">SENIOR</option>
                  <option value="JUNIOR">JUNIOR</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </form>
            </div>
            <div>
              <form className="max-w-sm mx-auto">
                <label htmlFor="sex" className="block mb-2 text-sm font-medium text-gray-900">Sex:</label>
                <select
                  id="sex"
                  onChange={(e) => setCompetition({...competition, sex: e.target.value})}
                  defaultValue={'DEFAULT'}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="DEFAULT" disabled>Choose...</option>
                  <option value="MEN">MEN</option>
                  <option value="WOMEN">WOMEN</option>
                  <option value="MIXED">MIXED</option>
                </select>
              </form>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-3 mt-2">
          <div className="text-center">
            <button
              onClick={() => setType('qualifications')}
              className={`rounded-full text-white text-xs uppercase p-3 min-w-32 ${type === 'qualifications' ? 'bg-orange-300 ' : 'bg-orange-200'}`}>
              Qualifications
            </button>
          </div>
          <div className="text-center">
            <p className="font-mono text-xs">
              <span className="text-[8px] block uppercase tracking-tighter">Data Last update:</span>
              {data.record.info.split('.')[0]}
            </p>
          </div>
          <div className="text-center">
            <button
              onClick={() => setType('finals')}
              className={`rounded-full text-white text-xs uppercase p-3 min-w-32 ${type === 'finals' ? 'bg-blue-400 ' : 'bg-blue-200'}`}>
              Finals
            </button>
          </div>
        </div>

        <div className="text-center mb-5">
          <button
            className="rounded-sm bg-green-300 text-black text-xs uppercase p-2"
            onClick={() => {mutate(URL)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 inline-block mr-1 ${isValidating ? 'animate-spin' : ''}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            REFRESH
          </button>
        </div>

        {type === 'qualifications' ? (
          <Qualifications data={data.record.qualifications} set={setToShowQuali} />
        ) : (
          <Finals data={data.record.finals} set={setToShowFinals} />
        )}
      </div>

      <div className="h-1"></div>

      {/* ------ GRAPHIC  ------ */}
      <div className="min-h-64 max-h-[25%] overflow-auto z-10 w-full border border-gray-500 content-center">
        {type === 'qualifications' ? (
          <ShowQualifications show={toShowQuali} type={competition} />
        ) : (
          <ShowFinals show={toShowFinals} type={competition} />
        )}
      </div>
    </main>
  );
}
