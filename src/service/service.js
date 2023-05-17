import axios from "axios";

const service = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // headers: {
    //     Accept: "application/json",
    // },
});

//before make request
service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("user_management_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        delete config.headers["Content-Type"];
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//when response is received

service.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (err.response) {
            //access token expired
            if (err.response.status === 419 && !originalConfig._retry) {
                //handle infinite loop
                originalConfig._retry = true;

                try {
                    const refreshTokenResponse = await service.post(
                        "/auth/refresh-token",
                        {
                            refreshToken: localStorage.getItem(
                                "user_management_refresh_token"
                            ),
                            email: localStorage.getItem(
                                "user_management_token_email"
                            ),
                        }
                    );

                    // console.log(refreshTokenResponse);

                    const accessToken = refreshTokenResponse.data.data;

                    //store and update new access token
                    localStorage.setItem("user_management_token", accessToken);

                    return service(originalConfig);
                } catch (error) {
                    return Promise.reject(error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default service;
