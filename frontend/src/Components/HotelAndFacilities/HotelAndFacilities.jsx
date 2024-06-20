import { useEffect } from "react";
import { BiBed } from "react-icons/bi";
import { HiOutlineWifi } from "react-icons/hi";
import { LuFileKey } from "react-icons/lu";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { TbSwimming } from "react-icons/tb";


const HotelAndFacilities = ({facilities}) => {

  // useEffect(()=>{
  //   console.log(facilities);
  // },[facilities])

  return (
    <section className="bg-lightBlack z-[1]">
      <div className="py-[110px] bg-[url('/images/home-1/section-shape2.png')] bg-no-repeat bg-top bg-opacity-[0.07]">
        <div className="Container">
          <div
            className=" text-center mx-auto px-5 sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] "
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {/* Section logo */}
            <div className="flex items-center justify-center space-x-2 mb-4 lg:mb-5">
              <hr className="w-[100px] h-[1px] bg-[#3b3b3b] text-[#3b3b3b] " />
              <img
                src="/images/home-1/section-shape1.png"
                alt="room_section_logo"
                className="w-[50px] h-[50px]"
              />
              <hr className="w-[100px] h-[1px] bg-[#3b3b3b] text-[#3b3b3b]"/>
            </div>
            <h1 className="text-2xl md:text-3xl 2xl:text-[38px] leading-[38px] lg:leading-[44px] 2xl:leading-[52px] text-white mb-[6px] font-Garamond font-semibold uppercase">
              HOTEL’S FACILITIES
            </h1>
            <p className="font-Lora leading-[26px] text-lightGray font-normal text-sm sm:text-base">
              Proactively morph optimal infomediaries rather than accurate
              expertise. Intrinsicly progressive resources rather than
              resource-leveling
            </p>
          </div>

              <div
                className="grid items-center justify-center-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6 3xl:grid-cols-6 gap-4  xl:gap-[26px] pt-[60px] pb-[110px] px-8 lg:px-10 xl:px-28 2xl:px-0"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                { facilities.length != 0 ?
                  facilities.map((f,i)=>(
                    <div className={`pt-[37px] pb-[27px] border border-[#343434] h-[200px] w-[191px] text-center transition-all duration-500 relative z-[1] before:bg-[url('http://127.0.0.1:8000${f.image.image}')] before:absolute before:w-0 before:h-full before:left-[-0px] 2xl:before:left-[-222px] before:top-0 before:transition-all before:duration-500 before:bg-cover before:bg-center  hover:before:w-[100%] hover:before:z-[1] md:hover:before:w-[114%] xl:hover:before:w-[116%] group after:absolute after:w-0 after:h-full after:left-0 after:top-0 after:hover:bg-[#272727] after:transition after:duration-500 after:z-[-1] after:hover:w-full`} key={i}>
                      <div>
                        <img
                          src={"http://127.0.0.1:8000"+f.icon.icon}
                          alt=""
                          className="mx-auto"
                        />
                      </div>
                      <div className="">
                        <h4 className="text-[22px] leading-[52px] font-Garamond text-white font-medium mt-[45px] relative before:absolute before:w-[1px] before:h-[25px] before:left-[50%] before:top-[-27px] before:bg-slate-500 before:group-hover:bg-khaki">
                          {f.title}
                        </h4>
                      </div>
                    </div>
                  ))
                  :
                  ""
                }

              </div>
        </div>
      </div>
    </section>
  );
};

export default HotelAndFacilities;
