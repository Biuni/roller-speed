import Image from "next/image";
import Flag from "react-world-flags";

export default function ShowQualifications({ show, type }) {

    const searchFlag = (nationality) => <Image
      src={`/flags/${nationality}.svg`}
      height={48}
      width={72}
      alt={nationality}
      quality={100}
      className="inline-block"
    />

    return (
      <div className="p-1">

        <div className="grid grid-cols-5">
          <div className="text-right">
            <Image
              src='/logo.jpg'
              height={350}
              width={350}
              alt="Logo World Skate Games Italia 2024"
              quality={100}
              className="w-[148px] inline-block mr-[1px]"
            />
          </div>
          <div className="col-span-4">

            {/* BANDIERA + NOME */}
            <div className="h-[75px] bg-[url('/bg-name.jpg')] bg-cover flex items-center">
              <div className="ml-3 flex items-center">
                <Flag code={show.nationality} className="h-12 inline-block" fallback={searchFlag(show.nationality)} />
                <span className="pl-2 uppercase text-4xl font-extralight">{show.name}</span>
              </div>
            </div>

            {/* HEADERS */}
            <div className="h-[75px] bg-[url('/bg-info.jpg')] bg-cover flex items-center">
              <div className="grid grid-cols-7 font-extralight text-white text-3xl flex-1 items-center">
                <div className="col-span-3 ml-3">
                  SPEED &bull; {type.category} &bull; {type.sex}
                </div>
                <div className="text-center">
                  RUN <span className="font-extrabold">1</span>
                </div>
                <div className="text-center">
                  RUN <span className="font-extrabold">2</span>
                </div>
                <div className="text-center">
                  BEST
                </div>
                <div className="text-center">
                  RANK
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 mt-[0.5px]">
          <div>&nbsp;</div>
          <div className="col-span-4">
            <div className="h-[75px] bg-[url('/bg-info.jpg')] bg-cover flex items-center">
              <div className="grid grid-cols-7 font-extralight text-white text-3xl flex-1 items-center">
                <div className="col-span-3 ml-3">
                  QUALIFICATION
                </div>
                <div className="text-center">
                  {show.time_1}
                </div>
                <div className="text-center">
                  {show.time_2}
                </div>
                <div className="text-center">
                  {show.time_1 < show.time_2 ? show.time_1 : show.time_2}
                </div>
                <div className="text-center">
                  <span className="font-extrabold">{show.place}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
}