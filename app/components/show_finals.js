import Image from "next/image";
import Flag from "react-world-flags";
import FlagMapper from "../utils/flag_mapper";

export default function ShowFinals({ show, type }) {

    const searchFlag = (nationality) => <Image
      src={`/flags/${nationality}.svg`}
      height={32}
      width={55}
      alt={nationality}
      quality={100}
      className="inline-block"
    />

    const invertLine1 = (data, val, round) => (round == 2) ? data.line_two[val] : data.line_one[val]
    const invertLine2 = (data, val, round) => (round == 2) ? data.line_one[val] : data.line_two[val]

    return (
      <div className="p-1">

        <div className="grid grid-cols-8">
          <div>&nbsp;</div>
          <div className="col-span-7">
            <div className="grid grid-cols-2 gap-1 text-center font-bold text-[12px] flex items-center">
              <div className="py-0.5 bg-[url('/bg-name.jpg')] bg-cover">LINE 1</div>
              <div className="py-0.5 bg-[url('/bg-name.jpg')] bg-cover">LINE 2</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-8">
          <div className="text-right">
            <Image
              src='/logo.jpg'
              height={100}
              width={100}
              alt="Logo World Skate Games Italia 2024"
              quality={100}
              className="w-[100px] inline-block mr-[1px]"
            />
          </div>

          <div className="col-span-7">
            <div className="grid grid-cols-2 gap-1 text-center flex items-center">
              <div>
                {/* BANDIERA + NOME + TEMPO */}
                <div className="grid grid-cols-7 h-[60px] bg-[url('/bg-name.jpg')] bg-cover flex items-center">
                  <div className="ml-3 flex items-center col-span-6">
                    <Flag
                      code={FlagMapper(invertLine1(show, 'nationality', show.round))}
                      className="h-8 inline-block"
                      fallback={searchFlag(FlagMapper(invertLine1(show, 'nationality', show.round)))}
                    />
                    <span className="pl-2 uppercase text-xl font-extralight">
                      {invertLine1(show, 'name', show.round)}
                    </span>
                  </div>
                  <div className="text-2xl font-extralight">
                    {invertLine1(show, 'time', show.round)}
                  </div>
                </div>
              </div>
              <div>
                {/* BANDIERA + NOME + TEMPO */}
                <div className="grid grid-cols-7 h-[60px] bg-[url('/bg-name.jpg')] bg-cover flex items-center">
                  <div className="ml-3 flex items-center col-span-6">
                    <Flag
                      code={FlagMapper(invertLine2(show, 'nationality', show.round))}
                      className="h-8 inline-block"
                      fallback={searchFlag(FlagMapper(invertLine2(show, 'nationality', show.round)))}
                    />
                    <span className="pl-2 uppercase text-xl font-extralight">
                      {invertLine2(show, 'name', show.round)}
                    </span>
                  </div>
                  <div className="text-2xl font-extralight">
                    {invertLine2(show, 'time', show.round)}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 flex items-center">
              {/* INFO + WIN */}
              <div className="h-[40px] mt-[1px] bg-[url('/bg-info.jpg')] bg-cover flex items-center">
                <div className="grid grid-cols-6 font-extralight text-white text-2xl flex-1 items-center">
                  <div className="col-span-4 ml-3">
                    SPEED SLALOM &bull; {type.category} &bull; {type.sex}
                  </div>
                  <div className="col-span-2 text-right">
                    WIN&nbsp;
                    <div className={`w-5 h-5 rounded-full inline-block relative top-0.5 ${(invertLine1(show, 'win_round1', show.round) == -1) ? 'bg-yellow-400' : (invertLine1(show, 'win_round2', show.round) == -1) ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                    &nbsp;
                    <div className={`w-5 h-5 rounded-full inline-block relative top-0.5 ${(invertLine1(show, 'win_round1', show.round) == -1 && invertLine1(show, 'win_round2', show.round) == -1) ? 'bg-yellow-400' : (invertLine1(show, 'win_round3', show.round) == -1) ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                    &nbsp;
                  </div>
                </div>
              </div>

              {/* INFO + WIN */}
              <div className="h-[40px] mt-[1px] bg-[url('/bg-info.jpg')] bg-cover flex items-center">
                <div className="grid grid-cols-6 font-extralight text-white text-2xl flex-1 items-center">
                  <div className="col-span-4 ml-3">
                    SPEED SLALOM &bull; {type.category} &bull; {type.sex}
                  </div>
                  <div className="col-span-2 text-right">
                    WIN&nbsp;
                    <div className={`w-5 h-5 rounded-full inline-block relative top-0.5 ${(invertLine2(show, 'win_round1', show.round) == -1) ? 'bg-yellow-400' : (invertLine2(show, 'win_round2', show.round) == -1) ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                    &nbsp;
                    <div className={`w-5 h-5 rounded-full inline-block relative top-0.5 ${(invertLine2(show, 'win_round1', show.round) == -1 && invertLine2(show, 'win_round2', show.round) == -1) ? 'bg-yellow-400' : (invertLine2(show, 'win_round3', show.round) == -1) ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                    &nbsp;
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    );
}