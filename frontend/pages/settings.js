import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ChangePasswordForm from '@/components/Settings/ChangePasswordForm';
import PaymentHistoryPage from '@/components/Settings/PaymentHistory';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('Profile');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container mx-auto px-4 py-8 ">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/4 pr-8">
                    <h1 className="text-3xl font-semibold mb-6">Settings</h1>
                    <div className="flex flex-col space-y-4">
                        <TabItem title="Profile" activeTab={activeTab} onClick={() => handleTabClick('Profile')} />
                        <TabItem title="Change Password" activeTab={activeTab} onClick={() => handleTabClick('Change Password')} />
                        <TabItem title="Payment History" activeTab={activeTab} onClick={() => handleTabClick('Payment History')} />
                    </div>
                </div>

                {/* Content Area */}
                <div className="w-3/4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="max-w-2xl mx-auto" // Adjust the max-width here
                    >
                        {activeTab === 'Profile' && <ProfileTab />}
                        {activeTab === 'Change Password' && <ChangePasswordForm />}
                        {activeTab === 'Payment History' && <PaymentHistoryPage />}
                        {/* Add more tab components here */}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const TabItem = ({ title, activeTab, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`text-lg font-medium py-2 px-4 rounded-md ${activeTab.toLowerCase() == title.toLowerCase() ? 'bg-gray-300' : ''}  hover:bg-gray-100`}
        >
            {title}
        </button>
    );
};

const ProfileTab = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded-md p-2" />
            </div>
            {/* Add more profile settings here */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save Changes</button>
        </div>
    );
};


export default SettingsPage;
