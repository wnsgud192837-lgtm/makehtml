const loginForm = document.querySelector("#login-form");
const loginPage = document.querySelector("#login-page");
const dashboardPage = document.querySelector("#dashboard-page");
const loginMessage = document.querySelector("#login-message");
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
const placeholderView = document.querySelector("#placeholder-view");
const placeholderTitle = document.querySelector("#placeholder-title");
const placeholderText = document.querySelector("#placeholder-text");
const noticeAdminPanel = document.querySelector("#notice-admin-panel");
const noticeForm = document.querySelector("#notice-form");
const noticeMessage = document.querySelector("#notice-message");
const adminNoticeList = document.querySelector("#admin-notice-list");
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
      title: "공지 및 배너 관리",
      text: "납부 전환 안내, 비교 배너, 캠페인 문구를 관리자 모드에서 운영할 수 있습니다."
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

const adminState = {
  points: 412000,
  tokens: 87,
  character: "운영자",
  grade: "관리자",
  avatar: "AD",
  paymentStatus: "128명 완료",
  paymentMeta: "납부 현황 페이지 열기",
  market: "운영 중",
  rental: "24건 예약",
  vote: "3건 진행",
  carry: "정상",
  pointsMeta: "이번 학기 누적 지급 포인트",
  tokenMeta: "운영 중인 거버넌스 토큰 수량",
  pointHistory: [
    {
      title: "학생회비 납부 리워드 일괄 지급",
      date: "2026.04.18",
      amount: 248000,
      type: "earn"
    },
    {
      title: "행사 체크인 포인트 정산",
      date: "2026.04.16",
      amount: 94000,
      type: "earn"
    },
    {
      title: "운영 보정 차감",
      date: "2026.04.15",
      amount: -12000,
      type: "use"
    }
  ]
};

let noticeItems = [
  {
    title: "2026 봄축제 체크인 안내",
    content: "4월 12일 13시부터 학생회관 앞 부스에서 QR 체크인이 진행됩니다.",
    date: "2026.04.20"
  },
  {
    title: "학생회비 납부 리워드 지급",
    content: "학생회비를 납부하면 즉시 31,000포인트가 지급됩니다.",
    date: "2026.04.20"
  },
  {
    title: "대여사업 오픈 예정",
    content: "프린터, 계산기, 우산 대여 서비스가 4월 24일에 오픈합니다.",
    date: "2026.04.18"
  }
];

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
let currentCalendarMonth = highlightedMonth >= 0 ? highlightedMonth : 3;
let activeStepIndex = 0;
let completedSteps = new Set();
let state = { ...baseState };

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
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
}

function resetScenario(mode) {
  currentMode = mode;
  activeStepIndex = 0;
  completedSteps = new Set();
  state =
    currentRole === "admin"
      ? {
          ...adminState,
          pointHistory: adminState.pointHistory.map((entry) => ({ ...entry }))
        }
      : { ...baseState, pointHistory: [] };
  updateModeButtons();
  renderStatus();
  renderCalendar();
  renderPointsHistory();
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

  if (statusGrid) statusGrid.classList.toggle("is-hidden", !isDashboard);
  if (dashboardView) dashboardView.classList.toggle("is-hidden", !isDashboard);
  if (pointsView) pointsView.classList.toggle("is-hidden", !isPoints);
  if (placeholderView) placeholderView.classList.toggle("is-hidden", isDashboard || isPoints);

  if (!isDashboard && !isPoints) {
    const copy = placeholderCopy[currentRole]?.[view];
    if (placeholderTitle && copy) placeholderTitle.textContent = copy.title;
    if (placeholderText && copy) placeholderText.textContent = copy.text;
  }

  const isAdminNoticeView = currentRole === "admin" && view === "market";

  if (noticeAdminPanel) {
    noticeAdminPanel.classList.toggle("is-hidden", !isAdminNoticeView);
  }

  if (placeholderText) {
    placeholderText.classList.toggle("is-hidden", isAdminNoticeView);
  }
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
  const noticeMarkup = noticeItems
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

  if (heroNoticeList) {
    heroNoticeList.innerHTML = noticeMarkup;
  }

  if (adminNoticeList) {
    adminNoticeList.innerHTML = noticeMarkup;
  }
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

  const isSettled =
    state.paymentStatus === "납부 완료" || state.paymentStatus === "납부 전환";

  if (isSettled) return;

  state.paymentStatus = "납부 완료";
  state.paymentMeta = "31,000포인트 지급 완료";
  state.points += 31000;
  state.pointsMeta = "학생회비 납부로 31,000P 지급";

  state.pointHistory.push({
    title: "학생회비 납부 리워드 지급",
    date: formatDate(new Date()),
    amount: 31000,
    type: "earn"
  });

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
    renderNoticeLists();
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    if (dashboardPage) dashboardPage.classList.add("is-hidden");
    if (loginPage) loginPage.classList.remove("is-hidden");
    if (loginForm) loginForm.reset();
    if (loginMessage) loginMessage.textContent = "";
    currentRole = "student";
    applyRoleLayout(currentRole);
    resetScenario(roleConfigs[currentRole].defaultMode);
    switchView("dashboard");
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const userId = String(formData.get("userId") || "").trim();
    const password = String(formData.get("password") || "").trim();

    let nextRole = "";

    if (userId === "admin" && password === "admin") {
      nextRole = "admin";
    } else if (userId === "student" && password === "student") {
      nextRole = "student";
    }

    if (!nextRole) {
      if (loginMessage) {
        loginMessage.textContent = "아이디 또는 비밀번호가 올바르지 않습니다.";
      }
      return;
    }

    if (loginMessage) {
      loginMessage.textContent = "";
    }

    currentRole = nextRole;
    applyRoleLayout(currentRole);
    resetScenario(roleConfigs[currentRole].defaultMode);
    switchView("dashboard");

    if (loginPage) loginPage.classList.add("is-hidden");
    if (dashboardPage) dashboardPage.classList.remove("is-hidden");
  });
}

applyRoleLayout(currentRole);
resetScenario(roleConfigs[currentRole].defaultMode);
switchView("dashboard");
