import MyCalendar from "pages/FullCalendar/MyCalendar";
import Home from "pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function MyRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" >
                    <Route index={true} element={<Home />} />
                    <Route path="MyCalendar" element={<MyCalendar />} />
                </Route>

                {/* <Route path="*" element={<Page404 />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

