import { useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import service from "../service/service";
export default function VerifyMe() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [verifyMeDocs, setVerifyMeDocs] = useState("");

    const paperStyle = { padding: "30px 20px", width: 550 };
    const marginStyle = { marginTop: "15px" };

    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value);
    };

    const fileChangeHandler = (e) => {
        if (e.target.files) {
            setVerifyMeDocs(e.target.files[0]);
        }
    };

    const verifyMe = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("documentType", documentType);
        formData.append("documentNumber", documentNumber);
        formData.append("verify-me-docs", verifyMeDocs);

        try {
            const response = await service.patch(
                "/verify/verify-me",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setIsLoading(false);

            if (response.data.success === true) {
                navigate("/dashboard");
                toast.success("Document sent for verification");
            } else {
                toast.error(response.data.data);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error.response.data.data);
        }
    };

    const cancel = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return isLoading ? (
        <body>
            <h4>Loading...</h4>
        </body>
    ) : (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <h2>Verify Me</h2>
                    <Typography variant="caption">
                        Upload valid means of identification to earn
                        verification badge
                    </Typography>
                </Grid>

                <form onSubmit={verifyMe}>
                    <FormControl fullWidth style={marginStyle}>
                        <InputLabel id="demo-simple-select-label">
                            Means of identification
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="documentType"
                            value={documentType}
                            label="Means of identification"
                            onChange={(e) =>
                                inputChangeHandler(setDocumentType, e)
                            }
                        >
                            <MenuItem value={"National ID"}>
                                National ID
                            </MenuItem>
                            <MenuItem value={"International Passport"}>
                                International Passport
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="outlined-basic"
                        label="ID number"
                        variant="outlined"
                        placeholder="ID number"
                        type="text"
                        style={marginStyle}
                        name="documentNumber"
                        value={documentNumber}
                        onChange={(e) =>
                            inputChangeHandler(setDocumentNumber, e)
                        }
                        fullWidth
                    />

                    <TextField
                        type="file"
                        name="verify-me-docs"
                        id="outlined-basic"
                        style={marginStyle}
                        variant="outlined"
                        placeholder="Select ID"
                        onChange={fileChangeHandler}
                        fullWidth
                    />

                    <div className="button-div">
                        <div>
                            <Button
                                onClick={cancel}
                                variant="outlined"
                                type="submit"
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
                            Login
                        </Button>
                    </div>
                </form>
            </Paper>
        </Grid>
    );
}
