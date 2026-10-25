const memberList = document.getElementById("memberList") as HTMLUListElement;
const memberInput = document.getElementById("memberName") as HTMLInputElement;
const memberAddBtn = document.getElementById("addMember") as HTMLButtonElement;
const totalMembers = document.getElementById("statMembers") as HTMLParagraphElement;
const memberSelect = document.getElementById("expPayer") as HTMLSelectElement;
const expDescInput = document.getElementById("expDesc") as HTMLInputElement;
const expAmountInput = document.getElementById("expAmount") as HTMLInputElement;
const addExpenseBtn = document.getElementById("addExpense") as HTMLButtonElement;
const formErrorText = document.getElementById("formError") as HTMLParagraphElement;
const expList = document.getElementById("expList") as HTMLUListElement;
const totalSpentEl = document.getElementById("statTotal") as HTMLSpanElement;
const totalExpensesEl = document.getElementById("statCount") as HTMLSpanElement;
const statSplitEl = document.getElementById("statSplit") as HTMLSpanElement;
const statPerEl = document.getElementById("statPer") as HTMLSpanElement;

type Expense = {
    description: string,
    amount: number,
    paidBy: string
};

type State = {
  members: string[],
  expenses: Expense[]
};

type Summary = {
    totalSpent: string,
    totalPerMember: string,
    totalMembers: number
};

type ExpenseValidationResult = {
    isValid: boolean;
    error: string | null;
};

const state: State = {
  members: [],
  expenses: []
};

const validateExpenseForm = (description: string, amount: number, payer: string): ExpenseValidationResult => {
    
    const trimmedDesc = description.trim();

    if (trimmedDesc.length === 0) {
        return { isValid: false, error: "Please enter an expense description." };
    }

    if (trimmedDesc.length > 50) {
        return { isValid: false, error: "Description must be 50 characters or less." };
    }

    if (isNaN(amount) || amount <= 0) {
        return { isValid: false, error: "Please enter a valid amount greater than 0." };
    }

    if (!payer || payer.trim() === "") {
        return { isValid: false, error: "Please select who paid for the expense." };
    }

    return { isValid: true, error: null };
};

const saveToStorage = (): void => {
  localStorage.setItem("STATE", JSON.stringify(state));
};

const loadStorage = (): State => {
    const data = localStorage.getItem("STATE");

    if (data === null) {
        return { members: [], expenses: [] };
    }

    try {
        const parsed = JSON.parse(data);
        return {
        members: Array.isArray(parsed.members) ? parsed.members : [],
        expenses: Array.isArray(parsed.expenses) ? parsed.expenses : [],
        };
    } catch (error) {
        console.error("Failed to parse stored state:", error);
        return { members: [], expenses: [] };
    }
};

const createExpenseElement = (expense: Expense, index: number): HTMLLIElement => {

    const li = document.createElement("li");

    li.className = "flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3.5 ring-1 ring-slate-100 transition hover:bg-slate-100/80";

    const formattedAmount = expense.amount.toLocaleString("en-PK");

    li.innerHTML = `
        <div class="flex min-w-0 items-center gap-3">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-brand">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        </div>
        <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-semibold text-slate-800">${expense.description}</p>
            <p class="truncate text-xs text-slate-500">Paid by <span class="font-medium text-slate-700">${expense.paidBy}</span></p>
        </div>
        </div>
        <div class="flex items-center gap-3 shrink-0">
        <span class="text-sm font-bold text-slate-900">Rs. ${formattedAmount}</span>
        <button 
            data-index="${index}"
            class="remove-expense rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none"
            title="Delete expense"
        >
            <svg class="h-4 w-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        </div>
    `;

    return li;
};

const createMemberElement = (memberName: string, index: number): HTMLLIElement => {
    const li = document.createElement("li");

    li.className =
        "flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100 transition hover:bg-slate-100/80";

    const initial: string = memberName.charAt(0).toUpperCase();

    li.innerHTML = `
        <div class="flex items-center gap-3 truncate">
        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-semibold text-brand">
            ${initial}
        </div>
        <span class="truncate text-sm font-medium text-slate-800">${memberName}</span>
        </div>
        <button 
        data-index="${index}"
        class="remove-member rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none"
        title="Remove ${memberName}"
        >
        <svg class="h-4 w-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </button>
    `;

    return li;
};

const renderExpenses = (expenses: Array<Expense>): void => {

    const expenseList = document.getElementById("expList");

    if(!expenseList) return;

    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        const li = createExpenseElement(expense, index);
        expenseList.appendChild(li);
    });
};

const renderMembers = (members: Array<string>): void => {
  if (!memberList) return;

  memberList.innerHTML = "";

  members.forEach((member, index) => {
    const li = createMemberElement(member, index);
    memberList.appendChild(li);
  });
};

const addMember = (memberName: string): void => {

  state.members.push(memberName.trim());
  renderMembers(state.members);
  renderStatCards();
  updateSelect(state.members);
  saveToStorage();
};

const addExpense = (expense: Expense): void => {

    state.expenses.push(expense);
    renderExpenses(state.expenses);
    renderExpenseSection(state.expenses);
    renderStatCards();
    saveToStorage();
};

const deleteExpense = (index: number): void => {

    state.expenses.splice(index, 1);
    renderExpenses(state.expenses);
    renderExpenseSection(state.expenses);
    renderStatCards();
    saveToStorage();
}

const deleteMember = (index: number): void => {

  state.members.splice(index, 1);
  renderMembers(state.members);
  renderStatCards();
  updateSelect(state.members);
  saveToStorage();
};

const validateName = (memberName: string): boolean => {
  const trimmed = memberName.trim();

  if (trimmed.length === 0) return false;
  if (trimmed.length > 30) return false;

  const nameRegex = /^[\p{L}\s'-]+$/u;
  return nameRegex.test(trimmed);
};

const calculateStats = (members: Array<string>, expenses: Array<Expense>): Summary => {

    const membersCount = members.length;
    const expensesTotal = expenses.reduce((sum, e) => sum += e.amount, 0);
    const formattedTotal = expensesTotal.toLocaleString("en-PK");
    const perPerson = membersCount > 0 ? expensesTotal / membersCount : 0;
    const formatPerPerson = perPerson.toLocaleString("en-PK");

    return {
        totalSpent: formattedTotal,
        totalPerMember: formatPerPerson,
        totalMembers: membersCount
    };
};

const renderStatCards = (): void => {

    const summary = calculateStats(state.members, state.expenses);
    const membersCount = summary.totalMembers;
    const expensesTotal = summary.totalSpent;
    totalMembers.textContent = `${membersCount}`;
    totalSpentEl.textContent = expensesTotal;
    totalExpensesEl.textContent = `${state.expenses.length}`;
    statPerEl.textContent = summary.totalPerMember;
    statSplitEl.textContent = `${membersCount}`;

};

const renderExpenseSection = (expenses: Array<Expense>): void => {

    const expSpan = document.getElementById("expBadge");
    const expTotal = document.getElementById("expTotal");
    const total = expenses.reduce((sum, e) => sum += e.amount, 0);

    if(!expSpan) return;
    if(!expTotal) return;

    const formattedTotal = total.toLocaleString("en-PK");

    expSpan.textContent = `${expenses.length}`;
    expTotal.textContent = `${formattedTotal}`;
}

const updateSelect = (members: Array<string>): void => {

    if(!memberSelect) return;

    memberSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select who paid";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    memberSelect.appendChild(defaultOption);

    members.forEach((member) => {
        const option = document.createElement("option");
        option.value = member;
        option.textContent = member;
        memberSelect.appendChild(option);
    });
};

addExpenseBtn?.addEventListener("click", () => {

    const description = expDescInput.value;
    const amount = parseFloat(expAmountInput.value);
    const payer = memberSelect.value;

    const expense = {
        description: description,
        amount: amount,
        paidBy: payer
    };

    const validation = validateExpenseForm(description, amount, payer);

    if (!validation.isValid) {
        if (formErrorText) {
        formErrorText.textContent = validation.error;
        formErrorText.classList.remove("hidden");
        }
        return;
    }

    if (formErrorText) {
        formErrorText.classList.add("hidden");
        formErrorText.textContent = "";
    }

    addExpense(expense);

    expDescInput.value = "";
    expAmountInput.value = "";
    memberSelect.value = "";
});

memberAddBtn?.addEventListener("click", () => {
  const nameInput: string = memberInput.value;
  const isValid: boolean = validateName(nameInput);

  if (!isValid) {
    alert("Invalid Name");
    memberInput.value = "";
    return;
  }

  addMember(nameInput);
  memberInput.value = "";
});

memberList?.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const deleteBtn = target.closest(".remove-member") as HTMLButtonElement | null;

  if (deleteBtn && deleteBtn.dataset.index !== undefined) {
    const index = parseInt(deleteBtn.dataset.index, 10);
    deleteMember(index);
  }
});

expList?.addEventListener("click", (event: MouseEvent) => {

  const target = event.target as HTMLElement;

  const deleteBtn = target.closest(".remove-expense") as HTMLButtonElement | null;

  if (deleteBtn && deleteBtn.dataset.index !== undefined) {
    const index = parseInt(deleteBtn.dataset.index, 10);
    deleteExpense(index);
  }
});

const init = (): void => {
    const loadedState = loadStorage();
    state.members = loadedState.members;
    state.expenses = loadedState.expenses;
    renderMembers(state.members);
    renderExpenses(state.expenses);
    renderStatCards();
    renderExpenseSection(state.expenses);
    updateSelect(state.members);
};

document.addEventListener("DOMContentLoaded", init);