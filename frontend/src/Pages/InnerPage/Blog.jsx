import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { Link } from "react-router-dom";
import BlogSideBar from "./BlogSideBar";
import axios from "axios";
import { useEffect, useState } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState(null)
  const [filteredBlogs, setFilteredBlogs] = useState(null)
  const [paginatedBlogs, setPaginatedBlogs] = useState(null)

  const [search, setSearch] = useState("")
  const [categorySearch, setCategorySearch] = useState("")
  const [tagSearch, setTagSearch] = useState("")

  const [page, setPage] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]



  useEffect(()=>{
    fetchBlog()
  },[])
  const fetchBlog = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/blogs/get")
    // console.log(response.data.blogs);
    setBlogs(response.data.blogs)
    setFilteredBlogs(response.data.blogs)

    getPageNumber(response.data.blogs.length)
    setPage(1)
  }

  useEffect(()=>{
    if (blogs !== null) {
      // filter all blogs by category
      const filtered = blogs.filter(b => b.category.name.includes(categorySearch))
      if (tagSearch === "") {
        setFilteredBlogs(filtered)
        getPageNumber(filtered.length)
      } else {
        const tagged = []
        filtered.forEach(f => {
          // console.log(f.tags);
          f.tags.forEach(tag => {
            if (tag.name === tagSearch) {
              tagged.push(f)
            }
          });
        });
        setFilteredBlogs(tagged)
        getPageNumber(tagged.length)
      }
      setPage(1)
    }
  },[categorySearch, tagSearch])

  useEffect(()=>{
    if (filteredBlogs !== null) {
      if (filteredBlogs.length <= 6) {
        setPaginatedBlogs(filteredBlogs)
      } else {
        if (page === 1) {
          setPaginatedBlogs(filteredBlogs.slice(0, 6))
        } else {
          const n = page * 6
          // console.log(n);
          if (filteredBlogs.length < n) {
            // console.log(filteredBlogs.slice((n - 1)));
            setPaginatedBlogs(filteredBlogs.slice(n - 6))
          } else {
            setPaginatedBlogs(filteredBlogs.slice(n - 6, n))
          }
        }
      }
    }
  },[page, filteredBlogs])
  // useEffect(()=>{
  //   console.log(paginatedBlogs);
  // },[paginatedBlogs])

  const getPageNumber = (pageLength) => {
    // number of pages for pagination
    const n = pageLength
    const pages = []
    if (n < 6) {
      pages.push(1)
    } else if (n % 6 === 0) {
      for (let index = 1; index <= Math.floor(n/6); index++) {
        pages.push(index)
      }
    } else {
      for (let index = 1; index <= (Math.floor(n/6)+1); index++) {
        pages.push(index)
      }
    }
    // console.log(pages);
    setPageNumber(pages)
  }


  const changePage = (e) => {
    if (e.target.id === "arrowRight" && page < pageNumber.length) {
      setPage(page+1)
    } else if (e.target.id === "arrowLeft" && page > 1) {
      setPage(page-1)
    } else if (e.target.id === "pageNumber" || e.target.id === "pageNumberSpan") {
      setPage(parseInt(e.target.innerText))
    }
  }

  useEffect(()=>{
    const spans = document.querySelectorAll("#pageNumberSpan");
    Array.from(spans).forEach(s => {
      if (s.getAttribute("value") == page) {
        s.className = "w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]  dark:bg-khaki border-[1px] border-khaki dark:border-gray bg-khaki  hover:bg-khaki dark:hover:bg-khaki grid items-center justify-center font-semibold cursor-pointer group"
        s.firstChild.className = "text-white dark:text-white group-hover:text-white"
      } else {
        s.className = "w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]  dark:bg-lightBlack border-[1px] border-lightGray dark:border-gray bg-white  hover:bg-khaki dark:hover:bg-khaki grid items-center justify-center  cursor-pointer group"
        s.firstChild.className = "text-lightBlack dark:text-white group-hover:text-white"
      }
    });
  },[page])


  // useEffect(()=>{
  //   if (page !== null) {
  //     console.log(page);
  //   }
  // },[page])
  // useEffect(()=>{
  //   if (pageNumber !== null) {
  //     console.log(pageNumber);
  //   }
  // },[pageNumber])





  return (
    <div>
      <BreadCrumb title="Blog" />
      <div className="dark:bg-lightBlack py-20 2xl:py-[120px]">
        <div className="Container grid grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5 ">
          <div className="col-span-6 md:col-span-4">
            <div className="grid items-center gap-5 2xl:gap-y-[30px] grid-cols-1 lg:grid-cols-2">
              {/* Blog */}
              {
                paginatedBlogs != null ?
                // blogs.filter(b => b.title.toLowerCase().includes(search) && b.category.name.includes(categorySearch)).map((b,i)=>(
                  paginatedBlogs.filter(b => b.title.toLowerCase().includes(search)).map((b,i)=>(
                  <div
                    className="overflow-hidden 3xl:w-[410px] group"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    key={i}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={"http://127.0.0.1:8000"+b.images[0].image}
                        // src="/images/home-1/blog-1.jpg "
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                    <div className="font-Garamond border border-[#ddd] dark:border-gray border-t-0">
                      <div className="py-6 px-[30px] ">
                        <div className="flex items-center space-x-6 ">
                          <p className="text-sm 2xl:text-base leading-[26px] text-gray dark:text-lightGray font-normal uppercase mr-7 ml-3 relative before:absolute before:w-[7px] before:h-[7px] before:left-[-13px] before:bg-[#d1d1d1] dark:before:bg-khaki before:top-[9px]">
                            {months[parseInt(b.date.slice(5,7))-1]} {b.date.slice(8,10)}, {b.date.slice(0,4)}
                          </p>
                          <p className="text-sm 2xl:text-base leading-[26px] text-gray dark:text-lightGray font-normal uppercase mr-7 ml-3 relative before:absolute before:w-[7px] before:h-[7px] before:left-[-13px] before:bg-[#d1d1d1] dark:before:bg-khaki before:top-[9px]">
                            {b.category.name}
                          </p>
                        </div>
                        <Link
                          to={`/blog_details/${b.id}`}
                          state={{
                            title: b.title,
                          }}
                        >
                          <h2 className="text-xl md:text-[22px] xl:text-2xl 2xl:text-[26px] leading-[34px] font-semibold text-lightBlack dark:text-white py-2 sm:py-3 md:py-4 hover:underline underline-offset-2">
                            {b.title}
                          </h2>
                        </Link>
                      </div>
                      <div className="border-t-[1px] border-[#ddd] dark:border-gray py-2 sm:py-3 md:py-4 xl:py-5">
                        <Link
                          to={`/blog_details/${b.id}`}
                          className="px-[30px] flex items-center justify-between "
                        >
                          <div className="">
                            <span className=" text-sm sm:text-base flex items-center ">
                              <span className="ml-[10px] leading-[38px] uppercase text-lightBlack dark:text-white font-medium group-hover:text-khaki hover:underline  underline-offset-1">
                                Read More
                              </span>
                            </span>
                          </div>
                          <span className="">
                            <BsArrowRight
                              className="text-gray dark:text-lightGray group-hover:text-khaki"
                              size={"24px"}
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
                :
                ""
              }
            </div>
            <div className="flex items-center gap-3 mt-10" onClick={(e) =>changePage(e)}>
              <span className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]  dark:bg-lightBlack border-[1px] border-lightGray dark:border-gray bg-white  hover:bg-khaki dark:hover:bg-khaki grid items-center justify-center  cursor-pointer group"
              id="arrowLeft"
              >
                <BsArrowLeft
                  size={20}
                  className="text-lightBlack dark:text-white group-hover:text-white"
                  id="arrowLeft"
                />
              </span>
              { pageNumber !== null ?
              Array.from(pageNumber).map((p,i)=>(
                <span
                className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]  dark:bg-lightBlack border-[1px] border-lightGray dark:border-gray bg-white  hover:bg-khaki dark:hover:bg-khaki grid items-center justify-center font-semibold cursor-pointer group" 
                key={i}
                value = {p}
                id = "pageNumberSpan"
                >
                  <span
                    size={20}
                    className="text-lightBlack dark:text-white group-hover:text-white"
                    value = {p}
                    id = "pageNumber"
                  >
                    {p}
                  </span>
                </span>
              ))
                :
                ""
              }

              <span className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]  dark:bg-lightBlack border-[1px] border-lightGray dark:border-gray bg-white  hover:bg-khaki dark:hover:bg-khaki grid items-center justify-center  cursor-pointer group"
              id="arrowRight"
              >
                <BsArrowRight
                  size={20}
                  className="text-lightBlack dark:text-white group-hover:text-white"
                  id="arrowRight"
                />
              </span>

            </div>
          </div>
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            {/* imported Blog Sidebar */}
            <BlogSideBar search={search} setSearch={setSearch} setCategorySearch={setCategorySearch} setTagSearch={setTagSearch} tagSearch={tagSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
