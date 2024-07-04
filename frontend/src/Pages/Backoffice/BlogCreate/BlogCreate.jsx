import axios from "axios"
import { useEffect, useState } from "react"
import { BiChevronsRight } from "react-icons/bi";



export default function BlogCreate() {
    const [blog, setBlog] = useState(null)
    const [selectedTags, setSelectedTags] = useState(null)
    
    const [categories, setCategories] = useState(null)
    const [tags, setTags] = useState(null)

    const [images, setImages] = useState({image1: "", image2: "", image3: ""})
    const [preview, setPreview] = useState({image1: "", image2: "", image3: ""})
    const [status, setStatus] = useState(0)


    useEffect(()=>{
        fetchData()
    },[])
    const fetchData = async () => {
        const response = await axios.get("http://127.0.0.1:8000/api/blog/create")
        // console.log(response.data.categories);
        // console.log(response.data.tags);
        setCategories(response.data.categories)
        setTags(response.data.tags)
    }

    const handleInput = (e) => {
        const {name, value, files} = e.target
        if (name.includes('image')) {
            setImages({ ...images, [name]: files[0] })
            setPreview({ ...preview, [name]: URL.createObjectURL(files[0]) })
        } else {
            setBlog({ ...blog, [name]: value });
        }
    }

    const handleTags = (e) => {
        const allTags = document.querySelectorAll(".tags")
        const selected = []
        Array.from(allTags).forEach(t => {
            if (t.id == e.target.id) {
                if (t.className.includes("selected")) {
                    t.className = "text-sm border-[1px] border-lightGray dark:border-gray px-3 py-1 dark:text-white cursor-pointer tags"
                } else {
                    t.className = "text-sm border-[1px] border-lightGray dark:border-gray px-3 py-1 dark:text-white cursor-pointer tags bg-khaki dark:bg-khaki text-white selected"
                }
            }
            if (t.className.includes("selected")) {
                selected.push(t.id)
            }
        });
        setSelectedTags(selected)
    }


    const submitForm = (e) => {
        e.preventDefault()
        // const formBlog = new FormData();
        // formBlog.append("title", blog.title)
        // formBlog.append("title_text", blog.title_text)
        // formBlog.append("subtitle", blog.subtitle)
        // formBlog.append("subtitle_text", blog.subtitle_text)
        // formBlog.append("subtitle_text2", blog.subtitle_text2)
        // formBlog.append("subtitle_list1", blog.subtitle_list1)
        // formBlog.append("subtitle_list2", blog.subtitle_list2)
        // formBlog.append("subtitle_list3", blog.subtitle_list3)
        // formBlog.append("subtitle_list4", blog.subtitle_list4)
        // const date = new Date()
        // formBlog.append("date", `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        // formBlog.append("category", blog.category)

        // axios.put("http://127.0.0.1:8000/api/blog/create", formBlog)
        // .then(response=>{
        //     if (response.data.status == "success") {
        //         setStatus(parseInt(response.data.data.id))
        //     }
        // })
        
    }

    useEffect(()=>{
        if (status != 0) {
            for (const i in images) {
                // console.log(images[i]);
                const formImage = new FormData();
                formImage.append("image", images[i])
                formImage.append("blog", status)
                axios.put(`http://127.0.0.1:8000/api/blogimage/create`, formImage)
                .then( response => {
                    console.log(response);
                })
            }
        }
    },[status])

    useEffect(()=>{
        console.log(images);
    },[images])
    useEffect(()=>{
        console.log(blog);
    },[blog])



    
    return(
        
        <div className="Banner min-h-screen dark:bg-lightBlack max-w-full flex justify-center">
            <div className=" py-24 2xl:py-[120px] w-full bg-no-repeat bg-top bg-opacity-[0.07] flex flex-col gap-10" style={{maxWidth: "1100px"}}>
                <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5 flex items-end cursor-pointer ml-5">
                    Create Blog
                </h2>
                <form className=" p-[30px] lg:p-[45px] 2xl:p-[61px]" onSubmit={submitForm}>
                    <div className="col-span-6 md:col-span-4">
                        <div className="flex flex-col gap-10 w-full">
                            <img src={preview.image1} alt="" className="w-full h-96 flex items-center justify-center"/>
                            <input
                                type="file"
                                className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                name="image1"
                                onChange={handleInput}
                            />

                            <div className="pt-5 lg:pt-[35px]  pr-3">

                                <div>
                                    <h2 className="text-lg sm:text-xl md:text-[22px] lg:text-2xl leading-6 md:leading-7 lg:leading-[30px] text-lightBlack dark:text-white relative before:w-[50px] before:h-[1px] before:bg-lightBlack dark:before:bg-white before:absolute before:left-0 before:top-9 font-Garamond font-semibold mb-10">
                                    Category
                                    </h2>
                                    <p className="text-base font-Garamond text-gray dark:text-lightGray my-5">
                                    <span className="flex gap-5">
                                        <select name="category" onChange={handleInput} className="border-gray dark:border-lightGray text-gray dark:text-lightGray bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none">
                                            <option value="">-----</option>
                                            { categories != null ?
                                            categories.map((c,i)=>(
                                                <option key={i} value={c.id}>{c.name}</option>
                                                
                                            ))
                                            :
                                            ""
                                            }
                                        </select>
                                    </span>
                                    </p>
                                    <h2 className="py-2 sm:py-3 md:py-4 lg:py-[19px] 2xl:py-[25px] font-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] 3xl:text-[40px] leading-6 lg:leading-[26px]  text-lightBlack dark:text-white font-semibold">
                                        <label htmlFor="title">Title</label>
                                        <input
                                        type="text"
                                        placeholder="Title"
                                        className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none mt-5"
                                        name="title"
                                        onChange={handleInput}
                                        />
                                    </h2>
                                    <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Garamond">
                                        <textarea name="title_text" className="w-full border-gray dark:border-lightGray text-gray dark:text-lightGray bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none" rows={5} onChange={handleInput} placeholder="Title text"></textarea>
                                    </p>
                                </div>

                                {/* Blog Roles */}
                                <div className="pt-10 2xl:pt-[60px]">
                                    <h2 className="pb-2 sm:pb-3 md:pb-4 lg:pb-[19px] 2xl:pb-6 font-Garamond text-lg sm:text-xl md:text-2xl xl:text-[28px] leading-6 lg:leading-7 text-lightBlack dark:text-white font-semibold">
                                        <label htmlFor="subtitle">Subtitle</label>
                                        <input
                                        type="text"
                                        placeholder="Subtitle"
                                        className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none mt-5"
                                        name="subtitle"
                                        onChange={handleInput}
                                        />
                                    </h2>
                                    <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Garamond">
                                        <textarea name="subtitle_text" className="w-full border-gray dark:border-lightGray text-gray dark:text-lightGray bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none" rows={5} onChange={handleInput} placeholder="Subtitle text"></textarea>
                                    </p>
                                    <ul className="space-y-2 lg:space-y-3 mt-5">
                                        <li className="flex items-center ">
                                            <BiChevronsRight size={16} className="text-khaki mr-2" />
                                            <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora">
                                                <input
                                                type="text"
                                                placeholder="subtitle list 1"
                                                className="w-full border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                                name="subtitle_list1"
                                                onChange={handleInput}
                                                />
                                            </span>
                                        </li>
                                        <li className="flex items-center ">
                                            <BiChevronsRight size={16} className="text-khaki mr-2" />
                                            <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora">
                                                <input
                                                type="text"
                                                placeholder="subtitle list 2"
                                                className="w-full border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                                name="subtitle_list2"
                                                onChange={handleInput}
                                                />
                                            </span>
                                        </li>
                                        <li className="flex items-center ">
                                            <BiChevronsRight size={16} className="text-khaki mr-2" />
                                            <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora">
                                                <input
                                                type="text"
                                                placeholder="subtitle list 3"
                                                className="w-full border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                                name="subtitle_list3"
                                                onChange={handleInput}
                                                />
                                            </span>
                                        </li>
                                        <li className="flex items-center ">
                                            <BiChevronsRight size={16} className="text-khaki mr-2" />
                                            <span className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora">
                                                <input
                                                type="text"
                                                placeholder="subtitle list 4"
                                                className="w-full border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                                name="subtitle_list4"
                                                onChange={handleInput}
                                                />
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Extra blog */}
                            <div className="pt-10 2xl:pt-[60px]">
                                <div className="pb-2 sm:pb-3 md:pb-4 lg:pb-[19px] 2xl:pb-6 grid items-center grid-cols-1 sm:grid-cols-2 gap-5 2xl:gap-[30px]">
                                    <div>
                                        <img src={preview.image2} alt="" className="w-full h-96 flex items-center justify-center"/>
                                        <input
                                            type="file"
                                            className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                            name="image2"
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <img src={preview.image3} alt="" className="w-full h-96 flex items-center justify-center"/>
                                        <input
                                            type="file"
                                            className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                                            name="image3"
                                            onChange={handleInput}
                                        />
                                    </div>
                                </div>
                                <p className="text-sm lg:text-base leading-6 text-gray dark:text-lightGray font-normal font-Lora">
                                    <textarea name="subtitle_text2" className="w-full border-gray dark:border-lightGray text-gray dark:text-lightGray bg-transparent focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none" rows={5} onChange={handleInput} placeholder="Subtitle text2"></textarea>
                                </p>

                                <div
                                    className="my-10 py-5 border-t-[1px] border-b-[1px] border-lightGray dark:border-gray lg:flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <h5 className="text-lg text-[#101010] dark:text-white leading-[28px] font-semibold font-Garamond mr-2">
                                            Tags :
                                        </h5>
                                        { tags ?
                                        tags.map((t,i)=>(
                                            <span
                                                className="text-sm border-[1px] border-lightGray dark:border-gray px-3 py-1 dark:text-white cursor-pointer tags"
                                                key={i} 
                                                id={t.id}
                                                onClick={handleTags}
                                            >
                                                {t.name}
                                            </span>
                                        ))
                                        :
                                        ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex items-center mt-6">
                        <button type="submit" className="w-[142px] h-10 lg:h-[50px] text-[15px] bg-khaki text-Garamond border border-khaki text-white mx-auto col-span-2  md:col-span-1 lg:col-span-1 relative z-10 before:absolute before:top-0 before:right-0 before:-z-10 before:w-0 before:h-full before:bg-lightBlack before:transition-all before:duration-500 hover:before:w-full hover:before:left-0">CREATE</button>
                    </div>
                </form>
            </div>
        </div>
    )
}