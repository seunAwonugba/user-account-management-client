import { Button, TextField } from "@mui/material";
import service from "../service/service";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function Profile() {
    const [isLoading, setIsLoading] = useState("");
    const [otp, setOtp] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const setupMFA = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await service.patch("/otp/set-up-otp");
            console.log(response);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const validateOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(otp);
        setIsLoading(false);
        handleClose();

        // try {
        //     const response = await service.patch("/otp/set-up-otp");
        //     console.log(response);
        //     setIsLoading(false);
        // } catch (error) {
        //     console.log(error);
        //     setIsLoading(false);
        // }
    };

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    };
    return isLoading ? (
        <body>
            <h4>Loading...</h4>
        </body>
    ) : (
        <div className="message-screen">
            <Button
                variant="contained"
                onClick={(e) => {
                    setupMFA(e);
                    handleOpen();
                }}
            >
                Setup 2FA
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={validateOtp}>
                        <TextField
                            id="outlined-basic"
                            label="OTP secret"
                            variant="outlined"
                            fullWidth
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
                                    marginTop: "5px",
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
