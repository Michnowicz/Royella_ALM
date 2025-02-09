import { FaSearch } from "react-icons/fa";
import { BiChevronsRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const BlogSideBar = ({search ,setSearch,setCategorySearch, tagSearch, setTagSearch}) => {
  const [tags, setTags] = useState(null)
  const [categories, setCategories] = useState(null)
  const [posts, setPosts] = useState(null)
  const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]


  useEffect(()=>{
    fetchData()
    fetchPopularPosts()
  },[])
  const fetchData = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/searchbar/get")
    // console.log(response.data.data);
    setTags(response.data.data.tags)
    setCategories(response.data.data.categories)
  }
  const fetchPopularPosts = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/popularpost/get")
    setPosts(response.data.blogs)
  }
  
  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase())
  }
  const handleCategory = (category) => {
    if (category === "Uncategories") {
      setCategorySearch("")
    } else {
      setCategorySearch(category)
    }
  }
  const handleTag = (e,tag) => {
    // console.log(e.target.nodeName);
    if (tagSearch === tag) {
      setTagSearch("")
    } else {
      setTagSearch(tag)
    }
    //tags display on click
    const allTags = document.querySelectorAll(".tags")
    Array.from(allTags).forEach(t => {
      if (t.id == tag && tag != tagSearch) {
        t.className = "px-2 sm:px-4 py-2 bg-khaki text-white dark:bg-khaki transition-all duration-300 group tags"
        t.firstChild.className = "text-sm sm:text-base leading-6 lg:leading-[30px] font-Garamond text-white dark:text-white font-medium  group-hover:text-white"
      } else {
        t.className = "px-2 sm:px-4 py-2 bg-white dark:bg-lightBlack hover:bg-khaki transition-all duration-300 group tags"
        t.firstChild.className = "text-sm sm:text-base leading-6 lg:leading-[30px] font-Garamond text-[#101010] dark:text-white font-medium  group-hover:text-white"
      }
    });
  }




  // useEffect(()=>{
  //   if (posts !== null) {
  //     console.log(posts);
  //   }
  // },[posts])



  
  return (
    <>
      {/* blog search bar*/}
      <div className="bg-whiteSmoke dark:bg-normalBlack items-center w-full p-4 sm:p-8 2xl:p-10 focus:shadow-xl rounded-md">
        <form
          className="flex items-center space-x-2 md:space-x-5 relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <input
            placeholder="Search Here"
            type="text"
            className=" px-5 py-[5px] w-full h-12 md:h-14 text-base
                  border-none outline-none rounded-md text-gray dark:text-lightGray focus:border-none placeholder:text-[#515151] focus:ring-0 focus:outline-none dark:bg-lightBlack"
            value={search}
            onChange={handleSearch}
          />
          <Link
            to="#"
            className="absolute top-5 right-4 text-lightGray dark:text-gray"
          >
            <FaSearch className="w-4 h-4 " />
          </Link>
        </form>
      </div>

      {/*Popular Post */}
      <div className="bg-whiteSmoke dark:bg-normalBlack w-full p-4 sm:p-8 2xl:p-10 mt-5 2xl:mt-[30px] rounded-md ">
        <h2 className="text-lg sm:text-xl md:text-[22px] lg:text-2xl leading-6 md:leading-7 lg:leading-[30px] text-lightBlack dark:text-white relative before:w-[50px] before:h-[1px] before:bg-lightBlack dark:before:bg-white before:absolute before:left-0 before:top-9 font-Garamond font-semibold">
          Popular Post
        </h2>
        <div className="pt-10">
          { posts != undefined ?
          posts.map((p,i)=>(
          <Link
            to={`/blog_details/${p.id}`}
            className={i==0 ? "flex items-center" : "mt-5 md:mt-[30px] flex items-center"}
            data-aos="fade-up"
            data-aos-duration="1000"
            key={i}
          >
            <img
              // src="/images/inner/details-post-1.jpg"
              src={"http://127.0.0.1:8000"+p.images[0].image}
              className=" mr-3 2xl:mr-5 "
              style={{height: "80px", width: "80px" }}
              alt=""
            />
            <div className="text-left">
              <h4 className="text-base 2xl:text-lg leading-6 text-[#101010] dark:text-white font-medium font-Garamond hover:underline underline-offset-4">
                {p.title}
              </h4>
              <p className="text-sm md:text-[13px] 2xl:text-sm leading-[26px] font-Lora text-gray dark:text-lightGray font-normal">
              {months[parseInt(p.date.slice(5,7))-1]} {p.date.slice(8,10)}, {p.date.slice(0,4)}
              </p>
            </div>
          </Link>
          ))
          :
          ""
          }
        </div>
      </div>

      {/* Categories */}
      <div className="bg-whiteSmoke dark:bg-normalBlack w-full p-4 sm:p-8 2xl:p-10 mt-5 2xl:mt-[30px] rounded-md ">
        <h2 className="text-lg sm:text-xl md:text-[22px] lg:text-2xl leading-6 md:leading-7 lg:leading-[30px] text-lightBlack dark:text-white relative before:w-[50px] before:h-[1px] before:bg-lightBlack dark:before:bg-white before:absolute before:left-0 before:top-9 font-Garamond font-semibold">
          Categories
        </h2>
        <div className="pt-10">
          <ul className=" " data-aos="fade-up" data-aos-duration="1000">
            { categories !== null ?
              categories.map((c,i)=>(
                <li className="flex items-center group transition-all duration-300 border-b-[1px] cursor-pointer border-lightGray dark:border-gray pb-3" key={i}>
                  <BiChevronsRight
                    size={16}
                    className="text-lightBlack dark:text-white group-hover:text-khaki mr-2"
                  />
                  <span className="text-sm xl:text-base 2xl:text-lg leading-[26px] text-lightBlack group-hover:text-khaki font-medium font-Garamond dark:text-white"
                  onClick={()=>handleCategory(c.name)}
                  >
                    {c.name}
                  </span>
                </li>
              ))
              :
              ""
            }
          </ul>
        </div>
      </div>
      {/* Tags */}
      <div className="bg-whiteSmoke dark:bg-normalBlack w-full p-4 sm:p-8 2xl:p-10 mt-5 2xl:mt-[30px] rounded-md ">
        <h2 className="text-lg sm:text-xl md:text-[22px] lg:text-2xl leading-6 md:leading-7 lg:leading-[30px] text-lightBlack dark:text-white relative before:w-[50px] before:h-[1px] before:bg-lightBlack dark:before:bg-white before:absolute before:left-0 before:top-9 font-Garamond font-semibold">
          Tag
        </h2>
        <div className="pt-10 " data-aos="fade-up" data-aos-duration="1000">
          <div className="grid items-center grid-cols-2 md:grid-cols-1 2xl:grid-cols-2 gap-3 sm:gap-5  ">
            { tags !== null ?
              tags.map((t,i)=>(
              <div className="px-2 sm:px-4 py-2 bg-white dark:bg-lightBlack hover:bg-khaki transition-all duration-300 group tags" id={t.name} key={i}
              onClick={(e)=>handleTag(e,t.name)}>
                <h1 className="text-sm sm:text-base leading-6 lg:leading-[30px] font-Garamond text-[#101010] dark:text-white font-medium  group-hover:text-white">
                  {t.name}
                </h1>
              </div>
              ))
              :
              ""
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSideBar;
