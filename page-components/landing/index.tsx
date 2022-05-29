import React, {useState,useEffect} from "react";
import {useRouter} from "next/router";
const Landing=()=>{
    const [navOpen, setNavOpen] = useState(false);
    const [scroll, setScroll] = useState(false);
    const router = useRouter();
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
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.25 10H0.75C0.335999 10 0 9.552 0 9C0 8.448 0.335999 8 0.75 8H17.25C17.664 8 18 8.448 18 9C18 9.552 17.664 10 17.25 10Z" fill="#222222"/>
            <path d="M17.25 5H0.75C0.335999 5 0 4.552 0 4C0 3.448 0.335999 3 0.75 3H17.25C17.664 3 18 3.448 18 4C18 4.552 17.664 5 17.25 5Z" fill="#222222"/>
            <path d="M17.25 15H0.75C0.335999 15 0 14.552 0 14C0 13.448 0.335999 13 0.75 13H17.25C17.664 13 18 13.448 18 14C18 14.552 17.664 15 17.25 15Z" fill="#222222"/>
        </svg>

    </button>
    <ul className={`flex-row-reverse mt-4 md:translate-x-0 md:p-0 fixed md:relative md:flex md:min-h-0 md:space-y-0 md:space-x-6 left-0 right-0 min-h-screen space-y-4 p-8 transform bg-orange-100 md:bg-transparent ${navOpen? "translate-x-0": "translate-x-full"} transition duration-200`}>
        <li>
        <a href="#contact" className={`${scroll?"text-gray-800" : "md:text-orange-100 text-gray-800"} hover:us font-semibold`}>ارتباط با ما</a>
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
        <main>
            <div className="bg-landing-bg px-8 py-16 grid grid-cols-1 gap-20 bg-cover bg-right">
                <div className="grid grid-cols-1 gap-12 md:mx-44 md:my-72 mx-24 my-36">
                    <h1 className="text-gray-800 lg:text-9xl md:text-8xl text-7xl font-bold">حیفه‌س</h1>
                    <div className="text-gray-800 lg:text-5xl md:text-4xl text-3xl font-bold">به خوراکی‌های خوشمزه شانس دوباره بده!</div>
                    <button onClick={()=>router.push("/login")} className="mt-8 2lx:w-1/7 xl:w-1/6 lg:w-1/5 md:w-1/4 sm:w-1/3 w-1/2 lg:text-3xl md:text-2xl text-xl text-white h-16 bg-gradient-to-r from-orange-500 to-orange-300 px-8 py-3 rounded-2xl font-semibold">ورود به حیفه‌س</button>
                </div>
            </div>
            <section className="py-3 py-xl-5 mt-5" id="about">
                <div className="px-4 px-lg-5 container contents">
                    <div className="row">
                        <div className="col grid grid-cols-1 gap-2 md:mx-44 md:my-36 mx-24 my-18">
                            <h2 className="mw-850 text-gray-800 lg:text-6xl md:text-6xl font-bold">
                                شروع به نجات دادن موادغذایی‌ اضافه کنید
                            </h2>
                            <h3 className="mb-2 mb-lg-3 text-gray-800 lg:text-5xl md:text-4xl font-bold">
                                با قیمت‌های عالی!
                            </h3>
                            <p className="py-3 text-gray-800 lg:text-4xl md:text-3xl">
                                ما رویای سیاره‌ای بدون ضایعات غذایی را می‌بینیم، و در حال تلاش برای تحقق آن هستیم. سامانه ما مستقیم‌ترین راه برای مشارکت شما است - فقط کافی است ثبت‌نام کنید و موادغذایی اضافی را از فروشگاه‌های محلی شهر خود تهیه کنید.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-3 py-md-5">
                <div className="px-4 px-lg-5 container contents">
                    <div className=" md:mx-44 mx-24 md:flex block md:justify-center">
                        <div className="text-center md:block inline w-1/2 m-auto flex w-fit mb-10">
                            <img src="/images/pie.png" alt="pie" className="img-fluid"/>
                        </div>
                        <div className="flex m-auto w-1/2 md:block inline text-center">
                            <p className="text-gray-800 lg:text-4xl md:text-3xl fw-800">مسئله دورریز مواد غذایی، مسئله بسیار جدی‌ای در اکثر کشورهاست. روزانه مقدار زیادی مواد غذایی قابل استفاده دور ریخته می‌شود که این دورریز خود باعث مشکلات زیست محیطی بسیاری می‌شود.
                                قسمتی از دورریز مواد غذایی، مربوط به مواد غذایی منقضی شده است که فروشگاه‌ها مجبور به دور انداختن آنها می‌شوند این در حالی است که این مواد غذایی تا چند روز قبل از انقضا قابل استفاده‌اند در نتیجه برای جلوگیری از دورریز مواد غذایی، این مواد باید هرچه زودتر مصرف شوند.
                                با حیفه‌س به این موادغذایی شانس دوباره دهید.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-3 py-md-5 mb-72">
                <div className="px-4 px-lg-5 container contents">
                    <div className=" md:mx-44 mx-24 md:flex block md:justify-center">
                        <div className="flex m-auto w-1/2 md:block inline">
                            <h2 className="mw-850 text-gray-800 lg:text-6xl md:text-6xl font-bold">
                                موادغذایی مازاد خود را به راحتی بفروشید
                            </h2>
                            <h3 className="mb-2 mb-lg-3 text-gray-800 lg:text-4xl md:text-3xl font-bold py-3">
                                شما بخشی (بزرگ) از این هستید!
                            </h3>
                            <p className="text-gray-800 lg:text-4xl md:text-3xl fw-800 py-3">
                                ما به دنبال استقبال از شرکای جدید برای مبارزه با ضایعات مواد غذایی هستیم؛ کسب و کار شما هر چه باشد، می‌توانیم به شما کمک کنیم تا هزینه‌ها را جبران کنید و ردپای خود را کاهش دهید.
                            </p>
                        </div>
                        <div className="text-center md:block inline w-1/2 m-auto flex w-fit mb-10">
                            <img src="/images/landing-img.png" alt="pie" className="img-fluid"/>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </>

}
export default Landing;