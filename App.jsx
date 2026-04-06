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
    ChevronRight
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <FileText className="w-6 h-6 text-blue-600" />
                            통합 설치 가이드
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">소프트웨어별 설치 절차를 확인하세요.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <X className="w-6 h-6 text-slate-500" />
                    </button>
                </div>

                <div className="p-8 max-h-[75vh] overflow-y-auto space-y-10">
                    {/* MS Office Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                            <h4 className="font-bold text-lg text-blue-700 dark:text-blue-400">Microsoft Office 설치 방법</h4>
                        </div>
                        <ul className="space-y-4">
                            {GLOBAL_MANUAL.ms.map((step, idx) => (
                                <li key={idx} className="flex gap-4 group">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-200 dark:border-blue-800">
                                        {idx + 1}
                                    </span>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Hancom Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-2 h-6 bg-red-600 rounded-full"></span>
                            <h4 className="font-bold text-lg text-red-700 dark:text-red-400">한컴오피스 설치 방법</h4>
                        </div>
                        <ul className="space-y-4">
                            {GLOBAL_MANUAL.hancom.map((step, idx) => (
                                <li key={idx} className="flex gap-4 group">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold border border-red-200 dark:border-red-800">
                                        {idx + 1}
                                    </span>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-center">
                    <button
                        onClick={onClose}
                        className="px-8 py-2.5 bg-slate-800 dark:bg-blue-600 hover:bg-slate-900 dark:hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-all"
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
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black mb-3 uppercase tracking-wider shadow-sm ${type === 'ms' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'
                        }`}>
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
                        className="p-3 bg-slate-50 dark:bg-slate-700 hover:bg-blue-600 hover:text-white rounded-2xl transition-all text-slate-500 dark:text-slate-300 shadow-inner group"
                        title="다운로드 링크로 이동"
                    >
                        <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                )}
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">제품 키 / 인증코드</label>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700 group hover:border-blue-400 transition-colors">
                        <code className="flex-1 text-sm font-mono font-bold text-slate-700 dark:text-slate-200 break-all">
                            {product.key}
                        </code>
                        <button
                            onClick={handleCopy}
                            className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all shadow-sm"
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
                <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-10 border border-slate-100 dark:border-slate-800">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20 rotate-3">
                            <ShieldCheck className="w-12 h-12" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-2">하주초등학교</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">2026 업무용 SW(한컴, MS)</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                placeholder="하주초 전화번호 끝 4자리"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all dark:text-white font-bold"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm font-bold text-center animate-pulse">
                                {error}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/40 transition-all transform active:scale-95 text-lg"
                        >
                            시스템 접속
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-24">
            {/* Header */}
            <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <Monitor className="w-6 h-6" />
                        </div>
                        <h1 className="font-black text-xl tracking-tight hidden sm:block">GBE SW CENTER</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full"
                        >
                            로그아웃
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* Hero Section & Global Manual Button */}
                <div className="mb-16 text-center space-y-6">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-br from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                        2026 업무용 소프트웨어
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => setShowGlobalManual(true)}
                            className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-500/30 transition-all transform hover:-translate-y-1 active:scale-95 group"
                        >
                            <FileText className="w-6 h-6 group-hover:animate-bounce" />
                            필독! 설치 방법 가이드 보기
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4 inline-flex items-center gap-3 text-left max-w-2xl">
                        <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                        <p className="text-sm font-bold text-amber-800 dark:text-amber-200 leading-tight">
                            주의: 본 설치 키의 기관 외부 유출에 유의하여 주시기 바랍니다.
                        </p>
                    </div>
                </div>

                {/* Section Microsoft */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600">
                                <Monitor className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black">Microsoft Office</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">LTSC & O365 License</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SW_DATA.microsoft.map((item, idx) => (
                            <ProductCard key={idx} product={item} type="ms" />
                        ))}
                    </div>
                </section>

                {/* Section Hancom */}
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-50 dark:bg-red-900/30 rounded-xl flex items-center justify-center text-red-600">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black">한글과컴퓨터</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Hancom Office Edu</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SW_DATA.hancom.map((item, idx) => (
                            <ProductCard key={idx} product={item} type="han" />
                        ))}
                    </div>
                </section>

                {/* Support Footer */}
                <div className="p-10 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 text-center">
                        <h4 className="text-2xl font-black mb-4">기술 지원 및 문의</h4>
                        <p className="text-slate-400 font-medium mb-8 max-w-lg mx-auto">설치 과정에서 오류가 발생하거나 제품 키 인증에 문제가 있는 경우 기술 지원 업체로 문의하시기 바랍니다.</p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">지원 업체</p>
                                <p className="font-bold">(주)바이탈컴</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">고객 센터</p>
                                <p className="font-bold">1644-5789</p>
                            </div>
                            <a href="mailto:mktg@vitalcom.kr" className="bg-blue-600 hover:bg-blue-500 px-6 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2">
                                이메일 문의하기
                            </a>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
                </div>
            </main>

            <footer className="text-center py-12 border-t border-slate-200 dark:border-slate-800 mt-10">
                <p className="text-sm font-bold text-slate-400">© 2026 경상북도교육청 창의인재과. <br className="sm:hidden" /> All Rights Reserved.</p>
            </footer>

            {/* Global Manual Modal */}
            <InstallationModal
                isOpen={showGlobalManual}
                onClose={() => setShowGlobalManual(false)}
            />
        </div>
    );
}