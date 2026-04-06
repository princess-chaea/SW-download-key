import React, { useState } from 'react';
import {
    Lock,
    Download,
    Copy,
    Check,
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
            <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <FileText className="w-6 h-6 text-blue-600" />
                        통합 설치 가이드
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-all">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <div className="p-6 max-h-[75vh] overflow-y-auto space-y-8">
                    <section>
                        <h4 className="font-bold text-lg text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            Microsoft Office 설치 방법
                        </h4>
                        <ul className="space-y-3">
                            {GLOBAL_MANUAL.ms.map((step, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-bold">
                                        {idx + 1}
                                    </span>
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h4 className="font-bold text-lg text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
                            한컴오피스 설치 방법
                        </h4>
                        <ul className="space-y-3">
                            {GLOBAL_MANUAL.hancom.map((step, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 flex items-center justify-center text-[10px] font-bold">
                                        {idx + 1}
                                    </span>
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className="p-5 border-t border-slate-100 dark:border-slate-800 text-center">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-slate-800 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white rounded-xl font-bold transition-all text-sm"
                    >
                        가이드 닫기
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
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-all flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-500">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${type === 'ms' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                            {type === 'ms' ? 'Microsoft' : 'Hancom'}
                        </span>
                        <h4 className="font-bold text-slate-800 dark:text-white text-lg leading-tight">
                            {product.name}
                        </h4>
                    </div>
                    {product.url && (
                        <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-slate-50 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900 text-slate-500 dark:text-slate-300 rounded-lg transition-all"
                            title="다운로드"
                        >
                            <Download className="w-5 h-5" />
                        </a>
                    )}
                </div>

                <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">제품 키</label>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                        <code className="flex-1 text-[13px] font-mono font-bold text-slate-700 dark:text-slate-200 break-all">
                            {product.key}
                        </code>
                        <button
                            onClick={handleCopy}
                            className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                        </button>
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
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 font-sans">
                <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-10 border border-slate-200 dark:border-slate-800">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">하주초등학교</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">업무용 소프트웨어 센터</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-400 pl-1 uppercase tracking-wider">전화번호 끝 4자리 입력</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="비밀번호"
                                    className="w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-bold"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm font-bold text-center">
                                {error}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="w-full py-4 bg-slate-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all"
                        >
                            접속하기
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-16">
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <Monitor className="w-5 h-5" />
                        </div>
                        <h1 className="font-bold text-lg">하주초 업무용 SW 센터</h1>
                    </div>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="text-xs font-bold text-slate-400 hover:text-red-500 transition-all bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg"
                    >
                        로그아웃
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10">
                <div className="mb-12 text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">2026 업무용 소프트웨어</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">교직원 및 학생들을 위한 설치 가이드와 제품 키 안내 시스템입니다.</p>
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                        <button
                            onClick={() => setShowGlobalManual(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-all text-sm"
                        >
                            <FileText className="w-5 h-5" />
                            설치 방법 가이드 보기
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-800/50 rounded-xl p-4 inline-flex items-center gap-3 text-left max-w-2xl">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <p className="text-sm font-bold text-amber-800 dark:text-amber-200 leading-tight">
                            주의: 본 설치 키의 기관 외부 유출에 유의하여 주시기 바랍니다.
                        </p>
                    </div>
                </div>

                <section className="mb-16">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                        <h3 className="text-xl font-bold">Microsoft Office</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SW_DATA.microsoft.map((item, idx) => (
                            <ProductCard key={idx} product={item} type="ms" />
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-1 h-6 bg-red-600 rounded-full"></div>
                        <h3 className="text-xl font-bold">한글과컴퓨터</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SW_DATA.hancom.map((item, idx) => (
                            <ProductCard key={idx} product={item} type="han" />
                        ))}
                    </div>
                </section>
            </main>

            <footer className="text-center py-10 border-t border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-400">
                © 2026 경상북도교육청 창의인재과. All Rights Reserved.
            </footer>

            <InstallationModal
                isOpen={showGlobalManual}
                onClose={() => setShowGlobalManual(false)}
            />
        </div>
    );
}