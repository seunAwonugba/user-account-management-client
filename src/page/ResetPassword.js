import * as React from "react";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    OutlinedInput,
    Paper,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import service from "../service/service";

const params = window.location.search;
const id = new URLSearchParams(params).get("id");
const token = new URLSearchParams(params).get("token");

export default function ResetPassword() {
    const navigate = useNavigate();

    const paperStyle = { padding: "30px 20px", width: 550 };
    const marginStyle = { marginTop: "15px" };

    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userResponse = {
            password,
            repeat_password: confirmPassword,
        };

        try {
            const response = await service.post(
                `/auth/reset-password/?id=${id}&token=${token}`,
                userResponse
            );

            setIsLoading(false);

            if (response.data.success === true) {
                navigate("/password-reset-success");
            } else {
                setIsLoading(false);
                toast.error(response.data.data);
            }
        } catch (error) {
            setIsLoading(false);
            if (error.code === "ERR_NETWORK") {
                toast.error(error.message);
            }
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
                    <h2>Reset Password</h2>
                    <Typography variant="caption">
                        Complete this form to reset your password!
                    </Typography>
                </Grid>

                <form onSubmit={resetPassword}>
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

                    <FormControl
                        variant="outlined"
                        fullWidth
                        style={marginStyle}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Confirm password
                        </InputLabel>

                        <OutlinedInput
                            id="outlined-adornment-password"
                            placeholder="Confirm password"
                            type={showConfirmPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            value={confirmPassword}
                            onChange={(e) =>
                                inputChangeHandler(setConfirmPassword, e)
                            }
                            label="Confirm password"
                        />
                    </FormControl>

                    <div className="button-div">
                        <div></div>

                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: "#222222",
                                marginTop: "15px",
                            }}
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>
            </Paper>
        </Grid>
    );
}
