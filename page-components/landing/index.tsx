import SandwichMenu from "../../public/icons/sandwichMenu.svg"
import {useState,useEffect} from "react";
const Landing=()=>{
    const [navOpen, setNavOpen] = useState(false);
    const [scroll, setScroll] = useState(false);
    useEffect(()=>{
        const handleScroll = () => {
            if (window.pageYOffset > 1) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return <>
<header className={`${scroll ? "transition-colors shadow bg-orange-100" : ""} ${navOpen? "bg-orange-100" : ""} fixed w-full flex justify-between px-4 md:px-36 items-center h-24`}>
<a href="#">
   <img
     src="/images/logo.png"
   alt="heifes logo"
   className="h-24"/>
</a>

<nav className="">
    <button className="md:hidden" onClick={()=>setNavOpen(!navOpen)}>
        <SandwichMenu />
    </button>
    <ul className={`flex-row-reverse mt-4 md:translate-x-0 md:p-0 fixed md:relative md:flex md:min-h-0 md:space-y-0 md:space-x-6 left-0 right-0 min-h-screen space-y-4 p-8 transform bg-orange-100 md:bg-transparent ${navOpen? "translate-x-0": "translate-x-full"} transition duration-200`}>
        <li>
        <a href="#contact" className={`${scroll?"text-gray-800" : "md:text-orange-100 text-gray-800 font-semibold"} hover:us`}>ارتباط با ما</a>
        </li>
        <li>
            <a href="#about" className={`${scroll?"text-gray-800" : "md:text-orange-100 text-gray-800"} font-semibold hover:us`}>درباره ما</a>
        </li>
        <li>
            <a href="#" className={`${scroll?"text-gray-800" : "md:text-orange-100 text-gray-800"} font-semibold hover:us`}>خانه</a>
        </li>
    </ul>
</nav>
</header>
        <div className="bg-landing-bg px-8 py-16 grid grid-cols-1 gap-20 bg-cover bg-right">

        <div className="grid grid-cols-1 gap-12 md:mx-44 md:my-72 mx-24 my-36">
            <h1 className="text-gray-800 lg:text-9xl md:text-8xl text-7xl font-bold">حیفه‌س</h1>
            <div className="text-gray-800 lg:text-5xl md:text-4xl text-3xl font-bold">به خوراکی‌های خوشمزه شانس دوباره بده!</div>
            <button className="mt-8 2lx:w-1/7 xl:w-1/6 lg:w-1/5 md:w-1/4 sm:w-1/3 w-1/2 lg:text-3xl md:text-2xl text-xl text-white h-16 bg-gradient-to-r from-orange-500 to-orange-300 px-8 py-3 rounded-2xl font-semibold">ورود به حیفه‌س</button>
        </div>
    </div>
    </>

}
export default Landing;