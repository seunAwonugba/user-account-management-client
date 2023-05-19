import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import service from "../service/service";

export default function LoginOtpScreen() {
    const navigate = useNavigate();
    const paperStyle = { padding: "30px 20px", width: 550 };
    const marginStyle = { marginTop: "15px" };
    const [isLoading, setIsLoading] = useState("");
    const [otp, setOtp] = useState("");

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    };

    const validateOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userResponse = {
            otp,
        };

        try {
            const response = service.post("/otp/validate-otp", userResponse);
            console.log(response);
        } catch (error) {
            console.log(error);
            toast.error(error);
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
                    <h2>Two-Factor Authentication</h2>
                    <Typography variant="caption">
                        Open the two-step verification app on your mobile device
                        to get your verification code
                    </Typography>
                </Grid>

                <form onSubmit={validateOtp}>
                    <TextField
                        id="outlined-basic"
                        label="OTP secret"
                        variant="outlined"
                        placeholder="OTP secret"
                        type="tel"
                        InputProps={{
                            inputProps: {
                                maxLength: 6,
                            },
                        }}
                        style={marginStyle}
                        value={otp}
                        onChange={(e) => inputChangeHandler(setOtp, e)}
                        fullWidth
                    />

                    <div className="button-div">
                        <div>
                            <Button
                                onClick={() => navigate("/login")}
                                variant="outlined"
                            >
                                Cancel
                            </Button>
                        </div>

                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: "#222222",
                            }}
                            type="submit"
                        >
                            Authenticate
                        </Button>
                    </div>
                </form>
            </Paper>
        </Grid>
    );
}
