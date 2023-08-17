import { Button } from "@mui/material";
import style from "pages/Page1.module.css";

export default Page1;

function Page1(){
    return (
        <div>
            <h1 className={style.page1}>Page1</h1>
        </div>
    )
}


const style1 = {
    flexDirection: 'column',
  };
  
function App1() {
return <Button sx={style1}>Example</Button>;
}