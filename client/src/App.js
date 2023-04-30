import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { useLocation, useNavigate } from "react-router";

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import axios from "axios";
import { setValue } from "store/commonReducer";


const noAuthURL = [
  '/login',
  '/register'
]

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    if(noAuthURL.includes(location.pathname)){
      return;
    }

    axios.post("/api/loginCheck").then(r => {
      if (r.data.isLogin) {
        dispatch(setValue({
          key: "isLogin",
          value: r.data.isLogin
        }));

        const previousPath = localStorage.getItem("previousPath");

        if (previousPath) {
          navigate(previousPath);
        } else {
            navigate("/");
        }

      } else {
        navigate("/login")
      }

    })
  }, [dispatch]);

  useEffect(() => {
    const previousPath = localStorage.getItem("previousPath");
    if (previousPath !== location.pathname) {
      localStorage.setItem("previousPath", location.pathname);
    }
  }, [location.pathname]);

  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
