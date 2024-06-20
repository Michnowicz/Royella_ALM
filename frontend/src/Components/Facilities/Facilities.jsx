import { useEffect, useState } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Facilities = ({facilitiesSection}) => {

  // const [displayedFacilities, setDisplayedFacilities] = useState(null)
  
  // useEffect(()=>{
  //   if (facilities != null) {
  //     const orderedFacilities = []
  //     for (let i = 1; i <= 4; i++) {
  //       const displayed = Array.from(facilities).filter(f => f.display == i)
  //       orderedFacilities.push(displayed[0])
  //     }
  //     setDisplayedFacilities(orderedFacilities)
  //   }
  // },[facilities])

  // useEffect(()=>{
  //   if (displayedFacilities != null) {
  //     console.log(displayedFacilities);
  //   }
  // },[displayedFacilities])

  useEffect(()=>{
    if (facilitiesSection != null) {
      console.log(facilitiesSection);
    }
  },[facilitiesSection])

  return (
    <div className="dark:bg-mediumBlack ">
      <section className="Container py-[120px] md:py-0 md:pb-[120px] lg:py-[120px]">
        {/* section title and button */}
        <div
          className="flex flex-col md:flex-row md:items-center justify-between mb-12 px-3 sm:px-5"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className=" md:w-[450px] font-Garamond">
            <h5 className="text-base text-khaki leading-[26px] font-medium mb-[14px]  ">
              FACILITIES
            </h5>
            <h1 className="text-[22px] sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[38px] lg:leading-[44px]  text-lightBlack dark:text-white font-semibold ">
              ENJOY COMPLETE & BEST QUALITY FACILITIES
            </h1>
          </div>
          <div className="mt-5 md:mt-0">
            <Link to="/services">
              <button className="btn-items">view more item</button>
            </Link>
          </div>
        </div>




        {/* facilities container */}
        <div className="">
          { facilitiesSection != null ?
            facilitiesSection.map((f,i)=>(
              <>
              <hr className="text-[#e8e8e8] dark:text-[#383838] mb-10 mt-10" />
              { f.id % 2 != 0 ?
                <div
                  className="grid grid-cols-1 md:grid-cols-2 "
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div className="relative w-full h-[100%] md:pr-[30px]">
                    { f.facility_info.image != undefined ?
                        <img
                        src={"http://127.0.0.1:8000"+f.facility_info.image.image}
                        alt=""
                        className="w-full h-full"
                        />
                      :
                      ""
                    }
                    <div className=" hidden md:block absolute -top-[0px] md:-right-[12%] -right-[7%] xl:-right-[5%]">
                      <h2 className="text-3xl md:text-4xl lg:text-[40px] leading-[38px] text-khaki font-Garamond">
                        {`0${f.id}`}
                      </h2>
                    </div>
                  </div>
                  <div className="relative font-Garamond md:ml-[60px] lg:ml-[107px] mt-3 md:mt-0  h-full">
                    <h4 className="text-base font-semibold text-khaki leading-[26px] pb-[6px] uppercase mt-2 md:mt-0">
                      {f.category}
                    </h4>

                    <h1 className="text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold text-lightBlack dark:text-white">
                      <Link to="/service_details"> {f.subtitle}</Link>
                    </h1>

                    <p className="font-Lora text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal my-10 lg:mt-[46px] lg:mb-[40px] before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px] relative">
                      {f.description}
                    </p>

                    <Link to="/service_details">
                      <HiArrowLongRight
                        size={30}
                        className="text-gray hover:text-khaki"
                      />
                    </Link>
                  </div>
                </div>
                :
                <div
                  className="grid grid-cols-1 md:grid-cols-2 "
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div className=" font-Garamond md:mr-[2px] lg:mr-[110px]  h-full">
                    <h4 className="text-base font-semibold text-khaki leading-[26px] pb-[6px] uppercase ">
                    {f.category}
                    </h4>
                    <h1 className="text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold text-lightBlack dark:text-white">
                      <Link to="/service_details">{f.subtitle}</Link>
                    </h1>

                    <p className="font-Lora relative text-sm sm:text-base text-gray dark:text-lightGray leading-[26px] font-normal my-10 lg:mt-[46px] lg:mb-[40px] before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px]">
                      {f.description}
                    </p>
                    <Link to="/service_details">
                      <HiArrowLongRight
                        className="text-gray hover:text-khaki"
                        size={30}
                      />
                    </Link>
                  </div>

                  <div className="w-full  md:pl-[30px] relative mt-5 md:mt-0">
                    { f.facility_info.image != undefined ?
                        <img
                        src={"http://127.0.0.1:8000"+f.facility_info.image.image}
                        alt=""
                        className="w-full h-full"
                        />
                      :
                      ""
                    }
                    <div className="hidden md:block absolute -top-[0px] -left-[12%] xl:-left-[6%]">
                      <h1 className="text-3xl md:text-4xl lg:text-[40px] leading-[38px] text-khaki  font-Garamond">
                        {`0${f.id}`}
                      </h1>
                    </div>
                  </div>
                </div>
              }
              </>
            ))
          :
          ""
          }
        </div>
      </section>
    </div>
  );
};

export default Facilities;
