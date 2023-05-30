import * as React from "react";
import TextField from "@mui/material/TextField";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
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
import dayjs from "dayjs";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import DatePickerComponent from "../components/DatePickerComponent";

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
        nationality: "",
        dob: "",
    });
    const [isLoading, setIsLoading] = React.useState("");
    const [image, setImage] = React.useState("");

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
                // console.log(error);
            }
        };
        const getProfile = async () => {
            try {
                const response = await service.get("profile/get-profile");
                console.log(response);
                setFetchedProfile(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        getProfileImage();
        getProfile();
    }, []);

    const updateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userResponse = {
            firstName: fetchedProfile.firstName,
            lastName: fetchedProfile.lastName,
            email: fetchedProfile.email,
            age: fetchedProfile.age,
            gender: fetchedProfile.gender,
            maritalStatus: fetchedProfile.maritalStatus,
            country: fetchedProfile.nationality,
            dob: fetchedProfile.dob.toISOString(),
        };
        console.log(userResponse);

        try {
            const response = await service.patch(
                "/profile/edit-profile",
                userResponse
            );
            setIsLoading(false);

            if (response.data.success === true) {
                toast.success("Profile update successful");
                navigate("/dashboard");
            } else {
                setIsLoading(false);
                toast.error(response.data.data);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            if (error.code === "ERR_NETWORK") {
                toast.error(error.message);
            }
            toast.error(error.response.data.data);
        }
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
                                    onChange={(e) =>
                                        setFetchedProfile({
                                            ...fetchedProfile,
                                            gender: e.target.value,
                                        })
                                    }
                                    value={fetchedProfile?.gender}
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

                            <DatePickerComponent
                                value={dayjs(fetchedProfile.dob)}
                                onChange={(e) =>
                                    setFetchedProfile({
                                        ...fetchedProfile,
                                        dob: e,
                                    })
                                }
                            />

                            <Box sx={{ minWidth: 120 }} style={marginStyle}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Marital status
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Marital status"
                                        onChange={(e) =>
                                            setFetchedProfile({
                                                ...fetchedProfile,
                                                maritalStatus: e.target.value,
                                            })
                                        }
                                        value={fetchedProfile.maritalStatus}
                                    >
                                        <MenuItem value={"SINGLE"}>
                                            Single
                                        </MenuItem>
                                        <MenuItem value={"MARRIED"}>
                                            Married
                                        </MenuItem>
                                        <MenuItem value={"DIVORCED"}>
                                            Divorced
                                        </MenuItem>
                                        <MenuItem value={"WIDOWED"}>
                                            Widowed
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <div class="select-container">
                                <CountryDropdown
                                    classes="dropdown "
                                    value={fetchedProfile.nationality}
                                    // onChange={(val) => selectCountry(val)}
                                    onChange={(e) =>
                                        setFetchedProfile({
                                            ...fetchedProfile,
                                            nationality: e,
                                        })
                                    }
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
