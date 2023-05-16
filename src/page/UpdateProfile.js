import * as React from "react";
import TextField from "@mui/material/TextField";
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
import service from "../service/service";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { CountryDropdown } from "react-country-region-selector";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";

export default function UpdateProfile() {
    const navigate = useNavigate();

    const paperStyle = { padding: "30px 20px", width: 550 };
    const marginStyle = { marginTop: "15px" };
    const [profile, setProfile] = React.useState({});
    const [isLoading, setIsLoading] = React.useState("");
    const [image, setImage] = React.useState("");

    const [age, setAge] = React.useState("");
    const [country, setCountry] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const selectCountry = (val) => {
        setCountry(val);
    };

    const cancel = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    const inputChangeHandler = (event) => {
        setProfile(event.target.value);
    };

    React.useEffect(() => {
        const getProfileImage = async () => {
            try {
                const response = await service.get("profile/get-profile-image");
                // console.log(response.data.data.image);
                setImage(response.data.data.image);
            } catch (error) {
                console.log(error);
            }
        };

        getProfileImage();
    }, []);

    return isLoading ? (
        <body>
            <h4>Loading...</h4>
        </body>
    ) : (
        <div className="overlap">
            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid>
                        <Grid align="center">
                            <div className="image-container">
                                {image === "" || image === null ? (
                                    ""
                                ) : (
                                    <img
                                        src={image}
                                        alt={image}
                                        crossOrigin="anonymous"
                                    />
                                )}
                            </div>

                            {/* <img
                                style={{ width: "200px", height: "200px" }}
                                alt="img"
                                src={image}
                            /> */}
                            <h2>Update Profile</h2>
                            <Typography variant="caption">
                                Complete form to update your profile
                            </Typography>
                        </Grid>

                        <form>
                            <TextField
                                id="outlined-basic"
                                label="First name"
                                variant="outlined"
                                placeholder="First name"
                                style={marginStyle}
                                onChange={inputChangeHandler}
                                fullWidth
                            />
                            <TextField
                                id="outlined-basic"
                                label="Last name"
                                variant="outlined"
                                placeholder="Last name"
                                type="text"
                                style={marginStyle}
                                onChange={inputChangeHandler}
                                fullWidth
                            />
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                placeholder="Email"
                                type="email"
                                style={marginStyle}
                                onChange={inputChangeHandler}
                                fullWidth
                            />

                            <FormControl style={marginStyle} fullWidth>
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                    Gender
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    className="radio-group"
                                >
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                    />
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                    />
                                </RadioGroup>
                            </FormControl>

                            <TextField
                                id="outlined-basic"
                                label="Age"
                                variant="outlined"
                                placeholder="Age"
                                type="number"
                                InputProps={{
                                    inputProps: {
                                        min: 1,
                                    },
                                }}
                                style={marginStyle}
                                value={age}
                                onChange={inputChangeHandler}
                                fullWidth
                            />

                            <Box sx={{ minWidth: 120 }} style={marginStyle}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Marital status
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Marital status"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Single</MenuItem>
                                        <MenuItem value={20}>Married</MenuItem>
                                        <MenuItem value={30}>Divorced</MenuItem>
                                        <MenuItem value={30}>Widowed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <div class="select-container">
                                <CountryDropdown
                                    classes="dropdown "
                                    value={country}
                                    onChange={(val) => selectCountry(val)}
                                />
                            </div>

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
                                        marginTop: "15px",
                                    }}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}
