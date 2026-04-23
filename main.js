const loginForm = document.querySelector("#login-form");
const loginPage = document.querySelector("#login-page");
const dashboardPage = document.querySelector("#dashboard-page");
const loginMessage = document.querySelector("#login-message");
const registerForm = document.querySelector("#register-form");
const registerMessage = document.querySelector("#register-message");
const openRegisterButton = document.querySelector("#open-register-button");
const registerLink = document.querySelector("#register-link");
const loginUserIdInput = loginForm?.querySelector('input[name="userId"]') || null;
const loginPasswordInput = loginForm?.querySelector('input[name="password"]') || null;
const rememberIdCheckbox = loginForm?.querySelector('input[name="rememberId"]') || null;
const loginSubmitButton = loginForm?.querySelector('button[type="submit"]') || null;
const registerUserIdInput = registerForm?.querySelector('input[name="userId"]') || null;
const registerPasswordInput = registerForm?.querySelector('input[name="password"]') || null;
const registerConfirmPasswordInput =
  registerForm?.querySelector('input[name="confirmPassword"]') || null;
const registerSubmitButton = registerForm?.querySelector('button[type="submit"]') || null;
const logoutButton = document.querySelector("#logout-button");
const modeButtons = Array.from(document.querySelectorAll("[data-mode]"));
const navItems = Array.from(document.querySelectorAll(".app-nav-item"));
const studentManagementNavItem = document.querySelector("#student-management-nav");
const studentDeleteForm = document.querySelector("#student-delete-form");
const studentManagementPanel = document.querySelector("#student-management-panel");
const studentManagementMessage = document.querySelector("#student-management-message");
const studentManagementLogList = document.querySelector("#student-management-log-list");
const studentManagementUserList = document.querySelector("#student-management-user-list");
const appRoleSubtitle = document.querySelector("#app-role-subtitle");
const heroPanel = document.querySelector("#hero-panel");
const noticeCard = document.querySelector("#notice-card");
const heroKicker = document.querySelector("#hero-kicker");
const heroTitle = document.querySelector("#hero-title");
const heroDescription = document.querySelector("#hero-description");
const heroNoticeList = document.querySelector("#hero-notice-list");
const operationsCard = document.querySelector("#operations-card");
const operationsKicker = document.querySelector("#operations-kicker");
const operationsMetrics = document.querySelector("#operations-metrics");
const heroActions = document.querySelector("#hero-actions");
const statusGrid = document.querySelector("#status-grid");
const dashboardView = document.querySelector("#dashboard-view");
const pointsView = document.querySelector("#points-view");
const tokenView = document.querySelector("#token-view");
const studentManagementView = document.querySelector("#student-management-view");
const tokenMarketPanel = document.querySelector("#token-market-panel");
const placeholderView = document.querySelector("#placeholder-view");
const placeholderPanel = document.querySelector("#placeholder-panel");
const placeholderKicker = document.querySelector("#placeholder-kicker");
const placeholderTitle = document.querySelector("#placeholder-title");
const placeholderText = document.querySelector("#placeholder-text");
const noticeAdminPanel = document.querySelector("#notice-admin-panel");
const noticeAdminEditor = document.querySelector("#notice-admin-editor");
const noticeForm = document.querySelector("#notice-form");
const noticeMessage = document.querySelector("#notice-message");
const operationsAdminPanel = document.querySelector("#operations-admin-panel");
const operationsForm = document.querySelector("#operations-form");
const operationsMessage = document.querySelector("#operations-message");
const adminNoticeList = document.querySelector("#admin-notice-list");
const governancePanel = document.querySelector("#governance-panel");
const governanceAdminPanel = document.querySelector("#governance-admin-panel");
const governanceStudentPanel = document.querySelector("#governance-student-panel");
const governanceList = document.querySelector("#governance-list");
const governanceEarnButton = document.querySelector("#governance-earn-button");
const pollForm = document.querySelector("#poll-form");
const pollMessage = document.querySelector("#poll-message");
const paymentLabel = document.querySelector("#payment-label");
const pointsLabel = document.querySelector("#points-label");
const tokenLabel = document.querySelector("#token-label");
const pointsValue = document.querySelector("#points-value");
const pointsMeta = document.querySelector("#points-meta");
const tokenValue = document.querySelector("#token-value");
const tokenMeta = document.querySelector("#token-meta");
const paymentStatus = document.querySelector("#payment-status");
const paymentButton = document.querySelector("#payment-btn");
const calendarMonthLabel = document.querySelector("#calendar-month-label");
const calendarGrid = document.querySelector("#calendar-grid");
const calendarPrevButton = document.querySelector("#calendar-prev-button");
const calendarNextButton = document.querySelector("#calendar-next-button");
const pointsHistoryList = document.querySelector("#points-history-list");
const pointsHistoryTotal = document.querySelector("#points-history-total");
const pointsPanelKicker = document.querySelector("#points-panel-kicker");
const pointsPanelTitle = document.querySelector("#points-panel-title");
const confirmModal = document.querySelector("#confirm-modal");
const confirmModalMessage = document.querySelector("#confirm-modal-message");
const confirmModalConfirmButton = document.querySelector("#confirm-modal-confirm");
const confirmModalCancelButton = document.querySelector("#confirm-modal-cancel");
const governanceApiUrl =
  window.APP_GOVERNANCE_API_URL ||
  (window.location.hostname.endsWith(".pages.dev") ? window.location.origin : "");
const today = new Date();
const highlightedMonth = today.getFullYear() === 2026 ? today.getMonth() : -1;
const highlightedDay = today.getFullYear() === 2026 ? today.getDate() : -1;
const notableCalendarItems = [
  { month: 0, day: 1, label: "신정", type: "holiday" },
  { month: 1, day: 16, label: "설날 연휴", type: "holiday" },
  { month: 1, day: 17, label: "설날", type: "holiday" },
  { month: 1, day: 18, label: "설날 연휴", type: "holiday" },
  { month: 2, day: 1, label: "삼일절", type: "holiday" },
  { month: 2, day: 2, label: "삼일절 대체공휴일", type: "holiday" },
  { month: 4, day: 5, label: "어린이날", type: "holiday" },
  { month: 4, day: 7, label: "해맞이 한마당", type: "event" },
  { month: 4, day: 8, label: "해맞이 한마당", type: "event" },
  { month: 4, day: 24, label: "부처님오신날", type: "holiday" },
  { month: 4, day: 25, label: "대체공휴일", type: "holiday" },
  { month: 5, day: 6, label: "현충일", type: "holiday" },
  { month: 7, day: 15, label: "광복절", type: "holiday" },
  { month: 7, day: 17, label: "광복절 대체공휴일", type: "holiday" },
  { month: 8, day: 18, label: "포카전", type: "event" },
  { month: 8, day: 19, label: "포카전", type: "event" },
  { month: 8, day: 24, label: "추석 연휴", type: "holiday" },
  { month: 8, day: 25, label: "추석", type: "holiday" },
  { month: 8, day: 26, label: "추석 연휴", type: "holiday" },
  { month: 9, day: 3, label: "개천절", type: "holiday" },
  { month: 9, day: 5, label: "개천절 대체공휴일", type: "holiday" },
  { month: 9, day: 9, label: "한글날", type: "holiday" },
  { month: 11, day: 25, label: "크리스마스", type: "holiday" }
];

const placeholderCopy = {
  student: {
    tokens: {
      title: "토큰 화면 설계 예정",
      text: "거버넌스 토큰 적립, 사용, 소각 흐름을 이 메뉴에서 분리해 설계할 예정입니다."
    },
    market: {
      title: "세컨더리 마켓 설계 예정",
      text: "거래 보드, AMM 시세, 구매 전환 흐름을 이 메뉴에서 구체화할 예정입니다."
    },
    governance: {
      title: "거버넌스 설계 예정",
      text: "예산 투표, 안건 제안, 토큰 소각 규칙을 이 메뉴에서 구체화할 예정입니다."
    },
    rental: {
      title: "대여사업 설계 예정",
      text: "대여 가능 자산, 예약 상태, 납부자 우선권 흐름을 이 메뉴에서 구체화할 예정입니다."
    }
  },
  admin: {
    points: {
      title: "포인트 정책 관리",
      text: "학생회비 납부 리워드, 행사 사용 포인트, 차감 기준을 관리자 화면에서 조정할 수 있습니다."
    },
    tokens: {
      title: "행사 운영 관리",
      text: "행사 체크인, 참여권 재고, 운영 현황을 관리자 권한으로 확인하고 조정할 수 있습니다."
    },
    market: {
      title: "공지 관리",
      text: "이 메뉴에서 학생에게 노출할 공지를 등록하고 삭제할 수 있습니다."
    },
    governance: {
      title: "거버넌스 안건 관리",
      text: "투표 일정, 안건 공개 여부, 토큰 소각 정책을 관리자 권한으로 검토할 수 있습니다."
    },
    rental: {
      title: "대여사업 운영",
      text: "대여 가능 자산 수량과 예약 상태를 관리자 기준으로 모니터링할 수 있습니다."
    }
  }
};

let noticeItems = [];
let operationsItems = [];
let operationsTitle = "";
const NOTICE_STORAGE_KEY = "postech_notice_items";
const POLL_STORAGE_KEY = "postech_governance_polls";
const REMEMBER_ID_STORAGE_KEY = "postech_remembered_user_id";
const INITIAL_OPERATIONS_TITLE = "25-1 예산 집행 현황";
const INITIAL_OPERATIONS_ITEMS = [
  { label: "비조천 행사비", value: 72, tone: "magenta" },
  { label: "교복제 행사비", value: 50, tone: "amber" },
  { label: "운영비", value: 31, tone: "gray" }
];
const INITIAL_TOKEN_MARKET_STATE = {
  pointReserve: 24000,
  eventTokenReserve: 12,
  userEventTokens: 0,
  pointDelta: 0,
  purchaseHistory: [],
  eventPurchases: []
};
const SECONDARY_MARKET_MULTIPLIER = 1.55;

const roleConfigs = {
  student: {
    subtitle: "학생 모드",
    heroKicker: "학생 서비스",
    heroTitle: "공지사항",
    heroDescription: "학생에게 노출되는 최신 공지 목록입니다.",
    labels: {
      payment: "납부 여부",
      points: "포인트",
      token: "거버넌스 토큰"
    },
    nav: {
      dashboard: "Home",
      points: "Assets",
      market: "Market",
      governance: "Vote",
      rental: "Rent"
    },
    showModeButtons: true,
    defaultMode: "payer"
  },
  admin: {
    subtitle: "관리자 모드",
    heroKicker: "운영 대시보드",
    heroTitle: "학생회비 및 운영 현황 관리자 화면",
    heroDescription: "관리자는 납부 현황, 누적 포인트 지급, 행사 운영 상태를 한 화면에서 점검하고 관리 작업으로 이동할 수 있습니다.",
    labels: {
      payment: "납부 현황",
      points: "총 지급 포인트",
      token: "운영 토큰"
    },
    nav: {
      points: "포인트 관리",
      tokens: "행사 운영",
      market: "공지 관리",
      governance: "투표 관리",
      rental: "대여 관리",
      students: "학생 관리"
    },
    showModeButtons: false,
    defaultMode: "payer"
  }
};

const scenarios = {
  payer: {
    code: "12-1",
    title: "납부자 경험 설계",
    calendarEvents: [
      { day: 4, label: "학생회비 납부 시작", tone: "paid" },
      { day: 12, label: "봄축제 체크인", tone: "benefit" },
      { day: 18, label: "대여사업 오픈", tone: "benefit" },
      { day: 25, label: "예산 투표", tone: "governance" }
    ],
    steps: [
      {
        title: "01 앱 접속 및 학번 인증",
        description: "포스텍 학번으로 로그인. 내 캐릭터, 등급, 포인트, 거버넌스 토큰 현황이 메인 화면에 표시.",
        actionLabel: "학번 인증 반영",
        apply(state) {
          state.paymentStatus = "납부 대기";
          state.paymentMeta = "31,000원 납부 전";
        }
      },
      {
        title: "02 31,000원 납부",
        description: "앱 내 결제. 즉시 31,000포인트 지급 + 기본 캐릭터 해금.",
        actionLabel: "31,000원 납부 처리",
        apply(state) {
          state.paymentStatus = "납부 완료";
          state.paymentMeta = "31,000포인트 지급 완료";
          state.points = 31000;
          state.character = "기본 캐릭터";
          state.grade = "브론즈 등급";
          state.avatar = "P1";
          state.pointHistory.push({
            title: "학생회비 납부 리워드 지급",
            date: "2026.04.04",
            amount: 31000,
            type: "earn"
          });
        }
      },
      {
        title: "03 행사 참여 + 거버넌스 토큰 획득",
        description: "QR 체크인으로 행사 참여. 포인트 차감 + 거버넌스 토큰 1개 자동 지급. 추가 혜택 포인트로 구매 가능.",
        actionLabel: "행사 체크인 실행",
        apply(state) {
          state.points -= 4000;
          state.tokens += 1;
          state.market = "1.32x";
          state.pointsMeta = "행사 참여로 4,000P 사용";
          state.pointHistory.push({
            title: "봄축제 참여권 사용",
            date: "2026.04.12",
            amount: -4000,
            type: "use"
          });
        }
      },
      {
        title: "04 대여사업 이용",
        description: "프린터, 계산기, 우산, 돗자리, 노래방 앱 예약 후 무제한 이용. 거버넌스 토큰 1개 지급.",
        actionLabel: "대여사업 이용 처리",
        apply(state) {
          state.tokens += 1;
          state.rental = "이용 가능";
          state.pointsMeta = "대여사업 활성화";
        }
      },
      {
        title: "05 세컨더리 마켓 모니터링",
        description: "공개 정보 분석. 못 가는 행사 토큰을 수요 높을 때 매도해 차익 실현.",
        actionLabel: "세컨더리 마켓 분석",
        apply(state) {
          state.market = "1.68x";
          state.points += 2500;
          state.pointsMeta = "토큰 매도로 2,500P 회수";
          state.pointHistory.push({
            title: "세컨더리 마켓 정산",
            date: "2026.04.16",
            amount: 2500,
            type: "earn"
          });
        }
      },
      {
        title: "06 잔여 포인트 운용",
        description: "캐릭터 아이템 / PSI ETF 투자 / 거버넌스 토큰 전환 / 이월 (다음 학기 납부 조건).",
        actionLabel: "포인트 운용 반영",
        apply(state) {
          state.points -= 6000;
          state.carry = "이월 후보";
          state.character = "확장 캐릭터";
          state.avatar = "P2";
          state.pointHistory.push({
            title: "캐릭터 아이템 및 ETF 운용",
            date: "2026.04.20",
            amount: -6000,
            type: "use"
          });
        }
      },
      {
        title: "07 예산 투표 참여",
        description: "보유 거버넌스 토큰으로 다음 학기 행사별 예산 비중 조율. 투표 시 토큰 소각.",
        actionLabel: "예산 투표 실행",
        apply(state) {
          state.vote = "참여 완료";
          state.tokens = Math.max(0, state.tokens - 1);
          state.tokenMeta = "투표 시 1개 소각";
        }
      },
      {
        title: "08 등급 및 캐릭터 성장 확인",
        description: "연속 납부 + 행사 참여 + 포인트 소진으로 등급 상승, 캐릭터 성장. 이탈 시 감쇠.",
        actionLabel: "최종 성장 반영",
        apply(state) {
          state.grade = "실버 등급";
          state.character = "성장 캐릭터";
          state.avatar = "P3";
          state.paymentMeta = "연속 납부 유지";
        }
      }
    ]
  },
  nonpayer: {
    code: "12-2",
    title: "미납부자 전환 설계",
    calendarEvents: [
      { day: 6, label: "비교 배너 노출", tone: "alert" },
      { day: 11, label: "행사권 시세 상승", tone: "alert" },
      { day: 19, label: "전환 혜택 안내", tone: "paid" },
      { day: 24, label: "납부 전환 마감", tone: "governance" }
    ],
    steps: [
      {
        title: "01 앱 접속",
        description: "미납부 상태 표시. 다른 납부자들의 캐릭터 확인 가능. 납부 전환 안내 배너 노출.",
        actionLabel: "미납부 상태 표시",
        apply(state) {
          state.paymentStatus = "미납부";
          state.paymentMeta = "전환 안내 배너 노출";
          state.character = "미납부 관찰자";
          state.grade = "게스트";
          state.avatar = "N1";
        }
      },
      {
        title: "02 세컨더리 마켓 접근",
        description: "현재 거래 중인 행사 참여권 목록과 실시간 AMM 시세 확인.",
        actionLabel: "AMM 보드 열기",
        apply(state) {
          state.market = "1.55x";
          state.pointsMeta = "시장 접근 전용 모드";
        }
      },
      {
        title: "03 참여권 구매",
        description: "납부자 단가의 1.5~1.6배에 구매. AMM 수요에 따라 실시간 변동.",
        actionLabel: "참여권 구매",
        apply(state) {
          state.points = -18000;
          state.market = "1.62x";
          state.paymentMeta = "행사권 구매 비용 증가";
          state.pointHistory.push({
            title: "행사 참여권 구매",
            date: "2026.04.11",
            amount: -18000,
            type: "use"
          });
        }
      },
      {
        title: "04 납부 전환 유도",
        description: "구매 시마다 납부 대비 비용 비교 안내. 납부 전환 버튼으로 즉시 전환 가능.",
        actionLabel: "비용 비교 안내 반영",
        apply(state) {
          state.carry = "납부 전환 권장";
          state.vote = "전환 필요";
          state.pointsMeta = "납부 대비 손익 비교 노출";
        }
      },
      {
        title: "05 납부 전환 결정",
        description: "행사 2개 이상 + ETF + 캐릭터 + 거버넌스 원하면 납부가 합리적 선택.",
        actionLabel: "납부 전환 설계 반영",
        apply(state) {
          state.paymentStatus = "납부 전환";
          state.paymentMeta = "합리적 선택으로 전환 완료";
          state.points = 13000;
          state.tokens = 1;
          state.character = "전환 캐릭터";
          state.grade = "입문 등급";
          state.avatar = "N2";
          state.rental = "전환 후 가능";
          state.pointHistory.push({
            title: "납부 전환 후 포인트 지급",
            date: "2026.04.19",
            amount: 31000,
            type: "earn"
          });
        }
      }
    ]
  }
};

const baseState = {
  points: 0,
  tokens: 0,
  character: "기본 캐릭터",
  grade: "브론즈 등급",
  avatar: "P1",
  paymentStatus: "미납부",
  paymentMeta: "전환 전 안내 배너 노출",
  market: "1.55x",
  rental: "잠김",
  vote: "불가",
  carry: "대기",
  pointsMeta: "잔여 포인트",
  tokenMeta: "행사 참여 / 대여 시 지급",
  pointHistory: []
};

let currentMode = "payer";
let currentView = "dashboard";
let currentRole = "student";
let currentUserId = "";
let currentCalendarMonth = highlightedMonth >= 0 ? highlightedMonth : 3;
let activeStepIndex = 0;
let completedSteps = new Set();
let state = { ...baseState };
let paymentState = {
  studentPaid: false,
  paidAt: ""
};
let adminStudentStats = {
  totalStudents: 0,
  totalPaidStudents: 0,
  totalGrantedPoints: 0
};
let governancePolls = [];
let availableEvents = [];
let studentManagementLogs = [];
let studentManagementUsers = [];
let studentTokenMarketState = cloneInitialTokenMarketState();
let studentGovernanceState = {
  tokens: 1,
  votedPollIds: []
};
let governanceVoteSelections = {};
let adminTokenMarketMessage = "";
let studentTokenMarketMessage = "";
let studentManagementStatusMessage = "";
let pendingConfirmResolver = null;

function updateDocumentTitle(isAuthenticated) {
  if (typeof document === "undefined") return;

  document.title = isAuthenticated ? "POSTECH" : "POSTECH - 통합로그인";
}

function resetTransientUiState() {
  adminTokenMarketMessage = "";
  studentTokenMarketMessage = "";
  studentManagementStatusMessage = "";
  studentManagementLogs = [];
  studentManagementUsers = [];
}

function getTokenMarketMessage() {
  return currentRole === "admin" ? adminTokenMarketMessage : studentTokenMarketMessage;
}

if (studentDeleteForm) {
  studentDeleteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await handleStudentDeleteSubmit(studentDeleteForm);
  });
}

async function handleStudentDeleteSubmit(form) {
  if (currentRole !== "admin") return;

  const formData = new FormData(form);
  const userId = String(formData.get("userId") || "").trim().toLowerCase();
  if (!userId) {
    studentManagementStatusMessage = "삭제할 학생 아이디를 입력해야 합니다.";
    renderStudentManagementPanel();
    return;
  }

  const confirmed = await showPurchaseConfirm(
    `${userId} 계정을 삭제하시겠습니까? 취소가 불가능합니다.`
  );
  if (!confirmed) {
    studentManagementStatusMessage = "학생 계정 삭제가 취소되었습니다.";
    renderStudentManagementPanel();
    return;
  }

  try {
    await studentApiRequest("/api/student/account", {
      method: "DELETE",
      body: JSON.stringify({ userId })
    });
    studentManagementStatusMessage = `${userId} 계정이 삭제되었습니다.`;
    form.reset();
    await syncAdminStudentStatsFromApi();
    await syncEventsFromApi();
    await syncStudentManagementUsersFromApi();
    await syncStudentManagementLogsFromApi();
    await syncGovernanceFromApi();
    renderStudentManagementPanel();
  } catch (error) {
    studentManagementStatusMessage =
      error.message === "user_not_found"
        ? "해당 학생 계정을 찾을 수 없습니다."
        : error.message === "invalid_user_id"
          ? "삭제할 수 없는 아이디입니다."
          : "학생 계정 삭제 중 오류가 발생했습니다.";
    renderStudentManagementPanel();
  }
}

function hidePurchaseConfirm(result) {
  if (!confirmModal) return;

  confirmModal.classList.add("is-hidden");
  confirmModal.setAttribute("aria-hidden", "true");

  if (pendingConfirmResolver) {
    const resolver = pendingConfirmResolver;
    pendingConfirmResolver = null;
    resolver(result);
  }
}

function showPurchaseConfirm(message) {
  if (!confirmModal || !confirmModalMessage) {
    return Promise.resolve(window.confirm(message));
  }

  confirmModalMessage.textContent = message;
  confirmModal.classList.remove("is-hidden");
  confirmModal.setAttribute("aria-hidden", "false");

  return new Promise((resolve) => {
    pendingConfirmResolver = resolve;
  });
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

function createPollId() {
  return `poll_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getEventHoldingSummary() {
  const purchases = Array.isArray(studentTokenMarketState.eventPurchases)
    ? studentTokenMarketState.eventPurchases
    : [];
  const purchaseSummary = new Map();

  purchases.forEach((purchase) => {
    const current = purchaseSummary.get(purchase.eventId) || {
      eventId: purchase.eventId,
      title: purchase.title,
      quantity: 0,
      netAmount: 0
    };
    current.quantity += Math.floor(purchase.quantity);
    current.netAmount += Math.floor(purchase.totalPrice);
    purchaseSummary.set(purchase.eventId, current);
  });

  return new Map(
    Array.from(purchaseSummary.entries()).filter(([, item]) => item.quantity > 0)
  );
}

function getCurrentMarketPrice(event) {
  if (!Number.isFinite(event?.ammTokenReserve) || event.ammTokenReserve <= 0) {
    return 0;
  }

  return Math.ceil(event.ammPointReserve / event.ammTokenReserve);
}

function getAmmBuyQuote(event, quantity) {
  const normalizedQuantity = Math.max(1, Math.floor(quantity));
  const tokenReserve = Math.floor(Number(event?.ammTokenReserve || event?.remainingQuantity || 0));
  const pointReserve = Math.floor(Number(event?.ammPointReserve || 0));

  if (normalizedQuantity >= tokenReserve || tokenReserve <= 0 || pointReserve <= 0) {
    return null;
  }

  const invariant = pointReserve * tokenReserve;
  const nextTokenReserve = tokenReserve - normalizedQuantity;
  const exactNextPointReserve = invariant / nextTokenReserve;
  const cost = Math.ceil(exactNextPointReserve - pointReserve);

  return cost > 0 ? { cost, nextTokenReserve, nextPointReserve: pointReserve + cost } : null;
}

function getAmmSellQuote(event, quantity) {
  const normalizedQuantity = Math.max(1, Math.floor(quantity));
  const tokenReserve = Math.floor(Number(event?.ammTokenReserve || event?.remainingQuantity || 0));
  const pointReserve = Math.floor(Number(event?.ammPointReserve || 0));

  if (normalizedQuantity <= 0 || tokenReserve <= 0 || pointReserve <= 0) {
    return null;
  }

  const invariant = pointReserve * tokenReserve;
  const nextTokenReserve = tokenReserve + normalizedQuantity;
  const exactNextPointReserve = invariant / nextTokenReserve;
  const payout = Math.floor(pointReserve - exactNextPointReserve);

  return payout > 0 ? { payout, nextTokenReserve, nextPointReserve: pointReserve - payout } : null;
}

function buildQuickPollUrl(title, description, options) {
  const query = new URLSearchParams({
    qTitle: title,
    type: "radio"
  });

  if (description) {
    query.set("qDesc", description);
  }

  options.forEach((option) => {
    query.append("a", option);
  });

  return `https://app.polling.com/quick-poll?${query.toString()}`;
}

function getGovernanceUserKey() {
  return `${currentRole}:${currentUserId}`;
}

async function governanceApiRequest(path, options = {}) {
  if (!governanceApiUrl) return null;

  const response = await fetch(`${governanceApiUrl}${path}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error || `governance_api_${response.status}`);
  }

  return data;
}

async function authApiRequest(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error || `auth_api_${response.status}`);
  }

  return data;
}

async function studentApiRequest(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error || `student_api_${response.status}`);
  }

  return data;
}

function applyStudentStateResponse(data) {
  const appState = data?.state || {};
  const tokenMarket = appState.tokenMarket || {};

  paymentState = {
    studentPaid: Boolean(appState.studentPaid),
    paidAt: typeof appState.paidAt === "string" ? appState.paidAt : ""
  };
  studentTokenMarketState = {
    pointReserve:
      Number.isFinite(tokenMarket.pointReserve) && tokenMarket.pointReserve > 0
        ? Math.floor(tokenMarket.pointReserve)
        : INITIAL_TOKEN_MARKET_STATE.pointReserve,
    eventTokenReserve:
      Number.isFinite(tokenMarket.eventTokenReserve) && tokenMarket.eventTokenReserve > 0
        ? Math.floor(tokenMarket.eventTokenReserve)
        : INITIAL_TOKEN_MARKET_STATE.eventTokenReserve,
    userEventTokens:
      Number.isFinite(tokenMarket.userEventTokens) && tokenMarket.userEventTokens >= 0
        ? Math.floor(tokenMarket.userEventTokens)
        : INITIAL_TOKEN_MARKET_STATE.userEventTokens,
    pointDelta:
      Number.isFinite(tokenMarket.pointDelta)
        ? Math.floor(tokenMarket.pointDelta)
        : INITIAL_TOKEN_MARKET_STATE.pointDelta,
    purchaseHistory: Array.isArray(tokenMarket.purchaseHistory)
      ? tokenMarket.purchaseHistory.filter(
          (item) =>
            item &&
            typeof item.title === "string" &&
            typeof item.date === "string" &&
            Number.isFinite(item.amount) &&
            typeof item.type === "string"
        )
      : [],
    eventPurchases: Array.isArray(tokenMarket.eventPurchases)
      ? tokenMarket.eventPurchases.filter(
          (item) =>
            item &&
            typeof item.eventId === "string" &&
            typeof item.title === "string" &&
            Number.isFinite(item.quantity) &&
            Number.isFinite(item.unitPrice) &&
            Number.isFinite(item.totalPrice) &&
            typeof item.purchasedAt === "string"
        )
      : []
  };
  studentGovernanceState = {
    tokens:
      Number.isFinite(appState.governanceTokens) && appState.governanceTokens >= 0
        ? Math.floor(appState.governanceTokens)
        : 1,
    votedPollIds: studentGovernanceState.votedPollIds || []
  };
}

async function syncStudentStateFromApi() {
  if (currentRole !== "student") return false;

  try {
    const data = await studentApiRequest("/api/student/state", {
      method: "GET"
    });
    applyStudentStateResponse(data);
    state = buildStudentState();
    renderStatus();
    renderPointsHistory();
    renderTokenMarket();
    renderGovernanceList();
    return true;
  } catch (error) {
    console.error("Student state sync failed:", error);
    return false;
  }
}

async function syncAdminStudentStatsFromApi() {
  if (currentRole !== "admin") return false;

  try {
    const data = await studentApiRequest("/api/student/stats", {
      method: "GET"
    });
    adminStudentStats = {
      totalStudents: Number(data?.stats?.totalStudents || 0),
      totalPaidStudents: Number(data?.stats?.totalPaidStudents || 0),
      totalGrantedPoints: Number(data?.stats?.totalGrantedPoints || 0)
    };
    state = buildAdminState();
    renderStatus();
    return true;
  } catch (error) {
    console.error("Admin student stats sync failed:", error);
    return false;
  }
}

async function syncStudentManagementLogsFromApi() {
  if (currentRole !== "admin") return false;

  try {
    const data = await studentApiRequest("/api/student/logs", {
      method: "GET"
    });
    studentManagementLogs = Array.isArray(data.logs) ? data.logs : [];
    renderStudentManagementPanel();
    return true;
  } catch (error) {
    console.error("Student management log sync failed:", error);
    return false;
  }
}

async function syncStudentManagementUsersFromApi() {
  if (currentRole !== "admin") return false;

  try {
    const data = await studentApiRequest("/api/student/users", {
      method: "GET"
    });
    studentManagementUsers = Array.isArray(data.users)
      ? data.users.slice().sort((left, right) => left.localeCompare(right))
      : [];
    renderStudentManagementPanel();
    return true;
  } catch (error) {
    console.error("Student management user sync failed:", error);
    return false;
  }
}

async function eventsApiRequest(path = "", options = {}) {
  const response = await fetch(`/api/events${path}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error || `events_api_${response.status}`);
  }

  return data;
}

async function operationsApiRequest(path = "", options = {}) {
  const response = await fetch(`/api/operations${path}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error || `operations_api_${response.status}`);
  }

  return data;
}

async function syncEventsFromApi() {
  try {
    const data = await eventsApiRequest("", { method: "GET" });
    availableEvents = Array.isArray(data.events) ? data.events : [];
    renderTokenMarket();
    return true;
  } catch (error) {
    console.error("Event sync failed:", error);
    return false;
  }
}

async function syncGovernanceFromApi() {
  if (!governanceApiUrl) return false;

  try {
    const data = await governanceApiRequest("/api/governance/polls");

    governancePolls = (data.polls || []).map((poll) => ({
      id: poll.id,
      title: poll.title,
      description: poll.description,
      options: poll.options,
      createdAt: formatDate(new Date(poll.createdAt)),
      voteCount: poll.voteCount || 0,
      optionCounts: poll.optionCounts || poll.options.map(() => 0),
      url: ""
    }));
    persistGovernancePolls();

    governanceVoteSelections = Object.fromEntries(
      governancePolls
        .filter((poll) => Number.isInteger(poll.selectedOption))
        .map((poll) => [poll.id, String(poll.selectedOption)])
    );

    const votedPollIds = (data.polls || [])
      .filter((poll) => Number.isInteger(poll.selectedOption))
      .map((poll) => poll.id);

    studentGovernanceState = {
      ...studentGovernanceState,
      votedPollIds
    };

    state = currentRole === "admin" ? buildAdminState() : buildStudentState();
    renderStatus();
    renderGovernanceList();
    return true;
  } catch (error) {
    console.error("Governance API sync failed:", error);
    return false;
  }
}

async function syncOperationsFromApi() {
  try {
    const data = await operationsApiRequest("", { method: "GET" });
    operationsTitle = normalizeOperationsTitle(data?.title);
    operationsItems = normalizeOperationsItems(data?.items);
    renderOperationsCard();
    populateOperationsForm();
    return true;
  } catch (error) {
    console.error("Operations sync failed:", error);
    operationsTitle = INITIAL_OPERATIONS_TITLE;
    operationsItems = cloneInitialOperationsItems();
    renderOperationsCard();
    populateOperationsForm();
    return false;
  }
}

function cloneInitialTokenMarketState() {
  return {
    pointReserve: INITIAL_TOKEN_MARKET_STATE.pointReserve,
    eventTokenReserve: INITIAL_TOKEN_MARKET_STATE.eventTokenReserve,
    userEventTokens: INITIAL_TOKEN_MARKET_STATE.userEventTokens,
    pointDelta: INITIAL_TOKEN_MARKET_STATE.pointDelta,
    purchaseHistory: [],
    eventPurchases: []
  };
}

function loadTokenMarketState() {
  return cloneInitialTokenMarketState();
}

function persistTokenMarketState() {
  return undefined;
}

function renderAdminEventPanel() {
  if (!tokenMarketPanel) return;
  tokenMarketPanel.innerHTML = `
    <header class="panel-titlebar token-market-header">
      <div>
        <p class="panel-kicker">행사 운영</p>
        <h3>행사 AMM 상장 등록</h3>
      </div>
      <div class="progress-chip">${availableEvents.length}개 행사</div>
    </header>

    <div class="token-market-grid">
      <section class="token-market-card token-market-card-primary">
        <form class="notice-form" id="event-admin-form">
          <label class="notice-field">
            <span>행사명</span>
            <input type="text" name="title" placeholder="예: 해맞이 한마당 - 2026/05/03 (행사 날짜)" maxlength="80">
          </label>

          <label class="notice-field">
            <span>행사 설명</span>
            <textarea name="description" placeholder="학생에게 보여줄 행사 설명을 입력하세요" rows="4" maxlength="240"></textarea>
          </label>

          <label class="notice-field">
            <span>초기 토큰 수량</span>
            <input type="number" name="totalQuantity" min="1" value="10">
          </label>

          <label class="notice-field">
            <span>기준 1토큰 가격</span>
            <input type="number" name="unitPrice" min="1" value="1000">
          </label>

          <p class="detail-text token-market-copy">
            등록 즉시 1차 판매 재고와 세컨더리 AMM 풀이 함께 생성됩니다. 세컨더리 초기가는 기준가의 ${(SECONDARY_MARKET_MULTIPLIER).toFixed(2)}배입니다.
          </p>

          <button type="submit" class="login-button notice-submit">행사 상장</button>
        </form>
        <p class="login-message token-market-message">${escapeHtml(getTokenMarketMessage())}</p>
      </section>

      <section class="token-market-card">
        <div class="panel-titlebar panel-titlebar-compact">
          <div>
            <p class="panel-kicker">등록 행사</p>
            <h3>학생 구매 가능 목록</h3>
          </div>
        </div>
        <ul class="market-list token-quote-list">
          ${
            availableEvents.length === 0
              ? "<li><span>아직 등록된 행사가 없습니다.</span><strong>대기</strong></li>"
              : availableEvents
                  .map(
                    (event) => `
                      <li>
                        <span>${escapeHtml(event.title)} · 기준 ${event.unitPrice.toLocaleString()}P · 초기가 ${(event.unitPrice * SECONDARY_MARKET_MULTIPLIER).toLocaleString()}P · 1차 재고 ${event.primaryRemainingQuantity}/${event.totalQuantity}</span>
                        <button type="button" class="ghost-link" data-delete-event-id="${escapeHtml(event.id)}">삭제</button>
                      </li>
                    `
                  )
                  .join("")
          }
        </ul>
      </section>
    </div>
  `;
}

function renderPrimaryTokenPurchasePanel() {
  if (!tokenMarketPanel) return;
  const purchaseSummary = getEventHoldingSummary();
  const totalHoldingCount = Array.from(purchaseSummary.values()).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  tokenMarketPanel.innerHTML = `
    <header class="panel-titlebar token-market-header">
      <div>
        <p class="panel-kicker">토큰 구매</p>
        <h3>납부자 전용 행사 토큰 구매</h3>
      </div>
      <div class="progress-chip">보유 포인트 ${state.points.toLocaleString()}P</div>
    </header>

    <div class="token-market-grid">
      <section class="token-market-card token-market-card-primary">
        <p class="token-market-eyebrow">1차 판매</p>
        <strong class="token-market-title">행사 토큰은 기준가로 구매하고, 이후에는 세컨더리 마켓에서 거래할 수 있습니다</strong>
        <p class="detail-text token-market-copy">
          학생회비를 납부한 경우에만 이 탭에서 고정가 구매가 가능합니다.
        </p>

        <div class="token-market-stats">
          <article>
            <span>구매 가능 행사</span>
            <strong>${availableEvents.length}개</strong>
          </article>
          <article>
            <span>내 보유 토큰</span>
            <strong>${totalHoldingCount}개</strong>
          </article>
        </div>

        <div class="market-list token-quote-list">
          ${
            availableEvents.length === 0
              ? '<li><span>현재 판매 중인 행사가 없습니다.</span><strong>대기</strong></li>'
              : availableEvents
                  .map(
                    (event) => `
                      <form class="token-buy-form token-trade-card" data-primary-purchase-form="true" data-event-id="${escapeHtml(event.id)}">
                        <div class="token-trade-header">
                          <div>
                            <strong>${escapeHtml(event.title)}</strong>
                            <p>${event.description ? escapeHtml(event.description) : "행사 토큰 1차 판매"}</p>
                          </div>
                          <span class="token-trade-badge">${event.unitPrice.toLocaleString()}P</span>
                        </div>

                        <div class="token-trade-metrics">
                          <span>기준가 ${event.unitPrice.toLocaleString()}P</span>
                          <span>초기가 ${(event.unitPrice * SECONDARY_MARKET_MULTIPLIER).toLocaleString()}P</span>
                        </div>

                        <label class="notice-field">
                          <span>구매 수량</span>
                          <input type="number" name="quantity" min="1" max="${Math.max(1, event.primaryRemainingQuantity)}" value="1" ${event.primaryRemainingQuantity < 1 || !paymentState.studentPaid ? "disabled" : ""}>
                        </label>
                        <button type="submit" class="login-button notice-submit" ${event.primaryRemainingQuantity < 1 || !paymentState.studentPaid ? "disabled" : ""}>
                          ${paymentState.studentPaid ? `${event.unitPrice.toLocaleString()}P에 구매` : "납부자만 구매 가능"}
                        </button>
                        <small>1차 재고 ${event.primaryRemainingQuantity}/${event.totalQuantity}</small>
                      </form>
                    `
                  )
                  .join("")
          }
        </div>
        <p class="login-message token-market-message">${escapeHtml(getTokenMarketMessage())}</p>
      </section>

      <section class="token-market-card">
        <div class="panel-titlebar panel-titlebar-compact">
          <div>
            <p class="panel-kicker">내 구매 내역</p>
            <h3>행사 토큰 보유 현황</h3>
          </div>
        </div>
        <ul class="market-list token-quote-list">
          ${
            purchaseSummary.size === 0
              ? "<li><span>아직 구매한 행사 참여권이 없습니다.</span><strong>0건</strong></li>"
              : Array.from(purchaseSummary.values())
                  .map(
                    (item) => `
                      <li>
                        <span>${escapeHtml(item.title)}</span>
                        <strong>${item.quantity}개 / 순투입 ${item.netAmount.toLocaleString()}P</strong>
                      </li>
                    `
                  )
                  .join("")
          }
        </ul>
      </section>
    </div>
  `;
}

function renderSecondaryMarketPanel() {
  if (!tokenMarketPanel) return;
  const purchaseSummary = getEventHoldingSummary();

  tokenMarketPanel.innerHTML = `
    <header class="panel-titlebar token-market-header">
      <div>
        <p class="panel-kicker">세컨더리 마켓</p>
        <h3>행사 토큰 AMM 거래</h3>
      </div>
      <div class="progress-chip">보유 포인트 ${state.points.toLocaleString()}P</div>
    </header>

    <div class="token-market-grid">
      <section class="token-market-card token-market-card-primary">
        <p class="token-market-eyebrow">AMM 보드</p>
        <strong class="token-market-title">1차 구매와 별도로 세컨더리 마켓에서 실시간 가격으로 거래할 수 있습니다</strong>
        <p class="detail-text token-market-copy">
          세컨더리 초기가는 기준가의 ${(SECONDARY_MARKET_MULTIPLIER).toFixed(2)}배이며, 거래가 발생할수록 가격이 변합니다.
        </p>

        <div class="token-market-stats">
          <article>
            <span>상장 행사</span>
            <strong>${availableEvents.length}개</strong>
          </article>
          <article>
            <span>거래 방식</span>
            <strong>AMM</strong>
          </article>
        </div>

        <div class="market-list token-quote-list">
          ${
            availableEvents.length === 0
              ? '<li><span>현재 판매 중인 행사가 없습니다.</span><strong>대기</strong></li>'
              : availableEvents
                  .map((event) => {
                    const owned = purchaseSummary.get(event.id)?.quantity || 0;
                    const buyQuote = getAmmBuyQuote(event, 1);
                    const sellQuote = owned > 0 ? getAmmSellQuote(event, 1) : null;

                    return `
                      <div class="token-trade-card">
                        <div class="token-trade-header">
                          <div>
                            <strong>${escapeHtml(event.title)}</strong>
                            <p>${event.description ? escapeHtml(event.description) : "행사 토큰 세컨더리 마켓"}</p>
                          </div>
                          <span class="token-trade-badge">현재가 ${getCurrentMarketPrice(event).toLocaleString()}P</span>
                        </div>

                        <div class="token-trade-metrics">
                          <span>기준가 ${event.unitPrice.toLocaleString()}P</span>
                          <span>초기가 ${(event.unitPrice * SECONDARY_MARKET_MULTIPLIER).toLocaleString()}P</span>
                        </div>

                        <div class="token-trade-actions">
                          <form class="token-buy-form" data-market-purchase-form="true" data-event-id="${escapeHtml(event.id)}">
                            <label class="notice-field">
                              <span>매수 수량</span>
                              <input type="number" name="quantity" min="1" max="${Math.max(1, event.ammTokenReserve - 1)}" value="1" ${event.ammTokenReserve <= 1 ? "disabled" : ""}>
                            </label>
                            <button type="submit" class="login-button notice-submit" ${event.ammTokenReserve <= 1 ? "disabled" : ""}>
                              ${buyQuote ? `예상 ${buyQuote.cost.toLocaleString()}P로 매수` : "매수 불가"}
                            </button>
                          </form>

                          <form class="token-buy-form" data-event-sell-form="true" data-event-id="${escapeHtml(event.id)}">
                            <label class="notice-field">
                              <span>매도 수량</span>
                              <input type="number" name="quantity" min="1" max="${Math.max(1, owned)}" value="1" ${owned < 1 ? "disabled" : ""}>
                            </label>
                            <button type="submit" class="ghost-button token-sell-button" ${owned < 1 ? "disabled" : ""}>
                              ${sellQuote ? `예상 ${sellQuote.payout.toLocaleString()}P로 매도` : "매도 불가"}
                            </button>
                          </form>
                        </div>
                      </div>
                    `;
                  })
                  .join("")
          }
        </div>
        <p class="login-message token-market-message">${escapeHtml(getTokenMarketMessage())}</p>
      </section>

      <section class="token-market-card">
        <div class="panel-titlebar panel-titlebar-compact">
          <div>
            <p class="panel-kicker">안내</p>
            <h3>세컨더리 마켓 동작 방식</h3>
          </div>
        </div>
        <ul class="market-list token-quote-list">
          <li><span>기준가</span><strong>관리자 등록가</strong></li>
          <li><span>초기가</span><strong>기준가의 ${(SECONDARY_MARKET_MULTIPLIER).toFixed(2)}배</strong></li>
          <li><span>체결가</span><strong>매수/매도 시점마다 변동</strong></li>
        </ul>
      </section>
    </div>
  `;
}

function renderTokenMarket() {
  if (!tokenMarketPanel) return;

  if (currentRole === "admin") {
    renderAdminEventPanel();
    return;
  }

  if (currentView === "market") {
    renderSecondaryMarketPanel();
    return;
  }

  renderPrimaryTokenPurchasePanel();
}

function renderStudentManagementPanel() {
  if (!studentManagementPanel) return;

  if (studentManagementMessage) {
    studentManagementMessage.textContent = studentManagementStatusMessage;
  }

  if (studentManagementUserList) {
    if (studentManagementUsers.length === 0) {
      studentManagementUserList.innerHTML = `
        <li class="notice-item notice-empty">
          <strong>등록된 학생이 없습니다.</strong>
          <p>학생 회원가입이 발생하면 여기 표시됩니다.</p>
        </li>
      `;
    } else {
      studentManagementUserList.innerHTML = studentManagementUsers
        .map(
          (userId) => `
            <li class="notice-item">
              <div class="notice-meta">
                <strong>${escapeHtml(userId)}</strong>
                <span>등록됨</span>
              </div>
            </li>
          `
        )
        .join("");
    }
  }

  if (!studentManagementLogList) return;

  if (studentManagementLogs.length === 0) {
    studentManagementLogList.innerHTML = `
      <li class="notice-item notice-empty">
        <strong>기록이 없습니다.</strong>
        <p>학생 등록 또는 삭제가 발생하면 여기 표시됩니다.</p>
      </li>
    `;
    return;
  }

  studentManagementLogList.innerHTML = studentManagementLogs
    .slice(0, 5)
    .map(
      (log) => `
        <li class="notice-item">
          <div class="notice-meta">
            <strong>${log.action === "register" ? "학생 등록" : "학생 삭제"} · ${escapeHtml(log.userId)}</strong>
            <span>${escapeHtml(formatDate(new Date(log.createdAt)))}</span>
          </div>
          <p>${escapeHtml(log.actorUserId)} (${escapeHtml(log.actorRole)})</p>
        </li>
      `
    )
    .join("");
}

function loadNoticeItems() {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(NOTICE_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item) =>
        item &&
        typeof item.title === "string" &&
        typeof item.content === "string" &&
        typeof item.date === "string"
    );
  } catch {
    return [];
  }
}

function persistNoticeItems() {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(NOTICE_STORAGE_KEY, JSON.stringify(noticeItems));
}

function cloneInitialOperationsItems() {
  return INITIAL_OPERATIONS_ITEMS.map((item) => ({ ...item }));
}

function normalizeOperationsTitle(title) {
  return typeof title === "string" && title.trim() ? title.trim() : INITIAL_OPERATIONS_TITLE;
}

function normalizeOperationsItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return cloneInitialOperationsItems();
  }

  return INITIAL_OPERATIONS_ITEMS.map((fallback, index) => {
    const item = items[index];
    const label =
      item && typeof item.label === "string" && item.label.trim()
        ? item.label.trim()
        : fallback.label;
    const parsedValue = Number(item?.value);
    const value = Number.isFinite(parsedValue)
      ? Math.max(0, Math.min(100, Math.round(parsedValue)))
      : fallback.value;

    return {
      label,
      value,
      tone: fallback.tone
    };
  });
}

function loadPaymentState() {
  return { studentPaid: false, paidAt: "" };
}

function loadGovernancePolls() {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(POLL_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.description === "string" &&
        Array.isArray(item.options) &&
        item.options.every((option) => typeof option === "string") &&
        typeof item.createdAt === "string"
    );
  } catch {
    return [];
  }
}

function persistGovernancePolls() {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(POLL_STORAGE_KEY, JSON.stringify(governancePolls));
}

function loadStudentGovernanceState() {
  return { tokens: 1, votedPollIds: [] };
}

function persistStudentGovernanceState() {
  return undefined;
}

function hydrateStudentLocalState() {
  studentTokenMarketState = loadTokenMarketState();
  studentGovernanceState = loadStudentGovernanceState();
}

function loadRememberedUserId() {
  if (typeof window === "undefined") return "";

  return window.localStorage.getItem(REMEMBER_ID_STORAGE_KEY) || "";
}

function persistRememberedUserId(userId) {
  if (typeof window === "undefined") return;

  if (userId) {
    window.localStorage.setItem(REMEMBER_ID_STORAGE_KEY, userId);
    return;
  }

  window.localStorage.removeItem(REMEMBER_ID_STORAGE_KEY);
}

function setRegisterFormOpen(isOpen) {
  if (!registerForm) return;

  registerForm.classList.toggle("is-hidden", !isOpen);
  if (!isOpen && registerMessage) {
    registerMessage.textContent = "";
  }
}

function getRegisterErrorMessage(errorCode) {
  switch (errorCode) {
    case "password_mismatch":
      return "비밀번호 확인이 일치하지 않습니다.";
    case "invalid_user_id":
      return "아이디는 영문 소문자, 숫자, 점, 밑줄, 하이픈만 사용해 4~24자로 입력해야 합니다.";
    case "reserved_user_id":
      return "해당 아이디는 사용할 수 없습니다.";
    case "invalid_password":
      return "비밀번호는 6자 이상 72자 이하로 입력해야 합니다.";
    case "user_exists":
      return "이미 사용 중인 아이디입니다.";
    case "missing_upstash_env":
      return "회원가입 저장소 설정이 아직 배포 환경에 없습니다.";
    default:
      return "회원가입 처리 중 오류가 발생했습니다.";
  }
}

function persistPaymentState() {
  return undefined;
}

function buildAdminState() {
  const totalPaidStudents = adminStudentStats.totalPaidStudents;
  const totalGrantedPoints = adminStudentStats.totalGrantedPoints;
  const totalVotes = governancePolls.reduce((sum, poll) => sum + (poll.voteCount || 0), 0);

  return {
    points: totalGrantedPoints,
    tokens: totalVotes,
    character: "운영자",
    grade: "관리자",
    avatar: "AD",
    paymentStatus: `${totalPaidStudents}명 완료`,
    paymentMeta:
      totalPaidStudents === 0
        ? "아직 납부한 학생이 없습니다."
        : `학생회비 납부 ${totalPaidStudents}건이 반영되었습니다.`,
    market: "운영 대기",
    rental: "0건 예약",
    vote: "0건 진행",
    carry: "대기",
    pointsMeta: "학생회비로 누적 지급된 포인트",
    tokenMeta:
      totalVotes === 0
        ? "아직 사용된 거버넌스 토큰이 없습니다."
        : `학생 투표로 ${totalVotes}개의 토큰이 사용되었습니다.`,
    pointHistory:
      totalPaidStudents === 0
        ? []
        : [
            {
              title: "학생회비 납부 리워드 지급",
              date: formatDate(new Date()),
              amount: totalGrantedPoints,
              type: "earn"
            }
          ]
  };
}

function buildStudentState() {
  const marketHistory = studentTokenMarketState.purchaseHistory.slice();

  if (!paymentState.studentPaid) {
    return {
      ...baseState,
      points: studentTokenMarketState.pointDelta,
      tokens: studentGovernanceState.tokens,
      tokenMeta: "안건 1건당 토큰 1개로 익명 투표",
      pointHistory: marketHistory
    };
  }

  return {
    ...baseState,
    points: 31000 + studentTokenMarketState.pointDelta,
    tokens: studentGovernanceState.tokens,
    paymentStatus: "납부 완료",
    paymentMeta: "31,000포인트 지급 완료",
    pointsMeta: "학생회비 납부로 31,000P 지급",
    tokenMeta: "안건 1건당 토큰 1개로 익명 투표",
    pointHistory: [
      {
        title: "학생회비 납부 리워드 지급",
        date: paymentState.paidAt || formatDate(new Date()),
        amount: 31000,
        type: "earn"
      },
      ...marketHistory
    ]
  };
}

function applyRoleLayout(role) {
  const roleConfig = roleConfigs[role];
  const isStudentDashboard = role === "student" && currentView === "dashboard";
  const isDashboard = currentView === "dashboard";
  const showStudentNoticeCard = true;
  const isAdminNoticeView = role === "admin" && currentView === "market";
  const isGovernanceView = currentView === "governance";
  const isAdminGovernanceView = role === "admin" && isGovernanceView;
  const isStudentGovernanceView = role === "student" && isGovernanceView;

  if (!roleConfig) return;

  if (appRoleSubtitle) appRoleSubtitle.textContent = roleConfig.subtitle;
  if (heroKicker) heroKicker.textContent = roleConfig.heroKicker;
  if (heroTitle) heroTitle.textContent = roleConfig.heroTitle;
  if (heroDescription) heroDescription.textContent = roleConfig.heroDescription;
  if (heroDescription) heroDescription.classList.toggle("is-hidden", role === "student");
  if (heroNoticeList) heroNoticeList.classList.toggle("is-hidden", !isStudentDashboard);
  if (operationsCard) operationsCard.classList.toggle("is-hidden", !isStudentDashboard);
  if (heroPanel) heroPanel.classList.toggle("is-student-split", isStudentDashboard && showStudentNoticeCard);
  if (heroPanel) heroPanel.classList.toggle("is-hidden", !isDashboard);
  if (noticeCard) {
    noticeCard.classList.toggle("is-student-card", role === "student");
    noticeCard.classList.toggle("is-hidden", role === "student" && !isStudentDashboard);
  }
  if (paymentLabel) paymentLabel.textContent = roleConfig.labels.payment;
  if (pointsLabel) pointsLabel.textContent = roleConfig.labels.points;
  if (tokenLabel) tokenLabel.textContent = roleConfig.labels.token;
  if (heroActions) heroActions.classList.toggle("is-hidden", !roleConfig.showModeButtons);

  navItems.forEach((item) => {
    const view = item.dataset.view;
    if (view && roleConfig.nav[view]) {
      const label = item.querySelector(".app-nav-label");
      if (label) label.textContent = roleConfig.nav[view];
    }
  });

  const tokenNavItem = navItems.find((item) => item.dataset.view === "tokens");
  if (tokenNavItem) {
    tokenNavItem.classList.toggle("is-hidden", role === "student");
    tokenNavItem.hidden = role === "student";
  }

  if (studentManagementNavItem) {
    studentManagementNavItem.classList.toggle("is-hidden", role !== "admin");
    studentManagementNavItem.hidden = role !== "admin";
  }

  if (pointsPanelKicker) {
    pointsPanelKicker.textContent = role === "student" ? "Assets" : "포인트";
  }

  if (pointsPanelTitle) {
    pointsPanelTitle.textContent =
      role === "student" ? "Points and token purchase" : "포인트 사용 내역";
  }

  if (studentManagementPanel) {
    studentManagementPanel.classList.toggle("is-hidden", true);
  }

  if (noticeAdminPanel) {
    noticeAdminPanel.classList.toggle("is-hidden", !isAdminNoticeView);
  }

  if (noticeAdminEditor) {
    noticeAdminEditor.classList.toggle("is-hidden", !isAdminNoticeView);
  }

  if (operationsAdminPanel) {
    operationsAdminPanel.classList.toggle("is-hidden", !isAdminNoticeView);
  }

  if (governancePanel) {
    governancePanel.classList.toggle("is-hidden", !isGovernanceView);
  }

  if (governanceAdminPanel) {
    governanceAdminPanel.classList.toggle("is-hidden", !isAdminGovernanceView);
  }

  if (governanceStudentPanel) {
    governanceStudentPanel.classList.toggle("is-hidden", !isStudentGovernanceView);
  }

  renderNoticeLists();
  renderOperationsCard();
  populateOperationsForm();
  renderGovernanceList();
  renderTokenMarket();

  if (role === "admin") {
    renderStudentManagementPanel();
  }
}

function resetScenario(mode) {
  currentMode = mode;
  activeStepIndex = 0;
  completedSteps = new Set();
  state =
    currentRole === "admin"
      ? buildAdminState()
      : buildStudentState();
  updateModeButtons();
  renderStatus();
  renderCalendar();
  renderPointsHistory();
  renderTokenMarket();
}

function updateModeButtons() {
  modeButtons.forEach((button) => {
    button.classList.toggle("is-hidden", currentRole !== "student");
    button.classList.toggle("is-active", button.dataset.mode === currentMode);
  });
}

function switchView(view) {
  if (currentRole === "student" && view === "students") {
    view = "dashboard";
  }

  currentView = view;
  navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === view);
  });

  const isDashboard = view === "dashboard";
  const isPoints = view === "points";
  const isTokenView =
    currentRole === "admin"
      ? view === "tokens"
      : view === "points" || view === "tokens" || view === "market";
  const isStudentManagementView = currentRole === "admin" && view === "students";

  if (statusGrid) statusGrid.classList.remove("is-hidden");
  if (dashboardView) dashboardView.classList.toggle("is-hidden", !isDashboard);
  if (pointsView) pointsView.classList.toggle("is-hidden", !isPoints);
  if (tokenView) tokenView.classList.toggle("is-hidden", !isTokenView);
  if (pointsView) {
    pointsView.classList.toggle("is-student-assets-view", currentRole === "student" && isPoints);
  }
  if (tokenView) {
    tokenView.classList.toggle("is-student-assets-view", currentRole === "student" && isPoints);
    tokenView.classList.toggle("is-student-market-view", currentRole === "student" && view === "market");
  }
  if (studentManagementView) {
    studentManagementView.classList.toggle(
      "is-hidden",
      currentRole === "student" ? true : !isStudentManagementView
    );
  }
  if (placeholderView) {
    placeholderView.classList.toggle(
      "is-hidden",
      isDashboard || isPoints || isTokenView || isStudentManagementView ? true : false
    );
  }

  if (isTokenView && currentUserId) {
    void syncEventsFromApi();
  }

  if (currentRole === "admin" && isStudentManagementView && currentUserId) {
    void syncStudentManagementUsersFromApi();
    void syncStudentManagementLogsFromApi();
  }

  if (!isDashboard && !isPoints && !isTokenView) {
    const copy = placeholderCopy[currentRole]?.[view];
    if (placeholderTitle && copy) placeholderTitle.textContent = copy.title;
    if (placeholderText && copy) placeholderText.textContent = copy.text;
    if (placeholderKicker) {
      placeholderKicker.textContent =
        currentRole === "admin" && view === "market" ? "공지 사항" : "준비 중";
    }
  }

  const isAdminNoticeView = currentRole === "admin" && view === "market";
  const isGovernanceView = view === "governance";
  const isAdminGovernanceView = currentRole === "admin" && isGovernanceView;
  const isStudentGovernanceView = currentRole === "student" && isGovernanceView;
  const isStudentDashboardNoticeView = currentRole === "student" && isDashboard;
  const isStudentDashboardOperationsView = currentRole === "student" && isDashboard;

  if (heroNoticeList) {
    heroNoticeList.classList.toggle("is-hidden", !isStudentDashboardNoticeView);
  }

  if (operationsCard) {
    operationsCard.classList.toggle("is-hidden", !isStudentDashboardOperationsView);
  }

  if (heroPanel) {
    heroPanel.classList.toggle("is-student-split", isStudentDashboardNoticeView && isStudentDashboardOperationsView);
    heroPanel.classList.toggle("is-hidden", !isDashboard);
  }

  if (noticeCard) {
    noticeCard.classList.toggle("is-student-card", currentRole === "student");
    noticeCard.classList.toggle("is-hidden", currentRole === "student" && !isStudentDashboardNoticeView);
  }

  if (heroDescription) {
    heroDescription.classList.toggle("is-hidden", currentRole === "student" || isAdminNoticeView || isGovernanceView);
  }

  if (placeholderPanel) {
    placeholderPanel.classList.toggle("is-flat-notice-view", isAdminNoticeView);
  }

  if (noticeAdminPanel) {
    noticeAdminPanel.classList.toggle("is-hidden", !isAdminNoticeView);
  }

  if (noticeAdminEditor) {
    noticeAdminEditor.classList.toggle("is-hidden", !isAdminNoticeView);
  }

  if (operationsAdminPanel) {
    operationsAdminPanel.classList.toggle("is-hidden", !isAdminNoticeView);
  }

  if (governancePanel) {
    governancePanel.classList.toggle("is-hidden", !isGovernanceView);
  }

  if (governanceAdminPanel) {
    governanceAdminPanel.classList.toggle("is-hidden", !isAdminGovernanceView);
  }

  if (governanceStudentPanel) {
    governanceStudentPanel.classList.toggle("is-hidden", !isStudentGovernanceView);
  }

  if (studentManagementPanel) {
    studentManagementPanel.classList.toggle(
      "is-hidden",
      currentRole === "student" ? true : !isStudentManagementView
    );
  }

  if (placeholderText) {
    placeholderText.classList.toggle(
      "is-hidden",
      isAdminNoticeView || isGovernanceView || isStudentManagementView
    );
  }

  if (noticeMessage && !isAdminNoticeView) {
    noticeMessage.textContent = "";
  }

  if (operationsMessage && !isAdminNoticeView) {
    operationsMessage.textContent = "";
  }

  if (noticeForm && !isAdminNoticeView) {
    noticeForm.reset();
  }

  if (operationsForm && !isAdminNoticeView) {
    populateOperationsForm();
  }

  if (pollMessage && !isAdminGovernanceView) {
    pollMessage.textContent = "";
  }

  if (pollForm && !isAdminGovernanceView) {
    pollForm.reset();
  }

  renderGovernanceList();
  renderTokenMarket();
  renderStudentManagementPanel();
}

function renderStatus() {
  if (pointsValue) pointsValue.textContent = `${state.points.toLocaleString()}P`;
  if (pointsMeta) pointsMeta.textContent = state.pointsMeta;
  if (tokenValue) tokenValue.textContent = String(state.tokens);
  if (tokenMeta) tokenMeta.textContent = state.tokenMeta;
  if (paymentStatus) paymentStatus.textContent = state.paymentStatus;
  if (paymentButton) {
    paymentButton.title = state.paymentMeta;
    paymentButton.setAttribute("aria-label", state.paymentMeta);

    const isSettled =
      state.paymentStatus === "납부 완료" || state.paymentStatus === "납부 전환";

    if (currentRole === "admin") {
      paymentButton.textContent = "납부 명단 관리";
      paymentButton.disabled = false;
    } else {
      paymentButton.textContent = isSettled ? state.paymentStatus : "지금 납부하기 / 31,000원";
      paymentButton.disabled = isSettled;
    }
  }
}

function renderCalendar() {
  if (!calendarGrid) return;

  const firstDay = new Date(2026, currentCalendarMonth, 1).getDay();
  const lastDate = new Date(2026, currentCalendarMonth + 1, 0).getDate();
  const cells = [];
  const itemsByDay = new Map(
    notableCalendarItems
      .filter((item) => item.month === currentCalendarMonth)
      .map((item) => [item.day, item])
  );

  if (calendarMonthLabel) {
    calendarMonthLabel.textContent = `2026년 ${currentCalendarMonth + 1}월`;
  }

  if (calendarPrevButton) {
    calendarPrevButton.disabled = currentCalendarMonth === 0;
  }

  if (calendarNextButton) {
    calendarNextButton.disabled = currentCalendarMonth === 11;
  }

  for (let index = 0; index < firstDay; index += 1) {
    cells.push('<div class="calendar-cell is-empty" aria-hidden="true"></div>');
  }

  for (let day = 1; day <= lastDate; day += 1) {
    const item = itemsByDay.get(day);
    const classes = ["calendar-cell"];
    if (currentCalendarMonth === highlightedMonth && day === highlightedDay) {
      classes.push("is-today");
    }
    if (item) {
      classes.push(item.type === "holiday" ? "is-holiday" : "is-event");
    }

    cells.push(`
      <article class="${classes.join(" ")}">
        <span class="calendar-date">${day}</span>
        ${item ? `<small class="calendar-note">${item.label}</small>` : ""}
      </article>
    `);
  }

  calendarGrid.innerHTML = cells.join("");
}

function renderPointsHistory() {
  const history = state.pointHistory;

  if (pointsHistoryTotal) {
    pointsHistoryTotal.textContent = `${history.length}건`;
  }

  if (!pointsHistoryList) return;

  if (history.length === 0) {
    pointsHistoryList.innerHTML = `
      <li class="points-history-empty">
        <p>아직 반영된 포인트 사용 내역이 없습니다.</p>
        <span>대시보드에서 단계 반영 후 포인트 변동을 확인할 수 있습니다.</span>
      </li>
    `;
    return;
  }

  pointsHistoryList.innerHTML = history
    .slice()
    .reverse()
    .map((entry) => `
      <li class="points-history-item">
        <div>
          <strong>${entry.title}</strong>
          <span>${entry.date}</span>
        </div>
        <b class="${entry.type === "use" ? "is-negative" : "is-positive"}">
          ${entry.amount > 0 ? "+" : ""}${entry.amount.toLocaleString()}P
        </b>
      </li>
    `)
    .join("");
}

function renderNoticeLists() {
  if (heroNoticeList) {
    if (currentRole === "student" && currentView === "dashboard") {
      heroNoticeList.innerHTML =
        noticeItems.length === 0
          ? `
            <li class="notice-item notice-empty">
              <strong>현재 등록된 공지가 없습니다.</strong>
              <p>현재 등록된 공지가 없습니다.</p>
            </li>
          `
          : noticeItems
              .map((notice) => `
                <li class="notice-item">
                  <div class="notice-meta">
                    <strong>${notice.title}</strong>
                    <span>${notice.date}</span>
                  </div>
                  <p>${notice.content}</p>
                </li>
              `)
              .join("");
    } else {
      heroNoticeList.innerHTML = "";
    }
  }

  if (adminNoticeList) {
    if (currentRole === "admin" && currentView === "market") {
      adminNoticeList.innerHTML =
        noticeItems.length === 0
          ? `
            <li class="notice-item notice-empty">
              <strong>등록된 공지가 없습니다.</strong>
              <p>위 폼에서 제목과 내용을 입력해 첫 공지를 등록하세요.</p>
            </li>
          `
          : noticeItems
              .map((notice, index) => `
                <li class="notice-item notice-item-admin">
                  <div class="notice-meta">
                    <strong>${notice.title}</strong>
                    <span>${notice.date}</span>
                  </div>
                  <p>${notice.content}</p>
                  <button type="button" class="notice-delete-button" data-notice-index="${index}">삭제</button>
                </li>
              `)
              .join("");
    } else {
      adminNoticeList.innerHTML = "";
    }
  }
}

function renderOperationsCard() {
  if (!operationsMetrics) return;

  if (operationsKicker) {
    operationsKicker.textContent = operationsTitle || INITIAL_OPERATIONS_TITLE;
  }

  operationsMetrics.innerHTML = operationsItems
    .map(
      (item) => `
        <div class="operations-metric">
          <span class="operations-label">${escapeHtml(item.label)}</span>
          <div class="operations-bar-track" aria-hidden="true">
            <span class="operations-bar-fill is-${escapeHtml(item.tone)}" style="width: ${item.value}%;"></span>
          </div>
          <strong class="operations-value">${item.value}%</strong>
        </div>
      `
    )
    .join("");
}

function populateOperationsForm() {
  if (!operationsForm) return;

  const operationsTitleInput = operationsForm.elements.namedItem("operations-title");
  if (operationsTitleInput instanceof HTMLInputElement) {
    operationsTitleInput.value = operationsTitle || INITIAL_OPERATIONS_TITLE;
  }

  operationsItems.forEach((item, index) => {
    const labelInput = operationsForm.elements.namedItem(`label-${index}`);
    const valueInput = operationsForm.elements.namedItem(`value-${index}`);

    if (labelInput instanceof HTMLInputElement) {
      labelInput.value = item.label;
    }

    if (valueInput instanceof HTMLInputElement) {
      valueInput.value = String(item.value);
    }
  });
}

function renderGovernanceList() {
  if (!governanceList) return;

  if (currentView !== "governance") {
    governanceList.innerHTML = "";
    return;
  }

  if (governancePolls.length === 0) {
    governanceList.innerHTML = `
      <li class="notice-item notice-empty">
        <strong>등록된 투표가 없습니다.</strong>
        <p>관리자 계정의 투표 관리 메뉴에서 첫 안건을 등록하세요.</p>
      </li>
    `;
    return;
  }

  governanceList.innerHTML = governancePolls
    .map((poll, index) => {
      const hasVoted = studentGovernanceState.votedPollIds.includes(poll.id);
      const canVote = currentRole === "student" && !hasVoted && studentGovernanceState.tokens > 0;
      const optionHtml = poll.options
        .map((option, optionIndex) =>
          currentRole === "student"
            ? `
              <li>
                <label class="governance-option-choice">
                  <input
                    type="radio"
                    name="option-${escapeHtml(poll.id)}"
                    value="${optionIndex}"
                    ${governanceVoteSelections[poll.id] === String(optionIndex) ? "checked" : ""}
                    ${hasVoted ? "disabled" : ""}
                  >
                  <span>${escapeHtml(option)}</span>
                </label>
              </li>
            `
            : `
              <li>
                <span>${escapeHtml(option)}</span>
                <strong class="governance-result-count">${(poll.optionCounts?.[optionIndex] || 0).toLocaleString()}표</strong>
              </li>
            `
        )
        .join("");

      const adminActions =
        currentRole === "admin"
          ? `
            <div class="governance-actions">
              <button type="button" class="notice-delete-button" data-poll-index="${index}">삭제</button>
            </div>
          `
          : "";

      const studentActions =
        currentRole === "student"
          ? `
            <form class="governance-vote-form" data-poll-id="${poll.id}">
              <div class="governance-actions">
                <button
                  type="submit"
                  class="vote-button"
                  ${canVote ? "" : "disabled"}
                >
                  ${
                    hasVoted
                      ? "투표 완료"
                      : studentGovernanceState.tokens > 0
                        ? "투표 제출"
                        : "토큰 부족"
                  }
                </button>
              </div>
            </form>
          `
          : "";

      const statusText =
        currentRole === "admin"
          ? `관리자: 총 ${(poll.voteCount || 0).toLocaleString()}표 저장`
          : hasVoted
            ? "학생: 이 안건은 이미 투표를 완료했습니다."
            : studentGovernanceState.tokens > 0
              ? "학생: 선택지를 고르면 토큰 1개로 바로 투표됩니다."
              : "학생: 남은 거버넌스 토큰이 없습니다.";

      return `
        <li class="notice-item governance-item">
          <div class="notice-meta">
            <strong>${escapeHtml(poll.title)}</strong>
            <span>${escapeHtml(poll.createdAt)}</span>
          </div>
          <p>${escapeHtml(poll.description)}</p>
          <div class="governance-status">${escapeHtml(statusText)}</div>
          <ul class="governance-options">${optionHtml}</ul>
          ${adminActions || studentActions}
        </li>
      `;
    })
    .join("");
}

function applyCurrentStep() {
  if (currentRole !== "student") return;

  const scenario = scenarios[currentMode];
  const step = scenario.steps[activeStepIndex];

  if (!step || completedSteps.has(activeStepIndex)) return;

  step.apply(state);
  completedSteps.add(activeStepIndex);

  if (activeStepIndex < scenario.steps.length - 1) {
    activeStepIndex += 1;
  }

  renderStatus();
  renderCalendar();
  renderPointsHistory();
}

async function handleStudentPayment() {
  if (currentRole !== "student") return;

  const isSettled = paymentState.studentPaid;

  if (isSettled) return;

  try {
    const data = await studentApiRequest("/api/student/pay", {
      method: "POST"
    });
    applyStudentStateResponse(data);
    state = buildStudentState();
    renderStatus();
    renderPointsHistory();
    renderTokenMarket();
  } catch (error) {
    console.error("Student payment update failed:", error);
  }
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.mode) {
      resetScenario(button.dataset.mode);
    }
  });
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.dataset.view) {
      switchView(item.dataset.view);
    }
  });
});

if (calendarPrevButton) {
  calendarPrevButton.addEventListener("click", () => {
    if (currentCalendarMonth > 0) {
      currentCalendarMonth -= 1;
      renderCalendar();
    }
  });
}

if (calendarNextButton) {
  calendarNextButton.addEventListener("click", () => {
    if (currentCalendarMonth < 11) {
      currentCalendarMonth += 1;
      renderCalendar();
    }
  });
}

if (paymentButton) {
  paymentButton.addEventListener("click", async () => {
    await handleStudentPayment();
  });
}

if (tokenMarketPanel) {
  tokenMarketPanel.addEventListener("submit", async (event) => {
    const target = event.target;

    if (!(target instanceof HTMLFormElement)) return;

    event.preventDefault();
    const formData = new FormData(target);
    if (currentRole === "admin" && target.id === "event-admin-form") {
      const title = String(formData.get("title") || "").trim();
      const description = String(formData.get("description") || "").trim();
      const totalQuantity = Math.max(1, Math.floor(Number(formData.get("totalQuantity") || 1)));
      const unitPrice = Math.max(1, Math.floor(Number(formData.get("unitPrice") || 1)));

      try {
        await eventsApiRequest("", {
          method: "POST",
          body: JSON.stringify({
            title,
            description,
            totalQuantity,
            unitPrice
          })
        });
        adminTokenMarketMessage = "행사가 등록되었습니다.";
        target.reset();
        await syncEventsFromApi();
        renderTokenMarket();
      } catch (error) {
        adminTokenMarketMessage =
          error.message === "invalid_event_payload"
            ? "행사명, 수량, 가격을 올바르게 입력해야 합니다."
            : "행사 등록 중 오류가 발생했습니다.";
        renderTokenMarket();
      }
      return;
    }

    if (currentRole !== "student") return;
    const isPrimaryPurchase = target.dataset.primaryPurchaseForm === "true";
    const isMarketPurchase = target.dataset.marketPurchaseForm === "true";
    const isSale = target.dataset.eventSellForm === "true";
    if (!isPrimaryPurchase && !isMarketPurchase && !isSale) return;

    const eventId = String(target.dataset.eventId || "");
    const quantity = Math.max(1, Math.floor(Number(formData.get("quantity") || 1)));
    const selectedEvent = availableEvents.find((item) => item.id === eventId);
    if (!selectedEvent) return;

    const quote = isPrimaryPurchase
      ? { cost: selectedEvent.unitPrice * quantity }
      : isMarketPurchase
      ? getAmmBuyQuote(selectedEvent, quantity)
      : getAmmSellQuote(selectedEvent, quantity);
    if (!quote) {
      studentTokenMarketMessage = isMarketPurchase
        ? "해당 수량은 현재 매수할 수 없습니다."
        : "해당 수량은 현재 매도할 수 없습니다.";
      renderTokenMarket();
      return;
    }

    const confirmed = await showPurchaseConfirm(
      isPrimaryPurchase
        ? `${selectedEvent.title} ${quantity}개를 ${quote.cost.toLocaleString()}P에 구매하시겠습니까? 납부자만 가능합니다.`
        : isMarketPurchase
        ? `${selectedEvent.title} ${quantity}개를 예상 ${quote.cost.toLocaleString()}P에 매수하시겠습니까? 체결 후 가격이 변합니다.`
        : `${selectedEvent.title} ${quantity}개를 예상 ${quote.payout.toLocaleString()}P에 매도하시겠습니까? 체결 후 가격이 변합니다.`
    );

    if (!confirmed) {
      studentTokenMarketMessage =
        isPrimaryPurchase || isMarketPurchase ? "구매가 취소되었습니다." : "매도가 취소되었습니다.";
      renderTokenMarket();
      return;
    }

    try {
      const data = await eventsApiRequest(
        isPrimaryPurchase ? "/purchase" : isMarketPurchase ? "/market/purchase" : "/market/sell",
        {
        method: "POST",
        body: JSON.stringify({
          eventId,
          quantity
        })
        }
      );
      applyStudentStateResponse({ state: data.state });
      state = buildStudentState();
      studentTokenMarketMessage = isPrimaryPurchase
        ? `${selectedEvent.title} ${quantity}개 1차 구매가 완료되었습니다.`
        : isMarketPurchase
        ? `${selectedEvent.title} ${quantity}개 세컨더리 매수가 완료되었습니다.`
        : `${selectedEvent.title} ${quantity}개 매도가 완료되었습니다.`;
      renderStatus();
      renderPointsHistory();
      await syncEventsFromApi();
      renderTokenMarket();
    } catch (error) {
      studentTokenMarketMessage =
        error.message === "paid_membership_required"
          ? "학생회비를 납부한 학생만 토큰 구매가 가능합니다."
          : error.message === "not_enough_points"
          ? "포인트가 부족합니다."
          : error.message === "insufficient_event_inventory" && isPrimaryPurchase
            ? "1차 판매 재고가 부족합니다."
            : error.message === "insufficient_event_inventory"
            ? "현재 풀에서 해당 수량을 매수할 수 없습니다."
            : error.message === "insufficient_event_holdings"
              ? "보유 수량이 부족합니다."
              : error.message === "cannot_sell_event_token"
                ? "현재 조건에서는 매도할 수 없습니다."
                : isPrimaryPurchase
                  ? "토큰 1차 구매 처리 중 오류가 발생했습니다."
                  : isMarketPurchase
                    ? "세컨더리 매수 처리 중 오류가 발생했습니다."
                    : "세컨더리 매도 처리 중 오류가 발생했습니다.";
      renderTokenMarket();
    }
  });

  tokenMarketPanel.addEventListener("click", async (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) return;
    const eventId = target.dataset.deleteEventId;
    if (!eventId || currentRole !== "admin") return;

    try {
      await eventsApiRequest(`/${encodeURIComponent(eventId)}`, {
        method: "DELETE"
      });
      adminTokenMarketMessage = "행사가 삭제되었습니다.";
      await syncEventsFromApi();
      renderTokenMarket();
    } catch (error) {
      adminTokenMarketMessage = "행사 삭제 중 오류가 발생했습니다.";
      renderTokenMarket();
    }
  });
}

if (noticeForm) {
  noticeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (currentRole !== "admin") return;

    const formData = new FormData(noticeForm);
    const title = String(formData.get("title") || "").trim();
    const content = String(formData.get("content") || "").trim();

    if (!title || !content) {
      if (noticeMessage) {
        noticeMessage.textContent = "공지 제목과 내용을 모두 입력해야 합니다.";
      }
      return;
    }

    noticeItems = [
      {
        title,
        content,
        date: formatDate(new Date())
      },
      ...noticeItems
    ];

    if (noticeMessage) {
      noticeMessage.textContent = "공지가 등록되었습니다.";
    }

    noticeForm.reset();
    persistNoticeItems();
    renderNoticeLists();
  });
}

if (operationsForm) {
  operationsForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (currentRole !== "admin") return;

    const operationsTitleInput = operationsForm.elements.namedItem("operations-title");
    const nextTitle =
      operationsTitleInput instanceof HTMLInputElement ? operationsTitleInput.value.trim() : "";

    const nextItems = INITIAL_OPERATIONS_ITEMS.map((item, index) => {
      const labelInput = operationsForm.elements.namedItem(`label-${index}`);
      const valueInput = operationsForm.elements.namedItem(`value-${index}`);
      const label =
        labelInput instanceof HTMLInputElement && labelInput.value.trim()
          ? labelInput.value.trim()
          : item.label;
      const rawValue =
        valueInput instanceof HTMLInputElement ? Number(valueInput.value) : item.value;
      const value = Number.isFinite(rawValue)
        ? Math.max(0, Math.min(100, Math.round(rawValue)))
        : item.value;

      return {
        label,
        value,
        tone: item.tone
      };
    });

    const hasEmptyLabel = nextItems.some((item) => !item.label);
    if (!nextTitle || hasEmptyLabel) {
      if (operationsMessage) {
        operationsMessage.textContent = "전체 제목과 각 항목 이름을 모두 입력해야 합니다.";
      }
      return;
    }

    try {
      const data = await operationsApiRequest("", {
        method: "POST",
        body: JSON.stringify({ title: normalizeOperationsTitle(nextTitle), items: nextItems })
      });
      operationsTitle = normalizeOperationsTitle(data?.title);
      operationsItems = normalizeOperationsItems(data?.items);
      renderOperationsCard();
      populateOperationsForm();

      if (operationsMessage) {
        operationsMessage.textContent = "운영 내역이 저장되었습니다.";
      }
    } catch (error) {
      if (operationsMessage) {
        operationsMessage.textContent = "운영 내역 저장 중 오류가 발생했습니다.";
      }
    }
  });
}

if (pollForm) {
  pollForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (currentRole !== "admin") return;

    const formData = new FormData(pollForm);
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const options = String(formData.get("options") || "")
      .split("\n")
      .map((option) => option.trim())
      .filter(Boolean);

    if (!title || options.length < 2) {
      if (pollMessage) {
        pollMessage.textContent = "안건 제목과 2개 이상의 선택지를 입력해야 합니다.";
      }
      return;
    }

    const nextPoll = {
      id: createPollId(),
      title,
      description,
      options,
      url: "",
      createdAt: formatDate(new Date()),
      voteCount: 0,
      optionCounts: options.map(() => 0)
    };

    governancePolls = [nextPoll, ...governancePolls];
    persistGovernancePolls();

    if (governanceApiUrl) {
      try {
        await governanceApiRequest("/api/governance/polls", {
          method: "POST",
          body: JSON.stringify(nextPoll)
        });
        void syncGovernanceFromApi();
      } catch (error) {
        console.error("Governance API create poll failed:", error);
        if (pollMessage) {
          pollMessage.textContent = "투표 생성은 됐지만 Redis 저장에는 실패했습니다.";
        }
        renderGovernanceList();
        return;
      }
    }

    renderGovernanceList();
    state = buildAdminState();
    renderStatus();

    if (pollMessage) {
      pollMessage.textContent = "직접 투표 안건이 등록되었습니다.";
    }

    pollForm.reset();
  });
}

if (adminNoticeList) {
  adminNoticeList.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) return;
    if (currentRole !== "admin") return;

    const index = target.dataset.noticeIndex;
    if (typeof index === "undefined") return;

    noticeItems.splice(Number(index), 1);

    if (noticeMessage) {
      noticeMessage.textContent = "공지가 삭제되었습니다.";
    }

    persistNoticeItems();
    renderNoticeLists();
  });
}

if (governanceList) {
  governanceList.addEventListener("click", async (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) return;

    const pollIndex = target.dataset.pollIndex;
    if (currentRole === "admin" && typeof pollIndex !== "undefined") {
      const poll = governancePolls[Number(pollIndex)];
      if (!poll) return;

      governancePolls.splice(Number(pollIndex), 1);
      persistGovernancePolls();
      if (governanceApiUrl) {
        try {
          await governanceApiRequest(`/api/governance/polls/${encodeURIComponent(poll.id)}`, {
            method: "DELETE"
          });
          void syncGovernanceFromApi();
        } catch (error) {
          console.error("Governance API delete poll failed:", error);
          if (pollMessage) {
            pollMessage.textContent = "투표 삭제는 됐지만 Redis 반영에는 실패했습니다.";
          }
          renderGovernanceList();
          return;
        }
      }
      state = buildAdminState();
      renderStatus();
      renderGovernanceList();
      if (pollMessage) {
        pollMessage.textContent = "투표가 삭제되었습니다.";
      }
      return;
    }
  });

  governanceList.addEventListener("change", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) return;
    if (target.type !== "radio" || !target.name.startsWith("option-")) return;

    governanceVoteSelections[target.name.slice(7)] = target.value;
  });

  governanceList.addEventListener("submit", async (event) => {
    const target = event.target;

    if (!(target instanceof HTMLFormElement)) return;
    if (!target.classList.contains("governance-vote-form")) return;

    event.preventDefault();

    const pollId = target.dataset.pollId;
    if (currentRole !== "student" || !pollId) return;

    const poll = governancePolls.find((item) => item.id === pollId);
    if (!poll) return;

    if (studentGovernanceState.votedPollIds.includes(pollId)) return;
    if (studentGovernanceState.tokens < 1) return;
    const selectedValue = governanceVoteSelections[pollId];
    const optionIndex = Number(selectedValue);
    if (!Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex >= poll.options.length) {
      if (pollMessage) {
        pollMessage.textContent = "투표할 선택지를 먼저 골라야 합니다.";
      }
      return;
    }

    if (governanceApiUrl) {
      try {
        await governanceApiRequest("/api/governance/vote", {
          method: "POST",
          body: JSON.stringify({
            pollId,
            optionIndex
          })
        });
        await syncStudentStateFromApi();
        await syncGovernanceFromApi();
      } catch (error) {
        console.error("Governance API vote failed:", error);
        if (pollMessage) {
          pollMessage.textContent =
            error.message === "not_enough_tokens"
              ? "거버넌스 코인이 부족합니다."
              : "투표 저장 중 오류가 발생했습니다.";
        }
        renderGovernanceList();
        return;
      }
    }

    state = buildStudentState();
    renderStatus();
    renderGovernanceList();
    if (pollMessage) {
      pollMessage.textContent = "투표 결과가 저장되었습니다.";
    }
  });
}

if (governanceEarnButton) {
  governanceEarnButton.addEventListener("click", async () => {
    if (currentRole !== "student") return;

    try {
      const data = await studentApiRequest("/api/student/governance/earn", {
        method: "POST"
      });
      applyStudentStateResponse(data);
      state = buildStudentState();
      renderStatus();
      renderGovernanceList();

      if (pollMessage) {
        pollMessage.textContent = "거버넌스 코인 1개를 지급했습니다.";
      }
    } catch (error) {
      console.error("Governance token earn failed:", error);
    }
  });
}

if (confirmModal) {
  confirmModal.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.dataset.confirmClose === "true") {
      hidePurchaseConfirm(false);
    }
  });
}

if (confirmModalCancelButton) {
  confirmModalCancelButton.addEventListener("click", () => {
    hidePurchaseConfirm(false);
  });
}

if (confirmModalConfirmButton) {
  confirmModalConfirmButton.addEventListener("click", () => {
    hidePurchaseConfirm(true);
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      await authApiRequest("/api/auth/logout", {
        method: "POST"
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    if (dashboardPage) dashboardPage.classList.add("is-hidden");
    if (loginPage) loginPage.classList.remove("is-hidden");
    if (loginMessage) loginMessage.textContent = "";
    currentRole = "student";
    currentUserId = "";
    availableEvents = [];
    resetTransientUiState();
    adminStudentStats = {
      totalStudents: 0,
      totalPaidStudents: 0,
      totalGrantedPoints: 0
    };
    paymentState = loadPaymentState();
    studentTokenMarketState = loadTokenMarketState();
    studentGovernanceState = loadStudentGovernanceState();
    governanceVoteSelections = {};
    applyRoleLayout(currentRole);
    resetScenario(roleConfigs[currentRole].defaultMode);
    switchView("dashboard");

    if (loginForm) loginForm.reset();
    if (loginUserIdInput) {
      loginUserIdInput.value = loadRememberedUserId();
    }
    if (rememberIdCheckbox) {
      rememberIdCheckbox.checked = Boolean(loadRememberedUserId());
    }
    if (loginPasswordInput) {
      loginPasswordInput.value = "";
    }
    updateDocumentTitle(false);
  });
}

function openRegisterPanel(event) {
  event.preventDefault();
  setRegisterFormOpen(registerForm?.classList.contains("is-hidden"));
  if (!registerForm?.classList.contains("is-hidden")) {
    registerUserIdInput?.focus();
  }
}

if (openRegisterButton) {
  openRegisterButton.addEventListener("click", openRegisterPanel);
}

if (registerLink) {
  registerLink.addEventListener("click", openRegisterPanel);
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const userId = String(formData.get("userId") || "").trim();
    const password = String(formData.get("password") || "").trim();
    const rememberId = Boolean(formData.get("rememberId"));

    if (!userId || !password) {
      if (loginMessage) {
        loginMessage.textContent = "아이디와 비밀번호를 모두 입력해야 합니다.";
      }
      return;
    }

    if (loginSubmitButton) {
      loginSubmitButton.disabled = true;
    }

    try {
      const data = await authApiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          userId,
          password
        })
      });

      if (loginMessage) {
        loginMessage.textContent = "";
      }

      persistRememberedUserId(rememberId ? userId : "");

      currentUserId = data.user.userId;
      currentRole = data.user.role;
      resetTransientUiState();
      hydrateStudentLocalState();
      applyRoleLayout(currentRole);
      resetScenario(roleConfigs[currentRole].defaultMode);
      switchView("dashboard");
      await syncOperationsFromApi();

      if (loginPage) loginPage.classList.add("is-hidden");
      if (dashboardPage) dashboardPage.classList.remove("is-hidden");
      if (loginPasswordInput) {
        loginPasswordInput.value = "";
      }
      updateDocumentTitle(true);

      if (currentRole === "student") {
        await syncStudentStateFromApi();
      } else {
        await syncAdminStudentStatsFromApi();
        await syncStudentManagementUsersFromApi();
        await syncStudentManagementLogsFromApi();
      }
      await syncEventsFromApi();
      void syncGovernanceFromApi();
    } catch (error) {
      if (loginMessage) {
        loginMessage.textContent =
          error.message === "invalid_credentials"
            ? "아이디 또는 비밀번호가 올바르지 않습니다."
            : "로그인 처리 중 오류가 발생했습니다.";
      }
    } finally {
      if (loginSubmitButton) {
        loginSubmitButton.disabled = false;
      }
    }
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const userId = String(formData.get("userId") || "").trim();
    const password = String(formData.get("password") || "").trim();
    const confirmPassword = String(formData.get("confirmPassword") || "").trim();

    if (registerSubmitButton) {
      registerSubmitButton.disabled = true;
    }

    try {
      const data = await authApiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          userId,
          password,
          confirmPassword
        })
      });

      if (registerMessage) {
        registerMessage.textContent = `학생 계정 ${data.user.userId} 생성이 완료되었습니다. 이제 로그인할 수 있습니다.`;
      }

      if (loginUserIdInput) {
        loginUserIdInput.value = data.user.userId;
      }
      if (rememberIdCheckbox) {
        rememberIdCheckbox.checked = true;
      }
      persistRememberedUserId(data.user.userId);
      registerForm.reset();
      if (loginPasswordInput) {
        loginPasswordInput.value = "";
      }
      loginPasswordInput?.focus();
    } catch (error) {
      if (registerMessage) {
        registerMessage.textContent = getRegisterErrorMessage(error.message);
      }
    } finally {
      if (registerSubmitButton) {
        registerSubmitButton.disabled = false;
      }
    }
  });
}

async function initializeApp() {
  noticeItems = loadNoticeItems();
  operationsItems = cloneInitialOperationsItems();
  paymentState = loadPaymentState();
  governancePolls = loadGovernancePolls();
  studentTokenMarketState = loadTokenMarketState();
  studentGovernanceState = loadStudentGovernanceState();
  resetTransientUiState();

  const rememberedUserId = loadRememberedUserId();
  if (loginUserIdInput) {
    loginUserIdInput.value = rememberedUserId;
  }
  if (rememberIdCheckbox) {
    rememberIdCheckbox.checked = Boolean(rememberedUserId);
  }
  updateDocumentTitle(false);

  applyRoleLayout(currentRole);
  resetScenario(roleConfigs[currentRole].defaultMode);
  switchView("dashboard");

  try {
    const data = await authApiRequest("/api/auth/session", {
      method: "GET"
    });

    if (!data.authenticated || !data.user) {
      return;
    }

    currentUserId = data.user.userId;
    currentRole = data.user.role;
    resetTransientUiState();
    hydrateStudentLocalState();
    applyRoleLayout(currentRole);
    resetScenario(roleConfigs[currentRole].defaultMode);
    switchView("dashboard");
    await syncOperationsFromApi();

    if (loginPage) loginPage.classList.add("is-hidden");
    if (dashboardPage) dashboardPage.classList.remove("is-hidden");
    updateDocumentTitle(true);

    if (currentRole === "student") {
      await syncStudentStateFromApi();
    } else {
      await syncAdminStudentStatsFromApi();
      await syncStudentManagementUsersFromApi();
      await syncStudentManagementLogsFromApi();
    }
    await syncEventsFromApi();
    void syncGovernanceFromApi();
  } catch (error) {
    console.error("Session restore failed:", error);
  }
}

void initializeApp();
