import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../components/common/Input';
import { UserIcon, LockIcon, IdCardIcon, EnvelopeIcon } from '../components/icons';
import { Eye, EyeOff } from 'lucide-react';

const RegisterPage: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [gmail, setGmail] = useState('');
    const [mssv, setMssv] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<'student' | 'high_school_student'>('student');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        try {
            const body = { fullName, gmail, password, role, ...(role === 'student' && { mssv }) };
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Đăng ký thất bại');
            }

            setSuccess('Đăng ký thành công! Đang chuyển đến trang đăng nhập...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Lỗi không xác định');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            className="bg-white dark:bg-slate-800 w-full max-w-md p-8 md:p-12 rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-around p-1 bg-gray-100 dark:bg-slate-700 rounded-lg">
                    <button type="button" onClick={() => setRole('student')} className={`w-1/2 py-2 rounded-md text-sm font-medium transition-all ${role === 'student' ? 'bg-white dark:bg-slate-900 shadow text-slate-800 dark:text-white' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-600'}`}>
                        Sinh viên
                    </button>
                    <button type="button" onClick={() => setRole('high_school_student')} className={`w-1/2 py-2 rounded-md text-sm font-medium transition-all ${role === 'high_school_student' ? 'bg-white dark:bg-slate-900 shadow text-slate-800 dark:text-white' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-600'}`}>
                        Học sinh
                    </button>
                </div>

                <Input
                    id="fullName"
                    label="Full Name"
                    type="text"
                    placeholder="Type your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    icon={<UserIcon className="w-5 h-5" />}
                />
                <Input
                    id="gmail"
                    label="Email"
                    type="email"
                    placeholder="Type your email"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                    icon={<EnvelopeIcon className="w-5 h-5" />}
                />
                
                <AnimatePresence>
                {role === 'student' && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }} 
                        animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem' }} 
