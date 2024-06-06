 import moment from 'moment';
import { MdModeEdit } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const UserTable = ({ users, setSelectedUser, setOpenUpdateRole }) => {
    return (
        <div className="overflow-x-auto">
            <table className='min-w-full leading-normal'>
                <thead>
                <tr className='bg-black text-white'>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                        Sr.
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                        Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                        Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                        Role
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                        Created Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {/* eslint-disable-next-line react/prop-types */}
                {users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-100">
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {index + 1}
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {user.name}
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {user.email}
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {user.role}
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            {moment(user.createdAt).format('L')}
                        </td>
                        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                            <button
                                className='bg-green-500 p-2 rounded-full text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50'
                                onClick={() => {
                                    setSelectedUser(user);
                                    setOpenUpdateRole(true);
                                }}
                            >
                                <MdModeEdit />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
