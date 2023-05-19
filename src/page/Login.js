import * as React from "react";
import TextField from "@mui/material/TextField";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    OutlinedInput,
    Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import service from "../service/service";

export default function Login({ handleLogin }) {
    const navigate = useNavigate();

    const paperStyle = { padding: "30px 20px", width: 550 };
    const marginStyle = { marginTop: "15px" };

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const login = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userResponse = {
            email,
            password,
        };

        try {
            const response = await service.post("/auth/login", userResponse);
            setIsLoading(false);

            if (response.data.success === true) {
                console.log(response.data.data);
                navigate("/dashboard");
                handleLogin(
                    response.data.accessToken,
                    response.data.refreshToken,
                    response.data.data.email
                );
            } else {
                setIsLoading(false);
                toast.error(response.data.data);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error.response.data.data);
        }
    };
    return isLoading ? (
        <body>
            <h4>Loading...</h4>
        </body>
    ) : (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <h2>Login</h2>
                </Grid>

                <form onSubmit={login}>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        placeholder="Email"
                        type="email"
                        style={marginStyle}
                        value={email}
                        onChange={(e) => inputChangeHandler(setEmail, e)}
                        fullWidth
                    />

                    <FormControl
                        variant="outlined"
                        fullWidth
                        style={marginStyle}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>

                        <OutlinedInput
                            id="outlined-adornment-password"
                            variant="outlined"
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            value={password}
                            onChange={(e) => inputChangeHandler(setPassword, e)}
                            label="Password"
                        />
                    </FormControl>

                    <div className="button-div">
                        <div>
                            Forgot password?
                            <Link to="/reset-password-email"> Click here </Link>
                            to reset password
                        </div>

                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: "#222222",
                            }}
                            type="submit"
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </Paper>
        </Grid>
    );
}
