import { Link } from "@mui/material";
import style from "pages/Home.module.css";

export default Home;

function Home(){
    return (
        <div>
            <h1 className={style.page1}>Home</h1>

            <Link href="/MyCalendar">MyCalendar</Link>
        </div>
    )
}