import React, { useState } from 'react';
import {
    Lock,
    Download,
    Copy,
    Check,
    Info,
    Monitor,
    ShieldCheck,
    AlertCircle,
    X,
    FileText,
    ChevronRight,
    Eye,
    EyeOff
} from 'lucide-react';

// 공통 데이터 관리
const SW_DATA = {
    microsoft: [
        {
            name: "Office LTSC Professional Plus 2024",
            url: "https://gbe365-my.sharepoint.com/:u:/g/personal/sw_365_gyo6_net/IQDHOBV8Gn4MTYQX5vqxwZQxAT4mKYEccHFW3pSj36h-t9A",
            key: "TFKMN-Y99YY-JD8TX-2P9T6-J2VGD",
        },
        {
            name: "Office Professional Plus 2021",
            url: "https://gbe365-my.sharepoint.com/:u:/g/personal/sw_365_gyo6_net/IQA8B2Xc4IVKQbNaoi_e6H2uARPHvD96zf_ykHz-RGh-l8U",
            key: "3NPV9-QT2CB-TJ37M-JF9Y2-XTR2X",
        },
        {
            name: "Office Professional Plus 2019",
            url: "https://gbe365-my.sharepoint.com/:u:/g/personal/sw_365_gyo6_net/IQAcXsPdwl9cRLii8co3IIFAAbxWXWeaZ7-dD4zTqnK5G-A",
            key: "G2PYD-NPBPG-9B976-QY6GK-TF6T3",
        },
        {
            name: "Office 365(교직원용)",
            key: "406BE-29743-F1944-B80A6",
        },
        {
            name: "Office 365(학생용)",
            key: "CE567-B89ED-57794-3AF34",
        }
    ],
    hancom: [
        {
            name: "한컴오피스 2024 Edu",
            url: "https://gbe365-my.sharepoint.com/:u:/g/personal/sw_365_gyo6_net/IQDeJPF6lTSWQaD3i50uXHnbAV_pQQa-KxA7djdEySHp0Fg",
            key: "DVH6H-64YTR-E9WF3-YA8CU",
        },
        {
            name: "한컴오피스 2022 Edu",
            url: "https://gbe365-my.sharepoint.com/:u:/g/personal/sw_365_gyo6_net/IQBvCfCInIBFRrOP0TB6G-0pAR_OpvOEBUeHWX9jkmkGPgU",
            key: "DVH4H-A4YTR-E9WEW-9P6U3",
        },
        {
            name: "한컴오피스 2020 Edu",
            url: "https://gbe365-my.sharepoint.com/:u:/g/personal/sw_365_gyo6_net/IQDingHInzeRTLOMEt81tg-IASqMCgX2EiqGXk7n6-OltwI",
            key: "DVH2H-24YTR-Z9W7X-6M6C2",
        }
    ]
};

// 통합 메뉴얼 데이터
const GLOBAL_MANUAL = {
    ms: [
        "Windows 10 이상 운영체제인지 확인합니다.",
        "설치 전 이전 버전 Office(2010~2016 등)를 반드시 삭제합니다.",
        "다운로드 링크 접속 후 '장치에 이 파일 다운로드'를 선택합니다.",
        "ZIP 파일을 C 드라이브 루트로 이동합니다. (경로에 한글 포함 시 오류 발생 주의)",
        "압축 해제 후 Setup.bat 파일을 '관리자 권한'으로 실행합니다.",
        "설치 완료 후 Excel/PowerPoint 실행 - 파일 - 계정 - 키 변경에서 제품키를 입력합니다."
    ],
    hancom: [
        "다운로드 링크에서 설치 파일을 내려받습니다.",
        "기존 버전과의 충돌 방지를 위해 구버전은 삭제 후 설치를 권장합니다.",
        "설치 프로그램을 실행하고 제공된 제품 키를 입력 단계에서 기입합니다.",
        "설치 완료 후 시스템을 재시작하여 정상 작동을 확인합니다."
    ]
};

const InstallationModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl transition-all">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in slide-in-from-bottom-8 duration-300 border border-white/20 dark:border-slate-800">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                            <FileText className="w-7 h-7 text-blue-600" />
                            통합 설치 가이드
                        </h3>
                        <p className="text-sm text-slate-500 mt-1.5 font-medium">소프트웨어별 설치 절차를 단계별로 안내해 드립니다.</p>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-all active:scale-90 bg-white dark:bg-slate-800 shadow-sm">
                        <X className="w-6 h-6 text-slate-500" />
                    </button>
                </div>

                <div className="p-8 md:p-12 max-h-[70vh] overflow-y-auto space-y-12 scrollbar-hide">
                    {/* MS Office Section */}
                    <section className="relative">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-3 h-8 bg-blue-600 rounded-full shadow-lg shadow-blue-500/20"></div>
                            <h4 className="font-black text-xl md:text-2xl text-slate-800 dark:text-blue-400">Microsoft Office 설치 방법</h4>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {GLOBAL_MANUAL.ms.map((step, idx) => (
                                <li key={idx} className="flex gap-4 p-5 bg-blue-50/30 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-800/30 group hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all duration-300">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-blue-500/30">
                                        {idx + 1}
                                    </span>
                                    <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base font-semibold leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Hancom Section */}
                    <section className="relative">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-3 h-8 bg-red-600 rounded-full shadow-lg shadow-red-500/20"></div>
                            <h4 className="font-black text-xl md:text-2xl text-slate-800 dark:text-red-400">한컴오피스 설치 방법</h4>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {GLOBAL_MANUAL.hancom.map((step, idx) => (
                                <li key={idx} className="flex gap-4 p-5 bg-red-50/30 dark:bg-red-900/10 rounded-2xl border border-red-100/50 dark:border-red-800/30 group hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all duration-300">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-red-500/30">
                                        {idx + 1}
                                    </span>
                                    <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base font-semibold leading-relaxed group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
                    <button
                        onClick={onClose}
                        className="w-full md:w-auto px-12 py-4 bg-slate-900 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white rounded-2xl font-black shadow-2xl shadow-blue-500/30 transition-all transform hover:-translate-y-1 active:scale-95 text-lg"
                    >
                        가이드 확인 완료
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProductCard = ({ product, type }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const tempInput = document.createElement('input');
        tempInput.value = product.key;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 dark:border-slate-700/50 p-8 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${type === 'ms' ? 'bg-blue-600 text-white border-blue-400' : 'bg-red-600 text-white border-red-400'
                            }`}>
                            {type === 'ms' ? 'Microsoft' : 'Hancom'}
                        </span>
                        <h4 className="font-black text-slate-800 dark:text-white text-xl leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pt-2">
                            {product.name}
                        </h4>
                    </div>
                    {product.url && (
                        <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 bg-slate-50 dark:bg-slate-700 hover:bg-blue-600 hover:text-white rounded-2xl transition-all text-slate-500 dark:text-slate-300 shadow-inner group/icon"
                            title="다운로드 링크로 이동"
                        >
                            <Download className="w-6 h-6 group-hover/icon:scale-110 transition-transform" />
                        </a>
                    )}
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 ml-1">제품 키 / 인증코드</label>
                        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-700 group hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-inner">
                            <code className="flex-1 text-sm md:text-base font-mono font-black text-slate-700 dark:text-slate-200 break-all select-all">
                                {product.key}
                            </code>
                            <button
                                onClick={handleCopy}
                                className="p-2.5 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm active:scale-90"
                            >
                                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-slate-400" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function App() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [showGlobalManual, setShowGlobalManual] = useState(false);

    const CORRECT_PASSWORD = '8868';

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('비밀번호가 올바르지 않습니다.');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-800/5 rounded-full blur-[100px] pointer-events-none animate-pulse delay-1000"></div>

                <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] p-10 md:p-16 border border-slate-100 dark:border-slate-800 flex flex-col relative z-10 scale-in-center">
                    <div className="text-center mb-12">
                        <div className="w-24 h-24 bg-blue-600 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/40 rotate-6 transform hover:rotate-0 transition-transform duration-500">
                            <ShieldCheck className="w-14 h-14" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-3 tracking-tighter">하주초등학교</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">2026 업무용 SW 관리 센터</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">전화번호 끝 4자리 입력</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="비밀번호"
                                    className="w-full pl-14 pr-14 py-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-3xl focus:ring-8 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all dark:text-white font-black text-xl placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-inner"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all text-slate-400"
                                >
                                    {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl border border-red-100 dark:border-red-900/50 flex items-center justify-center gap-2 animate-bounce">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <p className="text-red-500 text-sm font-black text-center">
                                    {error}
                                </p>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full py-5 bg-slate-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white font-black rounded-3xl shadow-2xl shadow-blue-500/20 transition-all transform active:scale-95 text-xl flex items-center justify-center gap-3"
                        >
                            시스템 접속하기
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </form>
                </div>

                <footer className="mt-12 text-slate-400 text-sm font-black tracking-widest text-center relative z-10">
                    © 2026 GBE SW CENTER. ALL RIGHTS RESERVED.
                </footer>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-24 transition-colors">
            {/* Header */}
            <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-b border-slate-100 dark:border-slate-800 sticky top-0 z-40 transition-all">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 transform hover:rotate-3 transition-transform">
                            <Monitor className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="font-black text-xl md:text-2xl tracking-tighter">GBE SW CENTER</h1>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:block">Creative Talent Education Division</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex items-center gap-6 text-sm font-black text-slate-500 mr-4">
                            <a href="#" className="hover:text-blue-600 transition-colors">서비스 정보</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">업무 매뉴얼</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">기술 지원</a>
                        </div>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="text-xs md:text-sm font-black text-slate-500 hover:text-red-500 transition-all bg-slate-100 dark:bg-slate-800 px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 active:scale-95"
                        >
                            로그아웃
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-8 md:px-12 py-16 lg:py-24">
                {/* Hero Section & Global Manual Button */}
                <div className="mb-20 lg:mb-32 text-center space-y-10 max-w-4xl mx-auto">
                    <div className="space-y-4">
                        <span className="inline-block px-5 py-2 bg-blue-600/10 text-blue-600 rounded-full text-sm font-black tracking-widest uppercase mb-4 shadow-sm border border-blue-200/50">2026 OFFICIAL HUB</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-br from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent leading-[1.1] tracking-tighter">
                            하주초등학교<br />업무용 소프트웨어 센터
                        </h2>
                        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed">
                            교직원 및 학생들을 위한 한컴오피스, MS 오피스 정품 소프트웨어 설치 가이드와 제품 키를 안전하게 제공합니다.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                        <button
                            onClick={() => setShowGlobalManual(true)}
                            className="w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black shadow-2xl shadow-blue-500/30 transition-all transform hover:-translate-y-2 active:scale-95 group text-lg"
                        >
                            <FileText className="w-7 h-7 group-hover:animate-bounce" />
                            통합 설치 가이드 확인하기
                            <ChevronRight className="w-5 h-5 flex-shrink-0" />
                        </button>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left max-w-3xl mx-auto shadow-sm">
                        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0 shadow-sm border border-amber-200/30">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">저작권 및 보안 주의사항</p>
                            <p className="text-sm md:text-base font-black text-amber-800 dark:text-amber-200 leading-tight">
                                본 설치 키는 기관 전용 라이선스로 외부 유출 시 법적 책임이 발생할 수 있습니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section Microsoft */}
                <section className="mb-32">
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
                        <div className="flex items-center gap-5 text-center md:text-left">
                            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center text-blue-600 shadow-inner border border-blue-100 dark:border-blue-800">
                                <Monitor className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-3xl lg:text-4xl font-black tracking-tight">Microsoft Office</h3>
                                <p className="text-xs lg:text-sm text-slate-400 font-black uppercase tracking-[0.3em] mt-1.5">LTSC & O365 License</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-black text-slate-500">
                            총 {SW_DATA.microsoft.length}개의 라이선스 사용 가능
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {SW_DATA.microsoft.map((item, idx) => (
                            <ProductCard key={idx} product={item} type="ms" />
                        ))}
                    </div>
                </section>

                {/* Section Hancom */}
                <section className="mb-32">
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
                        <div className="flex items-center gap-5 text-center md:text-left">
                            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 rounded-3xl flex items-center justify-center text-red-600 shadow-inner border border-red-100 dark:border-red-800">
                                <FileText className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-3xl lg:text-4xl font-black tracking-tight">한글과컴퓨터</h3>
                                <p className="text-xs lg:text-sm text-slate-400 font-black uppercase tracking-[0.3em] mt-1.5">Hancom Office Edu</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-black text-slate-500">
                            총 {SW_DATA.hancom.length}개의 라이선스 사용 가능
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {SW_DATA.hancom.map((item, idx) => (
                            <ProductCard key={idx} product={item} type="han" />
                        ))}
                    </div>
                </section>

                {/* Support Footer */}
                <div className="p-12 md:p-20 bg-gradient-to-br from-slate-900 via-slate-800 to-black dark:from-slate-900 dark:via-black dark:to-slate-900 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group">
                    <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[100%] bg-blue-600/10 rounded-full blur-[120px] transition-all group-hover:bg-blue-600/20 duration-1000"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[100%] bg-blue-800/10 rounded-full blur-[100px] transition-all group-hover:bg-blue-800/20 duration-1000"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="text-center lg:text-left space-y-6 max-w-2xl">
                            <h4 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">기술 지원 및 인증 문의</h4>
                            <p className="text-slate-400 font-bold text-lg leading-relaxed">
                                설치 과정에서 오류가 발생하거나 제품 키 인증에 문제가 있는 경우 전문 지원 업체를 통해 신속하게 해결하실 수 있습니다.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-blue-400">지원 시간: 09:00 - 18:00</span>
                                <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-blue-400">평일(주말/공휴일 제외)</span>
                            </div>
                        </div>

                        <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white/5 backdrop-blur-2xl px-8 py-8 rounded-[2.5rem] border border-white/10 shadow-2xl hover:bg-white/10 transition-all group/info">
                                <p className="text-[10px] uppercase font-black text-slate-500 mb-2 tracking-[0.3em]">Official Partner</p>
                                <p className="text-xl md:text-2xl font-black group-hover:text-blue-400 transition-colors">(주)바이탈컴</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-2xl px-8 py-8 rounded-[2.5rem] border border-white/10 shadow-2xl hover:bg-white/10 transition-all group/info">
                                <p className="text-[10px] uppercase font-black text-slate-500 mb-2 tracking-[0.3em]">Technical Support</p>
                                <p className="text-xl md:text-2xl font-black group-hover:text-blue-400 transition-colors">1644-5789</p>
                            </div>
                            <a href="mailto:mktg@vitalcom.kr" className="sm:col-span-2 bg-blue-600 hover:bg-blue-500 px-8 py-6 rounded-[2.5rem] font-black shadow-2xl shadow-blue-500/40 transition-all flex items-center justify-center gap-4 text-xl transform hover:-translate-y-2 active:scale-95">
                                <FileText className="w-6 h-6" />
                                이메일로 기술 지원 요청하기
                                <ChevronRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="text-center py-16 border-t border-slate-200 dark:border-slate-800 mt-20">
                <div className="max-w-4xl mx-auto px-8 flex flex-col items-center gap-6">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm md:text-base font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.4em]">
                            Gyeongsangbuk-do Office of Education
                        </p>
                        <p className="text-xs font-bold text-slate-400">
                            © 2026 경상북도교육청 창의인재과. All Rights Reserved.
                        </p>
                    </div>
                    <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 mt-4">
                        <a href="#" className="hover:text-slate-600 transition-colors">개인정보처리방침</a>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <a href="#" className="hover:text-slate-600 transition-colors">라이선스 규정</a>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <a href="#" className="hover:text-slate-600 transition-colors">사용자 약관</a>
                    </div>
                </div>
            </footer>

            {/* Global Manual Modal */}
            <InstallationModal
                isOpen={showGlobalManual}
                onClose={() => setShowGlobalManual(false)}
            />
        </div>
    );
}