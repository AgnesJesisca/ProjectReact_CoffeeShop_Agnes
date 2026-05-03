export default function Forgot() {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-primary mb-2 text-center">
                Forgot Your Password?
            </h2>
            
            <p className="text-sm text-sub mb-6 text-center">
                Enter your email address and we'll send you a link to reset your
                password.
            </p>

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

                <button
                    type="submit"
                    className="w-full btn-coffee"
                >
                    Send Reset Link
                </button>
            </form>
        </div>
    )
}