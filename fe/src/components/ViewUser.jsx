function ViewUser({
    userDetail,
    moreDetail
}) {
    return (
        <>
            <h1>View User</h1>

            <h2>
                Name - {userDetail?.name}
            </h2>

            <h2>
                Email - {userDetail?.email}
            </h2>

            <h2>
                CreatedAt - {userDetail?.createdAt}
            </h2>

            <h2>
                Bio - {moreDetail?.bio}
            </h2>

            <h2>
                Phone Number - {moreDetail?.phoneNumber}
            </h2>
        </>
    );
}

export default ViewUser;