import { Button, Grid, Paper, TextField } from "@mui/material";
import service from "../service/service";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import qrcode from "qrcode";
import dayjs from "dayjs";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function Profile() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState("");
    const [otp, setOtp] = useState("");
    const [mfaEnabled, setMfaEnabled] = useState("");
    const [otpUrl, setOtpUrl] = useState("");
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [profileDetails, setProfileDetails] = useState({});

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const user = async () => {
            try {
                const response = await service.get("user/get-user");
                setMfaEnabled(response.data.data.otpEnabled);
            } catch (error) {
                if (error.code === "ERR_NETWORK") {
                    toast.error(error.message);
                }
                toast.error(error.response.data.data);
            }
        };

        const profile = async () => {
            try {
                const response = await service.get("profile/get-profile");
                setProfileDetails(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        user();
        profile();
    }, []);

    const setupMFA = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await service.patch("/otp/set-up-otp");
            console.log(response);
            setOtpUrl(response.data.data.otpAuthUrl);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (error.code === "ERR_NETWORK") {
                toast.error(error.message);
            }
            toast.error(error.response.data.data);
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userResponse = {
            otp,
        };

        try {
            const response = await service.patch(
                "/otp/verify-otp",
                userResponse
            );

            if (response.data.success === true) {
                toast.success("MFA Verification successful");
                setIsLoading(false);
                handleClose();
                setOtp("");
                window.location.reload(true);
            } else {
                toast.error(`${response.data.data}`);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setOtp("");
        }
    };

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    };

    const disableOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await service.patch("/otp/disable-otp");
            if (response.data.success === true) {
                setIsLoading(false);
                window.location.reload(true);
            } else {
                toast.error(response.data.data);
            }
        } catch (error) {
            toast.error(error.response.data.data);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        qrcode.toDataURL(otpUrl).then(setQrCodeUrl);
    }, [otpUrl]);

    const paperStyle = { padding: "30px 20px", width: 650 };

    return isLoading ? (
        <body>
            <h4>Loading...</h4>
        </body>
    ) : (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <div className="profile-container">
                    <div>
                        <h3> Profile details</h3>
                        <div>
                            Name: {profileDetails.firstName}{" "}
                            {profileDetails.lastName}{" "}
                        </div>
                        <div>Email: {profileDetails.email} </div>
                        <div>
                            Age:{" "}
                            {profileDetails.age === null
                                ? "not set"
                                : profileDetails.age}
                        </div>
                        <div>
                            DOB:{" "}
                            {profileDetails.dob == null
                                ? "not set"
                                : dayjs(profileDetails.dob).format(
                                      "DD/MM/YYYY"
                                  )}
                        </div>
                        <div>
                            Marital status:{" "}
                            {profileDetails.maritalStatus === null
                                ? "not set"
                                : profileDetails.maritalStatus}{" "}
                        </div>
                        <div>
                            Nationality:{" "}
                            {profileDetails.nationality === null
                                ? "not set"
                                : profileDetails.nationality}
                        </div>
                    </div>

                    <div>
                        <h3>Mobile App Authentication</h3>
                        <p style={{ paddingBottom: "8px" }}>
                            Secure your account with MFA{" "}
                        </p>
                        {mfaEnabled ? (
                            <Button
                                onClick={(e) => disableOtp(e)}
                                variant="contained"
                                color="error"
                            >
                                Cancel MFA
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={(e) => {
                                    setupMFA(e);
                                    handleOpen();
                                }}
                            >
                                Setup 2FA
                            </Button>
                        )}

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <h3>Two-Factor Authentication (2FA)</h3>

                                <Typography>
                                    Supports Google Authenticator and other
                                    two-factor devices
                                </Typography>

                                <div>
                                    <li>
                                        Install Google Authenticator (IOS -
                                        Android) or Authy (IOS - Android).
                                    </li>
                                    <li>
                                        In the authenticator app, select "+"
                                        icon.
                                    </li>
                                    <li>
                                        Select "Scan a barcode (or QR code)" and
                                        use the phone's camera to scan this
                                        barcode.
                                    </li>
                                </div>

                                <h4>Scan QR Code</h4>
                                <Grid align="center">
                                    <img
                                        style={{
                                            width: "200px",
                                            height: "200px",
                                        }}
                                        src={qrCodeUrl}
                                        alt="qrcode url"
                                    />
                                </Grid>

                                <form onSubmit={verifyOtp}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Verify code"
                                        variant="outlined"
                                        fullWidth
                                        margin={"dense"}
                                        type="tel"
                                        InputProps={{
                                            inputProps: {
                                                maxLength: 6,
                                            },
                                        }}
                                        value={otp}
                                        onChange={(e) =>
                                            inputChangeHandler(setOtp, e)
                                        }
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
                                            Continue
                                        </Button>
                                    </div>
                                </form>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </Paper>
        </Grid>
    );
}
