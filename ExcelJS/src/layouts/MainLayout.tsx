import { Button } from "@mui/material";

interface MainLayoutProps {
    children: React.ReactNode;
}
const MainLayout = (props: MainLayoutProps) => {
    return (
        <div>
            <div>
                <Button variant="outlined" href="/">Home</Button>
            </div>
            {props.children}
        </div>
    )
};

export default MainLayout;