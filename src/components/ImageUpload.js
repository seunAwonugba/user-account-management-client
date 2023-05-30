import { useState } from "react";
import axios from "axios";
import service from "../service/service";
import { toast } from "react-toastify";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ImageUpload = () => {
    const navigate = useNavigate();
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
            if (response.data.success === true) {
                navigate("/dashboard");
                toast.success("Profile image updated");
            } else {
                toast.error(response.data.data);
            }
        } catch (error) {
            toast.error(error.response.data.data);
        }
    };

    const cancel = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (
        <div>
            <div className="overlap">
                <Grid>
                    <Paper elevation={20} style={paperStyle}>
                        <Grid align="center">
                            <div className="image-container">
                                {image.preview && (
                                    <img
                                        src={image.preview}
                                        alt="preview"
                                        className="img"
                                    />
                                )}
                            </div>

                            <h3 style={{ padding: "8px" }}>
                                Update profile image
                            </h3>

                            <TextField
                                type="file"
                                name="profile-image"
                                inputProps={{ accept: "image/*" }}
                                onChange={handleImageChange}
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
