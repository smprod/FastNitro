
import {Outlet} from "react-router-dom";
import {Navbar} from "@widgets";
import {Footer} from "@widgets";
import "../styles/layout.css"

export const Layout = () => {
    return (
        <>
            <div className={"wrapper"}>
                <nav>
                    <Navbar/>
                </nav>
                <main>
                    <Outlet/>
                </main>
                <footer>
                    <Footer/>
                </footer>
            </div>
        </>
    )
}
