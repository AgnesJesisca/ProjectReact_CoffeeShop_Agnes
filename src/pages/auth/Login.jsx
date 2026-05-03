import axios from "axios"
import { useState } from "react"
import { BsFillExclamationDiamondFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
		/* navigate, state & handleChange*/
    const navigate = useNavigate() 
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }

    /* process form */
    const handleSubmit = async (e) => {
            e.preventDefault()
    
            setLoading(true)
            setError(false)
    
        axios
                .post("https://dummyjson.com/user/login", {
                    username: dataForm.email,
                    password: dataForm.password,
                })
                .then((response) => {
                    // Jika status bukan 200, tampilkan pesan error
                    if (response.status !== 200) {
                        setError(response.data.message);
                        return; 
                    }
    
                    // Redirect ke dashboard jika login sukses
                    navigate("/");
                })
                .catch((err) => {
                    if (err.response) {
                        setError(err.response.data.message || "An error occurred");
                    } else {
                        setError(err.message || "An unknown error occurred");
                    }
                })
                .finally(() => {
                    setLoading(false); 
                });

        }

    /* error & loading status */
    const errorInfo = error ? (
        <div className="bg-soft mb-5 p-4 text-sm text-primary rounded flex items-center border border-soft">
            <BsFillExclamationDiamondFill className="me-2" />
            {error}
        </div>
    ) : null
    
    const loadingInfo = loading ? (
        <div className="bg-soft mb-5 p-4 text-sm rounded flex items-center text-primary border border-soft">
            <ImSpinner2 className="me-2 animate-spin" />
            Brewing your login...
        </div>
    ) : null

    return (
        <div>
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
                Welcome Back 👋
            </h2>

            {errorInfo}
            {loadingInfo}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-sub mb-1">
                        Email Address
                    </label>
                    <input
                        type="text"
                        id="email"
                        className="input-coffee"
                        placeholder="you@example.com"
                        name="email"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-sub mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="input-coffee"
                        placeholder="********"
                        name="password"
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full btn-coffee"
                >
                    Login
                </button>
            </form>
        </div>
    )
}