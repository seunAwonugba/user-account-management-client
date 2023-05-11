import * as React from "react";
import TextField from "@mui/material/TextField";
import {
    Avatar,
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

export default function Profile() {
    const navigate = useNavigate();

    const paperStyle = { padding: "30px 20px", width: 550 };
    const marginStyle = { marginTop: "15px" };

    const [profile, setProfile] = React.useState({});
    // const [image, setImage] = React.useState();
    const [isLoading, setIsLoading] = React.useState("");

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
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Grid>
                        <img src={profile.photo} alt="profile"></img>

                        <h2>Profile Page</h2>
                    </Grid>

                    <form>
                        <div></div>
                        <div></div>
                    </form>
                </Grid>
            </Paper>
        </Grid>
    );
}
