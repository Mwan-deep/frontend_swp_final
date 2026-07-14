import axiosClient from "../utils/axiosClient";

/**
 * ============================
 * JWT Utility
 * ============================
 */

export const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        return null;
    }
};

/**
 * ============================
 * Auth Service
 * ============================
 */

export const authService = {

    /**
     * Register User (ĐÃ THÊM HÀM NÀY)
     */
    async register(formData) {
        // Gọi tới API @PostMapping trong AccountController
        return await axiosClient.post('/api/account', {
            // Map tên biến từ Frontend sang đúng tên biến Backend cần
            userName: formData.studentId, // Frontend dùng studentId, Backend dùng userName
            email: formData.email,
            passwordHash: formData.password, // Frontend dùng password, Backend dùng passwordHash
            fullName: formData.fullName // Gửi thêm nếu Backend của bạn có hỗ trợ lưu FullName
        });
    },

    /**
     * Login Email + Password
     */
    async login(email, password, deviceId) {

        return await axiosClient.post('/api/authen', {
            email: email,
            passwordHash: password, // ÉP DỮ LIỆU TỪ FORM VÀO ĐÚNG TÊN BIẾN CỦA BACKEND
            deviceId: deviceId
        });
    },

    /**
     * Google Login
     */
    loginWithGoogle() {

        window.location.href =
            `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`;

    },

    /**
     * Kiểm tra token còn hợp lệ hay không
     */
    async introspect() {

        const token = this.getToken();

        if (!token) {

            return {
                authenticated: false
            };

        }

        try {

            const response = await axiosClient.post(
                "/api/authen/introspec",
                {
                    token
                }
            );

            return response.result;

        } catch {

            return {
                authenticated: false
            };

        }

    },

    /**
     * Logout Backend
     */
    async logout() {

        const token = this.getToken();

        if (!token) {

            return;

        }

        try {

            await axiosClient.post("/api/authen/logout", {

                token

            });

        } catch (e) {

            console.log("Logout backend failed");

        }

    },

    /**
     * Save token
     */
    saveLogin(token) {

        const payload = parseJwt(token);

        let role = "user";

        const scope = payload?.scope || "";

        if (scope.includes("ADMIN")) {

            role = "admin";

        }

        if (scope.includes("MANAGER")) {

            role = "manager";

        }

        localStorage.setItem("token", token);

        localStorage.setItem("role", role);

        return role;

    },

    /**
     * Remove Local
     */
    clearLocal() {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

        sessionStorage.clear();

    },

    /**
     * Token
     */
    getToken() {

        return localStorage.getItem("token");

    },

    /**
     * Role
     */
    getRole() {

        return localStorage.getItem("role");

    }

};