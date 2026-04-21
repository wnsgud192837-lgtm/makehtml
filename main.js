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
const appRoleSubtitle = document.querySelector("#app-role-subtitle");
const heroKicker = document.querySelector("#hero-kicker");
const heroTitle = document.querySelector("#hero-title");
const heroDescription = document.querySelector("#hero-description");
const heroNoticeList = document.querySelector("#hero-notice-list");
const heroActions = document.querySelector("#hero-actions");
const statusGrid = document.querySelector("#status-grid");
const dashboardView = document.querySelector("#dashboard-view");
const pointsView = document.querySelector("#points-view");
const tokenView = document.querySelector("#token-view");
const tokenMarketPanel = document.querySelector("#token-market-panel");
const placeholderView = document.querySelector("#placeholder-view");
const placeholderTitle = document.querySelector("#placeholder-title");
const placeholderText = document.querySelector("#placeholder-text");
const noticeAdminPanel = document.querySelector("#notice-admin-panel");
const noticeAdminEditor = document.querySelector("#notice-admin-editor");
const noticeForm = document.querySelector("#notice-form");
const noticeMessage = document.querySelector("#notice-message");
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
const NOTICE_STORAGE_KEY = "postech_notice_items";
const PAYMENT_STORAGE_KEY = "postech_payment_state";
const POLL_STORAGE_KEY = "postech_governance_polls";
const STUDENT_GOVERNANCE_STORAGE_KEY = "postech_student_governance";
const TOKEN_MARKET_STORAGE_KEY = "postech_token_market_state";
const REMEMBER_ID_STORAGE_KEY = "postech_remembered_user_id";
const INITIAL_TOKEN_MARKET_STATE = {
  pointReserve: 24000,
  eventTokenReserve: 12,
  userEventTokens: 0,
  pointDelta: 0,
  purchaseHistory: []
};

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
      points: "포인트",
      tokens: "토큰",
      market: "세컨더리 마켓",
      governance: "거버넌스",
      rental: "대여사업"
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
      rental: "대여 관리"
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
let governancePolls = [];
let studentTokenMarketState = cloneInitialTokenMarketState();
let studentGovernanceState = {
  tokens: 1,
  votedPollIds: []
};
let governanceVoteSelections = {};
let tokenMarketMessage = "";

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
    persistStudentGovernanceState();

    state = currentRole === "admin" ? buildAdminState() : buildStudentState();
    renderStatus();
    renderGovernanceList();
    return true;
  } catch (error) {
    console.error("Governance API sync failed:", error);
    return false;
  }
}

function cloneInitialTokenMarketState() {
  return {
    pointReserve: INITIAL_TOKEN_MARKET_STATE.pointReserve,
    eventTokenReserve: INITIAL_TOKEN_MARKET_STATE.eventTokenReserve,
    userEventTokens: INITIAL_TOKEN_MARKET_STATE.userEventTokens,
    pointDelta: INITIAL_TOKEN_MARKET_STATE.pointDelta,
    purchaseHistory: []
  };
}

function loadTokenMarketState() {
  if (typeof window === "undefined") return cloneInitialTokenMarketState();

  const raw = window.localStorage.getItem(TOKEN_MARKET_STORAGE_KEY);
  if (!raw) return cloneInitialTokenMarketState();

  try {
    const parsed = JSON.parse(raw);
    const pointReserve =
      Number.isFinite(parsed?.pointReserve) && parsed.pointReserve > 0
        ? Math.floor(parsed.pointReserve)
        : INITIAL_TOKEN_MARKET_STATE.pointReserve;
    const eventTokenReserve =
      Number.isFinite(parsed?.eventTokenReserve) && parsed.eventTokenReserve > 0
        ? Math.floor(parsed.eventTokenReserve)
        : INITIAL_TOKEN_MARKET_STATE.eventTokenReserve;
    const userEventTokens =
      Number.isFinite(parsed?.userEventTokens) && parsed.userEventTokens >= 0
        ? Math.floor(parsed.userEventTokens)
        : 0;
    const pointDelta =
      Number.isFinite(parsed?.pointDelta)
        ? Math.floor(parsed.pointDelta)
        : 0;
    const purchaseHistory = Array.isArray(parsed?.purchaseHistory)
      ? parsed.purchaseHistory.filter(
          (item) =>
            item &&
            typeof item.title === "string" &&
            typeof item.date === "string" &&
            Number.isFinite(item.amount) &&
            typeof item.type === "string"
        )
      : [];

    return {
      pointReserve,
      eventTokenReserve,
      userEventTokens,
      pointDelta,
      purchaseHistory
    };
  } catch {
    return cloneInitialTokenMarketState();
  }
}

function persistTokenMarketState() {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    TOKEN_MARKET_STORAGE_KEY,
    JSON.stringify(studentTokenMarketState)
  );
}

function getTokenMarketSpotPrice() {
  return studentTokenMarketState.pointReserve / studentTokenMarketState.eventTokenReserve;
}

function getTokenBuyQuote(quantity) {
  const normalizedQuantity = Math.max(1, Math.floor(quantity));
  const { pointReserve, eventTokenReserve } = studentTokenMarketState;

  if (normalizedQuantity >= eventTokenReserve) {
    return null;
  }

  const invariant = pointReserve * eventTokenReserve;
  const nextEventTokenReserve = eventTokenReserve - normalizedQuantity;
  const exactNextPointReserve = invariant / nextEventTokenReserve;
  const cost = Math.ceil(exactNextPointReserve - pointReserve);

  return {
    quantity: normalizedQuantity,
    cost,
    nextPointReserve: pointReserve + cost,
    nextEventTokenReserve,
    nextInvariant: (pointReserve + cost) * nextEventTokenReserve
  };
}

function getTokenSellQuote(quantity) {
  const normalizedQuantity = Math.max(1, Math.floor(quantity));
  const { pointReserve, eventTokenReserve } = studentTokenMarketState;

  if (normalizedQuantity > studentTokenMarketState.userEventTokens) {
    return null;
  }

  const invariant = pointReserve * eventTokenReserve;
  const nextEventTokenReserve = eventTokenReserve + normalizedQuantity;
  const exactNextPointReserve = invariant / nextEventTokenReserve;
  const payout = Math.floor(pointReserve - exactNextPointReserve);

  if (payout <= 0) {
    return null;
  }

  return {
    quantity: normalizedQuantity,
    payout,
    nextPointReserve: pointReserve - payout,
    nextEventTokenReserve,
    nextInvariant: (pointReserve - payout) * nextEventTokenReserve
  };
}

function getMaxPurchasableTokens(balance) {
  let quantity = 0;

  while (true) {
    const nextQuantity = quantity + 1;
    const quote = getTokenBuyQuote(nextQuantity);
    if (!quote || quote.cost > balance) break;
    quantity = nextQuantity;
  }

  return quantity;
}

function renderTokenMarket() {
  if (!tokenMarketPanel) return;

  if (currentRole !== "student") {
    tokenMarketPanel.innerHTML = "";
    return;
  }

  const spotPrice = getTokenMarketSpotPrice();
  const oneTokenQuote = getTokenBuyQuote(1);
  const twoTokenQuote = getTokenBuyQuote(2);
  const oneTokenSellQuote = getTokenSellQuote(1);
  const maxPurchasable = getMaxPurchasableTokens(state.points);

  tokenMarketPanel.innerHTML = `
    <header class="panel-titlebar token-market-header">
      <div>
        <p class="panel-kicker">AMM Market</p>
        <h3>해맞이 한마당 토큰 시장</h3>
      </div>
      <div class="progress-chip">x * y = ${(
        studentTokenMarketState.pointReserve * studentTokenMarketState.eventTokenReserve
      ).toLocaleString()}</div>
    </header>

    <div class="token-market-grid">
      <section class="token-market-card token-market-card-primary">
        <p class="token-market-eyebrow">Constant Product Pool</p>
        <strong class="token-market-title">포인트로 해맞이 한마당 토큰을 바로 매수</strong>
        <p class="detail-text token-market-copy">
          현재 풀은 <b>x = 포인트 준비금</b>, <b>y = 행사 토큰 준비금</b> 구조로 동작합니다.
          학생이 토큰을 매수하면 풀 안의 행사 토큰이 줄고, 그만큼 다음 가격이 즉시 상승합니다.
        </p>

        <div class="token-market-stats">
          <article>
            <span>내 보유 토큰</span>
            <strong>${studentTokenMarketState.userEventTokens}개</strong>
          </article>
          <article>
            <span>현재 즉시 가격</span>
            <strong>${Math.round(spotPrice).toLocaleString()}P</strong>
          </article>
          <article>
            <span>풀 포인트</span>
            <strong>${studentTokenMarketState.pointReserve.toLocaleString()}P</strong>
          </article>
          <article>
            <span>풀 행사 토큰</span>
            <strong>${studentTokenMarketState.eventTokenReserve}개</strong>
          </article>
        </div>

        <form class="token-buy-form" id="token-buy-form">
          <label class="notice-field">
            <span>구매 수량</span>
            <input
              type="number"
              name="quantity"
              min="1"
              max="${Math.max(1, studentTokenMarketState.eventTokenReserve - 1)}"
              value="1"
            >
          </label>

          <button
            type="submit"
            class="login-button notice-submit"
            ${maxPurchasable < 1 ? "disabled" : ""}
          >
            해맞이 한마당 토큰 구매
          </button>
        </form>

        <form class="token-buy-form" id="token-sell-form">
          <label class="notice-field">
            <span>판매 수량</span>
            <input
              type="number"
              name="quantity"
              min="1"
              max="${Math.max(1, studentTokenMarketState.userEventTokens)}"
              value="1"
            >
          </label>

          <button
            type="submit"
            class="ghost-link token-sell-button"
            ${studentTokenMarketState.userEventTokens < 1 ? "disabled" : ""}
          >
            해맞이 한마당 토큰 판매
          </button>
        </form>

        <p class="login-message token-market-message" id="token-market-message">${escapeHtml(tokenMarketMessage)}</p>
      </section>

      <section class="token-market-card">
        <div class="panel-titlebar panel-titlebar-compact">
          <div>
            <p class="panel-kicker">실시간 시세</p>
            <h3>구매 직후 가격 변화</h3>
          </div>
          <button type="button" class="ghost-link token-reset-button" data-token-market-reset="true">풀 리셋</button>
        </div>

        <ul class="market-list token-quote-list">
          <li>
            <span>지금 1개 매수 시 예상 비용</span>
            <strong>${oneTokenQuote ? `${oneTokenQuote.cost.toLocaleString()}P` : "유동성 부족"}</strong>
          </li>
          <li>
            <span>지금 2개 매수 시 예상 비용</span>
            <strong>${twoTokenQuote ? `${twoTokenQuote.cost.toLocaleString()}P` : "유동성 부족"}</strong>
          </li>
          <li>
            <span>지금 1개 판매 시 예상 회수</span>
            <strong>${oneTokenSellQuote ? `${oneTokenSellQuote.payout.toLocaleString()}P` : "판매 불가"}</strong>
          </li>
          <li>
            <span>현재 잔액으로 매수 가능 수량</span>
            <strong>${maxPurchasable}개</strong>
          </li>
          <li>
            <span>다음 1개 매수 후 풀 상태</span>
            <strong>${
              oneTokenQuote
                ? `${oneTokenQuote.nextPointReserve.toLocaleString()}P / ${oneTokenQuote.nextEventTokenReserve}개`
                : "구매 불가"
            }</strong>
          </li>
        </ul>
      </section>
    </div>
  `;
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

function loadPaymentState() {
  if (typeof window === "undefined") return { studentPaid: false, paidAt: "" };

  const raw = window.localStorage.getItem(PAYMENT_STORAGE_KEY);
  if (!raw) return { studentPaid: false, paidAt: "" };

  try {
    const parsed = JSON.parse(raw);

    return {
      studentPaid: Boolean(parsed?.studentPaid),
      paidAt: typeof parsed?.paidAt === "string" ? parsed.paidAt : ""
    };
  } catch {
    return { studentPaid: false, paidAt: "" };
  }
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
  if (typeof window === "undefined") {
    return { tokens: 1, votedPollIds: [] };
  }

  const raw = window.localStorage.getItem(STUDENT_GOVERNANCE_STORAGE_KEY);
  if (!raw) {
    return { tokens: 1, votedPollIds: [] };
  }

  try {
    const parsed = JSON.parse(raw);

    return {
      tokens:
        Number.isFinite(parsed?.tokens) && parsed.tokens >= 0
          ? Math.floor(parsed.tokens)
          : 1,
      votedPollIds: Array.isArray(parsed?.votedPollIds)
        ? parsed.votedPollIds.filter((item) => typeof item === "string")
        : []
    };
  } catch {
    return { tokens: 1, votedPollIds: [] };
  }
}

function persistStudentGovernanceState() {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    STUDENT_GOVERNANCE_STORAGE_KEY,
    JSON.stringify(studentGovernanceState)
  );
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
  if (typeof window === "undefined") return;

  window.localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(paymentState));
}

function buildAdminState() {
  const totalPaidStudents = paymentState.studentPaid ? 1 : 0;
  const totalGrantedPoints = paymentState.studentPaid ? 31000 : 0;
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
        : "학생회비 납부 1건이 반영되었습니다.",
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
              date: paymentState.paidAt || formatDate(new Date()),
              amount: 31000,
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

  if (!roleConfig) return;

  if (appRoleSubtitle) appRoleSubtitle.textContent = roleConfig.subtitle;
  if (heroKicker) heroKicker.textContent = roleConfig.heroKicker;
  if (heroTitle) heroTitle.textContent = roleConfig.heroTitle;
  if (heroDescription) heroDescription.textContent = roleConfig.heroDescription;
  if (heroDescription) heroDescription.classList.toggle("is-hidden", role === "student");
  if (heroNoticeList) heroNoticeList.classList.toggle("is-hidden", role !== "student");
  if (paymentLabel) paymentLabel.textContent = roleConfig.labels.payment;
  if (pointsLabel) pointsLabel.textContent = roleConfig.labels.points;
  if (tokenLabel) tokenLabel.textContent = roleConfig.labels.token;
  if (heroActions) heroActions.classList.toggle("is-hidden", !roleConfig.showModeButtons);

  navItems.forEach((item) => {
    const view = item.dataset.view;
    if (view && roleConfig.nav[view]) {
      item.textContent = roleConfig.nav[view];
    }
  });

  renderNoticeLists();
  renderGovernanceList();
  renderTokenMarket();
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
  currentView = view;
  navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === view);
  });

  const isDashboard = view === "dashboard";
  const isPoints = view === "points";
  const isStudentMarketView = currentRole === "student" && view === "market";

  if (statusGrid) statusGrid.classList.toggle("is-hidden", !isDashboard);
  if (dashboardView) dashboardView.classList.toggle("is-hidden", !isDashboard);
  if (pointsView) pointsView.classList.toggle("is-hidden", !isPoints);
  if (tokenView) tokenView.classList.toggle("is-hidden", !isStudentMarketView);
  if (placeholderView) {
    placeholderView.classList.toggle("is-hidden", isDashboard || isPoints || isStudentMarketView);
  }

  if (!isDashboard && !isPoints && !isStudentMarketView) {
    const copy = placeholderCopy[currentRole]?.[view];
    if (placeholderTitle && copy) placeholderTitle.textContent = copy.title;
    if (placeholderText && copy) placeholderText.textContent = copy.text;
  }

  const isAdminNoticeView = currentRole === "admin" && view === "market";
  const isGovernanceView = view === "governance";
  const isAdminGovernanceView = currentRole === "admin" && isGovernanceView;
  const isStudentGovernanceView = currentRole === "student" && isGovernanceView;
  const isStudentDashboardNoticeView = currentRole === "student" && isDashboard;

  if (heroNoticeList) {
    heroNoticeList.classList.toggle("is-hidden", !isStudentDashboardNoticeView);
  }

  if (heroDescription) {
    heroDescription.classList.toggle("is-hidden", currentRole === "student" || isAdminNoticeView || isGovernanceView);
  }

  if (noticeAdminPanel) {
    noticeAdminPanel.classList.toggle("is-hidden", !isAdminNoticeView);
  }

  if (noticeAdminEditor) {
    noticeAdminEditor.classList.toggle("is-hidden", !isAdminNoticeView);
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

  if (placeholderText) {
    placeholderText.classList.toggle("is-hidden", isAdminNoticeView || isGovernanceView);
  }

  if (noticeMessage && !isAdminNoticeView) {
    noticeMessage.textContent = "";
  }

  if (noticeForm && !isAdminNoticeView) {
    noticeForm.reset();
  }

  if (pollMessage && !isAdminGovernanceView) {
    pollMessage.textContent = "";
  }

  if (pollForm && !isAdminGovernanceView) {
    pollForm.reset();
  }

  renderGovernanceList();
  renderTokenMarket();
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
    heroNoticeList.innerHTML =
      noticeItems.length === 0
        ? `
          <li class="notice-item notice-empty">
            <strong>현재 등록된 공지가 없습니다.</strong>
            <p>새 공지는 관리자 계정의 공지 관리 메뉴에서 등록됩니다.</p>
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
  }

  if (adminNoticeList) {
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
  }
}

function renderGovernanceList() {
  if (!governanceList) return;

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

function handleStudentPayment() {
  if (currentRole !== "student") return;

  const isSettled = paymentState.studentPaid;

  if (isSettled) return;

  paymentState = {
    studentPaid: true,
    paidAt: formatDate(new Date())
  };
  persistPaymentState();

  state = buildStudentState();

  renderStatus();
  renderPointsHistory();
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
  paymentButton.addEventListener("click", () => {
    handleStudentPayment();
  });
}

if (tokenMarketPanel) {
  tokenMarketPanel.addEventListener("submit", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLFormElement)) return;

    event.preventDefault();

    if (currentRole !== "student") return;

    const formData = new FormData(target);
    const quantity = Math.max(1, Math.floor(Number(formData.get("quantity") || 1)));

    if (target.id === "token-buy-form") {
      const quote = getTokenBuyQuote(quantity);

      if (!quote) {
        tokenMarketMessage = "풀에 남은 해맞이 한마당 토큰이 부족합니다.";
        renderTokenMarket();
        return;
      }

      if (state.points < quote.cost) {
        tokenMarketMessage = "포인트가 부족해 해당 수량을 구매할 수 없습니다.";
        renderTokenMarket();
        return;
      }

      studentTokenMarketState = {
        ...studentTokenMarketState,
        pointReserve: quote.nextPointReserve,
        eventTokenReserve: quote.nextEventTokenReserve,
        userEventTokens: studentTokenMarketState.userEventTokens + quantity,
        pointDelta: studentTokenMarketState.pointDelta - quote.cost,
        purchaseHistory: [
          {
            title: `해맞이 한마당 토큰 ${quantity}개 구매`,
            date: formatDate(new Date()),
            amount: -quote.cost,
            type: "use"
          },
          ...studentTokenMarketState.purchaseHistory
        ]
      };

      persistTokenMarketState();
      state = buildStudentState();
      tokenMarketMessage = `${quantity}개 구매 완료. 다음 즉시 가격이 상승했습니다.`;
      renderStatus();
      renderPointsHistory();
      renderTokenMarket();
      return;
    }

    if (target.id === "token-sell-form") {
      const quote = getTokenSellQuote(quantity);

      if (!quote) {
        tokenMarketMessage = "보유 토큰이 부족하거나 현재 풀에서 판매할 수 없습니다.";
        renderTokenMarket();
        return;
      }

      studentTokenMarketState = {
        ...studentTokenMarketState,
        pointReserve: quote.nextPointReserve,
        eventTokenReserve: quote.nextEventTokenReserve,
        userEventTokens: studentTokenMarketState.userEventTokens - quantity,
        pointDelta: studentTokenMarketState.pointDelta + quote.payout,
        purchaseHistory: [
          {
            title: `해맞이 한마당 토큰 ${quantity}개 판매`,
            date: formatDate(new Date()),
            amount: quote.payout,
            type: "earn"
          },
          ...studentTokenMarketState.purchaseHistory
        ]
      };

      persistTokenMarketState();
      state = buildStudentState();
      tokenMarketMessage = `${quantity}개 판매 완료. 다음 즉시 가격이 하락했습니다.`;
      renderStatus();
      renderPointsHistory();
      renderTokenMarket();
    }
  });

  tokenMarketPanel.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) return;
    if (!target.dataset.tokenMarketReset) return;

    studentTokenMarketState = cloneInitialTokenMarketState();
    persistTokenMarketState();
    state = buildStudentState();
    tokenMarketMessage = "해맞이 한마당 AMM 풀이 초기 상태로 리셋되었습니다.";
    renderStatus();
    renderPointsHistory();
    renderTokenMarket();
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

    studentGovernanceState = {
      tokens: studentGovernanceState.tokens - 1,
      votedPollIds: [...studentGovernanceState.votedPollIds, pollId]
    };
    persistStudentGovernanceState();

    governancePolls = governancePolls.map((item) =>
      item.id === pollId
        ? {
            ...item,
            voteCount: (item.voteCount || 0) + 1,
            optionCounts: item.options.map((_, index) =>
              index === optionIndex
                ? (item.optionCounts?.[index] || 0) + 1
                : item.optionCounts?.[index] || 0
            )
          }
        : item
    );

    if (governanceApiUrl) {
      try {
        await governanceApiRequest("/api/governance/vote", {
          method: "POST",
          body: JSON.stringify({
            pollId,
            optionIndex,
            currentTokens: studentGovernanceState.tokens + 1
          })
        });
        void syncGovernanceFromApi();
      } catch (error) {
        console.error("Governance API vote failed:", error);
        if (pollMessage) {
          pollMessage.textContent = "투표는 반영됐지만 Redis 저장에는 실패했습니다.";
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
  governanceEarnButton.addEventListener("click", () => {
    if (currentRole !== "student") return;

    studentGovernanceState = {
      ...studentGovernanceState,
      tokens: studentGovernanceState.tokens + 1
    };
    persistStudentGovernanceState();
    state = buildStudentState();
    renderStatus();
    renderGovernanceList();

    if (pollMessage) {
      pollMessage.textContent = "거버넌스 코인 1개를 지급했습니다.";
    }
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
      applyRoleLayout(currentRole);
      resetScenario(roleConfigs[currentRole].defaultMode);
      switchView("dashboard");

      if (loginPage) loginPage.classList.add("is-hidden");
      if (dashboardPage) dashboardPage.classList.remove("is-hidden");
      if (loginPasswordInput) {
        loginPasswordInput.value = "";
      }

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
  paymentState = loadPaymentState();
  governancePolls = loadGovernancePolls();
  studentTokenMarketState = loadTokenMarketState();
  studentGovernanceState = loadStudentGovernanceState();

  const rememberedUserId = loadRememberedUserId();
  if (loginUserIdInput) {
    loginUserIdInput.value = rememberedUserId;
  }
  if (rememberIdCheckbox) {
    rememberIdCheckbox.checked = Boolean(rememberedUserId);
  }

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
    applyRoleLayout(currentRole);
    resetScenario(roleConfigs[currentRole].defaultMode);
    switchView("dashboard");

    if (loginPage) loginPage.classList.add("is-hidden");
    if (dashboardPage) dashboardPage.classList.remove("is-hidden");

    void syncGovernanceFromApi();
  } catch (error) {
    console.error("Session restore failed:", error);
  }
}

void initializeApp();
