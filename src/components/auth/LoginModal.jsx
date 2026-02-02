import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Mail, Lock, User, ArrowLeft } from 'lucide-react';

const LoginModal = ({ isOpen, onClose }) => {
    const { signInWithSocial, signInWithEmail, signUp } = useAuth();
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('social'); // 'social', 'login', 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    if (!isOpen) return null;

    // Check for verification success from URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('verified') === 'true') {
            setSuccess('ยืนยันอีเมลสำเร็จ! กรุณาเข้าสู่ระบบ');
            setMode('login');
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [isOpen]);

    const handleSocialLogin = async (provider) => {
        setLoading(true);
        setError('');
        try {
            await signInWithSocial(provider);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            if (mode === 'signup') {
                const res = await signUp(email, password, name);
                setSuccess(res.message || 'ลงทะเบียนสำเร็จ! กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี');
                setMode('login');
                // Clear inputs
                setEmail('');
                setPassword('');
                setName('');
            } else {
                await signInWithEmail(email, password);
                onClose();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderSocialButtons = () => (
        <>
            <button
                onClick={() => handleSocialLogin('facebook')}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#1877F2] p-4 font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.603-2.797 4.16v1.957h3.696l-.533 3.667h-3.163v7.98h-5.02z" />
                </svg>
                Facebook
            </button>

            <button
                onClick={() => handleSocialLogin('google')}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-white p-4 font-semibold text-gray-900 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
            </button>

            <button
                onClick={() => handleSocialLogin('line')}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#00C300] p-4 font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.174-.51.432-.595.065-.023.133-.031.199-.031.211 0 .391.09.51.25l2.443 3.317V8.109c0-.345.279-.63.63-.63.347 0 .628.285.628.63v4.77zM24 10.388C24 4.996 18.615.63 12 .63S0 4.996 0 10.388c0 4.896 4.333 8.958 10.306 9.613l-.568 3.56c-.02.126.015.25.092.352.078.1.196.16.324.16l5.242-4.06c.205.021.412.035.62.035 6.615 0 12-4.366 12-9.66zM12 18.816c-.23 0-.46-.011-.685-.034-.145-.015-.29-.079-.396-.178l-4.576 3.543.376-2.35c.035-.219-.045-.436-.217-.582C3.125 16.92 1.258 13.9 1.258 10.388c0-4.687 4.819-8.5 10.742-8.5s10.742 3.813 10.742 8.5-4.819 8.428-10.742 8.428z" /></svg>
                LINE
            </button>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-[#1a1a1a] px-4 text-gray-500">หรือ</span>
                </div>
            </div>

            <button
                onClick={() => setMode('login')}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-brand-gray border border-white/10 p-4 font-semibold text-white transition-all hover:bg-white/5"
            >
                <Mail size={20} />
                เข้าสู่ระบบด้วยอีเมล
            </button>
        </>
    );

    const renderEmailForm = () => (
        <form onSubmit={handleEmailAuth} className="space-y-4">
            <button
                type="button"
                onClick={() => { setMode('social'); setError(''); setSuccess(''); }}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
                <ArrowLeft size={18} />
                กลับ
            </button>

            {mode === 'signup' && (
                <div>
                    <label className="block text-sm text-gray-400 mb-2">ชื่อ</label>
                    <div className="relative">
                        <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="ชื่อของคุณ"
                            className="w-full bg-black/30 border border-white/10 rounded-xl p-4 pl-12 text-white placeholder-gray-600 focus:outline-none focus:border-brand-gold/50"
                            required
                        />
                    </div>
                </div>
            )}

            <div>
                <label className="block text-sm text-gray-400 mb-2">อีเมล</label>
                <div className="relative">
                    <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-4 pl-12 text-white placeholder-gray-600 focus:outline-none focus:border-brand-gold/50"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm text-gray-400 mb-2">รหัสผ่าน</label>
                <div className="relative">
                    <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-4 pl-12 text-white placeholder-gray-600 focus:outline-none focus:border-brand-gold/50"
                        required
                        minLength={6}
                    />
                </div>
            </div>

            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {success && (
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                    {success}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-gold to-yellow-600 text-black font-bold p-4 rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50"
            >
                {loading ? 'กำลังดำเนินการ...' : mode === 'signup' ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
            </button>

            <p className="text-center text-gray-500 text-sm">
                {mode === 'signup' ? (
                    <>มีบัญชีอยู่แล้ว? <button type="button" onClick={() => setMode('login')} className="text-brand-gold hover:underline">เข้าสู่ระบบ</button></>
                ) : (
                    <>ยังไม่มีบัญชี? <button type="button" onClick={() => setMode('signup')} className="text-brand-gold hover:underline">สมัครสมาชิก</button></>
                )}
            </p>
        </form>
    );

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#1a1a1a] border border-white/10 p-8 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="mb-2 text-3xl font-bold text-white text-center font-heading">
                    {mode === 'signup' ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
                </h2>
                <p className="mb-8 text-gray-400 text-center">
                    {mode === 'social' ? 'เลือกช่องทางเพื่อดำเนินการต่อ' : 'กรอกข้อมูลด้านล่าง'}
                </p>

                <div className="space-y-4">
                    {mode === 'social' ? renderSocialButtons() : renderEmailForm()}
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
