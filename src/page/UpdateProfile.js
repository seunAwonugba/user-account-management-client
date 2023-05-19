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
import axios from "axios";

export default function UpdateProfile() {
    const navigate = useNavigate();

    const paperStyle = { padding: "30px 20px", width: 550 };
    const marginStyle = { marginTop: "15px" };
    const [fetchedProfile, setFetchedProfile] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        gender: "",
        maritalStatus: "",
        country: "",
    });
    const [isLoading, setIsLoading] = React.useState("");
    const [image, setImage] = React.useState("");

    const [maritalStatus, setMaritalStatus] = React.useState("");
    const [country, setCountry] = React.useState("");

    const handleMaritalStatusChange = (event) => {
        setMaritalStatus(event.target.value);
    };

    const selectCountry = (val) => {
        setCountry(val);
    };

    const cancel = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    React.useEffect(() => {
        const getProfileImage = async () => {
            try {
                const response = await service.get("profile/get-profile-image");
                setImage(response.data.data.image);
            } catch (error) {
                console.log(error);
            }
        };
        const getProfile = async () => {
            try {
                const response = await service.get("profile/get-profile");
                setFetchedProfile(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        getProfileImage();
        getProfile();
    }, []);

    const updateProfile = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userResponse = {
            firstName: fetchedProfile.firstName,
            lastName: fetchedProfile.lastName,
            email: fetchedProfile.email,
            age: fetchedProfile.age,
        };

        console.log(userResponse);
        setIsLoading(false);
    };

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
                                    <img
                                        className="img"
                                        alt="no_profile_image_set"
                                        src={`https://ui-avatars.com/api/?name=${fetchedProfile.firstName}+${fetchedProfile.lastName}&size=128&background=random&rounded=true`}
                                    />
                                ) : (
                                    <img
                                        className="img"
                                        src={image}
                                        alt={image}
                                        crossOrigin="anonymous"
                                    />
                                )}
                            </div>
                            <h2>Update Profile</h2>
                            <Typography variant="caption">
                                Complete form to update your profile
                            </Typography>
                        </Grid>

                        <form onSubmit={updateProfile}>
                            <TextField
                                id="outlined-basic"
                                label="First name"
                                variant="outlined"
                                placeholder="First name"
                                style={marginStyle}
                                onChange={(e) =>
                                    setFetchedProfile({
                                        ...fetchedProfile,
                                        firstName: e.target.value,
                                    })
                                }
                                value={fetchedProfile?.firstName}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                            <TextField
                                id="outlined-basic"
                                label="Last name"
                                variant="outlined"
                                placeholder="Last name"
                                type="text"
                                style={marginStyle}
                                onChange={(e) =>
                                    setFetchedProfile({
                                        ...fetchedProfile,
                                        lastName: e.target.value,
                                    })
                                }
                                value={fetchedProfile?.lastName}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                placeholder="Email"
                                type="email"
                                style={marginStyle}
                                onChange={(e) =>
                                    setFetchedProfile({
                                        ...fetchedProfile,
                                        email: e.target.value,
                                    })
                                }
                                value={fetchedProfile?.email}
                                InputLabelProps={{ shrink: true }}
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
                                    value={fetchedProfile.gender}
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
                                value={fetchedProfile.age || ""}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) =>
                                    setFetchedProfile({
                                        ...fetchedProfile,
                                        age: e.target.value,
                                    })
                                }
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
                                        // value={age}
                                        label="Marital status"
                                        onChange={handleMaritalStatusChange}
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
                                    value={fetchedProfile.country}
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
