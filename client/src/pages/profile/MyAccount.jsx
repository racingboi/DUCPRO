export const MyAccount = () => {
    return (
        <>
            <div className="container">
                <div className="text-inherit">
                    <h1>My Account</h1>
                </div>
                <div className="grid grid-flow-col grid-cols-6 grid-rows-2 gap-4">
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Your name" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Your email" />
                    </div>
                </div>
            </div>
        </>
    )
}
