import { useContext, useEffect, useState } from "react";
import Users from "../../Users";
import Header from "../../Component/Header/Header";
import './Users.css'
import { AuthContext } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
    const { currentuser } = useContext(AuthContext);
    const navigate = useNavigate()
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || Users);
    const [filteredUsers, setFilteredUsers] = useState(JSON.parse(localStorage.getItem("users")) || Users)
    const [filtertype, setFiltertype] = useState({
        role: "",
        active: ""
    });
    const [showForm, setShowForm] = useState(false);
    const [userFormFeilds, setUserFormFeilds] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        active: ""
    });
    const [error, setError] = useState({
        errorname: null,
        errormsg: ""
    });
    const [searchInput, setSearchInput] = useState('');
    const [editUserStatus, setEditUserStatus] = useState({
        isedit: false,
        editUserId: ''
    })

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
        setFilteredUsers(users);
    }, [users]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFiltertype((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const applyFilter = () => {
        const selectedRole = filtertype?.role;
        const selectedStatus = filtertype?.active;

        if (selectedRole || selectedStatus) {
            const updatedUsers = users?.filter((user) => {
                if ((selectedRole && !selectedStatus) || (selectedStatus === "both" && selectedRole !== "all")) return user?.role === selectedRole;
                if ((selectedStatus && !selectedRole) || (selectedRole === "all" && selectedStatus !== "both")) return (user?.active ? "true" : "false") === selectedStatus;
                if (selectedRole === "all" && selectedStatus === "both") return user;
                if (selectedRole && selectedStatus) return user?.role === selectedRole && (user?.active ? "true" : "false") === selectedStatus;
            });
            setFilteredUsers(updatedUsers);
        }
    }

    const handleUserChange = (e) => {
        setError({ errorname: null, errormsg: "" })
        const { name, value } = e.target;
        setUserFormFeilds((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const searchData = () => {
        const updatedUsers = users?.filter((user) => {
            if (searchInput === '') return Users;
            if (user?.name.includes(searchInput) || user?.email.includes(searchInput) || user?.role?.includes(searchInput)) return user;
        });
        setFilteredUsers(updatedUsers);
    }

    const deleteUser = (selectedUser) => {
        setUsers((allusers) => {
            return allusers.filter((user) => user?.id !== selectedUser?.id)
        });
    }

    const editUser = (selectedUser) => {
        setEditUserStatus({
            isedit: true,
            editUserId: selectedUser?.id
        });
        setShowForm(true);
        setUserFormFeilds({
            name: selectedUser?.name,
            email: selectedUser?.email,
            password: selectedUser?.password,
            role: selectedUser?.role,
            active: selectedUser?.active
        });
    }

    const addUser = (e) => {
        e.preventDefault();
        if (userFormFeilds?.name === '') return setError({ errorname: "name", errormsg: "Name is Required" });
        if (userFormFeilds?.email === '') return setError({ errorname: "email", errormsg: "Email is Required" });
        if (userFormFeilds?.password === '') return setError({ errorname: "password", errormsg: "Password is Required" });
        if (userFormFeilds?.role === '') return setError({ errorname: "role", errormsg: "Role is Required" });
        if (userFormFeilds?.active === '') return setError({ errorname: "active", errormsg: "Active status is Required" });

        if (editUserStatus?.isedit) {
            setUsers((allusers) => {
                const updatedUsers = allusers?.map((user) => {
                    if (user?.id === editUserStatus?.editUserId) {
                        return { ...user, ...userFormFeilds };
                    }
                    return user;
                });
                return updatedUsers;
            })
            alert("User Updated Succefully");
        } else {
            setUsers((prev) => [...prev, { id: prev.length + 1, ...userFormFeilds }]);
            alert("User Added Succefully");
        }
        setUserFormFeilds({ name: "", email: "", password: "", role: "", active: "" })
        setShowForm(false);
    }

    return (
        <>
            <Header />
            {showForm ? (
                <>
                    <h2 style={{ textAlign: "center" }}>User Creation Form</h2>
                    <div className="userformcnt">
                        <form className="userform" onSubmit={addUser}>
                            <div className="userfeild">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userFormFeilds?.name}
                                    onChange={(e) => handleUserChange(e)}
                                    placeholder="Enter Name"

                                />
                            </div>
                            {(error?.errorname === "name") &&
                                <div style={{ color: "red" }}>*{error?.errormsg}</div>
                            }
                            <div className="userfeild">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userFormFeilds?.email}
                                    onChange={(e) => handleUserChange(e)}
                                    placeholder="Enter Email"

                                />
                            </div>
                            {(error?.errorname === "email") &&
                                <div style={{ color: "red" }}>*{error?.errormsg}</div>
                            }
                            <div className="userfeild">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={userFormFeilds?.password}
                                    onChange={(e) => handleUserChange(e)}
                                    placeholder="Enter Password"

                                />
                            </div>
                            {(error?.errorname === "password") &&
                                <div style={{ color: "red" }}>*{error?.errormsg}</div>
                            }
                            <div className="userfeild">
                                <label>Role</label>
                                <select
                                    name="role"
                                    value={userFormFeilds?.role}
                                    onChange={(e) => handleUserChange(e)}

                                >
                                    <option value="" disabled>Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            {(error?.errorname === "role") &&
                                <div style={{ color: "red" }}>*{error?.errormsg}</div>
                            }
                            <div className="userfeild">
                                <label>Active</label>
                                <select
                                    name="active"
                                    value={userFormFeilds?.active}
                                    onChange={(e) => handleUserChange(e)}

                                >
                                    <option value="" disabled>Select Status</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                            {(error?.errorname === "active") &&
                                <div style={{ color: "red" }}>*{error?.errormsg}</div>
                            }
                            <div>
                                <button type="submit">Submit</button>
                                <button type="button" className="btn" onClick={() => {
                                    setUserFormFeilds({ name: "", email: "", password: "", role: "", active: "" });
                                    setError({ errorname: null, errormsg: "" })
                                    setShowForm(false);
                                }}
                                >Cancel</button>
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <div className="tablecontainer">
                    <div className="adduserbtn">
                        <div>
                            <button onClick={() => navigate('/homepage')}>Back To Home</button>
                        </div>
                        {currentuser?.role !== "user" &&
                            <div>
                                <button onClick={() => setShowForm(true)}>Add User</button>
                            </div>
                        }
                    </div>
                    <div className="tableheader">
                        <div>
                            <span style={{ fontWeight: "bold", marginLeft: "5px" }}>Filter By --</span>
                            <select name="role" value={filtertype?.role} onChange={(e) => handleFilterChange(e)} style={{ padding: "5px", borderRadius: "5px", marginLeft: "5px" }}>
                                <option value='' disabled>Role</option>
                                <option value="superadmin">Superadmin</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="all">All</option>
                            </select>
                            <select name="active" value={filtertype?.active} onChange={(e) => handleFilterChange(e)} style={{ padding: "5px", borderRadius: "5px", marginLeft: "5px" }}>
                                <option value="" disabled>Active</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                                <option value="both">Both</option>
                            </select>
                            <button onClick={applyFilter} className="btn">Apply Filter</button>
                        </div>
                        <div className="searchdiv">
                            <input type="text" placeholder="Enter detail to search" onChange={(e) => setSearchInput(e.target.value)} />
                            <button className="btn" onClick={() => searchData()}>Search</button>
                        </div>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>#No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Active Status</th>
                                    {currentuser?.role === "superadmin" && <th>Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length > 0 ?
                                    filteredUsers?.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user?.name}</td>
                                            <td>{user?.email}</td>
                                            <td>{user?.role}</td>
                                            <td>{user?.active ? "true" : "false"} {user?.id === currentuser?.id && <span>(current)</span>}</td>
                                            {currentuser?.role === "superadmin" &&
                                                <td>
                                                    {(currentuser?.id !== user?.id) &&
                                                        <div className="actionbtn">
                                                            <button onClick={() => editUser(user)}>Edit User</button>
                                                            <button onClick={() => deleteUser(user)}>Delete User</button>
                                                        </div>
                                                    }
                                                </td>
                                            }
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan={6}>No data</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </>
    )
}

export default UsersList;