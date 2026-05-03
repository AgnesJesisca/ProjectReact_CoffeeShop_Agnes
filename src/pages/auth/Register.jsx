export default function Register() {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
                Create Your Account ✨
            </h2>

            <form>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-sub mb-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="input-coffee"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-sub mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="input-coffee"
                        placeholder="********"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-sub mb-1"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="input-coffee"
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full btn-coffee"
                >
                    Register
                </button>
            </form>
        </div>
    )
}