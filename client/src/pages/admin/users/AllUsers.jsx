import {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import UserTable from './UserTable';
import SummaryApi from '../../../common/index.js';
import Pagination from './Pagination';
import ChangeUserRole from "../../../components/admin/ChangeUserRole.jsx";


const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const fetchAllUsers = async () => {
        try {
            const response = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });
            const data = await response.json();
            if (data.success) {
                setUsers(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageChange = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='bg-white pb-4'>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>All Users</h2>
                <input
                    type="text"
                    placeholder="Search by Name"
                    className="border-2 border-gray-300 p-2 rounded-lg w-96"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {currentUsers.length > 0 ? (
                <UserTable users={currentUsers} setSelectedUser={setSelectedUser} setOpenUpdateRole={setOpenUpdateRole} />
            ) : (
                <p className="text-center mt-2">Không tìm thấy kết quả nào.</p>
            )}
            <Pagination
                totalItems={filteredUsers.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            {openUpdateRole && (
                <ChangeUserRole
                    name={selectedUser.name}
                    email={selectedUser.email}
                    role={selectedUser.role}
                    userId={selectedUser._id}
                    onClose={() => setOpenUpdateRole(false)}
                    callFunc={fetchAllUsers}
                />
            )
            }
        </div>
    );
};

export default AllUsers;
