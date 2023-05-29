import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import service from "../service/service";

export default function ResetPasswordEmail() {
    const navigate = useNavigate();

    const paperStyle = { padding: "30px 20px", width: 550 };
    const marginStyle = { marginTop: "15px" };

    const [email, setEmail] = React.useState("");
    const [isLoading, setIsLoading] = React.useState("");

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userResponse = {
            email,
        };

        try {
            const response = await service.post(
                "/auth/send-password-reset-link",
                userResponse
            );
            setIsLoading(false);

            if (response.data.success === true) {
                navigate("/reset-password-sent");
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
                        Input your email address to reset your password!
                    </Typography>
                </Grid>

                <form onSubmit={resetPassword}>
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

                    <div className="button-div">
                        <div></div>

                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: "#222222",
                            }}
                            type="submit"
                        >
                            Reset Password
                        </Button>
                    </div>
                </form>
            </Paper>
        </Grid>
    );
}
