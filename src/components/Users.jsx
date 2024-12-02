import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

const Users = () => {
    const loadedUsers = useLoaderData();
    const [user, setUser] = useState(loadedUsers)
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = (_id) => {
        // console.log('delete', _id);
        setIsLoading(true)
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {console.log(data);
            if(data.deletedCount > 0 ) {
                toast.success('deleted successfully')
                const remaining = user.filter((u) => u._id !== _id)
                setUser(remaining)
            }
            setIsLoading(false);
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete the user. Please try again.");
            setIsLoading(false)
        });
    }
    return (
        <div>
            <h2>{user.length}</h2>
            {
                user.map(user => <p key={user._id}>{user.name}: {user.email} {user._id}
                <Link to={`/update/${user._id}`}><button>Update</button></Link>
                <button onClick={() => handleDelete(user._id)}>X</button></p>)
            }
        </div>
    );
};

export default Users;