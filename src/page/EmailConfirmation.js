import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import service from "../service/service";
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
const token = new URLSearchParams(params).get("token");

export default function EmailConfirmation() {
    const navigate = useNavigate();
    const [confirmEmail, setConfirmEmail] = useState("");

    useEffect(() => {
        const confirmEmailRequest = async () => {
            try {
                const response = await service.get(
                    `/auth/confirm-email/?id=${id}&token=${token}`
                );
                setConfirmEmail(response.data.data);

                if (response.data.success === true) {
                    // navigate("/login");
                    toast.success(response.data.data);
                } else {
                    // navigate("/sign-up");
                    toast.error(response.data.data);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.data);
            }
        };

        confirmEmailRequest();
    }, []);

    return <div className="message-screen">{confirmEmail}</div>;
}
