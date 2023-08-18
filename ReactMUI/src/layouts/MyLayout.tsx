import { Container, Link, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

export default MyLayout;
function MyLayout() {

    return (
        <>
            <Stack direction="row" justifyContent="flex-start">
                <Link href="/">Home</Link>
            </Stack>
            <Container>
                <Outlet />
            </Container>



        </>
    )
}