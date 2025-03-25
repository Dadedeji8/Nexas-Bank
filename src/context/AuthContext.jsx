import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMemo } from 'react';


const AuthenticationContext = createContext();

/**

 */
export const AuthProvider = ({ children }) => {

    const endpoint = "https://nexas-bank-seven.vercel.app/api";

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')) || null);
    const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem("profile"))?.isAdmin || false);
    const [isActive, setIsActive] = useState(JSON.parse(localStorage.getItem("profile"))?.isActive || 'unset');
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [notifications, setNotifications] = useState([])
    const [allAccountDetails, setAllAccountDetails] = useState([])

    const [error, setError] = useState(null)
    const [allUsers, setAllUsers] = useState([])
    const [transactionsHistory, setTransactionsHistory] = useState([])

    const [deposits, setDeposits] = useState([])

    const [withdrawals, setWithdrawals] = useState([])

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
        const storedProfile = JSON.parse(localStorage.getItem("profile"));
        if (storedProfile) {
            setProfile(storedProfile);
            setIsAdmin(storedProfile.isAdmin);
            setIsActive(storedProfile.isActive);

        }
    }, []); // Runs only on mount

    useEffect(() => {
        console.log({ isAdmin })
    }, [isAdmin]); // Runs only on mount

    useEffect(() => {
        if (!token) {
            return;
        }
        getProfile();
        getWithdrawals({});
        getTransactions({});
        getDeposits({});
        getNotification();

        if (isAdmin) {

            // only admin
            getAllProfile({});
            getAllAccountDetails()
        }

        setLoading(false);

    }, [token]);

    function getProfile() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${endpoint}/user/profile`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log("Fetched profile result:", result);

                if (!result || Object.keys(result).length === 0) {
                    throw new Error("Received empty response from API");
                }

                setProfile(result); //  Update state
                setIsAdmin(result.isAdmin)
                setIsActive(result.isActive)
                localStorage.setItem("profile", JSON.stringify(result));
            })
            .catch((error) => console.error("Error fetching profile:", error));
    }
    async function updateProfile(data, onSuccess, onError) {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No authentication token found");
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `${token}`);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: "follow",
        };

        await fetch(`${endpoint}/user/profile`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        throw new Error(`Error ${response.status}: ${err.message || "Unknown error"}`);
                    });
                }
                return response.json();
            })
            .then((result) => {
                console.log("Profile updated successfully:", result);
                if (onSuccess) onSuccess(result);
            })
            .catch((error) => {
                console.error("Error updating profile:", error.message);
                if (onError) onError(error);
            });
    }



    function getAllProfile({ userId }) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        let api = `${endpoint}/user`;
        const queryParams = new URLSearchParams();

        if (userId) {
            queryParams.append("userId", userId);
        }
        if (queryParams.toString()) {
            api = `${api}?${queryParams.toString()}`;
        }
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(api, requestOptions)
            .then((response) => response.json())
            .then((result) => setAllUsers(result.users))
            .catch((error) => console.error(error));
    }

    function getTransactions({ id, userId }) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        let api = `${endpoint}/bank/history`;
        const queryParams = new URLSearchParams();
        if (id) {
            queryParams.append("id", id);
        }
        if (userId) {
            queryParams.append("userId", userId);
        }
        if (queryParams.toString()) {
            api = `${api}?${queryParams.toString()}`;
        }
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(api, requestOptions)
            .then((response) => response.json())
            .then((result) => setTransactionsHistory(result.transactions))
            .catch((error) => console.error(error));
    }

    function getWithdrawals({ id, userId }) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        let api = `${endpoint}/bank/withdrawal`;
        const queryParams = new URLSearchParams();
        if (id) {
            queryParams.append("id", id);
        }
        if (userId) {
            queryParams.append("userId", userId);
        }
        if (queryParams.toString()) {
            api = `${api}?${queryParams.toString()}`;
        }
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(api, requestOptions)
            .then((response) => response.json())
            .then((result) => setWithdrawals(result.withdrawals))
            .catch((error) => console.error(error));
    }

    function adminApproveWithdrawals({ id, status, reason }) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "status": status,
            "message": reason
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        fetch(`${endpoint}/bank/withdrawal/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                getWithdrawals({})
            })
            .catch((error) => console.error(error));
    }

    function adminApproveDeposits({ id, status }) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "status": status,
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        fetch(`${endpoint}/bank/deposit/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                getDeposits({})
            })
            .catch((error) => console.error(error));
        return
    }

    function adminUpdateUserWallet(data) {


        if (!token) throw new Error("Authorization token is missing");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            amount: data.amount,
            description: data.description,
            method: data.method,
            account: {
                code: data.code,
                name: data.name,
                channel: data.channel
            },
            password: data.password
        });

        console.log("Token:", token);
        console.log("Raw Payload:", raw);
        console.log("API Endpoint:", endpoint);

        const requestOptions = {
            method: "POST", // Change to PUT if required
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        return fetch(`${endpoint}/bank/transaction?id=${data.id}`, requestOptions)
            .then(async (response) => {
                const contentType = response.headers.get("content-type");

                if (!contentType || !contentType.includes("application/json")) {
                    const errorText = await response.text();
                    throw new Error(`Unexpected response format: ${errorText}`);
                }

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.error || `Transfer failed with status ${response.status}`);
                }
                return result;
            })
            .catch(error => {
                console.error("Wallet update error:", error.message);
                throw error;
            });
    }
    function toggleDetailState(data) {


        if (!token) throw new Error("Authorization token is missing");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            active: data.active
        });

        console.log("Token:", token);
        console.log("Raw Payload:", raw);
        console.log("API Endpoint:", endpoint);

        const requestOptions = {
            method: "PUT", // Change to PUT if required
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        return fetch(`${endpoint}/bank/details?id=${data.id}`, requestOptions)
            .then(async (response) => {
                const contentType = response.headers.get("content-type");

                if (!contentType || !contentType.includes("application/json")) {
                    const errorText = await response.text();
                    throw new Error(`Unexpected response format: ${errorText}`);
                }

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.error || ` failed to change detail state status ${response.status}`);
                }
                getAllAccountDetails()
                return result;
            })
            .catch(error => {
                console.error("Wallet update error:", error.message);
                throw error;
            });
    }
    // function adminUpdateUserWallet(data) {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
    //     myHeaders.append("Authorization", token);

    //     const raw = JSON.stringify({
    //         "amount": data.amount,
    //         "description": data.description,
    //         "method": data.method,
    //         "account": {
    //             "code": data.code,
    //             "name": data.name,
    //             "channel": data.channel
    //         },
    //         "password": data.password
    //     });

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     try {
    //         fetch("https://nexas-bank-seven.vercel.app/api/bank/transaction?id=67d5a1346f571679a1b6c13f", requestOptions)
    //             .then(response => response.json())
    //             .then(result => console.log(result))
    //             .catch(error => console.log('error', error));
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    // ({ id, amount }) {
    //     const myHeaders = new Headers();
    //     myHeaders.append("Authorization", token);

    //     myHeaders.append("Content-Type", "application/json");

    //     const raw = JSON.stringify({
    //         "amount": amount,
    //         "description": 'deposit',
    //         "method": "+",
    //         "account": {
    //             "code": '00000',
    //             "name": 'Nexas Bank',
    //             "channel":'Nexas Bank'
    //         },
    //         "password": data.password
    //     });

    //     const requestOptions = {
    //         method: "PUT",
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: "follow"
    //     };


    //     fetch(`${endpoint}/bank/transaction?id=${id}`, requestOptions)
    //         .then((response) => response.json())
    //         .then((result) => {
    //             console.log(result)
    //             getAllProfile({})
    //         })
    //         .catch((error) => console.error(error));
    //     return
    // }

    function adminDisableUser({ id }) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            targetUserId: id
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };


        fetch(`${endpoint}/user`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                getAllProfile({})
            })
            .catch((error) => console.error(error));
        return
    }

    function getDeposits({ id, userId }) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        let api = `${endpoint}/bank/deposit`;
        const queryParams = new URLSearchParams();
        if (id) {
            queryParams.append("id", id);
        }
        if (userId) {
            queryParams.append("userId", userId);
        }
        if (queryParams.toString()) {
            api = `${api}?${queryParams.toString()}`;
        }
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(api, requestOptions)
            .then((response) => response.json())
            .then((result) => setDeposits(result.deposits))
            .catch((error) => console.error(error));
    }

    const login = async (data) => {
        console.log('This is the data being submitted for login:', data);

        try {
            const response = await fetch(`${endpoint}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json(); // Parse JSON first

            if (!response.ok) {
                throw new Error(result.error || 'Failed to log in'); // Use API error message if available
            }
            // return console.log({ result })

            localStorage.setItem('token', result.token);
            localStorage.setItem('profile', JSON.stringify(result.user));
            setToken(result.token);
            setProfile(result.user);
            setIsAdmin(result.user.isAdmin);
            setIsActive(result.user.isActive);



            console.log('Login successful. Token:', result.token);
            return { success: true, data: result }; // Return success status

        } catch (error) {
            console.error('Error logging in:', error);
            setError('Failed to log in');
            return { success: false, error: error.message }; // Return error for handling
        }
    };


    const registerUser = async (data) => {
        try {
            const response = await fetch(`${endpoint}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json(); // Parse JSON first

            if (!response.ok) {
                throw new Error(result.error || 'Failed to register'); // Use API error message if available
            }

            console.log('User registered successfully:', result);
            return { success: true, data: result }; // Return success status

        } catch (error) {
            console.error('Error registering user:', error);
            return { success: false, error: error.message }; // Return error for handling
        }
    };

    // making new deposit below
    const makeDeposit = (data) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "amount": data.amount,
            "transactionRef": data.refNo,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${endpoint}/bank/deposit`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                getDeposits({})
            })
            .catch((error) => console.error(error));
    }
    // making new deposit below
    const makeWithdrawel = (data) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "amount": data.amount,
            "description": data.description,
            "account": {
                "bank": data.bank,
                "number": data.number,
                "name": data.name
            },
            'password': data.password
        });
        console.log('this is the form  the withdraw', raw)
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${endpoint}/bank/withdrawal`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                getWithdrawals({})
            })
            .catch((error) => console.error(error));
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        setToken(null);
        setProfile(null);
        setIsAdmin(false);
    };
    const getNotification = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json")

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${endpoint}/notification`, requestOptions)
            .then((response) => { return response.json() })
            .then((result) => { setNotifications(result?.notifications) }

            )
            .catch((error) => console.error(error));
    }

    const getAccountDetail = async (accountNumber) => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication required');

        try {
            const response = await fetch(
                `${endpoint}/bank/details?code=${accountNumber}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Account verification failed');
            }

            const result = await response.json();

            console.log(result.detail)
            return result.detail; // Assuming your API returns data in data property
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch account details');
        }
    };
    const getAllAccountDetails = async () => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication required');

        try {
            const response = await fetch(
                `${endpoint}/bank/details`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Account verification failed');
            }

            const result = await response.json();

            console.log(result)
            setAllAccountDetails(result.details)
            return result.details; // Assuming your API returns data in data property
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch account details');
        }
    };

    const makeTransfer = (data) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "amount": data.amount,
            "description": data.description,
            "method": "-",
            "account": {
                "code": data.code,
                "name": data.name,
                "channel": data.channel
            },
            "password": data.password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // Return the promise chain
        return fetch(`${endpoint}/bank/transaction`, requestOptions)
            .then(async (response) => {
                const data = await response.json();
                if (!response.ok) {
                    // Throw error with message from server
                    throw new Error(data.error || 'Transfer failed');
                }
                return data;
            })
            .catch(error => {
                // Re-throw to allow handling in component
                throw new Error(error.message);
            });
    };


    const createDetail = async (data) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");


        const raw = JSON.stringify({
            code: data?.code ?? "",
            name: data?.name ?? "",
            channel: data?.channel ?? "",
            active: true
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${endpoint}/bank/details`, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error creating detail:", error);
            throw error; // Re-throw to allow error handling by the caller
        }

    };


    function adminUpdateTransaction(data) {


        if (!token) throw new Error("Authorization token is missing");
        const { id, ...updatedData } = data
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(updatedData);

        console.log("Token:", token);
        console.log("Raw Payload:", raw);
        console.log("API Endpoint:", endpoint);

        const requestOptions = {
            method: "PUT", // Change to PUT if required
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        return fetch(`${endpoint}/bank/transaction?id=${data.id}`, requestOptions)
            .then(async (response) => {
                const contentType = response.headers.get("content-type");

                if (!contentType || !contentType.includes("application/json")) {
                    const errorText = await response.text();
                    throw new Error(`Unexpected response format: ${errorText}`);
                }

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.error || `Transfer detail edit failed with ${response.status}`);
                }
                getTransactions({})
                return result;
            })
            .catch(error => {
                console.error("Wallet update error:", error.message);
                throw error;
            });
    }
    function adminDeleteSingleTransaction(data) {


        if (!token) throw new Error("Authorization token is missing");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(data);

        console.log("Token:", token);
        console.log("Raw Payload:", raw);
        console.log("API Endpoint:", endpoint);

        const requestOptions = {
            method: "DELETE", // Change to PUT if required
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        return fetch(`${endpoint}/bank/transaction?id=${data}`, requestOptions)
            .then(async (response) => {
                const contentType = response.headers.get("content-type");

                if (!contentType || !contentType.includes("application/json")) {
                    const errorText = await response.text();
                    throw new Error(`Unexpected response format: ${errorText}`);
                }

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.error || `Transfer detail edit failed with ${response.status}`);
                }
                getTransactions({})
                return result;
            })
            .catch(error => {
                console.error("Wallet update error:", error.message);
                throw error;
            });
    }

    return (
        <AuthenticationContext.Provider value={{
            isAuthenticated, isAdmin, isActive,
            getNotification,
            adminUpdateTransaction,
            registerUser,
            login,
            logout,
            token,
            endpoint, createDetail,
            transactionsHistory,
            getProfile,
            allAccountDetails,
            adminDisableUser,
            updateProfile,
            setTransactionsHistory,
            deposits,
            profile,
            loading,
            setDeposits,
            makeDeposit,
            makeWithdrawel,
            withdrawals,
            notifications,
            setWithdrawals,
            getAccountDetail, makeTransfer,
            allUsers, adminApproveWithdrawals, adminApproveDeposits, adminUpdateUserWallet, adminDeleteSingleTransaction, toggleDetailState
        }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

AuthProvider.propTypes = { children: PropTypes.node.isRequired, };

export const useAuth = () => {
    return useContext(AuthenticationContext);
}
