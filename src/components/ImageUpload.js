import { useState } from "react";
import axios from "axios";
import service from "../service/service";
import { toast } from "react-toastify";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";

const ImageUpload = () => {
    const paperStyle = { padding: "30px 20px", width: 550 };

    const [image, setImage] = useState({ preview: "", data: "" });

    const handleImageChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setImage(img);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("profile-image", image.data);

        try {
            const response = await service.patch(
                "/profile/update-profile-image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response);
        } catch (error) {
            if (error.message) {
                toast.error(error.message);
            }
            toast.error(error.response.data.data);
        }
    };

    return (
        <div>
            <div className="overlap">
                <Grid>
                    <Paper elevation={20} style={paperStyle}>
                        <Grid align="center">
                            <div className="image-container">
                                {image.preview && (
                                    <img src={image.preview} alt="preview" />
                                )}
                            </div>

                            <h2>Update profile image</h2>
                            <Typography variant="caption">
                                Complete form to update your profile
                            </Typography>

                            <TextField
                                type="file"
                                name="profile-image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />

                            <div className="button-div">
                                <div>
                                    <Button
                                        // onClick={cancel}
                                        variant="outlined"
                                        type="submit"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    Upload
                                </Button>
                            </div>
                        </Grid>
                    </Paper>
                </Grid>
            </div>
        </div>
    );
};

export default ImageUpload;
