# Venn Onboarding Form

A production-ready onboarding form built with **React + TypeScript**, styled using **Tailwind CSS**, and powered by **React Hook Form** + **Yup** for validation. The form supports multiple input fields, async validation, error handling, and modular reusable components.

---

## 🚀 Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [Axios](https://axios-http.com/)
- [clsx](https://github.com/lukeed/clsx) (for conditional classNames)
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/venn-onboarding-form.git
cd venn-onboarding-form
npm install
```

---

## 🧪 Development

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## 🧱 Features

- ✅ Form with first name, last name, phone number, and corporation number
- ✅ Yup-based schema validation (sync + async)
- ✅ Phone number must start with `+1` and be Canadian format
- ✅ Corporation number validated via external API
- ✅ Reusable components: `FormTitle`, `InputField`, `FormContainer`, `Button`
- ✅ Submit button disabled until form is valid and async check passes
- ✅ Loading states and full error handling (including backend errors)
- ✅ Unit and integration tests included for key modules

---

## 📁 Folder Structure

```
src/
├── components/          # Reusable UI and form components
│   ├── FormTitle.tsx
│   ├── InputField.tsx
│   ├── FormContainer.tsx
│   ├── FormErrorMessage.tsx
│   └── ui/
│       └── Button.tsx
│
├── hooks/               # Custom hooks
│   └── useValidateCorporationNumber.ts
│
├── services/            # API functions
│   └── api.ts
│
├── types/               # Type definitions
│   └── form.ts
│
├── utils/               # Validation schemas, helpers
│   └── validation.ts
│
├── __tests__/           # Test files
│   └── *.test.ts(x)
│
├── App.tsx
└── main.tsx
```

---

## ✅ API Endpoints

### GET: Validate Corporation Number
```
https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/:number
```

### POST: Submit Profile
```
https://fe-hometask-api.qa.vault.tryvault.com/profile-details
```

---

## 📌 Validation Rules
- **First/Last Name**: required, max 50 characters
- **Phone**: must match `+1XXXXXXXXXX`
- **Corporation Number**: 9 characters, validated async via API

---

## ✅ Running Tests

```bash
npm run test
```

Supports unit and integration tests using Jest + React Testing Library.
