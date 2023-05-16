import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import service from "../service/service";

export default function EmailConfirmation() {
    const navigate = useNavigate();

    useEffect(() => {
        const confirmEmail = async () => {
            const params = window.location.search;
            const id = new URLSearchParams(params).get("id");
            const token = new URLSearchParams(params).get("token");

            try {
                const response = await service.get(
                    `/auth/confirm-email/?id=${id}&token=${token}`
                );

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

        confirmEmail();
    }, [navigate]);

    // const confirmEmail = async () => {
    //     try {
    //         const response = await service.get(
    //             `/auth/confirm-email/?id=${id}&token=${token}`
    //         );
    //         console.log(response);
    //         if (response.data.success === true) {
    //             navigate("/login");
    //             toast.success(response.data.data);
    //         } else {
    //             navigate("/sign-up");
    //             toast.error(response.data.data);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error.response.data.data);
    //     }
    // };

    // useEffect(() => {
    //     confirmEmail()
    // })

    return (
        <div className="message-screen">Email address confirmation screen</div>
    );
}
