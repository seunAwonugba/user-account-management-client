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
import logo from "../profile-image.jpg";
import { Dialog } from "primereact/dialog";
import Avatar from "react-avatar-edit";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
    CountryDropdown,
    RegionDropdown,
    CountryRegionData,
} from "react-country-region-selector";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";

export default function Profile() {
    const navigate = useNavigate();

    const paperStyle = { padding: "30px 20px", width: 550 };
    const marginStyle = { marginTop: "15px" };

    const [profile, setProfile] = React.useState({});
    const [image, setImage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState("");

    const [visible, setVisible] = React.useState(false);
    const [imageCrop, setImageCrop] = React.useState(false);
    const [storeImage, setStoreImage] = React.useState([]);
    const [dialogs, setDialogs] = React.useState(false);
    const [age, setAge] = React.useState("");
    const [country, setCountry] = React.useState("");

    const onCrop = (view) => {
        setImageCrop(view);
    };

    const onClose = () => {
        setImageCrop(null);
    };

    const saveImage = () => {
        const updatedImage = { imageCrop };
        setStoreImage([updatedImage]);
        setVisible(false);
    };

    const showProfileImage = storeImage.length ? storeImage[0].imageCrop : logo;

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const selectCountry = (val) => {
        setCountry(val);
    };

    React.useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await service.get("/profile/get-Profile");
                setProfile(response.data.data);

                console.log(response.data.data);
            } catch (error) {
                if (error.response.status === 400) {
                    navigate("/login");
                }
            }
        };

        getProfile();
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
                            <img
                                alt="profile"
                                src={
                                    showProfileImage.length
                                        ? showProfileImage
                                        : logo
                                }
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                                onClick={() => setVisible(true)}
                            />

                            <h2>Complete Profile</h2>
                            <Typography variant="caption">
                                Complete the form to update your profile
                            </Typography>

                            <Dialog
                                header="Header"
                                visible={visible}
                                onHide={() => setVisible(false)}
                                breakpoints={{
                                    "960px": "75vw",
                                    "641px": "100vw",
                                }}
                            >
                                <Avatar
                                    width={390}
                                    height={295}
                                    onCrop={onCrop}
                                    onClose={onClose}
                                />
                                <div className="center">
                                    <Button onClick={saveImage}>Save</Button>
                                </div>
                            </Dialog>
                        </Grid>

                        <form>
                            <TextField
                                id="outlined-basic"
                                label="First name"
                                variant="outlined"
                                placeholder="First name"
                                style={marginStyle}
                                // value={firstName}
                                // onChange={(e) =>
                                //     inputChangeHandler(setFirstName, e)
                                // }
                                fullWidth
                            />
                            <TextField
                                id="outlined-basic"
                                label="Last name"
                                variant="outlined"
                                placeholder="Last name"
                                type="text"
                                style={marginStyle}
                                // value={lastName}
                                // onChange={(e) => inputChangeHandler(setLastName, e)}
                                fullWidth
                            />
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                placeholder="Email"
                                type="email"
                                style={marginStyle}
                                // value={email}
                                // onChange={(e) => inputChangeHandler(setEmail, e)}
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
                                // value={lastName}
                                // onChange={(e) => inputChangeHandler(setLastName, e)}
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
                        </form>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}
