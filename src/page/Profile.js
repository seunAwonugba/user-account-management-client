import { Button, Grid, TextField } from "@mui/material";
import service from "../service/service";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import qrcode from "qrcode";

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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const user = async () => {
            try {
                const response = await service.get("user/get-user");
                setMfaEnabled(response.data.data.otpEnabled);
            } catch (error) {
                toast.error(error.response.data.data);
            }
        };

        user();
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
            console.log(error);
            setIsLoading(false);
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

    return isLoading ? (
        <body>
            <h4>Loading...</h4>
        </body>
    ) : (
        <div className="message-screen">
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
                        Supports Google Authenticator and other two-factor
                        devices
                    </Typography>

                    <div>
                        <li>
                            Install Google Authenticator (IOS - Android) or
                            Authy (IOS - Android).
                        </li>
                        <li>In the authenticator app, select "+" icon.</li>
                        <li>
                            Select "Scan a barcode (or QR code)" and use the
                            phone's camera to scan this barcode.
                        </li>
                    </div>

                    <h4>Scan QR Code</h4>
                    <Grid align="center">
                        <img
                            style={{ width: "200px", height: "200px" }}
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
                            onChange={(e) => inputChangeHandler(setOtp, e)}
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
    );
}
