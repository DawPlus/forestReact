import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,

} from '@mui/material';


import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';


const FirebaseLogin = () => {

    const theme = useTheme();

    
    const [id , setId] = useState("");
    const [password , setPassword] = useState("");

    const [checked, setChecked] = useState(true);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const onClick =()=>{     
        
        console.log(id, password);
        axios({
            url : "/api/login", 
            method : "POST", 
            withCredentials : true, 
            data : {id, password}

        }).then(r=> console.log(r))

    }

    const onSignIn =()=>{     
        axios.post("/api/logout").then(r=> {
            console.log(r);
            document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";


        })

    }

    const onCheckSession =()=>{     
        axios.post("/api/loginSuccess").then(r=> {
            console.log(r.data);
            


        })

    }

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                {/* <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }} >
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${customization.borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            OR
                        </Button>

                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid> */}
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">로그인 사용자만 이용가능한 서비스 입니다.</Typography>                        
                    </Box>
                </Grid>
            </Grid>

         
            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-id-login">ID</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-id-login"
                    type="id"
                    value={id}
                    name="id"
                    onBlur={()=>{}}
                    onChange={(e)=>setId(e.target.value)}
                    label="ID"
                />
            </FormControl>

                <FormControl fullWidth sx={{ ...theme.typography.customInput }} >
                    <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-login"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            name="password"
                            onBlur={()=>{}}
                            onChange={(e)=>setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={onClick}
                                >
                                    Login
                                </Button>
                            </AnimateButton>
                        </Box>
                        <Divider style={{marginTop : "9px"}}/>
                        <Box sx={{ mt: 1 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={onSignIn}
                                >
                                    Sign in
                                </Button>
                            </AnimateButton>
                        </Box>
                        <Divider style={{marginTop : "9px"}}/>
                        <Box sx={{ mt: 1 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={onCheckSession}
                                >
                                    Sign in
                                </Button>
                            </AnimateButton>
                        </Box>
        </>
    );
};

export default FirebaseLogin;
