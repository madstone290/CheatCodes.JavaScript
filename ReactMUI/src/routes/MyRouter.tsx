import MyLayout from "layouts/MyLayout";
import MyCalendar from "pages/FullCalendar/MyCalendar";
import Home from "pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function MyRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MyLayout />} >
                    <Route index={true} element={<Home />} />
                    <Route path="third-party/" >
                        <Route path="full-calendar" element={<MyCalendar />} />
                    </Route>

                </Route>

                {/* <Route path="*" element={<Page404 />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

