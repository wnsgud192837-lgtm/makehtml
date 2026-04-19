const loginForm = document.querySelector("#login-form");
const loginPage = document.querySelector("#login-page");
const dashboardPage = document.querySelector("#dashboard-page");
const loginMessage = document.querySelector("#login-message");
const logoutButton = document.querySelector("#logout-button");
const modeButtons = Array.from(document.querySelectorAll("[data-mode]"));
const stepList = document.querySelector("#step-list");
const flowCode = document.querySelector("#flow-code");
const flowTitle = document.querySelector("#flow-title");
const progressChip = document.querySelector("#progress-chip");
const detailTitle = document.querySelector("#detail-title");
const detailText = document.querySelector("#detail-text");
const stepAction = document.querySelector("#step-action");
const avatarBadge = document.querySelector("#avatar-badge");
const characterName = document.querySelector("#character-name");
const characterGrade = document.querySelector("#character-grade");
const pointsValue = document.querySelector("#points-value");
const pointsMeta = document.querySelector("#points-meta");
const tokenValue = document.querySelector("#token-value");
const tokenMeta = document.querySelector("#token-meta");
const paymentStatus = document.querySelector("#payment-status");
const paymentMeta = document.querySelector("#payment-meta");
const marketPrice = document.querySelector("#market-price");
const rentalStatus = document.querySelector("#rental-status");
const voteStatus = document.querySelector("#vote-status");
const carryStatus = document.querySelector("#carry-status");

const scenarios = {
  payer: {
    code: "12-1",
    title: "납부자 플로우",
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
    title: "미납부자 플로우",
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
        actionLabel: "납부 전환 시뮬레이션",
        apply(state) {
          state.paymentStatus = "납부 전환";
          state.paymentMeta = "합리적 선택으로 전환 완료";
          state.points = 13000;
          state.tokens = 1;
          state.character = "전환 캐릭터";
          state.grade = "입문 등급";
          state.avatar = "N2";
          state.rental = "전환 후 가능";
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
  pointsMeta: "납부 후 즉시 지급",
  tokenMeta: "행사 참여 / 대여 시 지급"
};

let currentMode = "payer";
let activeStepIndex = 0;
let completedSteps = new Set();
let state = { ...baseState };

function resetScenario(mode) {
  currentMode = mode;
  activeStepIndex = 0;
  completedSteps = new Set();
  state = { ...baseState };
  updateModeButtons();
  renderScenario();
  renderStatus();
}

function updateModeButtons() {
  modeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === currentMode);
  });
}

function renderScenario() {
  const scenario = scenarios[currentMode];

  if (flowCode) flowCode.textContent = scenario.code;
  if (flowTitle) flowTitle.textContent = scenario.title;
  if (progressChip) progressChip.textContent = `${completedSteps.size} / ${scenario.steps.length} 단계`;

  if (stepList) {
    stepList.innerHTML = scenario.steps
      .map((step, index) => {
        const classes = [
          "step-item",
          index === activeStepIndex ? "is-active" : "",
          completedSteps.has(index) ? "is-complete" : ""
        ].filter(Boolean).join(" ");

        return `
          <li class="${classes}" data-step="${index}">
            <button type="button" class="step-button">
              <span class="step-index">${String(index + 1).padStart(2, "0")}</span>
              <span class="step-text">
                <strong>${step.title}</strong>
                <small>${step.description}</small>
              </span>
            </button>
          </li>
        `;
      })
      .join("");
  }

  syncDetailPanel();
  bindStepButtons();
}

function bindStepButtons() {
  const stepItems = Array.from(document.querySelectorAll(".step-item"));
  stepItems.forEach((item) => {
    item.addEventListener("click", () => {
      activeStepIndex = Number(item.dataset.step || 0);
      renderScenario();
    });
  });
}

function syncDetailPanel() {
  const scenario = scenarios[currentMode];
  const step = scenario.steps[activeStepIndex];

  if (detailTitle) detailTitle.textContent = step.title;
  if (detailText) detailText.textContent = step.description;
  if (stepAction) {
    stepAction.textContent = completedSteps.has(activeStepIndex) ? "이미 반영됨" : step.actionLabel;
    stepAction.disabled = completedSteps.has(activeStepIndex);
  }
}

function renderStatus() {
  if (avatarBadge) avatarBadge.textContent = state.avatar;
  if (characterName) characterName.textContent = state.character;
  if (characterGrade) characterGrade.textContent = state.grade;
  if (pointsValue) pointsValue.textContent = `${state.points.toLocaleString()}P`;
  if (pointsMeta) pointsMeta.textContent = state.pointsMeta;
  if (tokenValue) tokenValue.textContent = String(state.tokens);
  if (tokenMeta) tokenMeta.textContent = state.tokenMeta;
  if (paymentStatus) paymentStatus.textContent = state.paymentStatus;
  if (paymentMeta) paymentMeta.textContent = state.paymentMeta;
  if (marketPrice) marketPrice.textContent = state.market;
  if (rentalStatus) rentalStatus.textContent = state.rental;
  if (voteStatus) voteStatus.textContent = state.vote;
  if (carryStatus) carryStatus.textContent = state.carry;
}

function applyCurrentStep() {
  const scenario = scenarios[currentMode];
  const step = scenario.steps[activeStepIndex];

  if (!step || completedSteps.has(activeStepIndex)) return;

  step.apply(state);
  completedSteps.add(activeStepIndex);

  if (activeStepIndex < scenario.steps.length - 1) {
    activeStepIndex += 1;
  }

  renderScenario();
  renderStatus();
}

if (stepAction) {
  stepAction.addEventListener("click", applyCurrentStep);
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.mode) {
      resetScenario(button.dataset.mode);
    }
  });
});

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    if (dashboardPage) dashboardPage.classList.add("is-hidden");
    if (loginPage) loginPage.classList.remove("is-hidden");
    if (loginForm) loginForm.reset();
    if (loginMessage) loginMessage.textContent = "";
    resetScenario("payer");
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const userId = String(formData.get("userId") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (userId !== "admin" || password !== "admin") {
      if (loginMessage) {
        loginMessage.textContent = "아이디 또는 비밀번호가 올바르지 않습니다.";
      }
      return;
    }

    if (loginMessage) {
      loginMessage.textContent = "";
    }

    resetScenario("payer");

    if (loginPage) loginPage.classList.add("is-hidden");
    if (dashboardPage) dashboardPage.classList.remove("is-hidden");
  });
}

resetScenario("payer");
