import { ThemeProvider, createTheme } from "@mui/material";

declare module '@mui/material/styles' {
    interface TypographyVariants {
        sm: React.CSSProperties;
        md: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        sm?: React.CSSProperties;
        md?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options. variant 입력시 보여줄 항목을 설정한다.
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        sm: true;
        md: true;

        h1: false;
        h2: false;
        h3: false;
        h4: false;
        h5: false;
        h6: false;
    }
}

const theme = createTheme({
    typography: {
        sm: {
            fontSize: 20,
        },
        md: {
            fontSize: 30,
        }
    },
});

export default RootTheme;
interface RootThemeProps {
    children: React.ReactNode;
}

function RootTheme(props: RootThemeProps) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}